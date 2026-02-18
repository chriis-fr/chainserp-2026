import styled from 'styled-components';
import Accordion from 'components/Accordion';
import SectionTitle from 'components/SectionTitle';

export default function FaqSection() {
  return (
    <Wrapper>
      <SectionTitle>Frequently Asked Questions</SectionTitle>

      <Accordion title="Who is this ERP designed for?">
        This ERP is built for finance teams, operations teams, and enterprises of all sizes—from fast-growing startups to large global
        organizations managing multiple entities and regions.
      </Accordion>

      <Accordion title="Can we use the ERP in multiple countries and currencies?">
        Yes. The platform is global by default, supporting multiple currencies, regions, and entities with no geographic restrictions or
        regional lock-ins.
      </Accordion>

      <Accordion title="Is the system easy to adopt for non-technical teams?">
        Absolutely. The interface is designed for clarity and speed, allowing finance and operations teams to onboard quickly with minimal
        training.
      </Accordion>

      <Accordion title="How secure is the platform for enterprise use?">
        The ERP includes role-based access control, approval workflows, and audit logs to ensure enterprise-grade security, transparency,
        and compliance.
      </Accordion>

      <Accordion title="Can the ERP scale as our organization grows?">
        Yes. The system is modular and scalable, allowing you to enable new features, teams, and regions as your business expands—without
        disrupting existing operations.
      </Accordion>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  margin-top: 15rem;
  & > *:not(:first-child) {
    margin-top: 3rem;
  }
`;
