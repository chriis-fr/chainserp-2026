export interface Feature {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  status: 'available' | 'beta' | 'roadmap';
  keywords: string[];
  relatedFeatures: string[];
  relatedProblems: string[];
  faqs: Array<{ question: string; answer: string }>;
}

export interface FeatureGroupItem {
  title: string;
  description: string;
  href: string;
}

export interface FeatureGroup {
  id: string;
  title: string;
  tagline: string;
  icon: string;
  items: FeatureGroupItem[];
}

export const featureGroups: FeatureGroup[] = [
  {
    id: 'pos',
    title: 'Point of Sale',
    tagline: 'Run a modern, M-Pesa-connected POS with real-time order flow and staff payroll built in.',
    icon: '🛒',
    items: [
      {
        title: 'Real-Time Order Tracking',
        description: 'Orders progress through created → preparing → ready → paid in real time. Assign waiters, monitor tables, and see every sale as it happens.',
        href: '/features/global-invoicing',
      },
      {
        title: 'M-Pesa Payment Matching',
        description: 'Automatically match incoming M-Pesa STK and Till payments to open orders by amount and phone number — zero manual reconciliation.',
        href: '/features/cross-border-payments',
      },
      {
        title: 'POS-Integrated Staff Payroll',
        description: 'Tips, deductions, and sales per waiter flow directly into payroll. Run staff wages straight from your POS data with one click.',
        href: '/features/crypto-payroll',
      },
    ],
  },
  {
    id: 'payroll',
    title: 'Payroll',
    tagline: 'Automate employee salaries, track every payment status, and handle expenses in one workflow.',
    icon: '💳',
    items: [
      {
        title: 'Salary Runs',
        description: 'Initiate full payroll runs and track each disbursement through awaiting payment, paid, or failed — with detail modals per employee.',
        href: '/features/crypto-payroll',
      },
      {
        title: 'Employee Management',
        description: 'Maintain employee records, job titles, mobile money accounts, and payroll history. Add or update staff without leaving the finance dashboard.',
        href: '/features/erp-for-finance-teams',
      },
      {
        title: 'Expense Payroll',
        description: 'Combine recurring salaries with one-off business expenses in a single unified payroll workflow — no spreadsheet juggling.',
        href: '/features/erp-for-remote-teams',
      },
    ],
  },
  {
    id: 'treasury',
    title: 'Treasury',
    tagline: 'Control what you owe, enforce approval gates, and never let an unauthorized payment slip through.',
    icon: '🏦',
    items: [
      {
        title: 'Vendor Payables',
        description: 'Track every amount owed to vendors with clear status stages — pending, approved, and paid — across multiple suppliers at once.',
        href: '/features/cross-border-payments',
      },
      {
        title: 'Multi-Level Approvals',
        description: 'Every payable passes through configurable approval chains before disbursement. Reviewers approve asynchronously from anywhere.',
        href: '/features/erp-for-enterprises',
      },
      {
        title: 'Finance Controls',
        description: 'Set spend limits, approval thresholds, and role-based payment controls so the right people authorize the right amounts.',
        href: '/features/erp-for-finance-teams',
      },
    ],
  },
  {
    id: 'invoices-bills',
    title: 'Invoices & Bills',
    tagline: 'Send professional invoices, track revenue, and manage incoming bills with full approval traceability.',
    icon: '🧾',
    items: [
      {
        title: 'Smart Invoicing',
        description: 'Create and send invoices with auto-generated PDFs, track sent/pending/paid status, and monitor total revenue from a live stats dashboard.',
        href: '/features/global-invoicing',
      },
      {
        title: 'PDF Invoice Mapping',
        description: 'Upload existing invoice PDFs and map fields visually to extract billing data automatically — no re-keying, no errors.',
        href: '/features/global-invoicing',
      },
      {
        title: 'Bills & Approval Workflow',
        description: 'Log incoming vendor bills and move them through draft → pending approval → approved → paid with a full audit trail at every stage.',
        href: '/features/erp-for-finance-teams',
      },
    ],
  },
  {
    id: 'logistics',
    title: 'Logistics',
    tagline: 'Fleet management and end-to-end logistics operations — live at progressusmavericks.co.ke.',
    icon: '🚚',
    items: [
      {
        title: 'Fleet Management',
        description: 'Track every vehicle, driver, and trip in real time. Manage maintenance schedules, fuel logs, and fleet utilization from a single dashboard.',
        href: 'https://progressusmavericks.co.ke',
      },
      {
        title: 'Route & Delivery Tracking',
        description: 'Plan optimal routes, assign drivers, and monitor deliveries live. Customers get real-time ETAs and proof-of-delivery confirmations.',
        href: 'https://progressusmavericks.co.ke',
      },
      {
        title: 'Logistics Finance Integration',
        description: 'Fuel costs, driver payroll, and trip expenses flow directly into Chains ERP — no manual entry, full audit trail across every run.',
        href: 'https://progressusmavericks.co.ke',
      },
    ],
  },
];

