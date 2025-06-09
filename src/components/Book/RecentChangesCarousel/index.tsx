// src/components/Book/RecentChangesCarousel/index.tsx

import React, { useEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import type { RecentChange } from "../../../types/search";
import styles from "./RecentChangesCarousel.module.scss";

interface Props {
  changes: RecentChange[];
}

const RecentChangesCarousel: React.FC<Props> = ({ changes }) => {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const visibleItems = 3; // Toujours 3 ! (mobile handled by HomePage)
  const maxIndex = Math.max(0, changes.length - visibleItems);

  useEffect(() => {
    if (changes.length === 0) return;
    timerRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1 > maxIndex ? 0 : prev + 1));
    }, 5000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [changes.length, maxIndex]);

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 < 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setIndex((prev) => (prev + 1 > maxIndex ? 0 : prev + 1));
  };

  return (
    <section
      className={styles["carousel"]}
      aria-label="Carrousel des dernières modifications de livres"
      role="region"
    >
      <button
        className={styles["nav"]}
        onClick={handlePrev}
        aria-label="Afficher les livres précédents"
        tabIndex={0}
      >
        <FaChevronLeft aria-hidden="true" />
      </button>

      <div
        className={styles["slider"]}
        role="list"
        aria-live="polite"
        aria-atomic="false"
        tabIndex={-1}
      >
        {changes.slice(index, index + visibleItems).map((book, idx) => {
          const cover = book.cover_i
            ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
            : "https://dummyimage.com/150x200/cccccc/333333&text=No+Cover";

          const bookId = book.key.replace("/books/", "");

          return (
            <Link
              key={book.key}
              to={`/book/${bookId}`}
              className={styles["book"]}
              tabIndex={0}
              role="listitem"
              aria-label={`Voir le livre "${book.title}" par ${book.author_name || "Auteur inconnu"}${book.comment ? ` : ${book.comment}` : ""}`}
            >
              <img
                src={cover}
                alt={`Couverture du livre ${book.title}`}
                className={styles["cover"]}
              />
              <h3 className={styles["title"]}>{book.title}</h3>
              <p className={styles["author"]}>{book.author_name}</p>
              <p className={styles["meta"]}>
                {book.comment || book.kind}
                {book.timestamp && (
                  <>
                    {" - "}
                    <time dateTime={book.timestamp}>
                      {new Date(book.timestamp).toLocaleString("fr-FR")}
                    </time>
                  </>
                )}
              </p>
            </Link>
          );
        })}
      </div>

      <button
        className={styles["nav"]}
        onClick={handleNext}
        aria-label="Afficher les livres suivants"
        tabIndex={0}
      >
        <FaChevronRight aria-hidden="true" />
      </button>
    </section>
  );
};

export default RecentChangesCarousel;
