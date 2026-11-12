import NextLink from 'next/link';
import { Icon } from 'components/site/Icon';

export default function NotFoundPage() {
  return (
    <header className="cx cx-page-head">
      <div className="cx-wrap">
        <span className="cx-eyebrow">404 · Page not found</span>
        <h1>This page took a wrong turn.</h1>
        <p>The link may be old or mistyped. Everything Chains does is one click from the homepage.</p>
        <div className="cx-cta" style={{ justifyContent: 'center', marginTop: 28 }}>
          <NextLink className="cx-btn cx-btn-primary" href="/">
            Back to the homepage <Icon name="arrow" />
          </NextLink>
          <NextLink className="cx-btn cx-btn-quiet" href="/contact">
            Contact us
          </NextLink>
        </div>
      </div>
    </header>
  );
}
