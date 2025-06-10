import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import AdvancedSearchForm from "../components/Search/AdvancedSearchForm";

describe("AdvancedSearchForm", () => {
  it("renders all inputs and calls onSearch with correct params", () => {
    const onSearch = vi.fn();

    render(<AdvancedSearchForm onSearch={onSearch} />);

    // Remplit les champs
    fireEvent.change(screen.getByLabelText(/Auteur/i), {
      target: { value: "King" },
    });
    fireEvent.change(screen.getByLabelText(/Titre/i), {
      target: { value: "Misery" },
    });
    fireEvent.change(screen.getByLabelText(/Année/i), {
      target: { value: "1987" },
    });
    fireEvent.change(screen.getByLabelText(/Sujet/i), {
      target: { value: "horror" },
    });
    fireEvent.change(screen.getByLabelText(/Tags secondaires/i), {
      target: { value: "vampire, best-seller" },
    });

    // Soumets le formulaire
    fireEvent.submit(screen.getByRole("form"));

    // Vérifie l'appel à onSearch avec les bons params
    expect(onSearch).toHaveBeenCalledTimes(1);
    expect(onSearch).toHaveBeenCalledWith({
      author: "King",
      title: "Misery",
      publishedDate: "1987",
      subject: "horror",
      tags: ["vampire", "best-seller"],
    });
  });
});
