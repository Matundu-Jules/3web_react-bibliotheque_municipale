// /src/types/book.d.ts

export interface OpenLibraryBook {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: string;
  cover_i?: number;
  kind?: string;
  comment?: string;
  timestamp?: string;

  // Champs enrichis pour édition/détail
  description?: string;
  subjects?: string[];
  publishers?: string[];
  number_of_pages?: number;
  genres?: string[];
  publish_places?: string[];
}
