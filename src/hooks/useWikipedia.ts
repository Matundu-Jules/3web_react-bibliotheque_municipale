// src/hooks/useWikipedia.ts

import { useState, useEffect } from 'react';
import type { WikipediaEnrichment } from '../types/wikipedia';

export interface WikipediaEnrichmentWithLoading extends WikipediaEnrichment {
  loading: boolean;
}

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
    const formatted = encodeURIComponent(title.trim());

    fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${formatted}`)
      .then(async (res) => {
        if (!res.ok) throw new Error('No Wikipedia summary found.');
        const json = await res.json();
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
