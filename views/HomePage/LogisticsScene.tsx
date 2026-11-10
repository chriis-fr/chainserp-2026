/* eslint-disable react/no-unescaped-entities -- apostrophes in the copy */
import NextLink from 'next/link';
import { Icon, IconName, WhatsAppIcon } from 'components/site/Icon';
import { LINKS } from 'components/site/links';

// Chains FleetOps (progressusmavericks.co.ke): orders, dispatch, drivers and vehicles, live tracking,
// a customer portal with order tracking, and invoices. The map below is an illustration, drawn in CSS 3D.

const ROUTE_A = 'M 70 450 L 70 270 L 270 270 L 270 110 L 450 110';
const ROUTE_B = 'M 70 450 L 410 450 L 410 330';

const BLOCKS: { x: number; y: number; w: number; d: number; h: number; tone?: 'brand' | 'drop' }[] = [
  { x: 30, y: 400, w: 80, d: 70, h: 46, tone: 'brand' }, // depot
  { x: 120, y: 150, w: 110, d: 80, h: 70 },
  { x: 300, y: 160, w: 70, d: 70, h: 40 },
  { x: 120, y: 310, w: 90, d: 90, h: 28 },
  { x: 300, y: 300, w: 70, d: 110, h: 56 },
  { x: 440, y: 180, w: 60, d: 90, h: 34 },
  { x: 160, y: 30, w: 90, d: 50, h: 24 },
  { x: 430, y: 20, w: 60, d: 60, h: 30, tone: 'drop' },
  { x: 440, y: 360, w: 60, d: 50, h: 22, tone: 'drop' },
];

const PINS = [
  { x: 270, y: 270, label: 'Stop 1 · delivered', tone: 'ok' },
  { x: 450, y: 110, label: 'Stop 2 · 12 min', tone: 'info' },
  { x: 410, y: 330, label: 'Stop 3 · on route', tone: 'info' },
  { x: 70, y: 440, label: 'Depot', tone: 'brand' },
];

const STAGES: { icon: IconName; title: string; text: string }[] = [
  { icon: 'file', title: 'Order in', text: 'From your team or the customer portal' },
  { icon: 'users', title: 'Dispatch', text: 'Assign a driver and a vehicle' },
  { icon: 'truck', title: 'Live on the map', text: 'Every vehicle tracked on route' },
  { icon: 'check', title: 'Delivered', text: 'Customer tracks it; invoice follows' },
];

export default function LogisticsScene() {
  return (
    <section className="cx-sec cx-logi" id="logistics-3d">
      <div className="cx-wrap cx-logi-grid">
        <div className="cx-logi-copy">
          <span className="cx-eyebrow" style={{ color: '#a8b6de' }}>
            Logistics · Chains FleetOps
          </span>
          <h2>See every delivery move, from the depot to the door.</h2>
          <p>
            FleetOps puts your orders, drivers and vehicles on one live map. Dispatch in a few clicks, let customers track their own order, and
            send the invoice when it lands.
          </p>
          <ol className="cx-logi-stages">
            {STAGES.map((s, i) => (
              <li key={s.title}>
                <span className="cx-logi-n">{i + 1}</span>
                <Icon name={s.icon} />
                <span>
                  <b>{s.title}</b>
                  <small>{s.text}</small>
                </span>
              </li>
            ))}
          </ol>
          <div className="cx-cta">
            <a className="cx-btn cx-btn-primary" href={LINKS.whatsappLogistics} target="_blank" rel="noopener">
              <WhatsAppIcon /> Get FleetOps for your fleet
            </a>
            <a className="cx-btn cx-btn-quiet" href={`${LINKS.logistics}/auth`} target="_blank" rel="noopener">
              Open FleetOps <Icon name="ext" />
            </a>
          </div>
          <p className="cx-logi-fine">
            Customers track orders in the FleetOps customer portal. Have your own system?{' '}
            <NextLink href="/logistics/docs" style={{ color: '#fff', textDecoration: 'underline', textUnderlineOffset: 3 }}>
              Read the integration docs
            </NextLink>
          </p>
        </div>

        <div className="cx-iso" aria-label="Illustration: a delivery map with a depot, two routes, vans and drop-offs">
          <div className="cx-iso-plane">
            {/* roads */}
            <svg className="cx-iso-roads" viewBox="0 0 520 520" aria-hidden="true">
              <path d="M 70 470 L 70 250 M 50 270 L 290 270 M 270 290 L 270 90 M 250 110 L 500 110 M 50 450 L 430 450 M 410 470 L 410 310" />
            </svg>
            <svg className="cx-iso-route" viewBox="0 0 520 520" aria-hidden="true">
              <path className="a" d={ROUTE_A} />
              <path className="b" d={ROUTE_B} />
            </svg>
            {BLOCKS.map((b, i) => (
              <div
                key={i}
                className={`cx-blk${b.tone ? ` ${b.tone}` : ''}`}
                style={{ left: b.x, top: b.y, width: b.w, height: b.d, ['--h' as string]: `${b.h}px` }}
              >
                <i className="t" />
                <i className="f" />
                <i className="r" />
              </div>
            ))}
            <div className="cx-van" style={{ offsetPath: `path('${ROUTE_A}')` }}>
              <i />
            </div>
            <div className="cx-van two" style={{ offsetPath: `path('${ROUTE_B}')` }}>
              <i />
            </div>
            {PINS.map((p) => (
              <div key={p.label} className={`cx-pin ${p.tone}`} style={{ left: p.x, top: p.y }}>
                <span>{p.label}</span>
              </div>
            ))}
          </div>

          <div className="cx-iso-card one">
            <div className="cx-row">
              <b>KBX 214T · Van</b>
              <span className="cx-st ok">On route</span>
            </div>
            <small>Driver assigned · 3 stops · 1 delivered</small>
            <div className="cx-bar">
              <i style={{ width: '38%' }} />
            </div>
          </div>
          <div className="cx-iso-card two">
            <div className="cx-row">
              <b>Order #1042</b>
              <span className="cx-st info">Arriving</span>
            </div>
            <small>Customer is following it in the portal</small>
          </div>
        </div>
      </div>
    </section>
  );
}
