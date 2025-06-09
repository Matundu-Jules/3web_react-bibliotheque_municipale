// src/hooks/useBooks.ts

import { useCallback, useEffect, useState } from 'react';
import { openLibraryService } from '@services/openLibraryService';
import type { OpenLibraryBook } from '../types/book';

interface RecentChange {
  key: string;
  title: string;
  author_name: string;
  kind: string;
  comment: string;
  timestamp: string;
  cover_i?: number;
}

export interface BookDetailsResult {
  book?: OpenLibraryBook;
  loading: boolean;
  error?: string;
}

function mapEditionToOpenLibraryBook(edition: any): OpenLibraryBook {
  return {
    key: edition.key,
    title: edition.title,
    author_name: edition.by_statement
      ? [edition.by_statement]
      : edition.authors
        ? edition.authors.map((a: any) =>
            a.name
              ? a.name
              : a.key
                ? a.key.replace('/authors/', '')
                : 'Auteur inconnu',
          )
        : [],
    first_publish_year:
      edition.publish_date || (edition.created?.value?.slice(0, 4) ?? ''),
    cover_i:
      // 1. covers[0] (prioritaire)
      edition.covers && edition.covers.length > 0
        ? edition.covers[0]
        : // 2. fallback: champ cover_i direct (si jamais il existe déjà)
          edition.cover_i
          ? edition.cover_i
          : undefined,
    kind: edition.kind,
    comment: edition.comment,
    timestamp: edition.last_modified?.value ?? edition.created?.value ?? '',
    description:
      typeof edition.description === 'object'
        ? edition.description.value
        : edition.description,
    subjects: edition.subjects,
    publishers: edition.publishers,
    number_of_pages: edition.number_of_pages,
    genres: edition.genres,
    publish_places: edition.publish_places,
  };
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
        const res = await fetch(
          'https://openlibrary.org/recentchanges.json?limit=20',
        );
        const data = await res.json();

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

        const uniqueBooks: Record<string, any> = {};
        for (const c of candidates) {
          if (!uniqueBooks[c.bookKey]) uniqueBooks[c.bookKey] = c;
        }
        const finalBooks = Object.values(uniqueBooks).slice(0, 6);

        const bookDetails = await Promise.all(
          finalBooks.map(async (c: any) => {
            const res = await fetch(`https://openlibrary.org${c.bookKey}.json`);
            const book = await res.json();

            let author_name = 'Auteur inconnu';
            if (Array.isArray(book.authors) && book.authors.length > 0) {
              const authorObj = book.authors[0];
              if (authorObj.name) {
                author_name = authorObj.name;
              } else if (authorObj.key) {
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

export function useBookDetails(id?: string): BookDetailsResult {
  const [state, setState] = useState<BookDetailsResult>({ loading: false });

  useEffect(() => {
    if (!id) {
      setState({ loading: false, error: 'No book ID provided.' });
      return;
    }
    setState({ loading: true });
    fetch(`https://corsproxy.io/?https://openlibrary.org/books/${id}.json`)
      .then(async (res) => {
        if (!res.ok) throw new Error('Book not found.');
        const data = await res.json();
        const normalizedBook = mapEditionToOpenLibraryBook(data);
        setState({ book: normalizedBook, loading: false });
      })
      .catch((err) => {
        setState({
          loading: false,
          error: err.message || 'Failed to fetch book details.',
        });
      });
  }, [id]);

  return state;
}
