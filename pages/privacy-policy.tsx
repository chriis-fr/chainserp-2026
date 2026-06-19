import styled from 'styled-components';
import Page from 'components/Page';
import RichText from 'components/RichText';
import { EnvVars } from 'env';

export default function PrivacyPolicyPage() {
  return (
    <Page title="Privacy Policy">
      <PrivacyPolicyContainer>
        <RichText>
          <h2>Privacy Policy — {EnvVars.SITE_NAME}</h2>

          <p>
            This Privacy Policy (&quot;Policy&quot;) explains how <strong>{EnvVars.SITE_NAME}</strong> and its
            operating entity (&quot;Global Chains ERP,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;)
            collects, uses, discloses, stores, and protects information in connection with our cloud software
            platform and related services (collectively, the &quot;Service&quot;). The Service is designed as
            financial and business operations infrastructure, including without limitation: smart invoicing; accounts
            payable and receivable; vendor and client records; treasury, wallet, and payment-orchestration tooling;
            multi-currency and reconciliation features; M-Pesa and other payment-channel integrations where enabled;
            subscription billing; organization and workspace management; roles and approvals; APIs, webhooks, and
            third-party integrations; document and logo uploads; optional blockchain or digital-asset-related
            workflows including BTCPay Server hosting for merchants; optional push notifications; ledger or
            accounting-oriented exports/sync where offered; and administrative or compliance-oriented logging.
          </p>

          <p>
            <strong>Important:</strong> This Policy is provided for transparency. It does not constitute legal
            advice. Financial, payroll, tax, sanctions, and data-protection requirements vary by jurisdiction and
            use case. Engage qualified counsel and, where applicable, execute a Data Processing Addendum (DPA) with
            us for enterprise deployments.
          </p>

          <p><strong>Last updated: June 2026</strong></p>

          <h2>1. Who this Policy covers</h2>

          <p>
            This Policy applies to visitors to our websites, registered users, organization administrators and
            members, payors or counterparties who interact with public or tokenized flows we host (such as hosted
            invoice or payment pages or vendor submission links), and individuals whose information is submitted into
            the Service by a customer (for example employees, vendors, or clients of our customers).
          </p>
          <p>
            If you interact with the Service only as an employee or contact of our customer, that customer is
            typically responsible for informing you about processing and for honoring privacy requests for business
            data they control. We may still process certain information as an independent controller for security,
            billing, and platform integrity.
          </p>

          <h2>2. Controller and processor roles</h2>

          <p>The Service is multi-tenant. In general:</p>
          <ul>
            <li>
              <strong>Customer as controller:</strong> For data your organization inputs or connects—such as invoices,
              payables, clients, vendors, chart-of-account style references, payroll fields, files, treasury
              configurations, and business communications metadata—your organization is typically the controller, and
              we process such data as a processor to provide the Service, subject to your instructions, these terms,
              and any executed DPA.
            </li>
            <li>
              <strong>We as controller:</strong> We act as a controller where we determine purposes and means—for
              example account creation and authentication events, subscription and billing with payment partners,
              fraud and abuse prevention, security monitoring, aggregated analytics, product and policy notices,
              certain cookie-based analytics where not solely on behalf of a customer, and compliance with legal
              process directed to us.
            </li>
          </ul>
          <p>
            Where laws require a lawful basis (such as under GDPR/UK GDPR or the Kenya Data Protection Act 2019),
            we rely on contract, legitimate interests (balanced against rights), legal obligation, or consent as
            appropriate to the activity.
          </p>

          <h2>3. Information we collect</h2>

          <p>Depending on how you use the Service, we may collect:</p>

          <h3>3.1 Account, identity, and access</h3>
          <ul>
            <li>Name, email, phone, password or OAuth tokens, session identifiers, organization membership, roles</li>
            <li>Workspace or organization identifiers, invitation and onboarding state</li>
            <li>Security-related events (e.g. sign-in timestamps, device or IP indicators where logged)</li>
          </ul>

          <h3>3.2 Billing and subscriptions</h3>
          <ul>
            <li>Plan, subscription status, usage metrics relevant to billing</li>
            <li>
              Payment data: typically handled by payment processors (e.g. Paystack or other configured providers).
              We may receive limited tokens, last-four, receipt metadata, customer references, and transaction
              status—not full card data where the processor tokenizes it.
            </li>
          </ul>

          <h3>3.3 Financial, ERP, and operational content</h3>
          <ul>
            <li>Invoices, line items, taxes, approvals, numbering, PDFs, and delivery history you configure</li>
            <li>Payables, bills, vendor banking or payment instructions you store, approval chains, audit trails</li>
            <li>Clients, vendors, counterparties, and contact directories you maintain</li>
            <li>Bank account labels, payment method preferences, reconciliation notes, and similar operational fields</li>
          </ul>

          <h3>3.4 Treasury, wallets, and blockchain-related data</h3>
          <ul>
            <li>
              Wallet addresses, chain identifiers, transaction hashes, Safe or multi-sig configurations, gas or fee
              settings, and provider references (including data returned by node providers or wallet-connection SDKs)
            </li>
            <li>
              <strong>On-chain data is public</strong> by nature; we may index or display it to operate features you enable
            </li>
            <li>
              Webhook or provider callbacks related to treasury movements may be logged for reconciliation and security
            </li>
          </ul>

          <h3>3.5 Mobile money and regional payment channels</h3>
          <ul>
            <li>
              Where M-Pesa or similar channels are enabled, we may process phone numbers, transaction references,
              reconciliation keys, and status messages as you or integrations submit them
            </li>
          </ul>

          <h3>3.6 HR, payroll, and workforce information</h3>
          <ul>
            <li>
              If you use payroll or HR-oriented fields: salaries or rates, deductions, tax identifiers, national IDs,
              bank details for wages, attendance or HR notes. Under the <strong>Kenya Data Protection Act 2019,
              section 25</strong>, employee salary data, national identification numbers, and similar HR records are
              classified as <strong>sensitive personal data</strong> requiring explicit consent and heightened
              protection. You must have a lawful basis—including written employee consent where required under Kenya
              DPA s.25—before processing such data. We process such data only to provide the Service per your
              instructions.
            </li>
          </ul>

          <h3>3.7 Files, media, and documents</h3>
          <ul>
            <li>Uploaded logos, attachments, contracts, and PDFs you or your users provide</li>
            <li>
              Where PDF or document parsing is used, extracted text and structure may be processed to populate fields
              you approve
            </li>
          </ul>

          <h3>3.8 Communications</h3>
          <ul>
            <li>
              Email content metadata, delivery status, and SMTP or provider logs when we send system or product emails
            </li>
            <li>
              If you connect WhatsApp Business API (Meta) or similar channels, message metadata and payloads may be
              processed according to your configuration and Meta&apos;s policies
            </li>
          </ul>

          <h3>3.9 APIs, webhooks, and integrations</h3>
          <ul>
            <li>API keys or tokens you create, webhook URLs, request logs, error logs, and integration configuration</li>
            <li>Payloads received from third-party systems you connect to the Service</li>
          </ul>

          <h3>3.10 Public and unauthenticated flows</h3>
          <ul>
            <li>
              When counterparties use hosted invoice pay flows, vendor link tokens, or similar URLs, we may collect IP
              address, device/browser data, payment attempt metadata, and fraud signals as needed to operate and secure
              those flows
            </li>
          </ul>

          <h3>3.11 Technical, cookies, and similar technologies</h3>
          <ul>
            <li>Cookies, local storage, or similar for sessions, preferences, security, and analytics</li>
            <li>IP address, user agent, referrer, approximate location derived from IP</li>
          </ul>

          <h3>3.12 Push notifications</h3>
          <ul>
            <li>
              If you opt in to web push, subscription endpoints and keys required for delivery may be stored in
              accordance with browser standards
            </li>
          </ul>

          <h3>3.13 AI-assisted features</h3>
          <ul>
            <li>
              Inputs you provide and outputs generated may be processed by models or automation to deliver features
              you enable. Retention and subprocessors depend on configuration and provider terms.
            </li>
          </ul>

          <h3>3.14 Support and abuse handling</h3>
          <ul>
            <li>Ticket content, correspondence, and investigation notes when you contact us or we investigate incidents</li>
          </ul>

          <h2>4. Purposes of processing</h2>
          <ul>
            <li>Provide, maintain, debug, and improve the Service and its features</li>
            <li>Authenticate users, enforce role-based access control, and maintain tenant isolation</li>
            <li>Route or orchestrate payments, treasury actions, and notifications as you configure</li>
            <li>Detect, prevent, and respond to fraud, abuse, security incidents, and illegal activity</li>
            <li>Comply with law, regulations, court orders, and government requests</li>
            <li>Perform sanctions and risk screening where required or prudent</li>
            <li>Bill and collect fees; manage subscriptions and trials</li>
            <li>Communicate about the Service, incidents, and policy updates</li>
            <li>Analytics, product development, and benchmarking using aggregated or de-identified data where possible</li>
            <li>Train or evaluate models only as permitted by applicable agreements and settings</li>
          </ul>

          <h2>5. Automated processing and profiling</h2>
          <p>
            We may use rules-based systems or machine learning for fraud scoring, risk flags, categorization,
            suggestions, or workflow routing. Such processing may produce recommendations only; it does not replace
            your judgment unless you explicitly configure automation. Where required, you may have rights to human
            review or to object.
          </p>

          <h2>6. Legal bases</h2>
          <p>
            Where GDPR, UK GDPR, the <strong>Kenya Data Protection Act 2019</strong>, Nigeria NDPA, South Africa
            POPIA, or comparable laws apply, we process personal data under one or more of: performance of a
            contract, legitimate interests (e.g. securing the Service, preventing fraud—balanced against individual
            rights), legal obligation, vital interests (rare), or consent where required (e.g. non-essential cookies,
            sensitive data processing under Kenya DPA s.25, or certain marketing).
          </p>

          <h2>7. Disclosure, subprocessors, and categories of recipients</h2>
          <p>We may disclose information to:</p>
          <ul>
            <li>
              <strong>Infrastructure and database providers</strong> (e.g. document databases such as MongoDB in cloud
              regions you or we configure)
            </li>
            <li>
              <strong>Application hosting and edge/CDN providers</strong> that serve our web application and assets
            </li>
            <li><strong>Authentication and identity services</strong> integrated with the platform</li>
            <li>
              <strong>Payment processors</strong> (e.g. Paystack for subscriptions or other configured acquirers)
            </li>
            <li>
              <strong>Treasury or banking-as-a-service partners</strong> you enable (e.g. providers receiving webhooks
              or settlement instructions)
            </li>
            <li>
              <strong>Blockchain node, wallet, and smart-contract infrastructure</strong> (e.g. RPC providers, wallet
              connection SDKs, BTCPay Server infrastructure) as required to execute features you choose
            </li>
            <li>
              <strong>Email delivery</strong> (SMTP relays or transactional email vendors) and messaging platforms
              (e.g. Meta/WhatsApp when connected)
            </li>
            <li>
              <strong>Analytics, logging, observability, error reporting, and security vendors</strong>
            </li>
            <li>
              <strong>Professional advisers, auditors, insurers, and due-diligence participants</strong>
            </li>
            <li>
              <strong>Acquirers, successors, or affiliates</strong> in a merger, financing, or asset sale, subject to
              confidentiality and legal requirements
            </li>
            <li>
              <strong>Law enforcement and regulators</strong> when we believe disclosure is required by law or
              necessary to protect rights, safety, and integrity
            </li>
          </ul>
          <p>
            A Subprocessor Disclosure may list names and purposes; the list may change. We will provide enterprise
            customers notice where contractually required before engaging a new subprocessor that processes personal
            data on their behalf.
          </p>

          <h2>7A. BTCPay Server and Bitcoin payment infrastructure</h2>

          <p>
            Where we host or operate <strong>BTCPay Server</strong> instances on behalf of merchants, we provide
            <strong> server software infrastructure only</strong>. We are <strong>not</strong> a payment processor,
            payment service provider (PSP), money transmitter, virtual asset service provider (VASP), or custodian
            in relation to Bitcoin or any other digital asset transactions processed through BTCPay Server.
          </p>
          <p>
            BTCPay Server operates on a <strong>self-custodial model</strong>: merchants control their own Bitcoin
            private keys and wallets. We do not hold, custody, control, or have access to merchants&apos; Bitcoin
            funds at any time.
          </p>
          <p>In connection with BTCPay Server hosting, we may process:</p>
          <ul>
            <li>Server configuration data and instance settings you provide</li>
            <li>Connection metadata, API credentials, and webhook configurations</li>
            <li>Operational logs required for infrastructure maintenance and security</li>
            <li>
              xpub (extended public key) data you configure for invoice generation — we do not have access to private
              keys
            </li>
          </ul>
          <p>
            <strong>On-chain transaction data is public by nature of the Bitcoin network.</strong> Transaction hashes,
            addresses, and amounts recorded on the blockchain are publicly visible and cannot be erased by us or by
            you. We may display or index this publicly available data to operate features you enable.
          </p>
          <p>
            You (the merchant or operator) are solely responsible for all compliance obligations arising from your
            acceptance of Bitcoin payments, including applicable VASP registration, KYC/AML program requirements,
            tax reporting, and any licensing required in your jurisdiction.
          </p>

          <h2>8. International data transfers</h2>
          <p>
            We may process and store data in the United States, European Economic Area, United Kingdom, Kenya, and
            other regions depending on deployment and vendor locations. Where transfers from the EEA, UK, Switzerland,
            or other restricted jurisdictions occur, we implement appropriate safeguards such as Standard Contractual
            Clauses, the UK Addendum, or other lawful mechanisms. Copies of transfer assessments or DPAs may be
            available to enterprise customers upon request.
          </p>

          <h2>9. Data residency</h2>
          <p>
            Unless a separate enterprise agreement specifies a region, data may be processed globally to operate the
            Service. Certain regulated workloads may require dedicated deployment; contact us for enterprise options.
          </p>

          <h2>10. Security</h2>
          <p>
            We implement commercially reasonable administrative, technical, and physical safeguards appropriate to the
            sensitivity of the Service, including access controls, encryption in transit where standard for the
            protocol, vulnerability management, logging, and vendor review. <strong>No system is perfectly
            secure.</strong> We do not represent that the Service is immune to compromise or free from defects. You
            are responsible for safeguarding credentials, API keys, and devices used to access the Service.
          </p>

          <h2>11. Audit logs, monitoring, and financial traceability</h2>
          <p>
            We may record events such as authentication, role changes, configuration edits, approvals, exports,
            treasury or payout instructions initiated through the Service, webhook receipts, and administrative
            actions. Logs support security monitoring, dispute resolution, regulatory inquiries, and forensic
            investigations. Retention follows operational and legal requirements and may extend beyond account
            deletion where mandated for accounting or anti-fraud purposes.
          </p>

          <h2>12. Retention</h2>
          <p>
            We retain personal data for as long as necessary to provide the Service, comply with law (including tax,
            AML, and bookkeeping retention), resolve disputes, and enforce agreements. Categories such as security
            logs, billing records, and accounting entries may have longer retention. Backups may persist for a limited
            period after deletion requests. Enterprise customers may negotiate schedules in a DPA.
          </p>

          <h2>13. Deletion, export, and account closure</h2>
          <p>
            You may request export or deletion subject to law and technical feasibility. Where we act as processor,
            requests may need to be routed through your organization&apos;s administrator. Some information must be
            retained by law or for legitimate interests (e.g. billing proofs, abuse prevention). Public blockchain
            records cannot be erased by us.
          </p>

          <h2>14. Cookies and tracking</h2>
          <p>
            We use essential, functional, analytics, and security-related cookies or similar technologies. A dedicated
            Cookie Policy or cookie banner may provide granular choices where required. Disabling certain cookies may
            impair functionality.
          </p>

          <h2>15. Marketing</h2>
          <p>
            We may send product updates or offers where permitted. You may opt out of marketing communications;
            transactional or security notices may continue.
          </p>

          <h2>16. Children</h2>
          <p>
            The Service is not directed to children under 13 (or the minimum age in your jurisdiction). We do not
            knowingly collect personal information from children.
          </p>

          <h2>17. Sanctions, AML, and restricted activity</h2>
          <p>
            We prohibit use of the Service for sanctions evasion, money laundering, terrorist financing, fraud, or
            other illegal financial activity. We may screen data where required, block activity, freeze features, or
            terminate accounts consistent with law and risk policies.
          </p>

          <h2>17A. Cryptocurrency and virtual asset compliance</h2>
          <p>
            If you use Bitcoin, cryptocurrency, or other virtual asset features of the Service (including BTCPay
            Server hosting), <strong>you are solely responsible</strong> for complying with all applicable laws and
            regulations in your jurisdiction, including:
          </p>
          <ul>
            <li>
              <strong>VASP registration and licensing:</strong> Virtual Asset Service Provider registration or
              licensing obligations that may apply to your business under the laws of Kenya, your country of
              incorporation, and any jurisdiction where you operate or have customers
            </li>
            <li>
              <strong>AML/CFT obligations:</strong> Anti-money laundering and counter-financing of terrorism program
              requirements, including customer due diligence, transaction monitoring, and suspicious activity reporting
            </li>
            <li>
              <strong>Tax reporting:</strong> KRA (Kenya Revenue Authority) guidance on the tax treatment of virtual
              assets and cryptocurrency transactions, including capital gains, income characterization, and VAT
              implications
            </li>
            <li>
              <strong>CBK regulations:</strong> Central Bank of Kenya regulations and guidance on virtual assets and
              digital currencies, as updated from time to time, apply to your use of cryptocurrency features where
              applicable
            </li>
          </ul>
          <p>
            We screen for sanctioned addresses where technically feasible using available screening tools, but we make
            no representation that our screening is exhaustive or complete. You remain responsible for your own
            sanctions compliance program. We reserve the right to block, restrict, or report transactions associated
            with sanctioned addresses or persons.
          </p>

          <h2>18. Regional privacy rights</h2>
          <p>
            Depending on your location, you may have rights to access, correct, delete, port, restrict, or object to
            processing, and to lodge a complaint with a supervisory authority. Under the <strong>Kenya Data Protection
            Act 2019</strong>, data subjects in Kenya have rights to be informed, access their data, object to
            processing, correction, deletion, and to complain to the Office of the Data Protection Commissioner
            (ODPC). California residents may have rights under CCPA/CPRA. We will verify requests as permitted by law.
          </p>

          <h2>19. Breach notification</h2>
          <p>
            If we determine a personal data breach requires notification under applicable law, we will notify
            regulators and affected individuals as required. Under the Kenya Data Protection Act 2019, we are required
            to notify the ODPC of certain breaches within prescribed timeframes. Customers acting as controllers are
            responsible for notifying their own data subjects where their business data is affected.
          </p>

          <h2>20. Third-party links and embedded services</h2>
          <p>
            The Service may link to third-party sites or embed widgets. Their privacy practices are governed by their
            own policies. Wallet extensions, banking portals, or social login providers may collect data independently.
          </p>

          <h2>21. Changes to this Policy</h2>
          <p>
            We may update this Policy to reflect product, legal, or operational changes. We will post the updated
            Policy with a new &ldquo;Last updated&rdquo; date and, where required, provide additional notice.
            Continued use after changes may constitute acceptance where permitted.
          </p>

          <h2>22. Contact</h2>
          <p>Privacy questions, data subject requests, and legal notices:</p>
          <ul>
            <li>Privacy inquiries: <strong>privacy@chains-erp.com</strong></li>
            <li>Data Protection Officer: <strong>dpo@chains-erp.com</strong></li>
            <li>Legal notices: <strong>legal@chains-erp.com</strong></li>
            <li>
              Address: Nairobi, Kenya. Full registered address available upon written request to
              legal@chains-erp.com.
            </li>
          </ul>

          <h2>Data Retention Schedule</h2>

          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Examples</th>
                <th>Purpose</th>
                <th>Retention Period</th>
                <th>Access Control</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Account &amp; identity</td>
                <td>Name, email, roles, session tokens</td>
                <td>Authentication and platform access</td>
                <td>Account lifetime + 30 days post-deletion</td>
                <td>Role-based; user-controlled</td>
              </tr>
              <tr>
                <td>Financial records</td>
                <td>Invoices, bills, payables, reconciliation data</td>
                <td>Accounting, invoicing, compliance</td>
                <td>7 years (or as required by applicable law)</td>
                <td>Finance roles; restricted</td>
              </tr>
              <tr>
                <td>Payroll &amp; HR data</td>
                <td>Salaries, national IDs, bank details, tax identifiers</td>
                <td>Salary processing, statutory reporting</td>
                <td>7 years (Kenya Employment Act / KRA requirements)</td>
                <td>HR-restricted; sensitive category</td>
              </tr>
              <tr>
                <td>M-Pesa transaction records</td>
                <td>Phone numbers, transaction refs, status messages</td>
                <td>Reconciliation, dispute resolution</td>
                <td>5 years (or as required by CBK regulations)</td>
                <td>Finance roles; restricted</td>
              </tr>
              <tr>
                <td>BTCPay / Bitcoin infrastructure logs</td>
                <td>Server config, connection metadata, operational logs</td>
                <td>Infrastructure maintenance, security, audit</td>
                <td>90 days operational; longer if required for legal hold</td>
                <td>Internal infrastructure team only</td>
              </tr>
              <tr>
                <td>Blockchain / on-chain data</td>
                <td>Wallet addresses, transaction hashes, xpub references</td>
                <td>Feature operation, reconciliation</td>
                <td>Indefinite (public blockchain data; cannot be erased)</td>
                <td>Publicly visible on blockchain; internal display restricted by role</td>
              </tr>
              <tr>
                <td>Billing &amp; subscription records</td>
                <td>Plan, invoices, payment tokens, receipts</td>
                <td>Revenue, tax, dispute resolution</td>
                <td>7 years</td>
                <td>Billing team; restricted</td>
              </tr>
              <tr>
                <td>Security &amp; audit logs</td>
                <td>Login events, role changes, approvals, webhook receipts</td>
                <td>Security monitoring, incident response, forensics</td>
                <td>2 years minimum; longer if required for legal hold</td>
                <td>Internal security team only</td>
              </tr>
              <tr>
                <td>Usage logs</td>
                <td>Feature interactions, API requests, error logs</td>
                <td>Performance, debugging, product development</td>
                <td>90 days rolling</td>
                <td>Internal engineering; aggregated for analytics</td>
              </tr>
              <tr>
                <td>Support correspondence</td>
                <td>Ticket content, chat logs, investigation notes</td>
                <td>Support, dispute resolution</td>
                <td>3 years from ticket closure</td>
                <td>Support team; restricted</td>
              </tr>
              <tr>
                <td>Files &amp; documents</td>
                <td>Uploaded PDFs, logos, contracts, attachments</td>
                <td>Service operation, document management</td>
                <td>Account lifetime + 30 days post-deletion (unless legal hold applies)</td>
                <td>Workspace-level role-based access</td>
              </tr>
            </tbody>
          </table>
        </RichText>
      </PrivacyPolicyContainer>
    </Page>
  );
}

const PrivacyPolicyContainer = styled.div`
  max-width: 90rem;
  margin: auto;
  overflow-x: auto;
`;
