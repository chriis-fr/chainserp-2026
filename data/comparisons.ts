import type { SitePage } from './site-page';

// Comparisons stay on facts about Chains. Competitors are described only in neutral, widely known terms,
// and each page says when the other product is the better fit.
export const comparisons: SitePage[] = [
  {
    slug: 'chains-erp-vs-quickbooks',
    name: 'Chains ERP and QuickBooks',
    eyebrow: 'Compare',
    title: 'Chains ERP and QuickBooks',
    description: 'How Chains ERP differs from accounting software like QuickBooks, and when to use one, the other, or both.',
    lead:
      'QuickBooks is accounting software: books, ledgers and the reports an accountant works from. Chains ERP runs the day-to-day money of a Kenyan business: the POS, payroll, supplier payments and invoices with M-Pesa built in.',
    sections: [
      {
        heading: 'What Chains does',
        points: [
          'M-Pesa at the counter, on invoices and for payroll and supplier payouts',
          'Chains POS for bars, restaurants and cafés',
          'Approvals and a passcode on every payment out',
        ],
      },
      {
        heading: 'When accounting software is the better fit',
        body: 'If you need a general ledger, accountant collaboration or tax filing, use accounting software. Chains is not a ledger and does not file taxes.',
      },
      {
        heading: 'Using both',
        body: 'You can keep your accounting software for the books and run payments and operations in Chains.',
      },
    ],
    product: 'erp',
    faqs: [],
    related: [{ label: 'For finance teams', href: '/features/erp-for-finance-teams' }],
    keywords: ['QuickBooks alternative Kenya', 'Chains ERP vs QuickBooks'],
  },
  {
    slug: 'chains-erp-vs-xero',
    name: 'Chains ERP and Xero',
    eyebrow: 'Compare',
    title: 'Chains ERP and Xero',
    description: 'How Chains ERP differs from cloud accounting software like Xero, and when to use one, the other, or both.',
    lead:
      'Xero is cloud accounting software for keeping the books. Chains ERP runs payments and operations in Kenya: the POS, payroll, supplier bills and invoices, on M-Pesa.',
    sections: [
      {
        heading: 'What Chains does',
        points: [
          'M-Pesa Pay now on invoices; the invoice marks itself paid',
          'Payroll and supplier payouts by M-Pesa or bank in one approval',
          'Chains POS and FleetOps logistics',
        ],
      },
      {
        heading: 'When accounting software is the better fit',
        body: 'For bookkeeping, a general ledger, bank feeds and tax returns, use accounting software. Chains does not replace it.',
      },
    ],
    product: 'erp',
    faqs: [],
    related: [{ label: 'Invoices', href: '/features/global-invoicing' }],
    keywords: ['Xero alternative Kenya', 'Chains ERP vs Xero'],
  },
  {
    slug: 'chains-erp-vs-odoo',
    name: 'Chains ERP and Odoo',
    eyebrow: 'Compare',
    title: 'Chains ERP and Odoo',
    description: 'Odoo is a broad, modular ERP you configure; Chains is a focused set of products for Kenyan hospitality and logistics, set up with you.',
    lead:
      'Odoo is a broad, modular ERP that covers many business areas and is usually configured by a partner. Chains is narrower: the POS, payroll, supplier bills, invoices, treasury and FleetOps, with M-Pesa built in and set up with you over WhatsApp.',
    sections: [
      {
        heading: 'What Chains does',
        points: [
          'Ready for bars, restaurants, cafés and hotels on day one',
          'M-Pesa on your own paybill or till, and M-Pesa payroll',
          '15 days free, no card',
        ],
      },
      {
        heading: 'When a broad ERP is the better fit',
        body: 'If you need manufacturing, a full accounting ledger, HR beyond payroll, or deep custom modules, a broad ERP is built for that. Chains is not.',
      },
    ],
    product: 'erp',
    faqs: [],
    related: [{ label: 'Bars, restaurants and cafés', href: '/industries/hospitality' }],
    keywords: ['Odoo alternative Kenya', 'Chains ERP vs Odoo'],
  },
];
