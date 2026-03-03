import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import ThemeToggle from "./lib/ThemeToggle";
import ReactGA from "react-ga4";

ReactGA.initialize("G-9HB6FQBZSF", {
  testMode: false,
});
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <ThemeToggle />
  </StrictMode>,
);
