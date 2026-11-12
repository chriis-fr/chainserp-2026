import { Icon, WhatsAppIcon } from 'components/site/Icon';
import { LINKS } from 'components/site/links';

/** The quick ways to reach a person, next to the contact form. */
export default function InformationSection() {
  return (
    <div className="cx cx-reach">
      <span className="cx-eyebrow">Fastest</span>
      <a className="cx-reach-card" href={LINKS.whatsapp} target="_blank" rel="noopener">
        <span className="cx-reach-i wa">
          <WhatsAppIcon />
        </span>
        <span>
          <b>WhatsApp</b>
          <small>A person replies, usually within the hour.</small>
        </span>
        <Icon name="arrow" />
      </a>
      <a className="cx-reach-card" href={LINKS.email}>
        <span className="cx-reach-i">
          <Icon name="chat" />
        </span>
        <span>
          <b>hello@chains-erp.com</b>
          <small>For anything longer, or with attachments.</small>
        </span>
        <Icon name="arrow" />
      </a>
      <a className="cx-reach-card" href={LINKS.calendly}>
        <span className="cx-reach-i">
          <Icon name="calendar" />
        </span>
        <span>
          <b>Book 30 minutes</b>
          <small>See Chains on your own business, live.</small>
        </span>
        <Icon name="arrow" />
      </a>
    </div>
  );
}
