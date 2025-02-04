import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./home/app";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./layout/layout";
import "./index.css";
import { LinesBg } from "./components/decorations/lines";
import "./components/decorations/universe"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<App />} />
            <Route path="/bg" element={<LinesBg />} />
          </Route>
        </Routes>
      </BrowserRouter>
  </React.StrictMode>
);

