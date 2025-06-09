// ./src/components/Search/QuickSearchBar/QuickSearchBar.tsx

import React, { useState, useContext, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "@contexts/SearchContext";
import { useDebounce } from "@hooks/useDebounce";
import styles from "./QuickSearchBar.module.scss";

const QuickSearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);
  const debouncedQuery = useDebounce(query, 350);
  const { results, loading, error, searchBooks, clearResults } =
    useContext(SearchContext);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (debouncedQuery.length >= 3 && results.length > 0) {
      setIsDropdownOpen(true);
    } else {
      setIsDropdownOpen(false);
    }
  }, [debouncedQuery, results]);

  useEffect(() => {
    if (debouncedQuery.length >= 3) {
      searchBooks(debouncedQuery);
    } else {
      clearResults();
    }
  }, [debouncedQuery, searchBooks, clearResults]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
        setFocusedIndex(-1);
      }
    };

    const handleEsc = (event: KeyboardEvent | KeyboardEventInit) => {
      if (event.key === "Escape") {
        setIsDropdownOpen(false);
        setFocusedIndex(-1);
        inputRef.current?.blur();
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
    setFocusedIndex(-1);
    navigate(`/book/${bookKey.replace("/works/", "")}`);
  };

  // Navigation clavier dans la liste
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isDropdownOpen || results.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIndex((prev) =>
        prev < results.slice(0, 5).length - 1 ? prev + 1 : 0,
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIndex((prev) =>
        prev > 0 ? prev - 1 : results.slice(0, 5).length - 1,
      );
    } else if (e.key === "Enter" && focusedIndex >= 0) {
      e.preventDefault();
      handleSelect(results.slice(0, 5)[focusedIndex].key);
    }
  };

  useEffect(() => {
    if (dropdownRef.current && focusedIndex >= 0) {
      const items = dropdownRef.current.querySelectorAll("li");
      if (items[focusedIndex]) {
        (items[focusedIndex] as HTMLElement).scrollIntoView({
          block: "nearest",
        });
      }
    }
  }, [focusedIndex, isDropdownOpen]);

  return (
    <div className={styles["quick-search"]} aria-label="Recherche rapide">
      <input
        ref={inputRef}
        type="search"
        value={query}
        placeholder="Rechercher un livre..."
        onChange={(e) => {
          setQuery(e.target.value);
          setFocusedIndex(-1);
        }}
        aria-label="Recherche de livres"
        className={styles["search-input"]}
        id="quick-search-input"
        name="quick-search"
        autoComplete="off"
        aria-autocomplete="list"
        aria-expanded={isDropdownOpen}
        aria-controls="quick-search-results"
        onFocus={() => {
          if (debouncedQuery.length >= 3 && results.length > 0) {
            setIsDropdownOpen(true);
          }
        }}
        onKeyDown={handleKeyDown}
      />

      {loading && (
        <div
          className={styles["loading"]}
          role="status"
          aria-live="polite"
          aria-busy="true"
        >
          Recherche…
        </div>
      )}
      {error && (
        <div className={styles["error"]} role="alert" aria-live="assertive">
          {error}
        </div>
      )}
      {isDropdownOpen && (
        <ul
          className={styles["results-list"]}
          ref={dropdownRef}
          id="quick-search-results"
          role="listbox"
          aria-label="Suggestions de livres"
        >
          {results.slice(0, 5).map((book, idx) => (
            <li
              key={book.key}
              className={styles["result-item"]}
              role="option"
              aria-selected={focusedIndex === idx}
              tabIndex={-1}
              onMouseDown={() => handleSelect(book.key)}
              onMouseEnter={() => setFocusedIndex(idx)}
              style={
                focusedIndex === idx
                  ? { backgroundColor: "#eee", cursor: "pointer" }
                  : {}
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
