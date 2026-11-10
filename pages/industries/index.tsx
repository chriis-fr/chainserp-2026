import PageIndex from 'components/site/PageIndex';
import { industries } from 'data/industries';

export default function IndustriesIndex() {
  return (
    <PageIndex
      eyebrow="Who it’s for"
      title="Built for the businesses we know"
      description="Bars, restaurants, cafés and hotels first, plus logistics, online shops and service businesses."
      base="/industries"
      pages={industries}
    />
  );
}
