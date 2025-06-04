// src/contexts/SearchContext.tsx
import { createContext, useContext } from "react";

const dummyContext = {
  searchTerm: "",
  results: [],
  loading: false,
  error: null,
  setSearchTerm: () => {},
};

export const SearchContext = createContext(dummyContext);

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SearchContext.Provider value={dummyContext}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
