/* eslint-disable react/no-unescaped-entities -- apostrophes in the copy */
import NextLink from 'next/link';
import DocsLayout, { ACCESS_LINK, Callout, LINKS } from 'components/docs/DocsLayout';
import { Icon } from 'components/site/Icon';

/**
 * Using the FleetOps console.
 *
 * Every other page here is for whoever writes the code. This one is for the person who
 * will actually watch the deliveries: how to get in the first time, which environment
 * they are looking at, and where their own keys and webhook secret live.
 *
 * It is linked from the test-key and live-key emails, so it has to answer the questions
 * those emails raise and nothing else.
 */
export default function LogisticsConsoleGuide() {
  const console_ = LINKS.logistics;

  return (
    <DocsLayout
      title="Your FleetOps console"
      seoTitle="Using your FleetOps console — Chains Logistics"
      description="How to sign in to your Chains FleetOps console, switch between Sandbox and Live, follow orders on the map, add drivers and vehicles, and find your API keys and webhook signing secret."
      lead="The console is where you watch every delivery: orders on a live map, who is carrying what, and proof it arrived. Here is how to get in and find your way around."
      keywords={['FleetOps console', 'Fleetbase console guide', 'delivery dispatch dashboard', 'Navigator driver app', 'webhook signing secret']}
    >
      <h2>Signing in the first time</h2>
      <ol className="cx-steps">
        <li>
          <b>Verify your email.</b> When we set up your company, FleetOps emails you a verification link. Open it — nothing else
          works until you do, and your API keys are only created once you have.
        </li>
        <li>
          <b>Set your password.</b> We never choose one for you. Go to{' '}
          <a href={console_} target="_blank" rel="noopener">
            {console_.replace(/^https?:\/\//, '')}
          </a>{' '}
          and use <b>Forgot password</b> with the same email address we set you up with.
        </li>
        <li>
          <b>Sign in.</b> That's it — your company, your pickup locations and your webhook are already there.
        </li>
      </ol>
      <Callout title="Didn't get the email?">
        Check spam for a message from <code>noreply@chains-erp.com</code>. If it isn't there, reply to the email we sent you and we
        will send it again. Don't create a second account — your deliveries and keys belong to the first one.
      </Callout>

      <h2>Sandbox or Live: check this first</h2>
      <p>
        The console has two environments, and the switch is in the top bar. <b>They do not share data.</b> An order you create in
        Sandbox will never appear in Live, and a rider will never be sent to it.
      </p>
      <div className="cx-cards">
        <div className="cx-card">
          <h3>
            <Icon name="spark" /> Sandbox
          </h3>
          <p>
            Where your <b>test key</b> works — the key in your first email, starting <code>flb_test_</code>. Build here, make as
            many mistakes as you like, nothing reaches a real rider and nobody is charged.
          </p>
        </div>
        <div className="cx-card">
          <h3>
            <Icon name="truck" /> Live
          </h3>
          <p>
            Where your <b>live key</b> works, starting <code>flb_live_</code>. We issue it once a test delivery has run end to end.
            Orders here go to real riders.
          </p>
        </div>
      </div>
      <Callout tone="warn" title="If the console looks empty">
        You are almost certainly in the wrong environment. Flip the switch before you conclude something is broken — it is the
        single most common surprise on day one.
      </Callout>

      <h2>What you'll use day to day</h2>
      <ul>
        <li>
          <b>Orders.</b> Every delivery, whether your system created it through the API or you typed it in here. Open one to see its
          route, its status history, and proof of delivery once the rider captures it.
        </li>
        <li>
          <b>The map.</b> Where your riders are right now, and what each is carrying.
        </li>
        <li>
          <b>Dispatch.</b> Assign an order to a driver, or let us dispatch it for you. An order needs a driver before it can be
          dispatched.
        </li>
        <li>
          <b>Drivers and vehicles.</b> Add your riders here. Each driver gets the Navigator app and appears on the map once they
          sign in.
        </li>
        <li>
          <b>Places.</b> Your pickup points. If you dispatch from wherever the order came from, you don't need any — send the pickup
          address with each order instead.
        </li>
      </ul>

      <h2>Your riders' app</h2>
      <p>
        Drivers use <b>Fleetbase Navigator</b>, free on iOS and Android. We link it to your company when we set you up, so a rider
        signs in with the details you create for them in <b>Drivers</b> and immediately sees their jobs, the route, and the proof of
        delivery they need to capture.
      </p>

      <h2>Your keys and your webhook secret</h2>
      <p>
        Under <b>Developers</b> you'll find two things worth knowing about, and the environment switch applies to both.
      </p>
      <ul>
        <li>
          <b>API Keys.</b> The same keys we emailed you. Keep them on your server, never in a browser, a mobile app or a public
          repository. If one leaks, tell us and we will revoke and reissue it the same day.
        </li>
        <li>
          <b>Webhooks.</b> Your endpoint, and its <b>signing secret</b> — the value starting <code>whsec_</code>. Every webhook we
          send is signed with it, and your server should check that signature before trusting the body. It is also in the email we
          sent with your test key.
        </li>
      </ul>
      <Callout title="Why the signature matters">
        Anyone can post JSON at your webhook URL. The signature is how your server knows a delivery update really came from
        FleetOps. <NextLink href="/logistics/docs/webhooks">The webhooks guide</NextLink> has the check in a few lines of code.
      </Callout>

      <h2>Where to go next</h2>
      <div className="cx-cards">
        <NextLink className="cx-card" href="/logistics/docs/integrate">
          <h3>
            <Icon name="globe" /> Connect your system
          </h3>
          <p>Create orders from your own software, and the go-live checklist.</p>
        </NextLink>
        <NextLink className="cx-card" href="/logistics/docs/webhooks">
          <h3>
            <Icon name="spark" /> Webhooks
          </h3>
          <p>The events we send, and how to verify each signature.</p>
        </NextLink>
        <a className="cx-card" href={`${console_}/auth`} target="_blank" rel="noopener">
          <h3>
            <Icon name="truck" /> Open the console
          </h3>
          <p>Sign in and watch your deliveries.</p>
        </a>
      </div>
      <div className="cx-cta">
        <a className="cx-btn cx-btn-quiet" href={LINKS.email}>
          hello@chains-erp.com
        </a>
        <NextLink className="cx-btn cx-btn-quiet" href={ACCESS_LINK}>
          Request access
        </NextLink>
      </div>
    </DocsLayout>
  );
}
