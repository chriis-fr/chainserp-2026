import styled from 'styled-components';
import Page from 'components/Page';
import RichText from 'components/RichText';
import { EnvVars } from 'env';

export default function PrivacyPolicyPage() {
  return (
    <Page title="Privacy Policy">
      <PrivacyPolicyContainer>
        <RichText>
          <p>
            This Privacy Policy explains how <strong>{EnvVars.SITE_NAME}</strong> collects,
            uses, stores, and protects your information when you access or use our platform, services, websites, and applications.
          </p>

          <p>
            We build software for finance teams, businesses, and enterprises worldwide. Privacy, security, and data integrity are
            foundational to how our system is designed and operated.
          </p>

          <br />

          <strong>1. Information We Collect</strong>
          <ul>
            <li>
              <strong>Account Information:</strong> Name, email address, company details, and role-based identifiers.
            </li>
            <li>
              <strong>Business Data:</strong> Invoices, accounting records, payroll data, expenses, transactions, and operational metadata.
            </li>
            <li>
              <strong>Usage Data:</strong> Log data, device information, access timestamps, and feature interactions.
            </li>
            <li>
              <strong>Payment Data:</strong> Transaction references and payment status (we do not store raw card or sensitive payment credentials).
            </li>
          </ul>

          <br />

          <strong>2. How We Use Your Information</strong>
          <ul>
            <li>To provide, operate, and improve the ERP and global finance services.</li>
            <li>To process invoices, payments, payrolls, and financial workflows.</li>
            <li>To generate reports, analytics, and AI-assisted insights.</li>
            <li>To maintain platform security, auditability, and compliance.</li>
            <li>To communicate product updates, service notifications, and support responses.</li>
          </ul>

          <br />

          <strong>3. Data Ownership & Control</strong>
          <p>
            You retain full ownership of your business and financial data. We act solely as a data processor and do not sell, rent,
            or monetize customer data.
          </p>

          <p>
            Access to data within your organization is governed by role-based permissions, audit trails, and approval workflows.
          </p>

          <br />

          <strong>4. Security & Compliance</strong>
          <ul>
            <li>Enterprise-grade encryption for data in transit and at rest.</li>
            <li>Role-based access control and activity logging.</li>
            <li>Continuous monitoring and anomaly detection.</li>
            <li>Secure infrastructure designed for global financial operations.</li>
          </ul>

          <br />

          <strong>5. International Use</strong>
          <p>
            Chains ERP is built for global businesses. Your data may be processed in multiple regions depending on operational
            requirements, always in accordance with applicable data protection laws.
          </p>

          <br />

          <strong>6. Third-Party Integrations</strong>
          <p>
            When you connect external services (such as payment providers, accounting tools, or integrations),
            data shared is limited strictly to what is required for the integration to function.
          </p>

          <br />

          <strong>7. Data Retention</strong>
          <p>
            We retain data only for as long as necessary to provide the service, meet legal obligations,
            resolve disputes, and enforce agreements.
          </p>

          <br />

          <strong>8. Your Rights</strong>
          <ul>
            <li>Access and review your data.</li>
            <li>Request corrections or updates.</li>
            <li>Request export or deletion of data, subject to legal and regulatory requirements.</li>
          </ul>

          <br />

          <strong>9. Changes to This Policy</strong>
          <p>
            We may update this Privacy Policy to reflect product improvements, legal requirements, or operational changes.
            Updates will be communicated through the platform.
          </p>

          <br />

          <strong>10. Contact</strong>
          <p>
            For privacy-related questions or requests, contact us through the platform or our official communication channels.
          </p>

          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Purpose</th>
                <th>Retention</th>
                <th>Access Control</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Account Information</td>
                <td>User authentication and access</td>
                <td>Account lifetime</td>
                <td>Role-based</td>
              </tr>
              <tr>
                <td>Financial Records</td>
                <td>Accounting, invoicing, compliance</td>
                <td>As required by law</td>
                <td>Restricted</td>
              </tr>
              <tr>
                <td>Payroll Data</td>
                <td>Salary processing and reporting</td>
                <td>As required by regulation</td>
                <td>HR-restricted</td>
              </tr>
              <tr>
                <td>Usage Logs</td>
                <td>Security and performance</td>
                <td>Limited duration</td>
                <td>Internal only</td>
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
