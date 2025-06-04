// src/router.tsx

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdvancedSearchPage from "./pages/AdvancedSearchPage";
import BookPage from "./pages/BookPage";
import NotFoundPage from "./pages/NotFoundPage";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/search", element: <AdvancedSearchPage /> },
  { path: "/book/:id", element: <BookPage /> },
  { path: "*", element: <NotFoundPage /> },
]);

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;
