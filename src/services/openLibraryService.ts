// src/services/openLibraryService.ts

import type { OpenLibraryBook } from '../types/book';

export const openLibraryService = {
  async searchBooks(query: string): Promise<{ docs: OpenLibraryBook[] }> {
    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('API Error');
    return await res.json();
  },
};
