// src/router.tsx

import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import HomePage from "@pages/HomePage";
import AdvancedSearchPage from "@pages/AdvancedSearchPage";
import BookPage from "@pages/BookPage";
import NotFoundPage from "@pages/NotFoundPage";
import Header from "@components/Layout/Header";
import Footer from "@components/Layout/Footer";
import MainContainer from "@components/Layout/MainContainer";

// Layout principal
const Layout = () => (
  <>
    <Header />
    <MainContainer>
      <Outlet />
    </MainContainer>
    <Footer />
  </>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "search", element: <AdvancedSearchPage /> },
      { path: "book/:id", element: <BookPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

const AppRouter = () => <RouterProvider router={router} />;

export default AppRouter;
