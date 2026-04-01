import type {
  ApiErrorResponse,
  ApiResponse,
  ApiSuccessResponse,
} from "@/features/api/types";
import { env } from "@/shared/config/env";

type HttpMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE";

type ApiRequestOptions = {
  path: string;
  method?: HttpMethod;
  body?: BodyInit | Record<string, unknown>;
  headers?: HeadersInit;
  token?: string;
  signal?: AbortSignal;
  skipUnauthorizedHandler?: boolean;
};

let apiAuthToken: string | null = null;
let unauthorizedHandler: (() => void) | null = null;

export class ApiClientError extends Error {
  status: number;
  code: string;
  details?: unknown;

  constructor(status: number, code: string, message: string, details?: unknown) {
    super(message);
    this.name = "ApiClientError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export function setApiAuthToken(token: string | null) {
  apiAuthToken = token;
}

export function clearApiAuthToken() {
  apiAuthToken = null;
}

export function setUnauthorizedHandler(handler: (() => void) | null) {
  unauthorizedHandler = handler;
}

function getApiBaseUrl() {
  return env.apiBaseUrl.replace(/\/+$/, "");
}

function isBodyInit(value: unknown): value is BodyInit {
  return (
    value instanceof FormData ||
    value instanceof URLSearchParams ||
    value instanceof Blob ||
    typeof value === "string" ||
    value instanceof ArrayBuffer
  );
}

async function parseApiResponse<T, M>(
  response: Response,
): Promise<ApiResponse<T, M>> {
  const contentType = response.headers.get("content-type");

  if (contentType?.includes("application/json")) {
    return (await response.json()) as ApiResponse<T, M>;
  }

  if (response.ok) {
    return {
      success: true,
      data: undefined as T,
    };
  }

  return {
    success: false,
    error: {
      code: "UNEXPECTED_RESPONSE",
      message: "Unexpected non-JSON response",
    },
  };
}

export async function apiRequest<T, M = undefined>({
  path,
  method = "GET",
  body,
  headers,
  token,
  signal,
  skipUnauthorizedHandler = false,
}: ApiRequestOptions): Promise<ApiSuccessResponse<T, M>> {
  const requestHeaders = new Headers(headers);
  let requestBody: BodyInit | undefined;

  if (body !== undefined) {
    if (isBodyInit(body)) {
      requestBody = body;
    } else {
      requestHeaders.set("Content-Type", "application/json");
      requestBody = JSON.stringify(body);
    }
  }

  const bearerToken = token ?? apiAuthToken;

  if (bearerToken) {
    requestHeaders.set("Authorization", `Bearer ${bearerToken}`);
  }

  const response = await fetch(`${getApiBaseUrl()}${path}`, {
    method,
    headers: requestHeaders,
    body: requestBody,
    signal,
  });

  const parsed = await parseApiResponse<T, M>(response);

  if (
    response.status === 401 &&
    !skipUnauthorizedHandler &&
    unauthorizedHandler
  ) {
    unauthorizedHandler();
  }

  if (!response.ok || !parsed.success) {
    const error = parsed as ApiErrorResponse;
    throw new ApiClientError(
      response.status,
      error.error?.code ?? "REQUEST_FAILED",
      error.error?.message ?? "Request failed",
      error.error?.details,
    );
  }

  return parsed;
}
