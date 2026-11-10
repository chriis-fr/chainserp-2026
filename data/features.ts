import type { SitePage } from './site-page';

// Every statement here is checked against the products (app.chains-erp.com copy, the POS and FleetOps code).
export const features: SitePage[] = [
  {
    slug: 'point-of-sale',
    name: 'Chains POS',
    eyebrow: 'Point of sale',
    title: 'Point of sale operations, connected to your ERP',
    description:
      'Chains POS runs orders and tables, kitchen and bar screens, QR ordering, stock, shifts, credit tabs and M-Pesa records for bars, restaurants, cafés and hotels.',
    lead:
      'Chains POS connects to the M-Pesa paybill or till, receipt printers and Android tablets you already have, and runs the floor, the kitchen, the stock and the cash drawer from one system. Every sale is there when you run payroll and pay suppliers in Chains ERP.',
    sections: [
      {
        heading: 'On the floor and in the kitchen',
        points: [
          'Table map and waiter mode; split bills',
          'Kitchen and bar screens: tickets go straight to each station',
          'QR ordering: guests order from the table and follow their order status',
          'Discounts and voids; sent items need a manager to void',
        ],
      },
      {
        heading: 'Stock, shifts and cash',
        points: [
          'Recipes and ingredients: link menu items to ingredients for automatic stock deduction',
          'Open and close shifts with a cash-up',
          'Credit tabs for regulars, from outstanding to paid',
          'M-Pesa records: every payment with its M-Pesa code, and a way to act on a wrong one',
        ],
      },
      {
        heading: 'Reporting and control',
        points: [
          'Sales by person, product and month, and reconciliation',
          'Several branches, and the devices and printers at each',
          'Owner, manager, cashier and waiter roles, each signing in with a PIN',
          'If the Wi-Fi drops, sales are saved on the device and sync when it is back',
        ],
      },
    ],
    product: 'pos',
    faqs: [
      {
        question: 'Do I need new hardware?',
        answer: 'No. Chains POS runs on Android tablets or in a browser and prints to the receipt printers on your network.',
      },
      {
        question: 'Does it take M-Pesa on my own number?',
        answer: 'Yes. We connect your existing paybill or till number; payments land on the order with the M-Pesa code attached.',
      },
      {
        question: 'How do I get it?',
        answer: 'The Chains team switches the POS on for your workspace. Message us on WhatsApp with your business name.',
      },
    ],
    related: [
      { label: 'Bars, restaurants and cafés', href: '/industries/hospitality' },
      { label: 'Payroll', href: '/features/payroll' },
      { label: 'Open pos.chains-erp.com', href: 'https://pos.chains-erp.com' },
    ],
    keywords: ['POS Kenya', 'restaurant POS', 'bar POS Nairobi', 'M-Pesa POS', 'kitchen display system', 'QR ordering'],
  },
  {
    slug: 'payroll',
    name: 'Payroll',
    eyebrow: 'Chains ERP',
    title: 'Payroll in one approval',
    description: 'Pay staff weekly, every two weeks or monthly by M-Pesa or bank, with advances, bonuses, tips and deductions as one entry each.',
    lead:
      'Set the pay day and a cut-off for changes. When the run is ready, one treasury passcode pays everyone by M-Pesa or bank, with the fees on screen before you approve.',
    sections: [
      {
        heading: 'What a run handles',
        points: [
          'Monthly, every two weeks or weekly',
          'Advances, bonuses, tips and deductions are one entry each',
          'Tips taken at the POS land on the right person’s pay after you review them',
          'A failed payment is retried, and the same payslip can never be paid twice',
          'Anyone still unpaid is listed, with one button to send again',
        ],
      },
      {
        heading: 'What it does not do yet',
        body: 'Chains does not work out PAYE, NSSF or SHIF. Add statutory deductions as lines on each payslip. Payouts go by M-Pesa or bank in Kenya.',
      },
    ],
    product: 'erp',
    faqs: [
      {
        question: 'What does payroll cost?',
        answer: 'From $29 a month (about KES 3,800) for up to 20 employees; see the pricing page. Payout fees are shown before you confirm.',
      },
    ],
    related: [
      { label: 'Treasury', href: '/features/treasury' },
      { label: 'Chains POS', href: '/features/point-of-sale' },
      { label: 'Pricing', href: '/pricing' },
    ],
    keywords: ['payroll software Kenya', 'M-Pesa payroll', 'staff payroll', 'payroll for restaurants'],
  },
  {
    slug: 'supplier-bills',
    name: 'Supplier bills',
    eyebrow: 'Chains ERP',
    title: 'Supplier bills that wait for a yes',
    description: 'Suppliers send their bills through their own link; you approve, then pay one or many from the treasury by M-Pesa, paybill or till.',
    lead:
      'Send a supplier their own link. They enter the bill and how they want to be paid, and it lands in your bills, ready to approve.',
    sections: [
      {
        heading: 'Approve, then pay',
        points: [
          'Switch on approvals and a bill has to be approved before it can be paid',
          'Who approved, and when, is recorded',
          'Pay one or many from the treasury to an M-Pesa number, a paybill or a till',
          'The fee is shown first and added on top, so the supplier gets the full amount',
          'Every payment out needs your treasury passcode',
        ],
      },
    ],
    product: 'erp',
    faqs: [],
    related: [
      { label: 'Unapproved supplier payments', href: '/problems/unapproved-supplier-payments' },
      { label: 'Treasury', href: '/features/treasury' },
    ],
    keywords: ['accounts payable Kenya', 'supplier payments M-Pesa', 'bill approval software'],
  },
  {
    slug: 'global-invoicing',
    name: 'Invoices',
    eyebrow: 'Chains ERP',
    title: 'Invoices in 50+ currencies, with their own pay link',
    description: 'Build an invoice with a live preview, send it by email or WhatsApp with a private pay link, in shillings, dollars, euros, naira or 50+ currencies.',
    lead:
      'Build the invoice on one screen with a live preview beside it, and send it by email or WhatsApp with a private pay link.',
    sections: [
      {
        heading: 'How clients pay',
        points: [
          'A Kenyan client taps Pay now, approves the M-Pesa prompt, and the invoice marks itself paid; the money lands in your Chains treasury, less a fee',
          'Clients elsewhere pay by bank transfer to the details on the invoice; you mark it paid when the money arrives',
          'You can also invoice in USDC or USDT on Base; those are marked paid by hand',
        ],
      },
      {
        heading: 'What it does not do',
        body: 'Chains does not issue KRA eTIMS tax invoices yet. Keep issuing tax invoices from your eTIMS system; Chains runs your payments alongside it.',
      },
    ],
    product: 'erp',
    faqs: [
      { question: 'Which currencies can I invoice in?', answer: 'More than 50, including KES, USD, EUR and NGN, plus USDC or USDT on Base.' },
      { question: 'What does it cost?', answer: 'Invoices start at $14 a month (about KES 1,800) for 100 invoices and one user; see the pricing page.' },
    ],
    related: [
      { label: 'Getting paid by clients', href: '/features/cross-border-payments' },
      { label: 'Slow invoice collections', href: '/problems/slow-invoice-collections' },
    ],
    keywords: ['invoice software Kenya', 'multi-currency invoicing', 'M-Pesa invoice payment link'],
  },
  {
    slug: 'cross-border-payments',
    name: 'Getting paid',
    eyebrow: 'Chains ERP',
    title: 'Getting paid by clients, at home and abroad',
    description: 'How invoices get paid in Chains today: M-Pesa Pay now in Kenya, bank transfer for clients abroad, and USDC or USDT on Base marked paid by hand.',
    lead:
      'Chains moves money by M-Pesa in Kenya today. Clients anywhere can still pay your invoices, by the method that suits them.',
    sections: [
      {
        heading: 'The options',
        points: [
          'In Kenya: Pay now by M-Pesa; the invoice marks itself paid',
          'Abroad: bank transfer to the details on the invoice, in their currency; you mark it paid',
          'Stablecoins: USDC or USDT on Base, received to your address and marked paid by hand',
          'Bitcoin through BTCPay Server is switched on per workspace by request',
        ],
      },
      {
        heading: 'What we do not do',
        body: 'Chains does not convert currencies or send money out of Kenya. Payouts (payroll, suppliers) go by M-Pesa or bank in Kenya.',
      },
    ],
    product: 'erp',
    faqs: [],
    related: [
      { label: 'Invoices', href: '/features/global-invoicing' },
      { label: 'Bitcoin on invoices', href: '/accept-bitcoin-payments' },
    ],
    keywords: ['receive international payments Kenya', 'invoice clients abroad', 'USDC invoice'],
  },
  {
    slug: 'treasury',
    name: 'Treasury',
    eyebrow: 'Chains ERP',
    title: 'A treasury for each business, one pool above them',
    description: 'Hold the shilling balance you pay from, top it up by M-Pesa or bank, and fund several businesses from one parent treasury.',
    lead:
      'Your treasury is the shilling balance you pay payroll and suppliers from. Top it up by M-Pesa prompt or bank transfer.',
    sections: [
      {
        heading: 'Several businesses, one login',
        points: [
          'Fund one parent treasury and allocate to each business',
          'Compare sales and payroll needs across all of them',
          'Every payment out needs your treasury passcode',
        ],
      },
    ],
    product: 'erp',
    faqs: [{ question: 'What does Treasury cost?', answer: 'From $27 a month (about KES 3,500) with batch payments and bills for 3 users; see the pricing page.' }],
    related: [
      { label: 'Groups with several businesses', href: '/features/erp-for-enterprises' },
      { label: 'Supplier bills', href: '/features/supplier-bills' },
    ],
    keywords: ['business treasury Kenya', 'multi branch finance', 'M-Pesa business account'],
  },
  {
    slug: 'fleetops-logistics',
    name: 'FleetOps logistics',
    eyebrow: 'Logistics',
    title: 'FleetOps: orders, drivers and deliveries on one live map',
    description: 'Chains FleetOps handles delivery orders, dispatch, drivers and vehicles, with a live map, customer order tracking, a REST API and signed webhooks.',
    lead:
      'FleetOps is the Chains logistics platform at progressusmavericks.co.ke. Dispatch from the console, let customers follow their own order, and connect your own system through the API.',
    sections: [
      {
        heading: 'What it covers',
        points: [
          'Delivery orders with pickup, drop-off, items and your own order number',
          'Dispatch to a driver, and follow each vehicle on the map',
          'Drivers work their jobs and capture proof of delivery in the Fleetbase Navigator app',
          'Customers track orders in the customer portal',
          'REST API and signed webhooks for your own systems',
        ],
      },
    ],
    product: 'fleet',
    faqs: [
      { question: 'How do I connect my system?', answer: 'Read the logistics docs and ask us for a test key. Keys are issued by the Chains team.' },
    ],
    related: [
      { label: 'Logistics docs', href: '/logistics/docs' },
      { label: 'Logistics and delivery businesses', href: '/industries/logistics' },
      { label: 'Untracked deliveries', href: '/problems/untracked-deliveries' },
    ],
    keywords: ['fleet management Kenya', 'delivery management software', 'logistics API', 'Fleetbase'],
  },
  {
    slug: 'chains-ai',
    name: 'Chains AI',
    eyebrow: 'Beta',
    title: 'An assistant that prepares, then waits for your yes',
    description: 'Ask Chains AI on WhatsApp or in the app for sales, bills due or payroll needs; it prepares payments, and you approve with your passcode.',
    lead:
      'Ask in your own words, on WhatsApp or in the app: tonight’s sales, what bills are due, what payroll needs this month. It prepares supplier payments, payroll runs and top-ups.',
    sections: [
      {
        heading: 'You stay in control',
        points: [
          'A payment out only happens after you enter your treasury passcode, on a one-time page or on the confirmation card in the app',
          'What it can do follows each person’s role: a waiter can’t run payroll or pay a supplier',
          'Built to run on an open-source model we host ourselves',
        ],
      },
      {
        heading: 'Availability',
        body: 'Chains AI is in beta and access is by request, on top of a paid plan, for about $20 (KES 2,600) a month per workspace.',
      },
    ],
    product: 'ai',
    faqs: [],
    related: [{ label: 'Pricing', href: '/pricing' }],
    keywords: ['AI ERP', 'WhatsApp business assistant', 'agentic ERP'],
  },
  {
    slug: 'erp-for-finance-teams',
    name: 'For finance teams',
    eyebrow: 'Who it’s for',
    title: 'For the people who pay everyone',
    description: 'Payroll, supplier bills, invoices and treasury in one place, with approvals, roles and a record of who did what.',
    lead:
      'Chains ERP brings payroll, supplier bills, invoices and the treasury you pay from into one app, so finance sees sales, bills and payroll together instead of in separate tools.',
    sections: [
      {
        heading: 'Controls',
        points: [
          'Bills can require approval before payment; who approved and when is recorded',
          'Every payment out needs the treasury passcode',
          'Roles decide what each person can do',
        ],
      },
      {
        heading: 'Alongside your accountant',
        body: 'Chains is not a general ledger or tax-filing tool. Keep your accounting software and eTIMS; Chains runs the payments and operations around them.',
      },
    ],
    product: 'erp',
    faqs: [],
    related: [
      { label: 'Chains ERP vs QuickBooks', href: '/compare/chains-erp-vs-quickbooks' },
      { label: 'Supplier bills', href: '/features/supplier-bills' },
    ],
    keywords: ['finance software Kenya', 'accounts payable and payroll', 'ERP for finance teams'],
  },
  {
    slug: 'erp-for-startups',
    name: 'For small businesses',
    eyebrow: 'Who it’s for',
    title: 'Start with one module, add the rest later',
    description: 'Start with invoices, payroll or the POS, and add modules as the business grows. 15 days free, no card.',
    lead:
      'You don’t need everything on day one. Start with the module you need, then switch on the others when you are ready; they share the same records.',
    sections: [
      {
        heading: 'Common starting points',
        points: [
          'Invoices from $14 a month for freelancers and small service businesses',
          'Payroll from $29 a month for up to 20 employees',
          'Chains POS, switched on by request, for bars, restaurants and cafés',
          'Full Suite at $125 a month when you want it all',
        ],
      },
    ],
    product: 'erp',
    faqs: [{ question: 'Is there a free trial?', answer: 'Yes: 15 days free, no card.' }],
    related: [{ label: 'Pricing', href: '/pricing' }],
    keywords: ['small business software Kenya', 'ERP for startups', 'affordable ERP'],
  },
  {
    slug: 'erp-for-enterprises',
    name: 'For groups',
    eyebrow: 'Who it’s for',
    title: 'For groups with several businesses or branches',
    description: 'One login for several businesses: a parent treasury that funds each one, and sales and payroll compared across all of them.',
    lead:
      'Run several businesses from one login. Fund one parent treasury and allocate to each business, and compare their sales and payroll needs at once.',
    sections: [
      {
        heading: 'What groups use',
        points: [
          'A treasury per business, with one pool above them',
          'Chains POS across several branches and their devices',
          'Roles per person, and approvals on bills',
        ],
      },
    ],
    product: 'erp',
    faqs: [],
    related: [
      { label: 'Treasury', href: '/features/treasury' },
      { label: 'Hotels and lodges', href: '/industries/hotels' },
    ],
    keywords: ['multi branch ERP', 'restaurant group software', 'multi entity finance Kenya'],
  },
  {
    slug: 'erp-for-africa',
    name: 'Kenya first',
    eyebrow: 'Where Chains works',
    title: 'Built in Nairobi, money moves in Kenya first',
    description: 'Chains moves money by M-Pesa in Kenya today; invoices go out in 50+ currencies and FleetOps runs deliveries anywhere.',
    lead:
      'Chains is built in Nairobi. Payments in and out run on M-Pesa in Kenya today; the rest of the product works for businesses anywhere.',
    sections: [
      {
        heading: 'Today',
        points: [
          'Kenya: M-Pesa Pay now on invoices, M-Pesa payroll and supplier payouts, POS on your own paybill or till',
          'Anywhere: invoices in 50+ currencies paid by bank transfer, and FleetOps for deliveries',
        ],
      },
    ],
    product: 'erp',
    faqs: [
      {
        question: 'Which countries’ payment rails come next?',
        answer: 'We have not announced the next country. Tell us where you operate on WhatsApp.',
      },
    ],
    related: [
      { label: 'Kenya', href: '/regions/kenya' },
      { label: 'Africa', href: '/regions/africa' },
    ],
    keywords: ['ERP Kenya', 'ERP Africa', 'M-Pesa business software'],
  },
];
