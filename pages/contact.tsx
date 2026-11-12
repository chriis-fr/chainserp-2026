import Page from 'components/Page';
import FormSection from 'views/ContactPage/FormSection';
import InformationSection from 'views/ContactPage/InformationSection';

export default function ContactPage() {
  return (
    <Page
      eyebrow="Contact"
      title="Talk to a person."
      description="Tell us what you run and what you want Chains to take off your plate. We'll reply and set it up with you."
    >
      <div className="cx-contact">
        <InformationSection />
        <div className="cx-form-card">
          <span className="cx-eyebrow">Send a message</span>
          <FormSection />
        </div>
      </div>
    </Page>
  );
}
