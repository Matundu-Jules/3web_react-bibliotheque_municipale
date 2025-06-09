import { useEffect, useState } from 'react';
import { openLibraryService } from '@services/openLibraryService';
import type { RecentChange } from '../types/search';

export function useRecentChanges() {
  const [books, setBooks] = useState<RecentChange[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    openLibraryService
      .fetchRecentChanges()
      .then(setBooks)
      .catch((err) => {
        setError('Impossible de charger les changements récents');
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  return { books, loading, error };
}
