// /src/types/wikipedia.d.ts

export interface WikipediaEnrichment {
  summary?: string;
  image?: string;
  url?: string;
  error?: string; // Pour propager une erreur éventuelle de fetch Wikipedia
}

export interface WikipediaEnrichmentWithLoading extends WikipediaEnrichment {
  loading: boolean;
}
