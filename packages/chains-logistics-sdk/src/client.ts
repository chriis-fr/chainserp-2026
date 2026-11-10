import { Http, type HttpOptions, type Query } from './http.js';
import type {
  Contact,
  ContactInput,
  Driver,
  DriverInput,
  Fleet,
  FleetInput,
  Id,
  ListParams,
  Order,
  OrderInput,
  Place,
  PlaceInput,
  Resource,
  ServiceQuote,
  ServiceRate,
  Tracker,
  TrackingNumber,
  Vehicle,
  VehicleInput,
  WebhookEndpoint,
  WebhookEndpointInput,
  Zone,
} from './types.js';

const enc = encodeURIComponent;

/** list / get / create / update / delete for one REST collection under /v1. */
export class Collection<T extends Resource, TCreate = Partial<T>, TUpdate = Partial<TCreate>> {
  constructor(
    protected readonly http: Http,
    protected readonly path: string,
  ) {}

  list(params: ListParams = {}): Promise<T[]> {
    return this.http.request<T[]>('GET', this.path, { query: params as Query });
  }

  get(id: Id): Promise<T> {
    return this.http.request<T>('GET', `${this.path}/${enc(id)}`);
  }

  create(input: TCreate): Promise<T> {
    return this.http.request<T>('POST', this.path, { body: input });
  }

  update(id: Id, input: TUpdate): Promise<T> {
    return this.http.request<T>('PUT', `${this.path}/${enc(id)}`, { body: input });
  }

  delete(id: Id): Promise<T> {
    return this.http.request<T>('DELETE', `${this.path}/${enc(id)}`);
  }
}

export class Orders extends Collection<Order, OrderInput> {
  /** Send the order to drivers (or to the assigned driver). */
  dispatch(id: Id): Promise<Order> {
    return this.http.request<Order>('POST', `orders/${enc(id)}/dispatch`);
  }

  start(id: Id, opts: { skipDispatch?: boolean } = {}): Promise<Order> {
    return this.http.request<Order>('POST', `orders/${enc(id)}/start`, {
      body: opts.skipDispatch ? { skipDispatch: true } : undefined,
    });
  }

  complete(id: Id): Promise<Order> {
    return this.http.request<Order>('POST', `orders/${enc(id)}/complete`);
  }

  cancel(id: Id): Promise<Order> {
    return this.http.request<Order>('DELETE', `orders/${enc(id)}/cancel`);
  }

  /** Reschedule. `scheduledAt` is ISO 8601. */
  schedule(id: Id, scheduledAt: string, timezone?: string): Promise<Order> {
    return this.http.request<Order>('POST', `orders/${enc(id)}/schedule`, {
      body: { scheduled_at: scheduledAt, ...(timezone ? { timezone } : {}) },
    });
  }

  /** Live progress: driver position, progress and estimated completion. */
  tracker(id: Id): Promise<Tracker> {
    return this.http.request<Tracker>('GET', `orders/${enc(id)}/tracker`);
  }

  eta(id: Id): Promise<Record<string, unknown>> {
    return this.http.request('GET', `orders/${enc(id)}/eta`);
  }

  distanceAndTime(id: Id): Promise<Record<string, unknown>> {
    return this.http.request('GET', `orders/${enc(id)}/distance-and-time`);
  }

  /** Proof of delivery (photos, signatures, QR scans) captured by the driver. */
  proofs(id: Id, subjectId?: Id): Promise<Resource[]> {
    return this.http.request<Resource[]>('GET', `orders/${enc(id)}/proofs${subjectId ? `/${enc(subjectId)}` : ''}`);
  }

  comments(id: Id): Promise<Resource[]> {
    return this.http.request<Resource[]>('GET', `orders/${enc(id)}/comments`);
  }

  nextActivity(id: Id): Promise<Record<string, unknown>> {
    return this.http.request('GET', `orders/${enc(id)}/next-activity`);
  }

  /** Move the order to its next status, e.g. `{ activity: { code: 'picked_up' } }`. */
  updateActivity(id: Id, body: Record<string, unknown>): Promise<Order> {
    return this.http.request<Order>('POST', `orders/${enc(id)}/update-activity`, { body });
  }
}

export class Places extends Collection<Place, PlaceInput> {
  /** Look up places (and addresses) by text. */
  search(query: string, params: ListParams = {}): Promise<Place[]> {
    return this.http.request<Place[]>('GET', 'places/search', { query: { ...params, query } as Query });
  }
}

export class Drivers extends Collection<Driver, DriverInput> {
  /** Push a driver position from your own telematics. */
  track(id: Id, position: { latitude: number; longitude: number; heading?: number; speed?: number; altitude?: number }): Promise<Driver> {
    return this.http.request<Driver>('POST', `drivers/${enc(id)}/track`, { body: position });
  }

  toggleOnline(id: Id, online?: boolean): Promise<Driver> {
    return this.http.request<Driver>('POST', `drivers/${enc(id)}/toggle-online`, {
      body: online === undefined ? undefined : { online },
    });
  }
}

export class Vehicles extends Collection<Vehicle, VehicleInput> {
  track(id: Id, position: { latitude: number; longitude: number; heading?: number; speed?: number; altitude?: number }): Promise<Vehicle> {
    return this.http.request<Vehicle>('POST', `vehicles/${enc(id)}/track`, { body: position });
  }
}

