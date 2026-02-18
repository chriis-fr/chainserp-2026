import styled from 'styled-components';
import Page from 'components/Page';
import RichText from 'components/RichText';

export default function ContactPage() {
  return (
    <Page title="Cookies policy">
      <CookiesPolicyContainer>
      <RichText>
  <p>
    Our ERP is built to simplify how modern organizations manage finance, operations, and growth. 
    It replaces fragmented tools with a single, unified platform designed for clarity, control, 
    and global scale.
  </p>

  <br />

  <strong>
    Why finance teams choose this ERP
  </strong>

  <ul>
    <li>
      Centralized financial operations across invoices, expenses, payroll, and reporting.
    </li>
    <li>
      Clear approval flows and role-based permissions for full operational control.
    </li>
    <li>
      Multi-entity and multi-currency support for global organizations.
    </li>
    <li>
      Real-time insights that help teams make faster, data-driven decisions.
    </li>
  </ul>

  <br />

  <p>
    The system is designed to grow with your business—from startups to large enterprises. 
    Teams can activate only the modules they need while keeping finance and compliance 
    functions always available.
  </p>

  <br />

  <table>
    <thead>
      <tr>
        <th>Capability</th>
        <th>Benefit</th>
        <th>Who It Helps</th>
        <th>Impact</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Automated Invoicing</td>
        <td>Faster billing cycles</td>
        <td>Finance Teams</td>
        <td>Improved cash flow</td>
      </tr>
      <tr>
        <td>Role-Based Access</td>
        <td>Controlled permissions</td>
        <td>Enterprises</td>
        <td>Reduced risk</td>
      </tr>
      <tr>
        <td>Multi-Currency Support</td>
        <td>Global readiness</td>
        <td>International Teams</td>
        <td>Operational efficiency</td>
      </tr>
      <tr>
        <td>Real-Time Reporting</td>
        <td>Instant visibility</td>
        <td>Executives</td>
        <td>Better decisions</td>
      </tr>
      <tr>
        <td>Modular Architecture</td>
        <td>Flexible setup</td>
        <td>Growing Companies</td>
        <td>Scalable growth</td>
      </tr>
    </tbody>
  </table>
</RichText>

      </CookiesPolicyContainer>
    </Page>
  );
}

const CookiesPolicyContainer = styled.div`
  max-width: 90rem;
  margin: auto;
  overflow-x: auto;
`;
