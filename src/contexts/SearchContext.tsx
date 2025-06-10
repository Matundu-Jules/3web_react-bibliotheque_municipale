// src/contexts/SearchContext.tsx

import React, { createContext, useState, useCallback } from "react";
import { useBooks } from "@hooks/useBooks";
import type { OpenLibraryBook } from "../types/book";

export interface SearchContextProps {
  query: string;
  results: OpenLibraryBook[];
  loading: boolean;
  error: string | null;
  searchBooks: (q: string) => void;
  clearResults: () => void;
}

export const SearchContext = createContext<SearchContextProps>({
  query: "",
  results: [],
  loading: false,
  error: null,
  searchBooks: () => {},
  clearResults: () => {},
});

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<OpenLibraryBook[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Hook custom pour l'appel API
  const { searchBooks: apiSearchBooks } = useBooks();

  const searchBooks = useCallback(
    async (q: string) => {
      setQuery(q);
      setLoading(true);
      setError(null);

      try {
        const res = await apiSearchBooks(q);
        setResults(res);
      } catch (err: any) {
        setError("Erreur lors de la recherche.");
        setResults([]);
      } finally {
        setLoading(false);
      }
    },
    [apiSearchBooks],
  );

  const clearResults = useCallback(() => {
    setResults([]);
    setQuery("");
    setLoading(false);
    setError(null);
  }, []);

  return (
    <SearchContext.Provider
      value={{ query, results, loading, error, searchBooks, clearResults }}
    >
      {children}
    </SearchContext.Provider>
  );
};
