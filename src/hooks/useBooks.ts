// src/hooks/useBooks.ts

import { useCallback, useEffect, useState } from 'react';
import { openLibraryService } from '@services/openLibraryService';
import type { OpenLibraryBook } from '../types/book';

interface RecentChange {
  key: string;
  title: string;
  author_name: string; // Nom réel
  kind: string;
  comment: string;
  timestamp: string;
  cover_i?: number;
}

export function useBooks() {
  const searchBooks = useCallback(
    async (query: string): Promise<OpenLibraryBook[]> => {
      if (!query) return [];
      const data = await openLibraryService.searchBooks(query);
      return data.docs || [];
    },
    [],
  );

  return { searchBooks };
}

export async function searchBooksAdvanced(
  params: { author: string; year: string; subject: string },
  page = 1,
): Promise<OpenLibraryBook[]> {
  const queryParts = [];

  if (params.author.trim())
    queryParts.push(`author=${encodeURIComponent(params.author)}`);
  if (params.year.trim())
    queryParts.push(`published_in=${encodeURIComponent(params.year)}`);
  if (params.subject.trim())
    queryParts.push(`subject=${encodeURIComponent(params.subject)}`);

  const limit = 20;
  const offset = (page - 1) * limit;

  const query = queryParts.join('&');
  const url = `/api/search.json?${query}&limit=${limit}&offset=${offset}`;

  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch books');

  const data = await response.json();

  return data.docs.map((doc: any) => ({
    key: doc.key,
    title: doc.title,
    author_name: doc.author_name,
    first_publish_year: doc.first_publish_year,
    cover_i: doc.cover_i,
  })) as OpenLibraryBook[];
}

export const useRecentChanges = () => {
  const [books, setBooks] = useState<RecentChange[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecentChanges = async () => {
      try {
        // 1. Fetch des modifications récentes
        const res = await fetch(
          'https://openlibrary.org/recentchanges.json?limit=20',
        );
        const data = await res.json();
        // 2. Récupérer tous les identifiants /books/OLxxxxM et meta associées
        const candidates = [];
        for (const entry of data) {
          if (!entry.changes) continue;
          const bookChange = entry.changes.find(
            (c: any) => c.key && c.key.startsWith('/books/'),
          );
          if (!bookChange) continue;
          candidates.push({
            bookKey: bookChange.key,
            kind: entry.kind ?? '',
            comment: entry.comment ?? '',
            timestamp: entry.timestamp ?? '',
          });
        }
        // 3. Uniques, max 6
        const uniqueBooks: Record<string, any> = {};
        for (const c of candidates) {
          if (!uniqueBooks[c.bookKey]) uniqueBooks[c.bookKey] = c;
        }
        const finalBooks = Object.values(uniqueBooks).slice(0, 6);

        // 4. Fetch détails livres & noms d’auteurs
        const bookDetails = await Promise.all(
          finalBooks.map(async (c: any) => {
            // 4.1 Fetch détail livre
            const res = await fetch(`https://openlibrary.org${c.bookKey}.json`);
            const book = await res.json();

            // 4.2 Récupère le premier auteur (ou "Auteur inconnu")
            let author_name = 'Auteur inconnu';
            if (Array.isArray(book.authors) && book.authors.length > 0) {
              const authorObj = book.authors[0];
              if (authorObj.name) {
                author_name = authorObj.name;
              } else if (authorObj.key) {
                // Fetch nom réel via API auteur
                try {
                  const authorRes = await fetch(
                    `https://openlibrary.org${authorObj.key}.json`,
                  );
                  const authorData = await authorRes.json();
                  author_name = authorData.name ?? 'Auteur inconnu';
                } catch {
                  author_name = 'Auteur inconnu';
                }
              }
            }
            return {
              key: c.bookKey,
              title: book.title || 'Sans titre',
              author_name,
              kind: c.kind,
              comment: c.comment,
              timestamp: c.timestamp,
              cover_i: Array.isArray(book.covers) ? book.covers[0] : undefined,
            };
          }),
        );

        setBooks(bookDetails);
      } catch (err) {
        setError('Impossible de charger les changements récents');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentChanges();
  }, []);

  return { books, loading, error };
};
