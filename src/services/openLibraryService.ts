// src/services/openLibraryService.ts

import type { OpenLibraryBook } from '../types/book';

export const openLibraryService = {
  async searchBooks(query: string): Promise<{ docs: OpenLibraryBook[] }> {
    const url = `/api/search.json?q=${encodeURIComponent(query)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('API Error');
    return await res.json();
  },
};

export const fetchRecentChanges = async () => {
  const res = await fetch('/api/recentchanges.json?limit=20');
  if (!res.ok) throw new Error('Failed to fetch recent changes');
  return res.json();
};
