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
