// src/pages/CoursesPage.jsx
import { useEffect, useState } from 'react';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import CourseFilters from '../components/courses/CourseFilters';
import CourseToolbar from '../components/courses/CourseToolbar';
import CourseGrid from '../components/courses/CourseGrid';
import CourseEmpty from '../components/courses/CourseEmpty';
import Pagination from '../components/courses/Pagination';
import { useCourses } from '../hooks/useCourses';
import { pathwaysService } from '../api/services/courses';

export default function CoursesPage() {
  const {
    state,
    results,
    totalResults,
    totalPages,
    activeCount,
    loading,
    error,
    setQ,
    toggleSubject,
    toggleLevel,
    setDuration,
    setPathway,
    setSort,
    setPage,
    clearAll,
  } = useCourses();

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [view, setView] = useState('grid');

  // Resolve the pathway slug → readable title for the toolbar chip
  const [pathwayTitle, setPathwayTitle] = useState(null);

  useEffect(() => {
    if (!state.pathway) {
      setPathwayTitle(null);
      return;
    }
    let cancelled = false;
    pathwaysService
      .detail(state.pathway)
      .then((p) => {
        if (!cancelled) setPathwayTitle(p.title || state.pathway);
      })
      .catch(() => {
        if (!cancelled) setPathwayTitle(state.pathway);
      });
    return () => {
      cancelled = true;
    };
  }, [state.pathway]);

  return (
    <main id="main">
      {/* ─── Hero ──────────────────────────────────────────── */}
      <section className="courses-hero">
        <div className="wrap">
          <div className="courses-hero__top">
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'Courses' },
              ]}
            />
          </div>

          <h1>{pathwayTitle ? pathwayTitle : 'All courses'}</h1>
          <p>
            {pathwayTitle
              ? 'Courses in this learning pathway. Finish them all to earn the pathway badge.'
              : 'Free, practical training from KALRO researchers. Learn online or offline and earn a verified badge when you finish.'}
          </p>

          <div className="courses-hero__meta">
            <span className="hero-chip">
              <i className="fa-solid fa-layer-group" aria-hidden="true" />
              {loading ? '…' : `${totalResults} courses`}
            </span>
            {pathwayTitle && (
              <span className="hero-chip hero-chip--pathway">
                <i className="fa-solid fa-route" aria-hidden="true" />
                {pathwayTitle}
                <button
                  type="button"
                  className="hero-chip__clear"
                  onClick={() => setPathway(null)}
                  aria-label="Clear pathway filter"
                >
                  <i className="fa-solid fa-xmark" aria-hidden="true" />
                </button>
              </span>
            )}
            <span className="hero-chip">
              <i className="fa-solid fa-award" aria-hidden="true" />
              Verified badges
            </span>
            <span className="hero-chip">
              <i className="fa-solid fa-wifi" aria-hidden="true" />
              Works offline
            </span>
          </div>
        </div>
      </section>

      {/* ─── Body ──────────────────────────────────────────── */}
      <section className="section courses-page">
        <div className="wrap courses-page__layout">
          <div
            className={`courses-page__sidebar ${
              mobileFiltersOpen ? 'is-open' : ''
            }`}
          >
            <CourseFilters
              state={state}
              activeCount={activeCount}
              setQ={setQ}
              toggleSubject={toggleSubject}
              toggleLevel={toggleLevel}
              setDuration={setDuration}
              clearAll={clearAll}
              onCloseMobile={() => setMobileFiltersOpen(false)}
            />
          </div>

          <div className="courses-page__main">
            <CourseToolbar
              totalResults={totalResults}
              sort={state.sort}
              setSort={setSort}
              activeCount={activeCount}
              onOpenFilters={() => setMobileFiltersOpen(true)}
              view={view}
              setView={setView}
              searchTerm={state.q}
              onClearSearch={() => setQ('')}
              pathwayLabel={pathwayTitle}
              onClearPathway={() => setPathway(null)}
            />

            {error && (
              <div className="courses-error">
                <p>
                  Could not load the catalogue.
                  {error.message ? ` ${error.message}` : ''}
                </p>
                <button
                  type="button"
                  className="btn btn--primary btn--sm"
                  onClick={clearAll}
                >
                  Reset filters
                </button>
              </div>
            )}

            {loading && !error && (
              <div className="courses-loading">
                <i
                  className="fa-solid fa-circle-notch fa-spin"
                  aria-hidden="true"
                />
                <span>Loading courses…</span>
              </div>
            )}

            {!loading && !error && results.length === 0 && (
              <CourseEmpty onClear={clearAll} />
            )}

            {!loading && !error && results.length > 0 && (
              <>
                <CourseGrid courses={results} view={view} />
                <Pagination
                  page={state.page}
                  totalPages={totalPages}
                  setPage={setPage}
                />
              </>
            )}
          </div>
        </div>
      </section>

      {mobileFiltersOpen && (
        <button
          type="button"
          className="filters-backdrop"
          aria-label="Close filters"
          onClick={() => setMobileFiltersOpen(false)}
        />
      )}
    </main>
  );
}