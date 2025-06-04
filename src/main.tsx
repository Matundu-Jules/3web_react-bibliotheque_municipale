// src/main.tsx

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "@styles/index.scss"; // importe tous les styles globaux

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
