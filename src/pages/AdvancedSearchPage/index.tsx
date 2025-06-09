// src/pages/AdvancedSearchPage/index.tsx
import React, { useState } from "react";
import styles from "./AdvancedSearchPage.module.scss";
import AdvancedSearchForm from "@components/Search/AdvancedSearchForm";
import AdvancedSearchResults from "@components/Search/AdvancedSearchResults";
import type { OpenLibraryBook } from "../../types/book";
import type { AdvancedSearchParams } from "../../types/search";
import { openLibraryService } from "@services/openLibraryService";

const AdvancedSearchPage: React.FC = () => {
  const [books, setBooks] = useState<OpenLibraryBook[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastParams, setLastParams] = useState<AdvancedSearchParams | null>(
    null,
  );

  const handleSearch = async (params: AdvancedSearchParams) => {
    setLoading(true);
    setError(null);
    setCurrentPage(1);
    setLastParams(params);

    try {
      const { docs } = await openLibraryService.searchBooksAdvanced(params, 1);
      setBooks(docs);
    } catch (err) {
      setError("Something went wrong while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    if (!lastParams) return;

    const nextPage = currentPage + 1;
    setLoading(true);

    try {
      const { docs: moreResults } =
        await openLibraryService.searchBooksAdvanced(lastParams, nextPage);
      setBooks((prev) => [...prev, ...moreResults]);
      setCurrentPage(nextPage);
    } catch (err) {
      setError("Failed to load more results.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className={styles["advanced-search-page"]}
      aria-label="Recherche avancée de livres"
    >
      <h1 className={styles["title"]}>Recherche de livre avancée</h1>
      <AdvancedSearchForm onSearch={handleSearch} />
      <AdvancedSearchResults books={books} loading={loading} error={error} />

      {books.length > 0 && !loading && (
        <div className={styles["load-more-wrapper"]}>
          <button
            className={styles["load-more-button"]}
            onClick={loadMore}
            aria-label="Charger plus de résultats de recherche"
            disabled={loading}
          >
            Charger plus
          </button>
        </div>
      )}
    </main>
  );
};

export default AdvancedSearchPage;
