import PageIndex from 'components/site/PageIndex';
import { comparisons } from 'data/comparisons';

export default function CompareIndex() {
  return (
    <PageIndex
      eyebrow="Compare"
      title="How Chains compares"
      description="Where Chains fits next to accounting software and broad ERPs, and when they are the better choice."
      base="/compare"
      pages={comparisons}
    />
  );
}
