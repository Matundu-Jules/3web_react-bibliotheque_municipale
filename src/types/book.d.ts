// /src/types/book.d.ts

export interface OpenLibraryBook {
  key: string;
  title: string;
  author_name?: string[];
  cover_i?: number;
  first_publish_year?: number;
  [key: string]: any; // pour éviter les erreurs si des props inattendues arrivent
}
