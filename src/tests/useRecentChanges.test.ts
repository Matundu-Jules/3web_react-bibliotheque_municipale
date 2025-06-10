import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useRecentChanges } from '../hooks/useRecentChanges';
import { openLibraryService } from '../services/openLibraryService';

// Mock du service
vi.mock('../services/openLibraryService', () => ({
  openLibraryService: {
    fetchRecentChanges: vi.fn(),
  },
}));

describe('useRecentChanges', () => {
  it('returns recent changes on success', async () => {
    const fakeBooks = [{ key: '1', type: 'edit' }];
    (openLibraryService.fetchRecentChanges as any).mockResolvedValue(fakeBooks);

    const { result } = renderHook(() => useRecentChanges());

    expect(result.current.loading).toBe(true); // initialement en loading

    await waitFor(() => {
      expect(result.current.books).toEqual(fakeBooks);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
    });
  });

  it('returns error if fetch fails', async () => {
    (openLibraryService.fetchRecentChanges as any).mockRejectedValue(
      new Error('API fail'),
    );

    const { result } = renderHook(() => useRecentChanges());

    await waitFor(() => {
      expect(result.current.error).toBe(
        'Impossible de charger les changements récents',
      );
      expect(result.current.loading).toBe(false);
      expect(result.current.books).toEqual([]);
    });
  });
});
