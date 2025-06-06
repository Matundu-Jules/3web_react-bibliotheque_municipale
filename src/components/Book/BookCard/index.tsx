// src/components/Book/BookCard/index.tsx

import React from "react";
import styles from "./BookCard.module.scss";
import type { OpenLibraryBook } from "../../../types/book";
import { useNavigate } from "react-router-dom";

interface Props {
  book: OpenLibraryBook;
}

const BookCard: React.FC<Props> = ({ book }) => {
  const navigate = useNavigate();

  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : "https://dummyimage.com/150x200/cccccc/333333&text=No+Cover";

  const handleClick = () => {
    const id = book.key.replace("/works/", "");
    navigate(`/book/${id}`);
  };

  return (
    <div
      className={styles["book-card"]}
      onClick={handleClick}
      role="button"
      tabIndex={0}
    >
      <img src={coverUrl} alt={book.title} className={styles["cover"]} />
      <div className={styles["info"]}>
        <h3 className={styles["title"]}>{book.title}</h3>
        {book.author_name && (
          <p className={styles["author"]}>{book.author_name.join(", ")}</p>
        )}
        {book.first_publish_year && (
          <p className={styles["year"]}>Published: {book.first_publish_year}</p>
        )}
      </div>
    </div>
  );
};

export default BookCard;
