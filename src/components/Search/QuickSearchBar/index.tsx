// ./src/components/Search/QuickSearchBar/QuickSearchBar.tsx

import React, { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "@contexts/SearchContext";
import { useDebounce } from "@hooks/useDebounce";
import styles from "./QuickSearchBar.module.scss";

const QuickSearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const debouncedQuery = useDebounce(query, 350);
  const { results, loading, error, searchBooks, clearResults } =
    useContext(SearchContext);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);

  // Log sur chaque ouverture/fermeture du dropdown
  useEffect(() => {
    if (debouncedQuery.length >= 3 && results.length > 0) {
      setIsDropdownOpen(true);
    } else {
      setIsDropdownOpen(false);
    }
  }, [debouncedQuery, results]);

  // Log sur chaque appel à searchBooks
  useEffect(() => {
    if (debouncedQuery.length >= 3) {
      searchBooks(debouncedQuery);
    } else {
      clearResults();
    }
  }, [debouncedQuery, searchBooks, clearResults]);

  // Ferme le dropdown si on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    const handleEsc = (event: KeyboardEvent | KeyboardEventInit) => {
      if (event.key === "Escape") {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const handleSelect = (bookKey: string) => {
    setQuery("");
    clearResults();
    setIsDropdownOpen(false);
    navigate(`/book/${bookKey.replace("/works/", "")}`);
  };

  return (
    <div className={styles["quick-search"]} aria-label="Recherche rapide">
      <input
        ref={inputRef}
        type="search"
        value={query}
        placeholder="Rechercher un livre..."
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Recherche de livres"
        className={styles["search-input"]}
        id="quick-search-input"
        name="quick-search-input"
        autoComplete="off"
        onFocus={() => {
          if (debouncedQuery.length >= 3 && results.length > 0) {
            setIsDropdownOpen(true);
          }
        }}
      />

      {loading && <div className={styles["loading"]}>Recherche…</div>}
      {error && <div className={styles["error"]}>{error}</div>}
      {isDropdownOpen && (
        <ul className={styles["results-list"]} ref={dropdownRef}>
          {results.slice(0, 5).map((book) => (
            <li
              key={book.key}
              className={styles["result-item"]}
              onClick={() => handleSelect(book.key)}
              tabIndex={0}
              onKeyDown={(e) =>
                e.key === "Enter" ? handleSelect(book.key) : undefined
              }
            >
              {book.title}{" "}
              {book.author_name ? (
                <span>par {book.author_name.join(", ")}</span>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default QuickSearchBar;
