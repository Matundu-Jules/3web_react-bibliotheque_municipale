// src/components/common/Loader/index.tsx

import React from "react";
import styles from "./Loader.module.scss";

const Loader: React.FC = () => {
  return (
    <div
      className={styles["spinner"]}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <span className={styles["visually-hidden"]}>Chargement…</span>
    </div>
  );
};

export default Loader;
