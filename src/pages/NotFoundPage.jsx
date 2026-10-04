// src/pages/NotFoundPage.jsx
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <main id="main" className="section">
      <div className="wrap" style={{ textAlign: 'center', padding: '80px 0' }}>
        <h1 style={{ fontSize: '3rem' }}>Course not found</h1>
        <p style={{ color: 'var(--muted)', margin: '14px 0 26px' }}>
          We couldn’t find that page. Try browsing the full catalogue instead.
        </p>
        <Link to="/courses" className="btn btn--primary btn--lg">
          Back to courses
        </Link>
      </div>
    </main>
  );
}