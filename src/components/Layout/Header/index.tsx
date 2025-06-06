// ./src/components/Layout/Header/Header.tsx

import React from "react";
import QuickSearchBar from "@components/Search/QuickSearchBar";
import styles from "./Header.module.scss";
import logo from "@assets/logo.png"; // adapte selon ton asset/logo

const Header: React.FC = () => (
  <header className={styles["header"]}>
    <a
      className={styles["header-logo-container"]}
      href="/"
      aria-label="Accueil"
    >
      <img src={logo} alt="Logo Bibliothèque" className={styles["logo"]} />
      <span className={styles["site-title"]}>Bibliothèque municipale</span>
    </a>

    <QuickSearchBar />
  </header>
);

export default Header;
