import { error, isHttpError } from '@sveltejs/kit';
import type { Cart } from '@/interfaces/store.interfaces';

type JsonObject = Record<string, unknown>;

export interface CartRemoteResult {
  cart?: Cart;
  message?: string;
}

export function failRemote(message: string, cause?: unknown): never {
  if (cause && !isHttpError(cause)) {
    console.error(message, cause);
  }

  error(502, message);
}

export function rethrowHttpOrFail(cause: unknown, message: string): never {
  if (isHttpError(cause)) {
    throw cause;
  }

  failRemote(message, cause);
}

export function createCartHeaders(cartToken?: string, extraHeaders?: HeadersInit) {
  const headers = new Headers(extraHeaders);

  if (cartToken) {
    headers.set('Cart-Token', cartToken);
  }

  return headers;
}

export function buildEndpoint(endpoint: string, params: Record<string, string | number | boolean | undefined>) {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) {
      searchParams.set(key, String(value));
    }
  }

  const query = searchParams.toString();

  return query ? `${endpoint}?${query}` : endpoint;
}

export function isRecord(value: unknown): value is JsonObject {
  return typeof value === 'object' && value !== null;
}

export async function parseCartResponse(response: Response): Promise<CartRemoteResult> {
  if (!response.ok) {
    throw new Error(`Cart request failed with status ${response.status}`);
  }

  const responseJson: unknown = await response.json();

  if (isRecord(responseJson) && 'items' in responseJson) {
    return {
      cart: responseJson as unknown as Cart,
    };
  }

  if (isRecord(responseJson) && typeof responseJson.message === 'string' && isRecord(responseJson.data)) {
    if ('cart' in responseJson.data) {
      return {
        message: responseJson.message,
        cart: responseJson.data.cart as Cart,
      };
    }

    return {
      message: responseJson.message,
    };
  }

  throw new Error('Invalid cart response from server');
}

export async function fetchJson<T>(fetchFn: typeof fetch, endpoint: string, init?: RequestInit): Promise<T | null> {
  const response = await fetchFn(endpoint, init);

  if (!response.ok) {
    return null;
  }

  return (await response.json()) as T;
}
