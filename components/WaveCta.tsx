import { Icon, WhatsAppIcon } from 'components/site/Icon';
import { LINKS } from 'components/site/links';

/** The closing call to action at the foot of every page. */
export default function WaveCta() {
  return (
    <section className="cx cx-close">
      <div className="cx-wrap">
        <div className="cx-close-card">
          <span className="cx-eyebrow" style={{ color: '#a8b6de' }}>
            Get started
          </span>
          <h2>Send us your business name. We'll set up the rest with you.</h2>
          <p>Start free for 15 days with no card, or message us on WhatsApp and we'll switch on the till and connect your own M-Pesa number.</p>
          <div className="cx-cta">
            <a className="cx-btn cx-btn-primary" href={LINKS.whatsapp} target="_blank" rel="noopener">
              <WhatsAppIcon /> Set up on WhatsApp
            </a>
            <a className="cx-btn cx-btn-quiet" href={LINKS.signUp}>
              Start free <Icon name="arrow" />
            </a>
          </div>
          <div className="cx-close-links">
            <span>
              Prefer a call? <a href={LINKS.calendly}>Book 30 minutes</a>
            </span>
            <span>
              Already with us? <a href={LINKS.signIn}>Sign in</a> · <a href={LINKS.posSignIn}>Open the till</a>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
