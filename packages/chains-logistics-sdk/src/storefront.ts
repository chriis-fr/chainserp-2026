import { Http, type HttpOptions, type Query } from './http.js';
import type { Id, ListParams } from './types.js';

type Json = Record<string, unknown>;
const enc = encodeURIComponent;

export type StorefrontOptions = HttpOptions;

/**
 * Client for the Chains Storefront API (https://api.progressusmavericks.co.ke/storefront/v1).
 *
 * Use a Store key issued by Chains, and only on your server: the key can place orders.
 */
export class Storefront {
  private readonly http: Http;

  constructor(opts: StorefrontOptions) {
    this.http = new Http(opts, 'storefront/v1');
  }

  /** Store or network details. Also a cheap way to check the key works. */
  about(): Promise<Json> {
    return this.http.request('GET', 'about');
  }

  readonly products = {
    list: (params: ListParams = {}) => this.http.request<Json[]>('GET', 'products', { query: params as Query }),
    get: (id: Id) => this.http.request<Json>('GET', `products/${enc(id)}`),
  };

  readonly categories = {
    list: (params: ListParams = {}) => this.http.request<Json[]>('GET', 'categories', { query: params as Query }),
  };

  search(query: string, params: ListParams = {}): Promise<Json[]> {
    return this.http.request('GET', 'search', { query: { ...params, query } as Query });
  }

  readonly stores = {
    list: (params: ListParams = {}) => this.http.request<Json[]>('GET', 'stores', { query: params as Query }),
    locations: (params: ListParams = {}) => this.http.request<Json[]>('GET', 'store-locations', { query: params as Query }),
  };

  readonly carts = {
    /** Fetch (or create) a cart by your own unique id, e.g. a session id. */
    get: (uniqueId: string) => this.http.request<Json>('GET', `carts/${enc(uniqueId)}`),
    add: (cartId: Id, productId: Id, body: { quantity?: number; variants?: unknown[]; addons?: unknown[]; scheduled_at?: string; store_location?: Id } & Json = {}) =>
      this.http.request<Json>('POST', `carts/${enc(cartId)}/${enc(productId)}`, { body }),
    update: (cartId: Id, lineItemId: Id, body: { quantity?: number } & Json) =>
      this.http.request<Json>('PUT', `carts/${enc(cartId)}/${enc(lineItemId)}`, { body }),
    remove: (cartId: Id, lineItemId: Id) => this.http.request<Json>('DELETE', `carts/${enc(cartId)}/${enc(lineItemId)}`),
    empty: (cartId: Id) => this.http.request<Json>('PUT', `carts/${enc(cartId)}/empty`),
    applyPromoCode: (cartId: Id, code: string) => this.http.request<Json>('POST', `carts/${enc(cartId)}/promo-code`, { body: { code } }),
    removePromoCode: (cartId: Id, code: string) => this.http.request<Json>('DELETE', `carts/${enc(cartId)}/promo-code/${enc(code)}`),
  };

  /** Delivery prices for a cart to a customer's place. */
  quoteFromCart(params: { cart: Id; origin?: Id; destination: Id } & Query): Promise<Json> {
    return this.http.request('GET', 'service-quotes/from-cart', { query: params });
  }

  readonly checkouts = {
    /** Starts a checkout and returns the token you capture with. */
    before: (params: { customer: Id; cart: Id; gateway: Id; serviceQuote?: Id; pickup?: boolean; tip?: number; deliveryTip?: number } & Query) =>
      this.http.request<Json>('GET', 'checkouts/before', { query: params }),
    capture: (body: { token: string; transactionDetails?: Json } & Json) => this.http.request<Json>('POST', 'checkouts/capture', { body }),
    status: (params: { token: string } & Query) => this.http.request<Json>('GET', 'checkouts/status', { query: params }),
  };

  readonly customers = {
    create: (body: { name: string; phone?: string; email?: string; password?: string; code?: string } & Json) =>
      this.http.request<Json>('POST', 'customers', { body }),
    login: (body: { identity: string; password: string } & Json) => this.http.request<Json>('POST', 'customers/login', { body }),
    loginWithSms: (phone: string) => this.http.request<Json>('POST', 'customers/login-with-sms', { body: { phone } }),
    verifyCode: (body: { identity: string; code: string } & Json) => this.http.request<Json>('POST', 'customers/verify-code', { body }),
    get: (id: Id) => this.http.request<Json>('GET', `customers/${enc(id)}`),
    update: (id: Id, body: Json) => this.http.request<Json>('PUT', `customers/${enc(id)}`, { body }),
    orders: (params: ListParams = {}) => this.http.request<Json[]>('GET', 'customers/orders', { query: params as Query }),
    places: (params: ListParams = {}) => this.http.request<Json[]>('GET', 'customers/places', { query: params as Query }),
  };

  readonly reviews = {
    list: (params: ListParams = {}) => this.http.request<Json[]>('GET', 'reviews', { query: params as Query }),
    create: (body: Json) => this.http.request<Json>('POST', 'reviews', { body }),
  };

  readonly promotions = {
    list: (params: ListParams = {}) => this.http.request<Json[]>('GET', 'promotions', { query: params as Query }),
  };

  readonly gateways = {
    list: () => this.http.request<Json[]>('GET', 'gateways'),
  };

  /** Call any /storefront/v1 endpoint the SDK does not wrap yet. */
  request<T = unknown>(method: string, path: string, opts?: { query?: Query; body?: unknown }): Promise<T> {
    return this.http.request<T>(method, path, opts);
  }
}
