// src/hooks/useBooks.ts

import { useCallback } from 'react';
import { openLibraryService } from '@services/openLibraryService';
import type { OpenLibraryBook } from '../types/book';

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
  const url = `https://openlibrary.org/search.json?${query}&limit=${limit}&offset=${offset}`;

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
