// src/components/Book/BookDetails/index.tsx

import React from "react";
import type { OpenLibraryBook } from "../../../types/book";
import type { WikipediaEnrichmentWithLoading } from "@hooks/useWikipedia";
import Loader from "@components/common/Loader";
import ErrorMessage from "@components/common/ErrorMessage";
import { cleanDescription } from "@utils/formatters";
import styles from "./BookDetails.module.scss";

interface BookDetailsProps {
  book: OpenLibraryBook;
  wikipedia: WikipediaEnrichmentWithLoading;
}

const getCoverUrl = (cover_i?: number, size: "M" | "L" = "L") =>
  cover_i
    ? `https://covers.openlibrary.org/b/id/${cover_i}-${size}.jpg`
    : "https://dummyimage.com/150x200/cccccc/333333&text=No+Cover"; // Fichier à placer dans /public/assets

const BookDetails: React.FC<BookDetailsProps> = ({ book, wikipedia }) => (
  <section className={styles["book-details"]}>
    <div className={styles["cover-container"]}>
      <img
        src={getCoverUrl(book.cover_i)}
        alt={`Couverture de ${book.title}`}
        className={styles["cover"]}
        onError={(e) =>
          ((e.target as HTMLImageElement).src =
            "https://dummyimage.com/150x200/cccccc/333333&text=No+Cover")
        }
      />
    </div>

    <div className={styles["info"]}>
      <h1 className={styles["title"]}>{book.title || <i>Pas de titre</i>}</h1>
      <ul className={styles["details-list"]}>
        <li>
          <strong>Auteur(s):</strong>{" "}
          {book.author_name?.length ? (
            book.author_name.join(", ")
          ) : (
            <i>Non renseigné</i>
          )}
        </li>
        <li>
          <strong>Année de publication:</strong>{" "}
          {book.first_publish_year || <i>Non renseignée</i>}
        </li>
        <li>
          <strong>Éditeur(s):</strong>{" "}
          {book.publishers?.length ? (
            book.publishers.join(", ")
          ) : (
            <i>Non renseigné</i>
          )}
        </li>
        <li>
          <strong>Lieux d'édition:</strong>{" "}
          {book.publish_places?.length ? (
            book.publish_places.join(", ")
          ) : (
            <i>Non renseigné</i>
          )}
        </li>
        <li>
          <strong>Nombre de pages:</strong>{" "}
          {book.number_of_pages ?? <i>Non renseigné</i>}
        </li>
        <li>
          <strong>Genres:</strong>{" "}
          {book.genres?.length ? book.genres.join(", ") : <i>Non renseigné</i>}
        </li>
        <li>
          <strong>Sujets:</strong>{" "}
          {book.subjects?.length ? (
            book.subjects.join(", ")
          ) : (
            <i>Non renseigné</i>
          )}
        </li>
        <li>
          <strong>Description:</strong>{" "}
          {book.description ? (
            cleanDescription(book.description)
          ) : (
            <i>Non renseignée</i>
          )}
        </li>
        <li>
          <strong>Type de modification:</strong>{" "}
          {book.kind || <i>Non renseigné</i>}
        </li>
        <li>
          <strong>Commentaire:</strong> {book.comment || <i>Non renseigné</i>}
        </li>
        <li>
          <strong>Dernière modification:</strong>{" "}
          {book.timestamp ? (
            new Date(book.timestamp).toLocaleString()
          ) : (
            <i>Non renseignée</i>
          )}
        </li>
        <li>
          <strong>Clé (key):</strong> {book.key || <i>Non renseignée</i>}
        </li>
      </ul>

      {/* Section Wikipedia */}
      <div className={styles["wikipedia"]}>
        {wikipedia.loading && <Loader />}
        {wikipedia.error && (
          <ErrorMessage message={`Wikipedia: ${wikipedia.error}`} />
        )}
        {!wikipedia.loading && wikipedia.summary && (
          <div className={styles["wiki-summary"]}>
            <strong>Résumé Wikipedia :</strong>
            <p>{wikipedia.summary}</p>
            {wikipedia.url && (
              <a
                href={wikipedia.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles["wiki-link"]}
              >
                Voir sur Wikipedia
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  </section>
);

export default BookDetails;
