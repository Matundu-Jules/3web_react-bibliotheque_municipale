import "@testing-library/jest-dom";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import HomePage from "../pages/HomePage";
import * as useRecentChangesHook from "../hooks/useRecentChanges";

// Mock les sous-composants pour ne pas avoir à tester leur rendering
vi.mock("../components/Book/RecentChangesCarousel", () => ({
  default: ({ changes }: any) => (
    <div data-testid="carousel">{changes?.length} books</div>
  ),
}));
vi.mock("../components/Book/RecentChangesList", () => ({
  default: ({ changes }: any) => (
    <div data-testid="list">{changes?.length} books</div>
  ),
}));
vi.mock("../components/common/Loader", () => ({
  default: () => <div data-testid="loader">Loading...</div>,
}));
vi.mock("../components/common/ErrorMessage", () => ({
  default: ({ message }: any) => <div data-testid="error">{message}</div>,
}));

describe("HomePage", () => {
  it("shows Loader if loading and no books", () => {
    vi.spyOn(useRecentChangesHook, "useRecentChanges").mockReturnValue({
      books: [],
      loading: true,
      error: null,
    });
    render(<HomePage />);
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  it("shows ErrorMessage if error", () => {
    vi.spyOn(useRecentChangesHook, "useRecentChanges").mockReturnValue({
      books: [],
      loading: false,
      error: "Erreur API",
    });
    render(<HomePage />);
    expect(screen.getByTestId("error")).toHaveTextContent("Erreur API");
  });

  it("shows RecentChangesCarousel if desktop", () => {
    // Simule un écran desktop
    window.innerWidth = 1200;
    vi.spyOn(useRecentChangesHook, "useRecentChanges").mockReturnValue({
      books: [
        { key: "1", title: "Foo", author_name: "Bar" },
        { key: "2", title: "Baz", author_name: "Qux" },
      ],
      loading: false,
      error: null,
    });
    render(<HomePage />);
    expect(screen.getByTestId("carousel")).toHaveTextContent("2 books");
  });

  it("shows RecentChangesList if mobile", () => {
    // Simule un écran mobile
    window.innerWidth = 600;
    vi.spyOn(useRecentChangesHook, "useRecentChanges").mockReturnValue({
      books: [
        { key: "1", title: "Foo", author_name: "Bar" },
        { key: "2", title: "Baz", author_name: "Qux" },
      ],
      loading: false,
      error: null,
    });
    render(<HomePage />);
    expect(screen.getByTestId("list")).toHaveTextContent("2 books");
  });
});
