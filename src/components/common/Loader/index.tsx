// src/components/common/Loader/index.tsx

import React from "react";
import styles from "./Loader.module.scss";

const Loader: React.FC = () => {
  return <div className={styles["spinner"]} aria-label="Chargement..." />;
};

export default Loader;
