export interface SearchDoc {
  key: string;
  title: string;
  author_name?: string[];
}

export interface SearchResponse {
  numFound: number;
  docs: SearchDoc[];
}

export interface WorkDetail {
  title: string;
  description?: string | { value: string };
  covers?: number[];
  subjects?: string[];
}
