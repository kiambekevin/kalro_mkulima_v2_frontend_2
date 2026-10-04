// src/pages/BadgeVerifyPage.jsx
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import BadgeGenerator from '../components/badges/BadgeGenerator';
import Button from '../components/ui/Button';
import { badgesService } from '../api/services/badges';

export default function BadgeVerifyPage() {
  const { badgeId } = useParams();
  const navigate = useNavigate();

  const [query, setQuery] = useState(badgeId || '');
  const [state, setState] = useState({
    loading: Boolean(badgeId),
    result: null,
    error: null,
  });

  // Fetch verification when a badgeId is in the URL
  useEffect(() => {
    if (!badgeId) {
      setState({ loading: false, result: null, error: null });
      return;
    }
    let cancelled = false;
    setState({ loading: true, result: null, error: null });

    badgesService
      .verify(badgeId)
      .then((result) => {
        if (!cancelled) setState({ loading: false, result, error: null });
      })
      .catch((err) => {
        if (cancelled) return;
        if (err.status === 404) {
          setState({
            loading: false,
            result: { verified: false, reason: 'not_found', message: 'No badge found with this ID.' },
            error: null,
          });
        } else {
          setState({
            loading: false,
            result: null,
            error: err.message || 'Verification failed. Try again shortly.',
          });
        }
      });

    return () => { cancelled = true; };
  }, [badgeId]);

  // Form submit → push the ID into the URL
  const submit = (e) => {
    e.preventDefault();
    const trimmed = query.trim().toUpperCase();
    if (!trimmed) return;
    navigate(`/badges/verify/${encodeURIComponent(trimmed)}`);
  };

  const badge = state.result?.badge || null;
  const verified = state.result?.verified === true;

  return (
    <main id="main">
      <section className="verify-hero">
        <div className="wrap">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Badges', href: '/badges' },
              { label: 'Verify' },
            ]}
          />
          <h1>Badge verification</h1>
          <p>
            Every KALRO Mkulima badge carries a unique ID that can be checked
            against our registry. Enter one below or scan the QR code on the
            badge.
          </p>

          <form className="verify-form" onSubmit={submit}>
            <label className="sr-only" htmlFor="badgeIdInput">Badge ID</label>
            <input
              id="badgeIdInput"
              type="text"
              className="af-input"
              placeholder="KALRO-B-2025-001847"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoComplete="off"
              spellCheck="false"
            />
            <Button variant="primary" size="lg" type="submit">
              <i className="fa-solid fa-magnifying-glass" aria-hidden="true" />
              Verify
            </Button>
          </form>
        </div>
      </section>

      <section className="section">
        <div className="wrap verify-body">
          {state.loading && (
            <div className="verify-loading">
              <i className="fa-solid fa-circle-notch fa-spin" aria-hidden="true" />
              <span>Checking the registry…</span>
            </div>
          )}

          {state.error && !state.loading && (
            <div className="verify-error">
              <div className="verify-error__icon">
                <i className="fa-solid fa-triangle-exclamation" aria-hidden="true" />
              </div>
              <h2>Could not verify</h2>
              <p>{state.error}</p>
              <Button variant="primary" size="lg" onClick={() => navigate(0)}>
                Try again
              </Button>
            </div>
          )}

          {!state.loading && !state.error && verified && badge && (
            <>
              <div className="verify-status verify-status--ok">
                <i className="fa-solid fa-circle-check" aria-hidden="true" />
                <div>
                  <strong>Verified</strong>
                  <span>
                    This badge was issued by KALRO Mkulima and matches the
                    registry record.
                  </span>
                </div>
              </div>

              <BadgeGenerator badge={badge} size={340} />

              <dl className="verify-meta">
                <div><dt>Badge ID</dt><dd><code>{badge.badgeId}</code></dd></div>
                <div><dt>Course</dt><dd>{badge.courseTitle}</dd></div>
                <div><dt>Subject</dt><dd>{badge.subjectLabel}</dd></div>
                <div><dt>Level</dt><dd>{badge.level}</dd></div>
                <div>
                  <dt>Issued</dt>
                  <dd>
                    {new Date(badge.earnedAt).toLocaleDateString('en-GB', {
                      day: 'numeric', month: 'long', year: 'numeric',
                    })}
                  </dd>
                </div>
              </dl>
            </>
          )}

          {!state.loading && !state.error && !verified && (
            <div className="verify-missing">
              <div className="verify-missing__icon">
                <i className="fa-solid fa-triangle-exclamation" aria-hidden="true" />
              </div>
              <h2>
                {state.result?.reason === 'revoked'
                  ? 'This badge has been revoked'
                  : state.result?.reason === 'expired'
                  ? 'This badge has expired'
                  : 'Badge not found'}
              </h2>
              <p>
                {state.result?.message ||
                  'Check the characters under the QR code and try again.'}
              </p>
              {badgeId && (
                <Button variant="ghost" size="lg" href="/badges/verify">
                  Try a different ID
                </Button>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}