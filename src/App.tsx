// src/App.tsx

import AppRouter from "./router";
import { SearchProvider } from "./contexts/SearchContext";

const App = () => {
  return (
    <SearchProvider>
      <AppRouter />
    </SearchProvider>
  );
};

export default App;
