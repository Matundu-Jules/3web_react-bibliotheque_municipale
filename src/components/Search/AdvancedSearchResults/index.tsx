// src/components/Search/AdvancedSearchResults/index.tsx

import React from "react";
import styles from "./AdvancedSearchResults.module.scss";
import BookCard from "@components/Book/BookCard";
import Loader from "@components/common/Loader";
import ErrorMessage from "@components/common/ErrorMessage";
import type { OpenLibraryBook } from "../../../types/book";

interface Props {
  books: OpenLibraryBook[];
  loading: boolean;
  error: string | null;
}

const AdvancedSearchResults: React.FC<Props> = ({ books, loading, error }) => {
  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (books.length === 0)
    return (
      <p className={styles["empty"]}>
        Aucun résultat trouvé. Essayez d’ajuster votre recherche.
      </p>
    );

  return (
    <div className={styles["results-grid"]}>
      {books.map((book) => (
        <BookCard key={book.key} book={book} />
      ))}
    </div>
  );
};

export default AdvancedSearchResults;
