import { ChainsApiError, errorMessages } from './errors.js';

export type Query = Record<string, string | number | boolean | undefined | null>;

export interface HttpOptions {
  /** API key (live or test) or Storefront key. Issued by Chains. Keep it server-side. */
  apiKey: string;
  /** Defaults to https://api.progressusmavericks.co.ke */
  baseUrl?: string;
  /** Per-request timeout in milliseconds. Defaults to 30000. */
  timeoutMs?: number;
  /** Supply your own fetch (tests, older runtimes, proxies). Defaults to the global fetch. */
  fetch?: typeof fetch;
  /** Extra headers sent with every request. */
  headers?: Record<string, string>;
}

export const DEFAULT_BASE_URL = 'https://api.progressusmavericks.co.ke';

/** Small fetch wrapper shared by the FleetOps and Storefront clients. */
export class Http {
  private readonly apiKey: string;
  private readonly root: string;
  private readonly timeoutMs: number;
  private readonly fetchImpl: typeof fetch;
  private readonly headers: Record<string, string>;

  constructor(opts: HttpOptions, prefix: string) {
    if (!opts.apiKey) throw new Error('An API key is required. Ask Chains for a test key to get started.');
    this.apiKey = opts.apiKey;
    this.root = `${(opts.baseUrl ?? DEFAULT_BASE_URL).replace(/\/+$/, '')}/${prefix.replace(/^\/+|\/+$/g, '')}`;
    this.timeoutMs = opts.timeoutMs ?? 30_000;
    const f = opts.fetch ?? (globalThis.fetch as typeof fetch | undefined);
    if (!f) throw new Error('No fetch available. Use Node 18+, or pass `fetch` in the options.');
    this.fetchImpl = f;
    this.headers = opts.headers ?? {};
  }

  async request<T>(method: string, path: string, opts: { query?: Query; body?: unknown } = {}): Promise<T> {
    const url = new URL(`${this.root}/${path.replace(/^\/+/, '')}`);
    for (const [k, v] of Object.entries(opts.query ?? {})) {
      if (v !== undefined && v !== null) url.searchParams.set(k, String(v));
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.timeoutMs);
    let res: Response;
    try {
      res = await this.fetchImpl(url.toString(), {
        method,
        headers: {
          accept: 'application/json',
          authorization: `Bearer ${this.apiKey}`,
          ...(opts.body !== undefined ? { 'content-type': 'application/json' } : {}),
          ...this.headers,
        },
        body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
        signal: controller.signal,
      });
    } catch (e) {
      const err = e as Error;
      if (err.name === 'AbortError') throw new ChainsApiError(0, [`Request timed out after ${this.timeoutMs} ms`], null);
      throw new ChainsApiError(0, [`Network error: ${err.message}`], null);
    } finally {
      clearTimeout(timer);
    }

    const text = await res.text();
    let body: unknown = text;
    if (text) {
      try {
        body = JSON.parse(text);
      } catch {
        /* keep text */
      }
    } else {
      body = null;
    }

    if (!res.ok) throw new ChainsApiError(res.status, errorMessages(body), body);
    return body as T;
  }
}
