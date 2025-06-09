import { useCallback } from 'react';
import { openLibraryService } from '@services/openLibraryService';
import type { OpenLibraryBook } from '../types/book';

/**
 * Hook pour la recherche rapide — retourne une fonction searchBooks(query)
 */
export function useBooks() {
  // On te renvoie une fonction qui wrappe le service (pour utilisation dans un formulaire contrôlé par exemple)
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
