// ./src/components/Layout/Header/Header.tsx

import React from "react";
import { useNavigate } from "react-router-dom";
import QuickSearchBar from "@components/Search/QuickSearchBar";
import styles from "./Header.module.scss";
import logo from "@assets/logo.png";

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleAdvancedSearch = () => {
    navigate("/search");
  };

  return (
    <header className={styles["header"]}>
      <a
        className={styles["header-logo-container"]}
        href="/"
        aria-label="Accueil"
      >
        <img src={logo} alt="Logo Bibliothèque" className={styles["logo"]} />
        <span className={styles["site-title"]}>Bibliothèque municipale</span>
      </a>

      <div className={styles["search-container"]}>
        <QuickSearchBar />
        <button
          type="button"
          className={styles["advanced-search-btn"]}
          onClick={handleAdvancedSearch}
          aria-label="Recherche avancée"
        >
          Recherche avancée
        </button>
      </div>
    </header>
  );
};

export default Header;
