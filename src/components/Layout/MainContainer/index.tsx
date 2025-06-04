// ./src/components/Layout/MainContainer/MainContainer.tsx

import React from "react";
import styles from "./MainContainer.module.scss";

interface Props {
  children: React.ReactNode;
}

const MainContainer: React.FC<Props> = ({ children }) => {
  return <main className={styles["main"]}>{children}</main>;
};

export default MainContainer;
