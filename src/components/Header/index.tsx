// ./src/components/Header.tsx

import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";

function Header() {
  const navigate = useNavigate();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const q = new FormData(form).get("q")?.toString().trim();
    if (q) {
      navigate(`/search?q=${encodeURIComponent(q)}`);
    }
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>Municipal Library</h1>
      <form onSubmit={onSubmit} className={styles.searchForm}>
        <input name="q" type="text" placeholder="Search books" />
        <button type="submit">Search</button>
      </form>
    </header>
  );
}

export default Header;
