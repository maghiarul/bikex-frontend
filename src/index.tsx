import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./Home";
import "./styles/index.scss";
import Conectare from "./pages/Conectare";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Inscriere from "./pages/Inscriere";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/conectare" element={<Conectare />} />
      <Route path="/inscriere" element={<Inscriere />} />
    </Routes>
  </BrowserRouter>
);
