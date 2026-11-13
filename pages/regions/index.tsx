import PageIndex from 'components/site/PageIndex';
import { regions } from 'data/regions';

export default function RegionsIndex() {
  return (
    <PageIndex
      eyebrow="Where Chains works"
      title="Where Chains works"
      description="Open to businesses anywhere: 16 home currencies, invoices in 50+, stablecoin payments, and FleetOps deliveries."
      base="/regions"
      pages={regions}
    />
  );
}
