/** Thrown for any non-2xx answer from the API. `errors` holds the API's own messages. */
export class ChainsApiError extends Error {
  readonly status: number;
  readonly errors: string[];
  readonly body: unknown;

  constructor(status: number, errors: string[], body: unknown) {
    super(errors[0] ?? `Chains API request failed with HTTP ${status}`);
    this.name = 'ChainsApiError';
    this.status = status;
    this.errors = errors;
    this.body = body;
  }
}

/** Pull the error messages out of an API error body (`{"errors":["..."]}` or `{"error":"..."}`). */
export function errorMessages(body: unknown): string[] {
  if (body && typeof body === 'object') {
    const b = body as Record<string, unknown>;
    if (Array.isArray(b.errors)) return b.errors.map(String);
    if (typeof b.error === 'string') return [b.error];
    if (typeof b.message === 'string') return [b.message];
  }
  if (typeof body === 'string' && body.trim()) return [body.trim().slice(0, 300)];
  return [];
}
