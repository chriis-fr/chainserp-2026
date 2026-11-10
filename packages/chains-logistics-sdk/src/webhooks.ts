import type { WebhookEvent } from './types.js';

/** The header FleetOps signs each delivery with: `t=<unix seconds>,v1=<hex HMAC-SHA256>`. */
export const SIGNATURE_HEADER = 'x-fleetbase-signature';

export interface VerifyOptions {
  /** Reject deliveries older (or newer) than this many seconds. Default 300, same as the server. */
  toleranceSeconds?: number;
  /** Override "now" in unix seconds (tests). */
  now?: number;
}

export class WebhookVerificationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'WebhookVerificationError';
  }
}

const encoder = new TextEncoder();

function cryptoSubtle(): SubtleCrypto {
  const c = (globalThis as { crypto?: Crypto }).crypto;
  if (!c?.subtle) throw new Error('Web Crypto is not available. Use Node 18+ or an edge/browser runtime.');
  return c.subtle;
}

function toHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, '0')).join('');
}

/** Constant-time comparison of two hex strings. */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function bodyToString(rawBody: string | Uint8Array | ArrayBuffer): string {
  if (typeof rawBody === 'string') return rawBody;
  return new TextDecoder().decode(rawBody instanceof ArrayBuffer ? new Uint8Array(rawBody) : rawBody);
}

/** Compute the `v1` signature for a timestamp and raw body. Exposed for tests and tooling. */
export async function computeSignature(rawBody: string | Uint8Array | ArrayBuffer, secret: string, timestamp: number): Promise<string> {
  const subtle = cryptoSubtle();
  const key = await subtle.importKey('raw', encoder.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = await subtle.sign('HMAC', key, encoder.encode(`${timestamp}.${bodyToString(rawBody)}`));
  return toHex(sig);
}

/** Build a full header value, e.g. to sign test deliveries. */
export async function signatureHeader(rawBody: string | Uint8Array | ArrayBuffer, secret: string, timestamp = Math.floor(Date.now() / 1000)): Promise<string> {
  return `t=${timestamp},v1=${await computeSignature(rawBody, secret, timestamp)}`;
}

/**
 * Check that a delivery really came from FleetOps.
 *
 * Pass the body exactly as received (before JSON parsing), the `X-Fleetbase-Signature` header and
 * your endpoint's signing secret. Returns true only for a valid, fresh signature.
 */
export async function verifyWebhook(
  rawBody: string | Uint8Array | ArrayBuffer,
  header: string | null | undefined,
  secret: string,
  opts: VerifyOptions = {},
): Promise<boolean> {
  if (!header || !secret) return false;

  let timestamp: number | null = null;
  const v1: string[] = [];
  for (const part of header.split(',')) {
    const [k, v] = part.trim().split('=', 2);
    if (!k || v === undefined) continue;
    if (k === 't' && /^\d+$/.test(v)) timestamp = Number(v);
    if (k === 'v1') v1.push(v.toLowerCase());
  }
  if (timestamp === null || v1.length === 0) return false;

  const now = opts.now ?? Math.floor(Date.now() / 1000);
  if (Math.abs(now - timestamp) > (opts.toleranceSeconds ?? 300)) return false;

  const expected = await computeSignature(rawBody, secret, timestamp);
  return v1.some((sig) => safeEqual(expected, sig));
}

/** Verify, then parse. Throws WebhookVerificationError when the signature does not check out. */
export async function parseWebhook<T = Record<string, unknown>>(
  rawBody: string | Uint8Array | ArrayBuffer,
  header: string | null | undefined,
  secret: string,
  opts: VerifyOptions = {},
): Promise<WebhookEvent<T>> {
  if (!(await verifyWebhook(rawBody, header, secret, opts))) {
    throw new WebhookVerificationError('Invalid or expired X-Fleetbase-Signature');
  }
  const event = JSON.parse(bodyToString(rawBody)) as WebhookEvent<T>;
  if (!event || typeof event.event !== 'string') throw new WebhookVerificationError('Body is not a FleetOps webhook event');
  return event;
}
