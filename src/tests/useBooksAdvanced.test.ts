import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useBooksAdvanced } from '../hooks/useBooksAdvanced';
import { openLibraryService } from '../services/openLibraryService';

// Mock du service utilisé par le hook
vi.mock('../services/openLibraryService', () => ({
  openLibraryService: {
    searchBooksAdvanced: vi.fn(),
  },
}));

describe('useBooksAdvanced', () => {
  it('searchBooksAdvanced returns docs from API', async () => {
    const fakeDocs = [{ key: 'def', title: 'Clean Code' }];
    // Mock la réponse API
    (openLibraryService.searchBooksAdvanced as any).mockResolvedValue({
      docs: fakeDocs,
    });

    const { result } = renderHook(() => useBooksAdvanced());
    const params = { title: 'Clean Code' }; // Param minimal pour l'exemple
    const books = await result.current.searchBooksAdvanced(params, 1);

    expect(books).toEqual(fakeDocs);
    expect(openLibraryService.searchBooksAdvanced).toHaveBeenCalledWith(
      params,
      1,
    );
  });
});
