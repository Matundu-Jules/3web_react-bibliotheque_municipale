// src/hooks/useWikipedia.ts

import { useState, useEffect } from 'react';
import { wikipediaService } from '@services/wikipediaService';
import type { WikipediaEnrichmentWithLoading } from '../types/wikipedia';

export function useWikipedia(title?: string): WikipediaEnrichmentWithLoading {
  const [state, setState] = useState<WikipediaEnrichmentWithLoading>({
    loading: false,
  });

  useEffect(() => {
    if (!title) {
      setState({ loading: false, error: 'No title provided for Wikipedia.' });
      return;
    }

    setState({ loading: true });

    wikipediaService
      .fetchSummary(title)
      .then((json) => {
        setState({
          summary: json.extract || undefined,
          image:
            json.thumbnail?.source || json.originalimage?.source || undefined,
          url: json.content_urls?.desktop?.page || undefined,
          loading: false,
        });
      })
      .catch((err) =>
        setState({
          loading: false,
          error: err.message || 'Failed to fetch Wikipedia summary.',
        }),
      );
  }, [title]);

  return state;
}
