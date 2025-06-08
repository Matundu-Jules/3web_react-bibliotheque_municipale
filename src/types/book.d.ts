// /src/types/book.d.ts

export interface OpenLibraryBook {
  key: string;
  title: string;
  author_name?: string[];
  first_publish_year?: string;
  cover_i?: number;

  // ✅ Champs spécifiques aux changements récents
  kind?: string;
  comment?: string;
  timestamp?: string;
}
