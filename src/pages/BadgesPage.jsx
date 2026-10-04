// src/pages/BadgesPage.jsx
import { useCallback, useEffect, useState } from 'react';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import BadgeCard from '../components/badges/BadgeCard';
import Button from '../components/ui/Button';
import { badgesService } from '../api/services/badges';

const PER_PAGE = 12;

export default function BadgesPage() {
  const [state, setState] = useState({
    items: [],
    count: 0,
    totalPages: 1,
    page: 1,
    loading: true,
    error: null,
  });

  const load = useCallback(async (page = 1) => {
    setState((s) => ({ ...s, loading: true, error: null }));
    try {
      const res = await badgesService.list({ page, pageSize: PER_PAGE });
      setState({
        items: res.results ?? res,
        count: res.count ?? (res.results ?? res).length,
        totalPages: res.total_pages ?? 1,
        page,
        loading: false,
        error: null,
      });
    } catch (err) {
      setState((s) => ({ ...s, loading: false, error: err }));
    }
  }, []);

  useEffect(() => { load(1); }, [load]);

  const goTo = (p) => {
    load(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main id="main">
      <section className="badges-hero">
        <div className="wrap">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'My badges' },
            ]}
          />
          <h1>My badges</h1>
          <p>
            Every course you finish earns a verifiable KALRO badge. Download
            them as PNGs to share with buyers, cooperatives and county programs.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          {state.loading && (
            <div className="badges-loading">
              <i className="fa-solid fa-circle-notch fa-spin" aria-hidden="true" />
              <span>Loading your badges…</span>
            </div>
          )}

          {!state.loading && state.error && (
            <div className="badges-error">
              <h2>Could not load your badges</h2>
              <p>{state.error.message || 'Please try again in a moment.'}</p>
              <Button variant="primary" onClick={() => load(state.page)}>
                Try again
              </Button>
            </div>
          )}

          {!state.loading && !state.error && state.items.length === 0 && (
            <div className="badges-empty">
              <div className="badges-empty__icon">
                <i className="fa-solid fa-award" aria-hidden="true" />
              </div>
              <h2>No badges yet</h2>
              <p>Finish a course to earn your first KALRO badge.</p>
              <Button variant="primary" size="lg" href="/courses">
                Browse courses
              </Button>
            </div>
          )}

          {!state.loading && !state.error && state.items.length > 0 && (
            <>
              <div className="badges-toolbar">
                <p className="badges-toolbar__count">
                  <strong>{state.count}</strong>{' '}
                  {state.count === 1 ? 'badge' : 'badges'} earned
                </p>
              </div>

              <div className="badges-grid">
                {state.items.map((b) => (
                  <BadgeCard key={b.badgeId} badge={b} />
                ))}
              </div>

              {state.totalPages > 1 && (
                <nav className="pager" aria-label="Badges pagination">
                  <button
                    type="button"
                    className="pager__btn"
                    onClick={() => goTo(state.page - 1)}
                    disabled={state.page === 1}
                    aria-label="Previous page"
                  >
                    <i className="fa-solid fa-chevron-left" aria-hidden="true" />
                  </button>
                  <span className="pager__gap">
                    Page {state.page} of {state.totalPages}
                  </span>
                  <button
                    type="button"
                    className="pager__btn"
                    onClick={() => goTo(state.page + 1)}
                    disabled={state.page === state.totalPages}
                    aria-label="Next page"
                  >
                    <i className="fa-solid fa-chevron-right" aria-hidden="true" />
                  </button>
                </nav>
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}