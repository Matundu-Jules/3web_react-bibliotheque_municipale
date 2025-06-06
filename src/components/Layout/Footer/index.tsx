// ./src/components/Layout/Footer/Footer.tsx

import React from "react";
import styles from "./Footer.module.scss";

const Footer: React.FC = () => {
  return (
    <footer className={styles["footer"]}>
      <p>
        © {new Date().getFullYear()} Bibliothèque Municipale. Tous droits
        réservés.
      </p>
    </footer>
  );
};

export default Footer;
