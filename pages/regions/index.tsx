import PageIndex from 'components/site/PageIndex';
import { regions } from 'data/regions';

export default function RegionsIndex() {
  return (
    <PageIndex
      eyebrow="Where Chains works"
      title="Where Chains works today"
      description="Money moves by M-Pesa in Kenya today. Invoices in 50+ currencies and FleetOps work for businesses anywhere."
      base="/regions"
      pages={regions}
    />
  );
}
