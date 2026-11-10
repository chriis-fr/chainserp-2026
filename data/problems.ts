import type { SitePage } from './site-page';

export const problems: SitePage[] = [
  {
    slug: 'multi-currency-invoicing',
    name: 'Invoicing in several currencies',
    eyebrow: 'Problem',
    title: 'Clients in different currencies, invoices in different tools',
    description: 'Send every client an invoice in their own currency from one place, with the right way to pay attached.',
    lead: 'When clients pay in shillings, dollars and euros, invoices end up spread across templates and spreadsheets.',
    sections: [
      {
        heading: 'How Chains handles it',
        points: [
          'One invoice builder for 50+ currencies, with a live preview',
          'M-Pesa Pay now for Kenyan clients; bank details for clients abroad',
          'Every invoice’s status in one list: sent, pending, paid',
        ],
      },
    ],
    product: 'erp',
    faqs: [],
    related: [{ label: 'Invoices', href: '/features/global-invoicing' }],
    keywords: ['multi-currency invoicing', 'invoice in dollars Kenya'],
  },
  {
    slug: 'slow-invoice-collections',
    name: 'Slow invoice payments',
    eyebrow: 'Problem',
    title: 'Invoices that sit unpaid',
    description: 'Make paying easy: a private pay link on every invoice, M-Pesa Pay now for Kenyan clients, and the invoice marks itself paid.',
    lead: 'Clients pay faster when paying takes one tap. Most late invoices are not refused; they are just inconvenient to pay.',
    sections: [
      {
        heading: 'How Chains helps',
        points: [
          'Send the invoice by email or WhatsApp with a private pay link',
          'Kenyan clients tap Pay now and approve the M-Pesa prompt',
          'The invoice marks itself paid, so you are not reconciling by hand',
        ],
      },
    ],
    product: 'erp',
    faqs: [],
    related: [{ label: 'Invoices', href: '/features/global-invoicing' }],
    keywords: ['get invoices paid faster', 'M-Pesa invoice link'],
  },
  {
    slug: 'manual-accounting-errors',
    name: 'Copying numbers between tools',
    eyebrow: 'Problem',
    title: 'Re-typing sales, tips and bills into spreadsheets',
    description: 'Stop copying POS sales, tips and supplier bills between tools: in Chains they are already where payroll and payments need them.',
    lead: 'Every time a number is copied from the POS to a spreadsheet to payroll, it can go wrong.',
    sections: [
      {
        heading: 'What Chains removes',
        points: [
          'Tips taken at the POS land on the right person’s pay after you review them',
          'Suppliers enter their own bills through their link',
          'M-Pesa payments are recorded with their codes, at the counter and on invoices',
        ],
      },
    ],
    product: 'erp',
    faqs: [],
    related: [
      { label: 'Payroll', href: '/features/payroll' },
      { label: 'Supplier bills', href: '/features/supplier-bills' },
    ],
    keywords: ['spreadsheet errors payroll', 'POS to payroll'],
  },
  {
    slug: 'unapproved-supplier-payments',
    name: 'Payments nobody approved',
    eyebrow: 'Problem',
    title: 'Supplier payments that go out without a yes',
    description: 'Require approval before a bill can be paid, record who approved and when, and need a passcode for every payment out.',
    lead: 'When anyone can pay a supplier from the business phone, mistakes and worse are only a message away.',
    sections: [
      {
        heading: 'How Chains controls it',
        points: [
          'Switch on approvals: a bill must be approved before it can be paid',
          'Who approved, and when, is recorded',
          'Every payment out needs the treasury passcode',
          'Roles decide who can do what',
        ],
      },
    ],
    product: 'erp',
    faqs: [],
    related: [{ label: 'Supplier bills', href: '/features/supplier-bills' }],
    keywords: ['approve supplier payments', 'payment approval workflow Kenya'],
  },
  {
    slug: 'till-cash-mismatch',
    name: 'Cash that doesn’t add up',
    eyebrow: 'Problem',
    title: 'End-of-night cash that never matches the sales',
    description: 'Shift cash-ups, M-Pesa codes on every order and manager-approved voids make the gap visible, and show who and when.',
    lead: 'At the end of a busy night, the cash, the M-Pesa messages and the sales rarely agree, and nobody can say why.',
    sections: [
      {
        heading: 'How Chains POS helps',
        points: [
          'Open and close each shift with a cash-up',
          'Every M-Pesa payment recorded on its order with the code',
          'Sent items need a manager to void',
          'Sales by person and product, and reconciliation',
        ],
      },
    ],
    product: 'pos',
    faqs: [],
    related: [{ label: 'Chains POS', href: '/features/point-of-sale' }],
    keywords: ['bar cash reconciliation', 'POS shift cash up', 'M-Pesa reconciliation'],
  },
  {
    slug: 'untracked-deliveries',
    name: 'Deliveries you can’t see',
    eyebrow: 'Problem',
    title: 'Not knowing where a delivery is',
    description: 'Put every order, driver and vehicle on one live map, let customers follow their order, and get webhooks when it is delivered.',
    lead: 'When the only way to find a delivery is to call the driver, customers call you.',
    sections: [
      {
        heading: 'How FleetOps helps',
        points: [
          'Every order dispatched to a driver and followed on the map',
          'Customers track their own order in the customer portal',
          'Proof of delivery captured in the Fleetbase Navigator app',
          'Signed webhooks tell your system when an order is completed',
        ],
      },
    ],
    product: 'fleet',
    faqs: [],
    related: [{ label: 'FleetOps', href: '/features/fleetops-logistics' }],
    keywords: ['delivery tracking Kenya', 'track drivers'],
  },
];
