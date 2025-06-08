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
    <ul className={styles["list"]}>
      {changes.map((item) => {
        const bookId = item.key.replace("/books/", "");

        return (
          <li key={item.key} className={styles["item"]}>
            <span className={styles["icon"]}>📘</span>
            <span className={styles["text"]}>
              <strong>
                <Link to={`/book/${bookId}`} className={styles["link"]}>
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
                    {new Date(item.timestamp).toLocaleString("fr-FR")}
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
