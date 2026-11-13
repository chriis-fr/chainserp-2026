import type { SitePage } from './site-page';

// Where Chains works. Every account runs in one of 16 home currencies, invoices in 50+, and can get paid and hold
// balances in stablecoins (USDC/USDT on Base). Mobile money and bank rails are switched on with each business.
export const regions: SitePage[] = [
  {
    slug: 'kenya',
    name: 'Kenya',
    eyebrow: 'Where Chains works',
    title: 'Chains in Kenya',
    description: 'Everything works in Kenya: M-Pesa at the counter and on invoices, M-Pesa payroll and supplier payouts, and prices in shillings.',
    lead: 'Chains is built in Nairobi, and Kenya is where every part of it works today.',
    sections: [
      {
        heading: 'What works',
        points: [
          'Chains POS on your own M-Pesa paybill or till',
          'Invoices with an M-Pesa Pay now button',
          'Payroll and supplier payouts by M-Pesa, paybill, till or bank',
          'Treasury top-ups by M-Pesa prompt or bank transfer',
          'Invoices in 50+ currencies, and stablecoin payments in USDC or USDT on Base',
        ],
      },
      {
        heading: 'Not yet',
        body: 'Chains does not issue eTIMS tax invoices or work out PAYE, NSSF and SHIF. Keep your eTIMS system and add statutory deductions as payslip lines.',
      },
    ],
    product: 'erp',
    faqs: [],
    related: [
      { label: 'Bars, restaurants and cafés', href: '/industries/hospitality' },
      { label: 'Pricing in KES', href: '/pricing' },
    ],
    keywords: ['ERP Kenya', 'business software Nairobi', 'M-Pesa ERP'],
  },
  {
    slug: 'africa',
    name: 'Africa',
    eyebrow: 'Where Chains works',
    title: 'Chains across Africa',
    description: 'Run your business in your home currency, invoice in 50+ currencies, get paid in stablecoins, and run deliveries on FleetOps, wherever you are on the continent.',
    lead: 'Sign up from anywhere. Run your books in your own currency, trade with partners in theirs, and settle in stablecoins when a bank is too slow.',
    sections: [
      {
        heading: 'What works',
        points: [
          'Your home currency for books, reports and payroll: 16 to choose from, including naira, cedi, rand, shillings, birr, francs and more',
          'Invoices in 50+ currencies with a Pay now link',
          'Stablecoins: get paid and hold balances in USDC or USDT on Base',
          'Trade with partners across borders and see every balance in your own currency at live rates',
          'FleetOps for orders, drivers and deliveries',
        ],
      },
    ],
    product: 'erp',
    faqs: [
      {
        question: 'How do I pay and get paid where I am?',
        answer: 'Invoices and stablecoins work from day one. Tell us on WhatsApp which mobile money and bank rails you use, and we will set them up with you.',
      },
    ],
    related: [
      { label: 'Trade across borders', href: '/features/cross-border-payments' },
      { label: 'Invoices', href: '/features/global-invoicing' },
    ],
    keywords: ['ERP Africa', 'business software Africa', 'invoicing Africa', 'stablecoin payments Africa', 'cross-border trade Africa'],
  },
  {
    slug: 'nigeria',
    name: 'Nigeria',
    eyebrow: 'Where Chains works',
    title: 'Chains for businesses in Nigeria',
    description: 'Run your books in naira, invoice in 50+ currencies, get paid in stablecoins, and run deliveries on FleetOps.',
    lead: 'Run Chains in naira, bill partners in their currency, and settle in USDC or USDT when a bank transfer is too slow.',
    sections: [
      {
        heading: 'What works',
        points: [
          'Naira as your home currency for books, reports and payroll',
          'Invoices in naira or any of 50+ currencies, with a Pay now link',
          'Stablecoin payments and balances in USDC or USDT on Base',
          'FleetOps for deliveries',
        ],
      },
    ],
    product: 'erp',
    faqs: [],
    related: [
      { label: 'Trade across borders', href: '/features/cross-border-payments' },
      { label: 'Invoices', href: '/features/global-invoicing' },
    ],
    keywords: ['invoicing Nigeria', 'naira invoices', 'stablecoin payments Nigeria'],
  },
  {
    slug: 'europe',
    name: 'Europe',
    eyebrow: 'Where Chains works',
    title: 'Chains for businesses in Europe',
    description: 'Run your books in euros or pounds, invoice in 50+ currencies, settle with partners in stablecoins, and pay teams and suppliers abroad.',
    lead: 'Run Chains in euros or pounds and trade with partners and teams across borders, in their currency or in stablecoins.',
    sections: [
      {
        heading: 'What works',
        points: [
          'Euros or pounds as your home currency for books and reports',
          'Invoices in 50+ currencies, paid by bank transfer or stablecoins',
          'Stablecoin payments and balances in USDC or USDT on Base',
          'Payroll and supplier payouts by mobile money or bank, from your Chains treasury',
        ],
      },
    ],
    product: 'erp',
    faqs: [],
    related: [{ label: 'Trade across borders', href: '/features/cross-border-payments' }],
    keywords: ['euro invoicing', 'pay teams abroad', 'stablecoin business payments Europe'],
  },
  {
    slug: 'united-states',
    name: 'United States',
    eyebrow: 'Where Chains works',
    title: 'Chains for businesses in the United States',
    description: 'Run your books in dollars, invoice in 50+ currencies, settle in USDC, and pay teams and suppliers abroad from one treasury.',
    lead: 'Run Chains in dollars, invoice partners anywhere, and settle in USDC or USDT on Base when a wire is too slow.',
    sections: [
      {
        heading: 'What works',
        points: [
          'Dollars as your home currency for books and reports',
          'Invoices in dollars or 50+ currencies, paid by bank transfer or stablecoins',
          'Stablecoin payments and balances in USDC or USDT on Base',
          'Payroll and supplier payouts by mobile money or bank, from your Chains treasury',
        ],
      },
    ],
    product: 'erp',
    faqs: [],
    related: [
      { label: 'Trade across borders', href: '/features/cross-border-payments' },
      { label: 'Payroll', href: '/features/payroll' },
    ],
    keywords: ['USDC invoicing', 'pay teams abroad', 'dollar invoicing'],
  },
];
