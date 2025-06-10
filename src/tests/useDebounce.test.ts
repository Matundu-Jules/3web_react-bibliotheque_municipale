import '@testing-library/jest-dom';
import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '../hooks/useDebounce';

describe('useDebounce', () => {
  it('returns debounced value after delay', async () => {
    // Utilise fake timers pour accélérer le test
    vi.useFakeTimers();

    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 300),
      {
        initialProps: { value: 'init' },
      },
    );

    // Le hook retourne immédiatement la valeur initiale
    expect(result.current).toBe('init');

    // On change la valeur
    rerender({ value: 'toto' });
    expect(result.current).toBe('init'); // Toujours l'ancienne valeur car délai pas écoulé

    // Avance le temps de 300ms
    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(result.current).toBe('toto');

    // Nettoie les timers
    vi.useRealTimers();
  });
});
