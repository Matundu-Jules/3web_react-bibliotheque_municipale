// src/services/openLibraryService.ts

import { apiConfig } from './apiConfig';
import type { OpenLibraryBook } from '../types/book';
import type { AdvancedSearchParams, RecentChange } from '../types/search';

export function mapEditionToOpenLibraryBook(edition: any): OpenLibraryBook {
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
      edition.covers && edition.covers.length > 0
        ? edition.covers[0]
        : edition.cover_i
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

export const openLibraryService = {
  /**
   * Recherche rapide (par query simple)
   */
  async searchBooks(query: string): Promise<{ docs: OpenLibraryBook[] }> {
    const url = `${apiConfig.openLibraryBaseUrl}/search.json?q=${encodeURIComponent(query)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('API Error');
    const data = await res.json();
    return {
      docs: data.docs.map(mapEditionToOpenLibraryBook),
    };
  },

  /**
   * Recherche avancée (avec critères)
   */
  async searchBooksAdvanced(
    params: AdvancedSearchParams,
    page = 1,
  ): Promise<{ docs: OpenLibraryBook[] }> {
    const queryParts = [];
    if (params.author && params.author.trim()) {
      queryParts.push(`author=${encodeURIComponent(params.author)}`);
    }
    if (params.title && params.title.trim()) {
      queryParts.push(`title=${encodeURIComponent(params.title)}`);
    }
    if (params.publishedDate && params.publishedDate.trim()) {
      queryParts.push(
        `first_publish_year=${encodeURIComponent(params.publishedDate)}`,
      );
    }
    if (params.subject && params.subject.trim()) {
      queryParts.push(`subject=${encodeURIComponent(params.subject)}`);
    }
    // Ajoute les tags si besoin
    if (params.tags && Array.isArray(params.tags) && params.tags.length > 0) {
      queryParts.push(
        ...params.tags.map((tag) => `subject=${encodeURIComponent(tag)}`),
      );
    }

    const limit = 20;
    const offset = (page - 1) * limit;
    const query = queryParts.join('&');
    const url = `${apiConfig.openLibraryBaseUrl}/search.json?${query}&limit=${limit}&offset=${offset}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch books');
    const data = await res.json();
    return {
      docs: data.docs.map(mapEditionToOpenLibraryBook),
    };
  },

  /**
   * Récupération des changements récents (HomePage)
   */
  async fetchRecentChanges(limit = 20): Promise<RecentChange[]> {
    // Appel principal pour la liste des changements récents
    const url = `${apiConfig.openLibraryBaseUrl}/recentchanges.json?limit=${limit}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch recent changes');
    const data = await res.json();

    // Extraction des changements de type "book"
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
    // Unicité des livres et limite à 6 pour le carousel
    const uniqueBooks: Record<string, any> = {};
    for (const c of candidates) {
      if (!uniqueBooks[c.bookKey]) uniqueBooks[c.bookKey] = c;
    }
    const finalBooks = Object.values(uniqueBooks).slice(0, 6);

    // Récupération des détails pour chaque livre
    const bookDetails = await Promise.all(
      finalBooks.map(async (c: any) => {
        const bookRes = await fetch(
          `${apiConfig.openLibraryBaseUrl}${c.bookKey}.json`,
        );
        const book = await bookRes.json();

        let author_name = 'Auteur inconnu';
        if (Array.isArray(book.authors) && book.authors.length > 0) {
          const authorObj = book.authors[0];
          if (authorObj.name) {
            author_name = authorObj.name;
          } else if (authorObj.key) {
            try {
              const authorRes = await fetch(
                `${apiConfig.openLibraryBaseUrl}${authorObj.key}.json`,
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
        } as RecentChange;
      }),
    );
    return bookDetails;
  },

  /**
   * Détail d'un livre (par id)
   */
  async fetchBookDetails(id: string): Promise<OpenLibraryBook> {
    const url = `${apiConfig.openLibraryBaseUrl}/books/${id}.json`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Book not found');
    const data = await res.json();
    return mapEditionToOpenLibraryBook(data);
  },
};
