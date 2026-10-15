import type { ApiErrorShape } from "@/types/common";

const configuredApiOrigin = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();
const API_BASE_URL = configuredApiOrigin || (process.env.NODE_ENV === "development" ? "http://localhost:3000" : "");
const STORE_SLUG = process.env.NEXT_PUBLIC_STORE_SLUG?.trim() || (process.env.NODE_ENV === "development" ? "fashion-saas" : "");

export class ApiError extends Error implements ApiErrorShape {
  status: number;
  code?: string;
  fieldErrors?: Record<string, string[]>;

  constructor({ message, status, code, fieldErrors }: ApiErrorShape) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.fieldErrors = fieldErrors;
  }
}

interface RequestOptions {
  params?: Record<string, string | number | boolean | undefined>;
  body?: unknown;
  headers?: Record<string, string>;
  tags?: string[];
  revalidate?: number;
}

function buildUrl(path: string, params?: RequestOptions["params"]) {
  if (!API_BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_BASE_URL is required in production.");
  }
  if (!STORE_SLUG) {
    throw new Error("NEXT_PUBLIC_STORE_SLUG is required in production.");
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const url = new URL(`/storefront/${encodeURIComponent(STORE_SLUG)}${normalizedPath}`, API_BASE_URL);
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined) url.searchParams.set(key, String(value));
    }
  }
  return url;
}

async function request<T>(method: string, path: string, options: RequestOptions = {}): Promise<T> {
  const url = buildUrl(path, options.params);
  const isRead = method === "GET";
  const response = await fetch(url, {
    method,
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers,
    },
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
    ...(isRead && typeof window === "undefined"
      ? { next: { revalidate: options.revalidate ?? 60, tags: options.tags } }
      : { cache: "no-store" as const }),
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as Partial<ApiErrorShape> | null;
    throw new ApiError({
      message: body?.message ?? (response.statusText || "Request failed"),
      status: response.status,
      code: body?.code,
      fieldErrors: body?.fieldErrors,
    });
  }

  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

export const apiClient = {
  get: <T>(path: string, options?: RequestOptions) => request<T>("GET", path, options),
  post: <T>(path: string, options?: RequestOptions) => request<T>("POST", path, options),
  patch: <T>(path: string, options?: RequestOptions) => request<T>("PATCH", path, options),
  delete: <T>(path: string, options?: RequestOptions) => request<T>("DELETE", path, options),
};
