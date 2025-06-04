import { SearchResponse, WorkDetail } from '../types/OpenLibrary';

export async function searchBooks(query: string, page = 1): Promise<SearchResponse> {
  const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&page=${page}`);
  if (!response.ok) {
    throw new Error('Failed to search books');
  }
  return response.json();
}

export async function advancedSearch(params: Record<string, string>): Promise<SearchResponse> {
  const query = new URLSearchParams(params).toString();
  const response = await fetch(`https://openlibrary.org/search.json?${query}`);
  if (!response.ok) {
    throw new Error('Failed to search books');
  }
  return response.json();
}

export async function getRecentChanges(limit = 10) {
  const response = await fetch(`https://openlibrary.org/recentchanges.json?limit=${limit}`);
  if (!response.ok) {
    throw new Error('Failed to fetch recent changes');
  }
  return response.json();
}

export async function getWork(id: string): Promise<WorkDetail> {
  const response = await fetch(`https://openlibrary.org/works/${id}.json`);
  if (!response.ok) {
    throw new Error('Failed to fetch work');
  }
  return response.json();
}
