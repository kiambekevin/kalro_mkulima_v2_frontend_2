// src/components/courses/CourseFilters.jsx
import { useEffect, useMemo, useState } from 'react';
import Button from '../ui/Button';
import { coursesService } from '../../api/services/courses';

/**
 * CourseFilters
 * Sidebar with search, subject checkboxes, level radios, duration pills,
 * and a "clear all" action. Fully controlled by the parent via the
 * `useCourses` hook.
 *
 * Props:
 *   state          — { q, subjects, levels, duration, sort, page }
 *   activeCount    — integer; number of active filters
 *   setQ           — (value) => void
 *   toggleSubject  — (slug) => void
 *   toggleLevel    — (slug) => void
 *   setDuration    — (slug) => void
 *   clearAll       — () => void
 *   onCloseMobile  — () => void; called after any change so the mobile
 *                    drawer closes
 */

const LEVELS = [
  { slug: 'beginner',     label: 'Beginner' },
  { slug: 'intermediate', label: 'Intermediate' },
  { slug: 'advanced',     label: 'Advanced' },
];

const DURATIONS = [
  { slug: 'short',  label: 'Under 4 hrs' },
  { slug: 'medium', label: '4 – 8 hrs' },
  { slug: 'long',   label: 'Over 8 hrs' },
];

export default function CourseFilters({
  state,
  activeCount,
  setQ,
  toggleSubject,
  toggleLevel,
  setDuration,
  clearAll,
  onCloseMobile,
}) {
  // Live subjects from the API (with course_count from the backend)
  const [subjects, setSubjects] = useState([]);
  const [subjectsLoading, setSubjectsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    coursesService
      .subjects()
      .then((res) => {
        if (cancelled) return;
        setSubjects(res.results ?? res);
      })
      .catch(() => {
        if (!cancelled) setSubjects([]);
      })
      .finally(() => {
        if (!cancelled) setSubjectsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Close the mobile drawer after any filter change
  const handle = (fn) => (value) => {
    fn(value);
    onCloseMobile?.();
  };

  // Sort subjects alphabetically for stable display
  const orderedSubjects = useMemo(
    () => [...subjects].sort((a, b) => a.label.localeCompare(b.label)),
    [subjects]
  );

  return (
    <aside className="filters" aria-label="Course filters">
      {/* ─── Header ────────────────────────────────────────── */}
      <div className="filters__head">
        <h2>
          <i className="fa-solid fa-sliders" aria-hidden="true" />
          Filters
        </h2>
        {activeCount > 0 && (
          <button
            type="button"
            className="filters__clear"
            onClick={clearAll}
          >
            Clear all ({activeCount})
          </button>
        )}
      </div>

      {/* ─── Search ────────────────────────────────────────── */}
      <div className="filters__group">
        <label htmlFor="filter-q" className="filters__label">
          <i className="fa-solid fa-magnifying-glass" aria-hidden="true" />
          Search
        </label>
        <div className="filters__search">
          <i className="fa-solid fa-magnifying-glass" aria-hidden="true" />
          <input
            id="filter-q"
            type="search"
            placeholder="Crop, livestock, topic…"
            value={state.q}
            onChange={(e) => setQ(e.target.value)}
            autoComplete="off"
          />
          {state.q && (
            <button
              type="button"
              className="filters__search-clear"
              onClick={() => setQ('')}
              aria-label="Clear search"
            >
              <i className="fa-solid fa-xmark" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      {/* ─── Subject ───────────────────────────────────────── */}
      <fieldset className="filters__group">
        <legend className="filters__label">
          <i className="fa-solid fa-wheat-awn" aria-hidden="true" />
          Subject
        </legend>

        {subjectsLoading && (
          <ul className="filters__options filters__options--loading" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, i) => (
              <li key={i} className="filters__skeleton" />
            ))}
          </ul>
        )}

        {!subjectsLoading && orderedSubjects.length === 0 && (
          <p className="filters__empty">No subjects available.</p>
        )}

        {!subjectsLoading && orderedSubjects.length > 0 && (
          <ul className="filters__options">
            {orderedSubjects.map((s) => (
              <li key={s.slug}>
                <label className="check">
                  <input
                    type="checkbox"
                    checked={state.subjects.includes(s.slug)}
                    onChange={() => handle(toggleSubject)(s.slug)}
                  />
                  <span className="check__box" aria-hidden="true">
                    <i className="fa-solid fa-check" />
                  </span>
                  <span className="check__label">
                    <i
                      className={s.icon || 'fa-solid fa-book-open'}
                      aria-hidden="true"
                    />
                    {s.label}
                  </span>
                  {typeof s.course_count === 'number' && (
                    <span className="check__count">{s.course_count}</span>
                  )}
                </label>
              </li>
            ))}
          </ul>
        )}
      </fieldset>

      {/* ─── Level ─────────────────────────────────────────── */}
      <fieldset className="filters__group">
        <legend className="filters__label">
          <i className="fa-solid fa-graduation-cap" aria-hidden="true" />
          Level
        </legend>
        <ul className="filters__options">
          {LEVELS.map((l) => (
            <li key={l.slug}>
              <label className="check">
                <input
                  type="checkbox"
                  checked={state.levels.includes(l.slug)}
                  onChange={() => handle(toggleLevel)(l.slug)}
                />
                <span className="check__box" aria-hidden="true">
                  <i className="fa-solid fa-check" />
                </span>
                <span className="check__label">{l.label}</span>
              </label>
            </li>
          ))}
        </ul>
      </fieldset>

      {/* ─── Duration ──────────────────────────────────────── */}
      <fieldset className="filters__group">
        <legend className="filters__label">
          <i className="fa-regular fa-clock" aria-hidden="true" />
          Duration
        </legend>
        <ul className="filters__pills">
          {DURATIONS.map((d) => (
            <li key={d.slug}>
              <button
                type="button"
                className={`pill ${state.duration === d.slug ? 'is-on' : ''}`}
                onClick={() => handle(setDuration)(d.slug)}
                aria-pressed={state.duration === d.slug}
              >
                {d.label}
              </button>
            </li>
          ))}
        </ul>
      </fieldset>

      {/* ─── Help ──────────────────────────────────────────── */}
      <div className="filters__help">
        <i className="fa-solid fa-circle-info" aria-hidden="true" />
        <p>
          Can’t find a topic?{' '}
          <a href="#faq">Contact support</a> or browse the full{' '}
          <a href="/courses">catalogue</a>.
        </p>
      </div>

      {/* ─── Mobile "Show results" CTA ─────────────────────── */}
      <div className="filters__mobile-cta">
        <Button variant="primary" onClick={onCloseMobile} type="button">
          Show results
        </Button>
      </div>
    </aside>
  );
}