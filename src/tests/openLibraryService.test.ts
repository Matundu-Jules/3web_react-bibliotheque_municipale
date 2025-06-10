import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  openLibraryService,
  mapEditionToOpenLibraryBook,
} from '../services/openLibraryService';

globalThis.fetch = vi.fn();

beforeEach(() => {
  vi.resetAllMocks();
});

describe('openLibraryService', () => {
  it('searchBooks returns mapped docs', async () => {
    // Fake API JSON comme OpenLibrary le fait
    const apiResponse = {
      docs: [
        {
          key: '1',
          title: 'Refactoring',
          by_statement: 'Martin Fowler',
          covers: [42],
        },
      ],
    };
    // Le fetch mock retourne ce JSON
    (fetch as any).mockResolvedValue({
      ok: true,
      json: async () => apiResponse,
    });

    const result = await openLibraryService.searchBooks('refactoring');
    expect(fetch).toHaveBeenCalledWith('/api/search.json?q=refactoring');
    expect(result.docs[0]).toMatchObject({
      key: '1',
      title: 'Refactoring',
      author_name: ['Martin Fowler'],
      cover_i: 42,
    });
  });

  it('throws on API error', async () => {
    (fetch as any).mockResolvedValue({ ok: false });
    await expect(openLibraryService.searchBooks('fail')).rejects.toThrow(
      'API Error',
    );
  });

  it('mapEditionToOpenLibraryBook formats edition', () => {
    const edition = {
      key: 'x',
      title: 'Clean Code',
      by_statement: 'Robert C. Martin',
      covers: [99],
      publish_date: '2008',
      description: { value: 'Livre culte.' },
    };
    const book = mapEditionToOpenLibraryBook(edition);
    expect(book.title).toBe('Clean Code');
    expect(book.author_name).toEqual(['Robert C. Martin']);
    expect(book.cover_i).toBe(99);
    expect(book.description).toBe('Livre culte.');
    expect(book.first_publish_year).toBe('2008');
  });
});
