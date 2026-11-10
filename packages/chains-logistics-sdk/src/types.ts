/**
 * Resource shapes returned by the FleetOps API. Only the common fields are typed; every resource
 * also carries the rest of what the API returns (index signature), so nothing is hidden from you.
 */

export type Id = string; // public ids look like `order_xxxxx`, `place_xxxxx`, `driver_xxxxx`

export interface Resource {
  id: Id;
  /** Your own reference, echoed back on every read and webhook. */
  internal_id?: string | null;
  meta?: Record<string, unknown> | null;
  created_at?: string;
  updated_at?: string;
  [key: string]: unknown;
}

export interface ListParams {
  limit?: number;
  page?: number;
  /** e.g. `created_at` or `-created_at` */
  sort?: string;
  /** free-text search */
  query?: string;
  [filter: string]: string | number | boolean | undefined | null;
}

export interface Location {
  type: 'Point';
  /** [longitude, latitude] */
  coordinates: [number, number];
}

export interface Place extends Resource {
  name?: string | null;
  street1?: string | null;
  street2?: string | null;
  city?: string | null;
  province?: string | null;
  postal_code?: string | null;
  country?: string | null;
  phone?: string | null;
  location?: Location | null;
  address?: string | null;
}

export interface PlaceInput {
  name?: string;
  street1?: string;
  street2?: string;
  city?: string;
  province?: string;
  postal_code?: string;
  /** ISO 3166-1 alpha-2, e.g. `KE` */
  country?: string;
  phone?: string;
  latitude?: number;
  longitude?: number;
  internal_id?: string;
  meta?: Record<string, unknown>;
  [key: string]: unknown;
}

export interface Contact extends Resource {
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  type?: string | null;
}

export interface ContactInput {
  name: string;
  email?: string;
  /** E.164, e.g. `+254712345678` */
  phone?: string;
  type?: 'contact' | 'customer' | string;
  internal_id?: string;
  meta?: Record<string, unknown>;
  [key: string]: unknown;
}

export interface Driver extends Resource {
  name?: string | null;
  phone?: string | null;
  email?: string | null;
  status?: string | null;
  online?: boolean;
  location?: Location | null;
  vehicle?: Vehicle | null;
}

export interface DriverInput {
  name: string;
  phone: string;
  email?: string;
  vehicle?: Id;
  status?: string;
  internal_id?: string;
  meta?: Record<string, unknown>;
  [key: string]: unknown;
}

export interface Vehicle extends Resource {
  plate_number?: string | null;
  make?: string | null;
  model?: string | null;
  year?: string | number | null;
  status?: string | null;
  location?: Location | null;
}

export interface VehicleInput {
  plate_number: string;
  make?: string;
  model?: string;
  year?: string | number;
  internal_id?: string;
  meta?: Record<string, unknown>;
  [key: string]: unknown;
}

export interface Fleet extends Resource {
  name?: string | null;
  status?: string | null;
}

export interface FleetInput {
  name: string;
  internal_id?: string;
  [key: string]: unknown;
}

export interface Zone extends Resource {
  name?: string | null;
  border?: unknown;
}

export interface ServiceRate extends Resource {
  service_name?: string | null;
  service_type?: string | null;
  currency?: string | null;
}

export interface ServiceQuote extends Resource {
  amount?: number | string | null;
  currency?: string | null;
  service_rate?: ServiceRate | Id | null;
}

export interface TrackingNumber extends Resource {
  tracking_number?: string | null;
  qr_code?: string | null;
  status?: string | null;
}

export interface WebhookEndpoint extends Resource {
  url: string;
  events?: string[] | null;
  status?: 'enabled' | 'disabled' | string;
  mode?: 'live' | 'test' | string;
  description?: string | null;
}

export interface WebhookEndpointInput {
  url: string;
  /** Leave empty to receive every event. */
  events?: string[];
  description?: string;
  [key: string]: unknown;
}

/** An item being delivered (a package, a parcel, a box of goods). */
export interface EntityInput {
  name: string;
  type?: string;
  description?: string;
  /** Your SKU or line id */
  internal_id?: string;
  sku?: string;
  price?: number;
  currency?: string;
  weight?: number;
  weight_unit?: 'kg' | 'g' | 'lb' | 'oz' | string;
  length?: number;
  width?: number;
  height?: number;
  dimensions_unit?: 'cm' | 'm' | 'in' | 'ft' | string;
  meta?: Record<string, unknown>;
  [key: string]: unknown;
}

export interface Order extends Resource {
  status?: string | null;
  type?: string | null;
  tracking_number?: TrackingNumber | null;
  driver_assigned?: Driver | null;
  vehicle_assigned?: Vehicle | null;
  customer?: Contact | null;
  payload?: {
    pickup?: Place | null;
    dropoff?: Place | null;
    waypoints?: Place[];
    entities?: Resource[];
    [key: string]: unknown;
  } | null;
  scheduled_at?: string | null;
  dispatched?: boolean;
  started?: boolean;
  notes?: string | null;
}

export interface OrderInput {
  /** A place id (`place_...`) or a place object to create on the fly. */
  pickup: Id | PlaceInput;
  dropoff: Id | PlaceInput;
  /** Extra stops between pickup and dropoff. */
  waypoints?: Array<Id | PlaceInput>;
  entities?: EntityInput[];
  /** A contact id or contact object. */
  customer?: Id | ContactInput;
  /** Order type configured for your organisation, e.g. `transport`. */
  type?: string;
  /** ISO 8601. Leave empty for "as soon as possible". */
  scheduled_at?: string;
  /** Dispatch straight away instead of waiting for dispatch(). */
  dispatch?: boolean;
  /** Assign a driver up front. */
  driver?: Id;
  vehicle?: Id;
  /** Use a quote from serviceQuotes to price the job. */
  service_quote?: Id;
  notes?: string;
  /** Your order number; comes back on reads and every webhook. */
  internal_id?: string;
  meta?: Record<string, unknown>;
  [key: string]: unknown;
}

export interface Tracker extends Record<string, unknown> {
  current_location?: Location | null;
  progress_percentage?: number;
  estimated_completion_time?: string | null;
}

/** The body FleetOps POSTs to your webhook endpoint. */
export interface WebhookEvent<T = Record<string, unknown>> {
  id: string;
  api_version: string;
  /** `<model>.<name>`, e.g. `order.dispatched`, `order.completed`. */
  event: string;
  created_at: string;
  data: T;
}

export const ORDER_EVENTS = [
  'order.created',
  'order.updated',
  'order.deleted',
  'order.ready',
  'order.dispatched',
  'order.dispatch_failed',
  'order.driver_assigned',
  'order.started',
  'order.completed',
  'order.canceled',
  'order.failed',
] as const;

export type OrderEvent = (typeof ORDER_EVENTS)[number];
