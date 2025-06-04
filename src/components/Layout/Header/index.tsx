// ./src/components/Layout/Header/Header.tsx

import React from "react";
import QuickSearchBar from "@components/Search/QuickSearchBar";
import styles from "./Header.module.scss";

const Header: React.FC = () => {
  return (
    <header className={styles["header"]}>
      <div className={styles["logoContainer"]}>
        <h1 className={styles["title"]}>📚 Bibliothèque Municipale</h1>
      </div>
      <QuickSearchBar />
    </header>
  );
};

export default Header;
