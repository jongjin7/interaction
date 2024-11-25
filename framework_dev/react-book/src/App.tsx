/** @jsxImportSource @emotion/react */
import React from "react";
import { Global, ThemeProvider } from "@emotion/react";
import { theme, globalStyles } from "@/styles/theme";
import Header from "@/components/layout/header/Header";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Home from "@/pages/Home";
import Books from "@/pages/book/Books";
import Favorites from "@/pages/favorite/Favorites";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Global styles={globalStyles} />
        <Header />

        <Routes>
          <Route path="/" element={<Navigate to="/book" replace />} />
          <Route path="/book" element={<Books />} />
          <Route path="/favorite" element={<Favorites />} />
          <Route path="/parts" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
