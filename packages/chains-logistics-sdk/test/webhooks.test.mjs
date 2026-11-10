import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import { verifyWebhook, parseWebhook, signatureHeader, ChainsLogistics, ChainsApiError } from '../dist/index.js';

const secret = 'whsec_test_123';
const body = JSON.stringify({
  id: 'evt_1',
  api_version: 'v1',
  event: 'order.completed',
  created_at: '2026-11-10T10:00:00Z',
  data: { id: 'order_abc', internal_id: 'SO-1001', status: 'completed' },
});
const now = 1_794_300_000;

// Same formula as the server (core-api EndpointSignature): HMAC-SHA256(secret, `${t}.${body}`)
const serverHeader = (t) => `t=${t},v1=${createHmac('sha256', secret).update(`${t}.${body}`).digest('hex')}`;

test('accepts a header signed the way the server signs', async () => {
  assert.equal(await verifyWebhook(body, serverHeader(now), secret, { now }), true);
});

test('signatureHeader matches the server formula', async () => {
  assert.equal(await signatureHeader(body, secret, now), serverHeader(now));
});

test('rejects a tampered body, a wrong secret, a stale timestamp and a missing header', async () => {
  assert.equal(await verifyWebhook(body + ' ', serverHeader(now), secret, { now }), false);
  assert.equal(await verifyWebhook(body, serverHeader(now), 'wrong', { now }), false);
  assert.equal(await verifyWebhook(body, serverHeader(now - 301), secret, { now }), false);
  assert.equal(await verifyWebhook(body, undefined, secret, { now }), false);
});

test('accepts any matching v1 during a secret rotation', async () => {
  const header = `t=${now},v1=deadbeef,${serverHeader(now).split(',')[1]}`;
  assert.equal(await verifyWebhook(body, header, secret, { now }), true);
});

test('parseWebhook returns the event, and throws on a bad signature', async () => {
  const evt = await parseWebhook(body, serverHeader(now), secret, { now });
  assert.equal(evt.event, 'order.completed');
  assert.equal(evt.data.internal_id, 'SO-1001');
  await assert.rejects(parseWebhook(body, 't=1,v1=00', secret, { now }));
});

test('client sends the bearer key and surfaces API errors', async () => {
  let seen;
  const fakeFetch = async (url, init) => {
    seen = { url, auth: init.headers.authorization };
    return new Response(JSON.stringify({ errors: ['Oops! The api credentials provided were not valid'] }), { status: 401 });
  };
  const fleet = new ChainsLogistics({ apiKey: 'flb_test_x', fetch: fakeFetch });
  await assert.rejects(fleet.orders.get('order_1'), (e) => e instanceof ChainsApiError && e.status === 401 && e.errors.length === 1);
  assert.equal(seen.url, 'https://api.progressusmavericks.co.ke/v1/orders/order_1');
  assert.equal(seen.auth, 'Bearer flb_test_x');
});