export class Fleets extends Collection<Fleet, FleetInput> {
  addDriver(fleetId: Id, driverId: Id): Promise<Fleet> {
    return this.http.request<Fleet>('POST', `fleets/${enc(fleetId)}/drivers/${enc(driverId)}`);
  }

  removeDriver(fleetId: Id, driverId: Id): Promise<Fleet> {
    return this.http.request<Fleet>('DELETE', `fleets/${enc(fleetId)}/drivers/${enc(driverId)}`);
  }

  addVehicle(fleetId: Id, vehicleId: Id): Promise<Fleet> {
    return this.http.request<Fleet>('POST', `fleets/${enc(fleetId)}/vehicles/${enc(vehicleId)}`);
  }

  removeVehicle(fleetId: Id, vehicleId: Id): Promise<Fleet> {
    return this.http.request<Fleet>('DELETE', `fleets/${enc(fleetId)}/vehicles/${enc(vehicleId)}`);
  }
}

/** Service quotes are read-only: ask for prices for a pickup/dropoff before creating the order. */
export class ServiceQuotes {
  constructor(private readonly http: Http) {}

  list(params: ListParams = {}): Promise<ServiceQuote[]> {
    return this.http.request<ServiceQuote[]>('GET', 'service-quotes', { query: params as Query });
  }

  get(id: Id): Promise<ServiceQuote> {
    return this.http.request<ServiceQuote>('GET', `service-quotes/${enc(id)}`);
  }
}

export class TrackingNumbers {
  constructor(private readonly http: Http) {}

  list(params: ListParams = {}): Promise<TrackingNumber[]> {
    return this.http.request<TrackingNumber[]>('GET', 'tracking-numbers', { query: params as Query });
  }

  get(id: Id): Promise<TrackingNumber> {
    return this.http.request<TrackingNumber>('GET', `tracking-numbers/${enc(id)}`);
  }

  create(input: Record<string, unknown>): Promise<TrackingNumber> {
    return this.http.request<TrackingNumber>('POST', 'tracking-numbers', { body: input });
  }

  /** Resolve a scanned QR code to its tracking number. */
  fromQr(code: string): Promise<TrackingNumber> {
    return this.http.request<TrackingNumber>('POST', 'tracking-numbers/from-qr', { body: { code } });
  }

  delete(id: Id): Promise<TrackingNumber> {
    return this.http.request<TrackingNumber>('DELETE', `tracking-numbers/${enc(id)}`);
  }
}

export class WebhookEndpoints extends Collection<WebhookEndpoint, WebhookEndpointInput> {
  /** Issue a new signing secret for this endpoint. Update your receiver right after. */
  rotateSecret(id: Id): Promise<WebhookEndpoint & { secret?: string }> {
    return this.http.request('POST', `webhook-endpoints/${enc(id)}/rotate-secret`);
  }
}

export type ChainsLogisticsOptions = HttpOptions;

/**
 * Client for the Chains FleetOps API (https://api.progressusmavericks.co.ke/v1).
 *
 * ```ts
 * const fleet = new ChainsLogistics({ apiKey: process.env.CHAINS_LOGISTICS_KEY! });
 * const order = await fleet.orders.create({ pickup: 'place_...', dropoff: { street1: '...', city: 'Nairobi', country: 'KE' } });
 * ```
 */
export class ChainsLogistics {
  readonly orders: Orders;
  readonly places: Places;
  readonly contacts: Collection<Contact, ContactInput>;
  readonly drivers: Drivers;
  readonly vehicles: Vehicles;
  readonly fleets: Fleets;
  readonly zones: Collection<Zone>;
  readonly serviceRates: Collection<ServiceRate>;
  readonly serviceQuotes: ServiceQuotes;
  readonly trackingNumbers: TrackingNumbers;
  readonly webhookEndpoints: WebhookEndpoints;

  private readonly http: Http;

  constructor(opts: ChainsLogisticsOptions) {
    this.http = new Http(opts, 'v1');
    this.orders = new Orders(this.http, 'orders');
    this.places = new Places(this.http, 'places');
    this.contacts = new Collection<Contact, ContactInput>(this.http, 'contacts');
    this.drivers = new Drivers(this.http, 'drivers');
    this.vehicles = new Vehicles(this.http, 'vehicles');
    this.fleets = new Fleets(this.http, 'fleets');
    this.zones = new Collection<Zone>(this.http, 'zones');
    this.serviceRates = new Collection<ServiceRate>(this.http, 'service-rates');
    this.serviceQuotes = new ServiceQuotes(this.http);
    this.trackingNumbers = new TrackingNumbers(this.http);
    this.webhookEndpoints = new WebhookEndpoints(this.http, 'webhook-endpoints');
  }

  /** The organisation your key belongs to. A cheap way to check a key works. */
  currentOrganization(): Promise<Record<string, unknown>> {
    return this.http.request('GET', 'organizations/current');
  }

  /** Call any /v1 endpoint the SDK does not wrap yet. */
  request<T = unknown>(method: string, path: string, opts?: { query?: Query; body?: unknown }): Promise<T> {
    return this.http.request<T>(method, path, opts);
  }
}
