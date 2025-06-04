import { describe, it, expect, vi } from 'vitest';
import { searchBooks } from '../openLibrary';

global.fetch = vi.fn();

describe('searchBooks', () => {
  it('returns results', async () => {
    const mockResponse = { docs: [{ key: '/works/OL1W', title: 'Test Book' }], numFound: 1 };
    (fetch as any).mockResolvedValue({ ok: true, json: () => Promise.resolve(mockResponse) });
    const res = await searchBooks('test');
    expect(res.docs[0].title).toBe('Test Book');
  });
});
