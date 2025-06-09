// src/services/wikipediaService.ts

import { apiConfig } from './apiConfig';

export const wikipediaService = {
  async fetchSummary(title: string): Promise<any> {
    const url = `${apiConfig.wikipediaBaseUrl}/page/summary/${encodeURIComponent(title)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Wikipedia API error');
    return await res.json();
  },
};
