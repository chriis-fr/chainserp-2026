import PageIndex from 'components/site/PageIndex';
import { features } from 'data/features';

export default function FeaturesIndex() {
  return (
    <PageIndex
      eyebrow="Features"
      title="Everything Chains does"
      description="Chains POS, payroll, supplier bills, invoices, treasury, FleetOps logistics and Chains AI, and who each is for."
      base="/features"
      pages={features}
    />
  );
}
