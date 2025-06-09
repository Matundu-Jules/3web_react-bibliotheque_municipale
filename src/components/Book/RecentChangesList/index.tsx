// src/components/Book/RecentChangesList/index.tsx

import React from "react";
import { Link } from "react-router-dom";
import styles from "./RecentChangesList.module.scss";

interface RecentChange {
  key: string;
  title: string;
  author_name: string;
  kind?: string;
  comment?: string;
  timestamp?: string;
  cover_i?: number;
}

interface Props {
  changes: RecentChange[];
}

const RecentChangesList: React.FC<Props> = ({ changes }) => {
  return (
    <ul
      className={styles["list"]}
      aria-label="Liste des derniers changements de livres"
    >
      {changes.map((item) => {
        const bookId = item.key.replace("/books/", "");
        const label = `Voir le détail du livre "${item.title}"`;

        return (
          <li key={item.key} className={styles["item"]}>
            <span className={styles["icon"]} aria-hidden="true">
              📘
            </span>
            <span className={styles["text"]}>
              <strong>
                <Link
                  to={`/book/${bookId}`}
                  className={styles["link"]}
                  aria-label={label}
                >
                  {item.title}
                </Link>
              </strong>
              {item.author_name && <> - {item.author_name}</>}
              <br />
              <span className={styles["meta"]}>
                {item.comment || item.kind}
                {item.timestamp && (
                  <>
                    {" - "}
                    <time dateTime={item.timestamp}>
                      {new Date(item.timestamp).toLocaleString("fr-FR")}
                    </time>
                  </>
                )}
              </span>
            </span>
          </li>
        );
      })}
    </ul>
  );
};

export default RecentChangesList;
