// Every place the marketing site sends people. Keep these in one file so a host or path change is one edit.
const APP = 'https://app.chains-erp.com';
const WA = 'https://wa.me/254705343984';

export const LINKS = {
  app: APP,
  signIn: `${APP}/auth`,
  signUp: `${APP}/auth?mode=signup`,
  appProducts: `${APP}/products`,
  appPos: `${APP}/products#pos`,
  appPayroll: `${APP}/products#payroll`,
  appBills: `${APP}/products#bills`,
  appInvoices: `${APP}/products#invoices`,
  appTreasury: `${APP}/products#treasury`,
  ai: `${APP}/ai`,
  solutions: `${APP}/solutions`,
  useCases: `${APP}/use-cases`,
  plans: `${APP}/plans`,
  security: `${APP}/security/approvals`,
  pos: 'https://pos.chains-erp.com',
  posSignIn: 'https://pos.chains-erp.com/login',
  logistics: 'https://progressusmavericks.co.ke',
  whatsapp: `${WA}?text=${encodeURIComponent('Hi Chains, I would like to set up my business on Chains. It is called: ')}`,
  whatsappTill: `${WA}?text=${encodeURIComponent('Hi Chains, I would like the till for my business.')}`,
  whatsappLogistics: `${WA}?text=${encodeURIComponent('Hi Chains, I would like to see Chains FleetOps for my deliveries.')}`,
  calendly: 'https://calendly.com/caspianodhis/30min',
  email: 'mailto:hello@chains-erp.com',
};
