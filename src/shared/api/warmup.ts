import { env } from "@/shared/config/env";

const BACKEND_WARMUP_STORAGE_KEY = "backend-warmup:db-ping:v1";
const BACKEND_WARMUP_ERROR_COOLDOWN_MS = 5 * 60 * 1000;
const BACKEND_WARMUP_TIMEOUT_MS = 40000;

type WarmupSessionState = {
  status: "success" | "error";
  attemptedAt: number;
};

let backendWarmupPromise: Promise<void> | null = null;

function getDbPingUrl() {
  return `${env.apiBaseUrl.replace(/\/+$/, "")}/db-ping`;
}

function canUseSessionStorage() {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    return typeof window.sessionStorage !== "undefined";
  } catch {
    return false;
  }
}

function readWarmupSessionState(): WarmupSessionState | null {
  if (!canUseSessionStorage()) {
    return null;
  }

  try {
    const rawValue = window.sessionStorage.getItem(BACKEND_WARMUP_STORAGE_KEY);

    if (!rawValue) {
      return null;
    }

    return JSON.parse(rawValue) as WarmupSessionState;
  } catch {
    return null;
  }
}

function writeWarmupSessionState(state: WarmupSessionState) {
  if (!canUseSessionStorage()) {
    return;
  }

  try {
    window.sessionStorage.setItem(
      BACKEND_WARMUP_STORAGE_KEY,
      JSON.stringify(state),
    );
  } catch {
    // Ignored on purpose: warmup must never affect the UI.
  }
}

function shouldSkipBackendWarmup() {
  const state = readWarmupSessionState();

  if (!state) {
    return false;
  }

  if (state.status === "success") {
    return true;
  }

  return Date.now() - state.attemptedAt < BACKEND_WARMUP_ERROR_COOLDOWN_MS;
}

export function warmupBackend() {
  if (typeof window === "undefined" || shouldSkipBackendWarmup()) {
    return Promise.resolve();
  }

  if (backendWarmupPromise) {
    return backendWarmupPromise;
  }

  backendWarmupPromise = (async () => {
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => {
      controller.abort();
    }, BACKEND_WARMUP_TIMEOUT_MS);

    try {
      const response = await fetch(getDbPingUrl(), {
        method: "GET",
        signal: controller.signal,
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Backend warmup failed");
      }

      writeWarmupSessionState({
        status: "success",
        attemptedAt: Date.now(),
      });
    } catch {
      writeWarmupSessionState({
        status: "error",
        attemptedAt: Date.now(),
      });
    } finally {
      window.clearTimeout(timeoutId);
      backendWarmupPromise = null;
    }
  })();

  return backendWarmupPromise;
}
