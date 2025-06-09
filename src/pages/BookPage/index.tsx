// src/pages/BookPage/index.tsx

import React from "react";
import { useParams } from "react-router-dom";
import { useBookDetails } from "@hooks/useBookDetails";
import { useWikipedia } from "@hooks/useWikipedia";
import BookDetails from "@components/Book/BookDetails";
import Loader from "@components/common/Loader";
import ErrorMessage from "@components/common/ErrorMessage";

const BookPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { book, loading: bookLoading, error: bookError } = useBookDetails(id);
  const wikipedia = useWikipedia(book?.title);

  if (!id) {
    return <ErrorMessage message="Book ID is missing from URL." />;
  }
  if (bookLoading) {
    return <Loader />;
  }
  if (bookError) {
    return <ErrorMessage message={bookError} />;
  }
  if (!book) {
    return <ErrorMessage message="Book not found." />;
  }

  return <BookDetails book={book} wikipedia={wikipedia} />;
};

export default BookPage;
