import PageIndex from 'components/site/PageIndex';
import { problems } from 'data/problems';

export default function ProblemsIndex() {
  return (
    <PageIndex
      eyebrow="Problems we solve"
      title="The problems Chains is built to fix"
      description="Unpaid invoices, unapproved payments, cash that does not add up, and deliveries you cannot see."
      base="/problems"
      pages={problems}
    />
  );
}
