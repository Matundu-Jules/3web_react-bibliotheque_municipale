import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useBookDetails } from '../hooks/useBookDetails';
import { openLibraryService } from '../services/openLibraryService';

// Mock du service
vi.mock('../services/openLibraryService', () => ({
  openLibraryService: {
    fetchBookDetails: vi.fn(),
  },
}));

describe('useBookDetails', () => {
  it('returns error if no id', () => {
    const { result } = renderHook(() => useBookDetails(undefined));
    expect(result.current.error).toBe('No book ID provided.');
    expect(result.current.loading).toBe(false);
  });

  it('fetches book details and updates state on success', async () => {
    const fakeBook = { key: 'abc', title: 'The Pragmatic Programmer' };
    (openLibraryService.fetchBookDetails as any).mockResolvedValue(fakeBook);

    const { result } = renderHook(() => useBookDetails('abc'));
    // Le premier render doit être loading:true
    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.book).toEqual(fakeBook);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeUndefined();
    });
  });

  it('sets error if fetch fails', async () => {
    (openLibraryService.fetchBookDetails as any).mockRejectedValue(
      new Error('API Down'),
    );
    const { result } = renderHook(() => useBookDetails('fail-id'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe('API Down');
    });
  });
});
