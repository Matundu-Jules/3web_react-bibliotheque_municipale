import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useBooks } from '../hooks/useBooks';
import { openLibraryService } from '../services/openLibraryService';

// Mock du service appelé par le hook
vi.mock('../services/openLibraryService', () => ({
  openLibraryService: {
    searchBooks: vi.fn(),
  },
}));

describe('useBooks', () => {
  it('searchBooks returns empty array if query is empty', async () => {
    const { result } = renderHook(() => useBooks());
    const books = await result.current.searchBooks('');
    expect(books).toEqual([]);
  });

  it('searchBooks returns docs from API', async () => {
    const fakeDocs = [{ key: 'abc', title: 'TDD' }];
    // On "force" le mock à retourner { docs: fakeDocs }
    (openLibraryService.searchBooks as any).mockResolvedValue({
      docs: fakeDocs,
    });
    const { result } = renderHook(() => useBooks());
    const books = await result.current.searchBooks('tdd');
    expect(books).toEqual(fakeDocs);
    expect(openLibraryService.searchBooks).toHaveBeenCalledWith('tdd');
  });
});
