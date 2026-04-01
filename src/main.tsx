import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import ThemeToggle from "./lib/ThemeToggle";
import ReactGA from "react-ga4";
import { env } from "@/shared/config/env";

if (env.gaMeasurementId) {
  ReactGA.initialize(env.gaMeasurementId, {
    testMode: import.meta.env.DEV,
  });
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <ThemeToggle />
  </StrictMode>,
);