export const features: Feature[] = [
  {
    slug: 'global-invoicing',
    title: 'Global Invoicing',
    description: 'Create and send invoices in any currency, to any country, with automatic compliance.',
    longDescription:
      'Chains ERP enables businesses to create, send, and manage invoices globally. Support for multi-currency invoicing, automatic tax calculations, and compliance with international invoicing standards. Perfect for businesses operating across borders.',
    status: 'available',
    keywords: ['global invoicing', 'multi-currency invoicing', 'international invoices', 'cross-border invoicing'],
    relatedFeatures: ['cross-border-payments', 'multi-currency-support', 'tax-compliance'],
    relatedProblems: ['multi-currency-invoicing', 'cross-border-invoicing-complexity'],
    faqs: [
      {
        question: 'What currencies are supported?',
        answer: 'Chains ERP supports all major currencies and can handle currency conversion automatically.',
      },
      {
        question: 'How does tax compliance work?',
        answer: 'Our system automatically calculates taxes based on the recipient country and your business location.',
      },
    ],
  },
  {
    slug: 'cross-border-payments',
    title: 'Cross-Border Payments',
    description: 'Send and receive payments globally with support for traditional and crypto payments.',
    longDescription:
      'Process payments across borders seamlessly. Support for bank transfers, credit cards, and cryptocurrency payments. Low fees, fast settlement, and full compliance with international payment regulations.',
    status: 'available',
    keywords: ['cross-border payments', 'international payments', 'global payments', 'crypto payments'],
    relatedFeatures: ['global-invoicing', 'crypto-payroll', 'multi-currency-support'],
    relatedProblems: ['slow-invoice-collections', 'high-payment-fees'],
    faqs: [
      {
        question: 'What payment methods are supported?',
        answer: 'We support bank transfers, credit cards, and cryptocurrency payments including Bitcoin and stablecoins.',
      },
      {
        question: 'How long do payments take?',
        answer: 'Crypto payments settle instantly. Traditional payments typically take 1-3 business days.',
      },
    ],
  },
  {
    slug: 'crypto-payroll',
    title: 'Crypto Payroll',
    description: 'Pay your team in cryptocurrency with automatic tax calculations and compliance.',
    longDescription:
      'Run payroll in cryptocurrency for global teams. Automatically calculate taxes, handle compliance, and support multiple cryptocurrencies. Perfect for remote teams and crypto-native companies.',
    status: 'beta',
    keywords: ['crypto payroll', 'bitcoin payroll', 'cryptocurrency payroll', 'web3 payroll'],
    relatedFeatures: ['cross-border-payments', 'payroll-management', 'tax-compliance'],
    relatedProblems: ['crypto-payroll-compliance', 'web3-accounting-compliance'],
    faqs: [
      {
        question: 'Is crypto payroll legal?',
        answer: 'Yes, in most jurisdictions. Our system ensures compliance with local tax and labor laws.',
      },
      {
        question: 'Which cryptocurrencies are supported?',
        answer: 'We support Bitcoin, Ethereum, and major stablecoins. More currencies can be added on request.',
      },
    ],
  },
  {
    slug: 'erp-for-finance-teams',
    title: 'ERP for Finance Teams',
    description: 'Complete financial management system designed specifically for finance professionals.',
    longDescription:
      'A comprehensive ERP solution built for finance teams. Includes accounting, invoicing, expense management, reporting, and analytics. All integrated in one platform.',
    status: 'available',
    keywords: ['finance erp', 'accounting software', 'financial management', 'erp for finance'],
    relatedFeatures: ['global-invoicing', 'accounting-automation', 'financial-reporting'],
    relatedProblems: ['manual-accounting-errors', 'fragmented-finance-tools'],
    faqs: [
      {
        question: 'How does this differ from QuickBooks?',
        answer: 'Chains ERP is built for global businesses with multi-currency and crypto support, while QuickBooks focuses on single-country operations.',
      },
    ],
  },
  {
    slug: 'erp-for-startups',
    title: 'ERP for Startups',
    description: 'Scalable ERP solution that grows with your startup from day one.',
    longDescription:
      'Start with the essentials, scale as you grow. No need to rebuild your finance stack. Perfect for startups that plan to expand globally.',
    status: 'available',
    keywords: ['startup erp', 'erp for startups', 'small business erp', 'scalable erp'],
    relatedFeatures: ['erp-for-finance-teams', 'multi-entity-support', 'basic-accounting'],
    relatedProblems: ['startup-finance-chaos', 'scaling-finance-operations'],
    faqs: [
      {
        question: 'What is the minimum team size?',
        answer: 'Chains ERP works for solo founders and scales to enterprise teams.',
      },
    ],
  },
  {
    slug: 'erp-for-enterprises',
    title: 'ERP for Enterprises',
    description: 'Enterprise-grade ERP with advanced features for large organizations.',
    longDescription:
      'Multi-entity support, advanced permissions, custom workflows, and dedicated support. Built for enterprises operating globally.',
    status: 'available',
    keywords: ['enterprise erp', 'erp for enterprises', 'large business erp', 'enterprise software'],
    relatedFeatures: ['multi-entity-support', 'advanced-permissions', 'custom-workflows'],
    relatedProblems: ['enterprise-finance-complexity', 'multi-entity-management'],
    faqs: [
      {
        question: 'Do you offer dedicated support?',
        answer: 'Yes, enterprise customers receive dedicated account management and priority support.',
      },
    ],
  },
  {
    slug: 'erp-for-africa',
    title: 'ERP for Africa',
    description: 'ERP solution designed for businesses operating in African markets.',
    longDescription:
      'Built with African markets in mind. Support for local currencies, mobile money, and compliance with African regulations.',
    status: 'available',
    keywords: ['africa erp', 'erp for africa', 'african business software', 'kenya erp', 'nigeria erp'],
    relatedFeatures: ['mobile-money-integration', 'local-currency-support', 'africa-compliance'],
    relatedProblems: ['africa-payment-challenges', 'africa-currency-complexity'],
    faqs: [
      {
        question: 'Which African countries are supported?',
        answer: 'We support all major African markets including Kenya, Nigeria, South Africa, Ghana, and more.',
      },
    ],
  },
  {
    slug: 'erp-for-remote-teams',
    title: 'ERP for Remote Teams',
    description: 'Finance management built for distributed teams working across time zones.',
    longDescription:
      'Manage finances for remote teams seamlessly. Multi-currency support, async workflows, and tools designed for distributed work.',
    status: 'available',
    keywords: ['remote team erp', 'distributed team erp', 'remote work software', 'async finance'],
    relatedFeatures: ['cross-border-payments', 'multi-currency-support', 'async-workflows'],
    relatedProblems: ['remote-team-payments', 'distributed-finance-management'],
    faqs: [
      {
        question: 'How do approvals work for remote teams?',
        answer: 'Our approval system works asynchronously, so team members can approve from anywhere, anytime.',
      },
    ],
  },
];
