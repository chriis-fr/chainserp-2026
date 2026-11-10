import type { SitePage } from './site-page';

// Where Chains works. Money moves by M-Pesa in Kenya today; elsewhere, invoices (paid by bank transfer)
// and FleetOps work, but Chains has no local payment rails.
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
    description: 'Open to businesses in any African country: invoices in local and global currencies and FleetOps deliveries; payments move in Kenya first.',
    lead:
      'You can sign up from anywhere. Outside Kenya, invoices and FleetOps work today; Chains does not yet move money on other countries’ mobile money or bank rails.',
    sections: [
      {
        heading: 'Outside Kenya today',
        points: [
          'Invoices in 50+ currencies, including naira and other local currencies, paid by bank transfer',
          'FleetOps for orders, drivers and deliveries',
          'Payroll and supplier payouts only in Kenya for now',
        ],
      },
    ],
    product: 'erp',
    faqs: [
      { question: 'When will my country’s payments work?', answer: 'We have not announced the next country. Tell us where you operate on WhatsApp.' },
    ],
    related: [
      { label: 'Kenya', href: '/regions/kenya' },
      { label: 'Nigeria', href: '/regions/nigeria' },
    ],
    keywords: ['ERP Africa', 'business software Africa', 'invoicing Africa'],
  },
  {
    slug: 'nigeria',
    name: 'Nigeria',
    eyebrow: 'Where Chains works',
    title: 'Chains for businesses in Nigeria',
    description: 'Invoice in naira and 50+ currencies and run deliveries on FleetOps. Payments in and out of Nigeria are not supported yet.',
    lead: 'Nigerian businesses can invoice and run deliveries on Chains today. Payments still move in Kenya only.',
    sections: [
      {
        heading: 'What works',
        points: ['Invoices in naira or any of 50+ currencies, paid by bank transfer and marked paid', 'FleetOps for deliveries'],
      },
      { heading: 'Not yet', body: 'No Nigerian bank or mobile money payouts, and no Nigerian tax features.' },
    ],
    product: 'erp',
    faqs: [],
    related: [{ label: 'Invoices', href: '/features/global-invoicing' }],
    keywords: ['invoicing Nigeria', 'naira invoices'],
  },
  {
    slug: 'europe',
    name: 'Europe',
    eyebrow: 'Where Chains works',
    title: 'Working with Kenya from Europe',
    description: 'Invoice Kenyan or European clients in euros or 50+ currencies, and pay a team in Kenya by M-Pesa from a Kenyan treasury.',
    lead:
      'Chains has no European payment rails or tax features. It suits European businesses that invoice in euros and pay a team or suppliers in Kenya.',
    sections: [
      {
        heading: 'What works',
        points: [
          'Invoices in euros or 50+ currencies, paid by bank transfer',
          'Payroll and supplier payouts in Kenya, from a Kenyan shilling treasury',
        ],
      },
    ],
    product: 'erp',
    faqs: [],
    related: [{ label: 'Getting paid', href: '/features/cross-border-payments' }],
    keywords: ['pay team in Kenya from Europe', 'euro invoicing'],
  },
  {
    slug: 'united-states',
    name: 'United States',
    eyebrow: 'Where Chains works',
    title: 'Working with Kenya from the United States',
    description: 'Invoice in dollars or 50+ currencies, and pay a team or suppliers in Kenya by M-Pesa from a Kenyan treasury.',
    lead:
      'Chains has no US payment rails or tax features. It suits US businesses that invoice in dollars and pay people or suppliers in Kenya.',
    sections: [
      {
        heading: 'What works',
        points: ['Invoices in dollars or 50+ currencies, paid by bank transfer', 'Payroll and supplier payouts in Kenya by M-Pesa or bank'],
      },
    ],
    product: 'erp',
    faqs: [],
    related: [{ label: 'Payroll', href: '/features/payroll' }],
    keywords: ['pay team in Kenya from US', 'dollar invoicing Kenya'],
  },
];
