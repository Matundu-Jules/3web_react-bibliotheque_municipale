import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { wikipediaService } from '../services/wikipediaService';

globalThis.fetch = vi.fn();

beforeEach(() => {
  vi.resetAllMocks();
});

describe('wikipediaService', () => {
  it('fetchSummary returns data on success', async () => {
    const fakeData = { title: 'React', extract: 'React is a JS library.' };
    (fetch as any).mockResolvedValue({
      ok: true,
      json: async () => fakeData,
    });

    const result = await wikipediaService.fetchSummary('React');
    expect(fetch).toHaveBeenCalledWith(
      'https://en.wikipedia.org/api/rest_v1/page/summary/React',
    );
    expect(result).toEqual(fakeData);
  });

  it('throws error on API error', async () => {
    (fetch as any).mockResolvedValue({ ok: false });
    await expect(wikipediaService.fetchSummary('fail')).rejects.toThrow(
      'Wikipedia API error',
    );
  });
});
