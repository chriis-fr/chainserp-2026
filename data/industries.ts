import type { SitePage } from './site-page';

export const industries: SitePage[] = [
  {
    slug: 'hospitality',
    name: 'Bars, restaurants and cafés',
    eyebrow: 'Hospitality',
    title: 'For bars, clubs, lounges, restaurants and cafés',
    description: 'The POS, payroll, supplier bills and invoices in one system: M-Pesa on your own number at the counter, and staff paid in one approval.',
    lead:
      'A night at a bar touches the POS, the kitchen, the stock, the staff and the suppliers. Chains keeps them in one system, so tonight’s sales are already there when you pay tomorrow’s supplier and Friday’s payroll.',
    sections: [
      {
        heading: 'At the counter',
        points: [
          'Chains POS with tables, waiter mode, kitchen and bar screens and QR ordering',
          'M-Pesa to your own paybill or till; every code recorded on the order',
          'Credit tabs for regulars, and shift cash-ups',
        ],
      },
      {
        heading: 'Behind the bar',
        points: [
          'Recipes deduct ingredients as you sell',
          'Supplier bills approved, then paid by M-Pesa, paybill or till',
          'Payroll with tips from the POS, in one approval',
        ],
      },
    ],
    product: 'pos',
    faqs: [
      {
        question: 'How do I get set up?',
        answer:
          'Send us your business name on WhatsApp. We switch on the POS and connect your own paybill or till number. You load your menu and stock list by pasting it or from a CSV or Excel file.',
      },
    ],
    related: [
      { label: 'Chains POS', href: '/features/point-of-sale' },
      { label: 'Payroll', href: '/features/payroll' },
      { label: 'Cash that does not add up', href: '/problems/till-cash-mismatch' },
    ],
    keywords: ['bar software Kenya', 'restaurant management system Nairobi', 'club POS', 'café POS'],
  },
  {
    slug: 'hotels',
    name: 'Hotels and lodges',
    eyebrow: 'Hospitality',
    title: 'For hotels and lodges: their bars, restaurants and staff',
    description: 'Run a hotel’s bars and restaurants on Chains POS, pay its staff and suppliers from one treasury, and see every outlet together.',
    lead:
      'Chains runs the food and drink side of a hotel or lodge, and the payroll and supplier payments behind it. Several outlets share one login and one parent treasury.',
    sections: [
      {
        heading: 'What hotels use',
        points: [
          'Chains POS in each bar and restaurant, with branches and devices',
          'Payroll for all staff by M-Pesa or bank',
          'Supplier bills with approvals',
          'A treasury per outlet, funded from one pool',
        ],
      },
      {
        heading: 'Not included',
        body: 'Chains is not a room booking or property management system. Keep your PMS for rooms; Chains runs the outlets, payroll and suppliers.',
      },
    ],
    product: 'pos',
    faqs: [],
    related: [
      { label: 'Groups with several businesses', href: '/features/erp-for-enterprises' },
      { label: 'Chains POS', href: '/features/point-of-sale' },
    ],
    keywords: ['hotel restaurant POS Kenya', 'lodge management software', 'hotel payroll Kenya'],
  },
  {
    slug: 'logistics',
    name: 'Logistics and delivery',
    eyebrow: 'Logistics',
    title: 'For businesses that move goods',
    description: 'FleetOps for orders, dispatch, drivers and live tracking, with payroll and supplier payments for drivers and fuel in Chains ERP.',
    lead:
      'FleetOps puts orders, drivers and vehicles on one live map. Chains ERP pays the drivers and the fuel and repair suppliers, with an approval on every payment.',
    sections: [
      {
        heading: 'Deliveries',
        points: [
          'Create orders in the console or from your own system through the API',
          'Dispatch to a driver; drivers work jobs in the Fleetbase Navigator app',
          'Customers follow their order in the customer portal',
          'Signed webhooks tell your system when an order is dispatched, started or completed',
        ],
      },
      {
        heading: 'Money',
        points: ['Driver payroll by M-Pesa or bank', 'Fuel and repair bills approved, then paid', 'Invoices to your customers in 50+ currencies'],
      },
    ],
    product: 'fleet',
    faqs: [],
    related: [
      { label: 'FleetOps', href: '/features/fleetops-logistics' },
      { label: 'Logistics docs', href: '/logistics/docs' },
    ],
    keywords: ['logistics software Kenya', 'delivery management Nairobi', 'fleet management system'],
  },
  {
    slug: 'ecommerce',
    name: 'Online shops',
    eyebrow: 'Commerce',
    title: 'For shops that sell online and deliver',
    description: 'A hosted storefront on FleetOps, with deliveries quoted at checkout and dispatched to drivers, plus invoices and supplier payments in Chains ERP.',
    lead:
      'We can set up a hosted shop on the FleetOps Storefront: catalogue, cart and checkout, with delivery or pickup quoted at checkout and each paid order landing as a delivery order.',
    sections: [
      {
        heading: 'What you get',
        points: [
          'Catalogue, search, cart and checkout on a hosted storefront',
          'Delivery quotes at checkout, and orders dispatched to your drivers',
          'Or connect your existing shop to FleetOps through the API',
        ],
      },
    ],
    product: 'fleet',
    faqs: [],
    related: [
      { label: 'Storefront docs', href: '/logistics/docs/storefront' },
      { label: 'FleetOps', href: '/features/fleetops-logistics' },
    ],
    keywords: ['ecommerce delivery Kenya', 'online shop with delivery', 'storefront'],
  },
  {
    slug: 'consulting',
    name: 'Agencies and services',
    eyebrow: 'Services',
    title: 'For agencies, consultancies and freelancers',
    description: 'Invoices in 50+ currencies with a pay link, payroll for a small team, and supplier bills, without a full ERP.',
    lead:
      'Service businesses mostly need to bill clients and pay people. Start with invoices or payroll on their own and add the rest later.',
    sections: [
      {
        heading: 'What service businesses use',
        points: [
          'Invoices in the client’s currency, sent by email or WhatsApp with a private pay link',
          'M-Pesa Pay now for Kenyan clients; bank details for clients abroad',
          'Payroll for the team in one approval',
        ],
      },
    ],
    product: 'erp',
    faqs: [],
    related: [
      { label: 'Invoices', href: '/features/global-invoicing' },
      { label: 'Trade across borders', href: '/features/cross-border-payments' },
    ],
    keywords: ['invoicing for consultants Kenya', 'agency invoicing', 'freelancer invoices'],
  },
];
