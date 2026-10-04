// src/pages/PlaceholderPage.jsx
import Breadcrumbs from '../components/ui/Breadcrumbs';

/**
 * PlaceholderPage
 * Generic page for routes that are wired but not yet authored
 * (Privacy, Terms). Keeps the footer links live and useful.
 */
export default function PlaceholderPage({ title = 'Coming soon' }) {
  return (
    <main id="main" className="section">
      <div
        className="wrap"
        style={{ padding: '80px 0', maxWidth: 640, margin: '0 auto', textAlign: 'center' }}
      >
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: title },
          ]}
        />
        <h1 style={{ fontSize: '2rem', marginTop: 24 }}>{title}</h1>
        <p style={{ color: 'var(--muted)', marginTop: 12, lineHeight: 1.6 }}>
          This page is being prepared. For questions, call our toll-free
          line on{' '}
          <a href="tel:0800721741" style={{ color: 'var(--leaf-600)' }}>
            0800 721 741
          </a>{' '}
          or email{' '}
          <a href="mailto:mkulima@kalro.org" style={{ color: 'var(--leaf-600)' }}>
            mkulima@kalro.org
          </a>
          .
        </p>
      </div>
    </main>
  );
}