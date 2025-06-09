import { useCallback } from 'react';
import { openLibraryService } from '@services/openLibraryService';
import type { OpenLibraryBook } from '../types/book';
import type { AdvancedSearchParams } from '../types/search';

export function useBooksAdvanced() {
  // Retourne la fonction pour la recherche avancée
  const searchBooksAdvanced = useCallback(
    async (
      params: AdvancedSearchParams,
      page = 1,
    ): Promise<OpenLibraryBook[]> => {
      const data = await openLibraryService.searchBooksAdvanced(params, page);
      return data.docs || [];
    },
    [],
  );
  return { searchBooksAdvanced };
}
