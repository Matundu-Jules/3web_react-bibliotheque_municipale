// ./src/components/Layout/Footer/Footer.tsx

import styles from "./Footer.module.scss";

function Footer() {
  return (
    <footer className={styles["footer"]}>
      © {new Date().getFullYear()} Bibliothèque Municipale
    </footer>
  );
}

export default Footer;
