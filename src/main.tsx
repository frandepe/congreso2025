import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import ThemeToggle from "./lib/ThemeToggle";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <ThemeToggle />
  </StrictMode>
);
