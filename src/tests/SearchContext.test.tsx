import "@testing-library/jest-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { useContext } from "react";
import { render, screen, waitFor, act } from "@testing-library/react";
import { SearchProvider, SearchContext } from "../contexts/SearchContext";

// Mock du hook useBooks (évite les vrais appels API)
vi.mock("../hooks/useBooks", () => ({
  useBooks: () => ({
    searchBooks: vi.fn().mockResolvedValue([{ key: "1", title: "Mock Book" }]),
  }),
}));

function Consumer() {
  const ctx = useContext(SearchContext);
  return (
    <div>
      <span data-testid="query">{ctx.query}</span>
      <span data-testid="loading">{ctx.loading ? "1" : "0"}</span>
      <span data-testid="results">
        {(ctx.results || []).map((b) => b.title).join(", ")}
      </span>
      <span data-testid="error">{ctx.error || ""}</span>
      <button onClick={() => ctx.searchBooks("mock")}>Search</button>
      <button onClick={ctx.clearResults}>Clear</button>
    </div>
  );
}

describe("SearchContext", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("provider exposes initial values", () => {
    render(
      <SearchProvider>
        <Consumer />
      </SearchProvider>,
    );
    expect(screen.getByTestId("query").textContent).toBe("");
    expect(screen.getByTestId("loading").textContent).toBe("0");
    expect(screen.getByTestId("results").textContent).toBe("");
    expect(screen.getByTestId("error").textContent).toBe("");
  });

  it("searchBooks sets loading, fills results, resets error", async () => {
    render(
      <SearchProvider>
        <Consumer />
      </SearchProvider>,
    );
    act(() => {
      screen.getByText("Search").click();
    });

    await waitFor(() => {
      expect(screen.getByTestId("loading").textContent).toBe("0"); // Après le fetch, loading = false
      expect(screen.getByTestId("results").textContent).toContain("Mock Book");
      expect(screen.getByTestId("query").textContent).toBe("mock");
      expect(screen.getByTestId("error").textContent).toBe("");
    });
  });

  it("clearResults reset tout", () => {
    render(
      <SearchProvider>
        <Consumer />
      </SearchProvider>,
    );
    // On set un état, puis on clear
    act(() => {
      screen.getByText("Clear").click();
    });
    expect(screen.getByTestId("query").textContent).toBe("");
    expect(screen.getByTestId("loading").textContent).toBe("0");
    expect(screen.getByTestId("results").textContent).toBe("");
    expect(screen.getByTestId("error").textContent).toBe("");
  });
});
