// /src/types/search.d.ts

import type { OpenLibraryBook } from './book';

export interface AdvancedSearchParams {
  author?: string;
  title?: string;
  subject?: string;
  publishedDate?: string;
  tags?: string[];
}

export interface SearchResult {
  numFound: number;
  docs: OpenLibraryBook[];
}

export interface QuickSearchSuggestion {
  key: string;
  title: string;
  author_name?: string[];
  cover_i?: number;
}

export interface RecentChange {
  key: string;
  title: string;
  author_name: string;
  kind?: string;
  comment?: string;
  timestamp?: string;
  cover_i?: number;
}

export interface BookDetailsResult {
  book?: OpenLibraryBook;
  loading: boolean;
  error?: string;
}
