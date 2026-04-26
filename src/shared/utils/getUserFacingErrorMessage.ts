import { ApiClientError } from "@/shared/api/client";

const NETWORK_ERROR_PATTERNS = [
  "Failed to fetch",
  "Load failed",
  "NetworkError",
  "fetch failed",
];

function isNetworkErrorMessage(message: string) {
  return NETWORK_ERROR_PATTERNS.some((pattern) => message.includes(pattern));
}

export function getUserFacingErrorMessage(
  error: unknown,
  fallbackMessage: string,
) {
  if (error instanceof ApiClientError) {
    if (error.status >= 500) {
      return "Hubo un problema en el servidor. Intenta nuevamente en un minuto.";
    }

    if (typeof error.message === "string" && error.message.trim()) {
      return error.message.trim();
    }
  }

  if (error instanceof Error) {
    if (error.message && !isNetworkErrorMessage(error.message)) {
      return error.message;
    }

    return "No pudimos conectarnos con el servidor. Verifica tu conexion e intenta nuevamente.";
  }

  return fallbackMessage;
}
