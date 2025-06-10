import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import BookCard from "../components/Book/BookCard";
import { MemoryRouter } from "react-router-dom";
import type { OpenLibraryBook } from "../types/book";

const fakeBook: OpenLibraryBook = {
  key: "/works/OL1234W",
  title: "Test Driven Development",
  author_name: ["Kent Beck"],
  first_publish_year: "2003", // <-- string, pas number !
  cover_i: 123456, // number ou string selon ton type
};

describe("BookCard", () => {
  it("renders book title, author, and year", () => {
    render(
      <MemoryRouter>
        <BookCard book={fakeBook} />
      </MemoryRouter>,
    );
    expect(screen.getByText("Test Driven Development")).toBeInTheDocument();
    expect(screen.getByText("Kent Beck")).toBeInTheDocument();
    expect(screen.getByText(/Published: 2003/)).toBeInTheDocument();
  });

  it("renders fallback cover if no cover_i", () => {
    const { cover_i, ...bookNoCover } = fakeBook;
    render(
      <MemoryRouter>
        <BookCard book={bookNoCover} />
      </MemoryRouter>,
    );
    const img = screen.getByAltText(/Couverture du livre/);
    expect(img).toHaveAttribute(
      "src",
      expect.stringContaining("dummyimage.com"),
    );
  });
});
