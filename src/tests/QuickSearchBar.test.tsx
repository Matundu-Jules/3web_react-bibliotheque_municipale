import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import QuickSearchBar from "@components/Search/QuickSearchBar";
import { SearchContext } from "@contexts/SearchContext";
import type { SearchContextProps } from "@contexts/SearchContext";
import { MemoryRouter } from "react-router-dom";

// Mock du contexte (résultats, loading, error…)
const ctxMock: SearchContextProps = {
  query: "",
  results: [
    { key: "/works/123", title: "1984", author_name: ["Orwell"] },
    { key: "/works/456", title: "React Book", author_name: ["Dan"] },
  ],
  loading: false,
  error: null,
  searchBooks: vi.fn(),
  clearResults: vi.fn(),
};

function renderWithContext(contextValue = ctxMock) {
  return render(
    <MemoryRouter>
      <SearchContext.Provider value={contextValue as any}>
        <QuickSearchBar />
      </SearchContext.Provider>
    </MemoryRouter>,
  );
}

describe("QuickSearchBar", () => {
  it("renders input and placeholder", () => {
    renderWithContext();
    expect(
      screen.getByPlaceholderText(/Rechercher un livre/i),
    ).toBeInTheDocument();
  });

  it("shows dropdown with results when input is focused and query >= 3 chars", () => {
    vi.useFakeTimers(); // Active les fake timers
    renderWithContext();

    const input = screen.getByPlaceholderText(/Rechercher un livre/i);
    fireEvent.change(input, { target: { value: "rea" } });
    fireEvent.focus(input);

    // Avance le temps du debounce (350ms dans le composant)
    act(() => {
      vi.advanceTimersByTime(400);
    });

    // Attend l'apparition de la liste
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    expect(screen.getByText("React Book")).toBeInTheDocument();

    vi.useRealTimers(); // Remet les timers normaux
  });

  it("shows loading when loading is true", () => {
    renderWithContext({ ...ctxMock, loading: true });
    expect(screen.getByText(/Recherche…/)).toBeInTheDocument();
  });

  it("shows error message if error", () => {
    renderWithContext({ ...ctxMock, error: "Oups" });
    expect(screen.getByText("Oups")).toBeInTheDocument();
  });
});
