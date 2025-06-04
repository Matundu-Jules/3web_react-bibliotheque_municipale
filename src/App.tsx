// ./App.tsx

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>{/* <Route path="/" element={<HomePage />} /> */}</Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
