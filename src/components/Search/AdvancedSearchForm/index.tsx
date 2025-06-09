// src/components/Search/AdvancedSearchForm/index.tsx

import React, { useState } from "react";
import styles from "./AdvancedSearchForm.module.scss";
import type { AdvancedSearchParams } from "../../../types/search";

interface Props {
  onSearch: (params: AdvancedSearchParams) => void;
}

const AdvancedSearchForm: React.FC<Props> = ({ onSearch }) => {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Transforme la string tags en array si renseigné, sinon undefined
    const tagsArray = tags.trim()
      ? tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      : undefined;

    const params: AdvancedSearchParams = {};
    if (author.trim()) params.author = author;
    if (title.trim()) params.title = title;
    if (subject.trim()) params.subject = subject;
    if (publishedDate.trim()) params.publishedDate = publishedDate;
    if (tagsArray && tagsArray.length > 0) params.tags = tagsArray;

    onSearch(params);
  };

  return (
    <form
      className={styles["advanced-search-form"]}
      onSubmit={handleSubmit}
      aria-label="Recherche avancée de livres"
    >
      <div className={styles["form-group"]}>
        <label htmlFor="author">Auteur</label>
        <input
          type="text"
          id="author"
          name="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="e.g. Stephen King"
          autoComplete="off"
        />
      </div>

      <div className={styles["form-group"]}>
        <label htmlFor="title">Titre</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Misery"
          autoComplete="off"
        />
      </div>

      <div className={styles["form-group"]}>
        <label htmlFor="year">Année</label>
        <input
          type="number"
          id="year"
          name="publishedDate"
          value={publishedDate}
          onChange={(e) => setPublishedDate(e.target.value)}
          placeholder="e.g. 1999"
          min="0"
          autoComplete="off"
          inputMode="numeric"
        />
      </div>

      <div className={styles["form-group"]}>
        <label htmlFor="subject">Sujet / Tag principal</label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="e.g. fantasy, horror..."
          autoComplete="off"
        />
      </div>

      <div className={styles["form-group"]}>
        <label htmlFor="tags">Tags secondaires (séparés par virgules)</label>
        <input
          type="text"
          id="tags"
          name="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="e.g. vampire, best-seller, classic"
          autoComplete="off"
        />
      </div>

      <button type="submit" className={styles["submit-button"]}>
        Rechercher
      </button>
    </form>
  );
};

export default AdvancedSearchForm;
