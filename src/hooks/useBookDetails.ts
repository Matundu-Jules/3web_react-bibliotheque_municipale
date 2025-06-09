import { useEffect, useState } from 'react';
import { openLibraryService } from '@services/openLibraryService';
import type { BookDetailsResult } from '../types/search';

export function useBookDetails(id?: string): BookDetailsResult {
  const [state, setState] = useState<BookDetailsResult>({ loading: false });

  useEffect(() => {
    if (!id) {
      setState({ loading: false, error: 'No book ID provided.' });
      return;
    }
    setState({ loading: true });
    openLibraryService
      .fetchBookDetails(id)
      .then((book) => setState({ book, loading: false }))
      .catch((err) =>
        setState({
          loading: false,
          error: err.message || 'Failed to fetch book details.',
        }),
      );
  }, [id]);

  return state;
}
