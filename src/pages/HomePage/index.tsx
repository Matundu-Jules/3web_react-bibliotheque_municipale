// src/pages/HomePage/index.tsx

import React, { useEffect, useState } from "react";
import { useRecentChanges } from "@hooks/useBooks";
import RecentChangesCarousel from "@components/Book/RecentChangesCarousel";
import RecentChangesList from "@components/Book/RecentChangesList";
import Loader from "@components/common/Loader";
import ErrorMessage from "@components/common/ErrorMessage";
import styles from "./HomePage.module.scss";

const MOBILE_BREAKPOINT = 1024; // px

const HomePage: React.FC = () => {
  const { books, loading, error } = useRecentChanges();

  // Détection du mode mobile
  const [isMobile, setIsMobile] = useState(
    window.innerWidth < MOBILE_BREAKPOINT,
  );
  useEffect(() => {
    const handleResize = () =>
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading && books.length === 0) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className={styles["home"]}>
      <h1 className={styles["title"]}>Derniers changements</h1>
      {isMobile ? (
        <RecentChangesList changes={books} />
      ) : (
        <RecentChangesCarousel changes={books.slice(0, 6)} />
      )}
    </div>
  );
};

export default HomePage;
