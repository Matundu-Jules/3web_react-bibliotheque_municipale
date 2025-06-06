// src/components/Search/AdvancedSearchForm/index.tsx

import React, { useState } from "react";
import styles from "./AdvancedSearchForm.module.scss";

interface AdvancedSearchParams {
  author: string;
  year: string;
  subject: string;
}

interface Props {
  onSearch: (params: AdvancedSearchParams) => void;
}

const AdvancedSearchForm: React.FC<Props> = ({ onSearch }) => {
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [subject, setSubject] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ author, year, subject });
  };

  return (
    <form className={styles["advanced-search-form"]} onSubmit={handleSubmit}>
      <div className={styles["form-group"]}>
        <label htmlFor="author">Auteur</label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="e.g. Stephen King"
        />
      </div>

      <div className={styles["form-group"]}>
        <label htmlFor="year">Année</label>
        <input
          type="number"
          id="year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          placeholder="e.g. 1999"
        />
      </div>

      <div className={styles["form-group"]}>
        <label htmlFor="subject">Sujet / Tag</label>
        <input
          type="text"
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="e.g. fantasy, horror..."
        />
      </div>

      <button type="submit" className={styles["submit-button"]}>
        Rechercher
      </button>
    </form>
  );
};

export default AdvancedSearchForm;
