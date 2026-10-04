// src/hooks/useCourses.js
import { useEffect, useMemo, useRef, useState } from 'react';
import { coursesService } from '../api/services/courses';
import { useDebounce } from './useDebounce';

const PER_PAGE = 9;

const initialState = {
  q: '',
  subjects: [],   // array of subject slugs
  levels: [],     // array of level slugs
  duration: null, // 'short' | 'medium' | 'long' | null
  sort: 'popular',
  page: 1,
};

/**
 * useCourses
 * Centralised filter + sort + pagination state for the catalogue.
 *
 *   - Reads initial state from the URL on mount (`?q=&subject=&level=…`)
 *   - Debounces the search term (250 ms)
 *   - Refetches when any filter changes
 *   - Writes the state back to the URL so filters are shareable
 *   - Provides mutators that mirror the components' expectations
 */
export function useCourses() {
  const [state, setState] = useState(() => readFromUrl() || initialState);
  const [data, setData] = useState({
    results: [],
    count: 0,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const debouncedQ = useDebounce(state.q, 250);
  const reqIdRef = useRef(0);

  // ── Fetch when any filter changes ──────────────────────────
  useEffect(() => {
    const reqId = ++reqIdRef.current;
    setLoading(true);
    setError(null);

    coursesService
      .list({
        q: debouncedQ,
        subject: state.subjects,
        level: state.levels,
        duration: state.duration,
        sort: state.sort,
        page: state.page,
        pageSize: PER_PAGE,
      })
      .then((res) => {
        if (reqId !== reqIdRef.current) return; // stale response
        setData({
          results: res.results ?? res,
          count: res.count ?? (res.results ?? res).length,
          totalPages: res.total_pages ?? 1,
        });
      })
      .catch((err) => {
        if (reqId !== reqIdRef.current) return;
        setError(err);
      })
      .finally(() => {
        if (reqId === reqIdRef.current) setLoading(false);
      });
  }, [
    debouncedQ,
    state.subjects.join(','),
    state.levels.join(','),
    state.duration,
    state.sort,
    state.page,
  ]);

  // ── Keep the URL in sync ────────────────────────────────────
  useEffect(() => {
    writeToUrl({ ...state, q: debouncedQ });
  }, [state, debouncedQ]);

  // ── Mutators ───────────────────────────────────────────────
  const mutators = useMemo(
    () => ({
      setQ: (q) => setState((s) => ({ ...s, q, page: 1 })),

      toggleSubject: (slug) =>
        setState((s) => ({
          ...s,
          subjects: s.subjects.includes(slug)
            ? s.subjects.filter((x) => x !== slug)
            : [...s.subjects, slug],
          page: 1,
        })),

      toggleLevel: (slug) =>
        setState((s) => ({
          ...s,
          levels: s.levels.includes(slug)
            ? s.levels.filter((x) => x !== slug)
            : [...s.levels, slug],
          page: 1,
        })),

      setDuration: (slug) =>
        setState((s) => ({
          ...s,
          duration: s.duration === slug ? null : slug,
          page: 1,
        })),

      setSort: (sort) => setState((s) => ({ ...s, sort, page: 1 })),

      setPage: (page) => setState((s) => ({ ...s, page })),

      clearAll: () => setState({ ...initialState }),
    }),
    []
  );

  const activeCount =
    (debouncedQ ? 1 : 0) +
    state.subjects.length +
    state.levels.length +
    (state.duration ? 1 : 0);

  return {
    state: { ...state, q: debouncedQ },
    results: data.results,
    totalResults: data.count,
    totalPages: data.totalPages,
    activeCount,
    loading,
    error,
    ...mutators,
  };
}

/* ───────────────────────────── URL helpers ───────────────────────────── */

function readFromUrl() {
  if (typeof window === 'undefined') return null;
  const p = new URLSearchParams(window.location.search);

  const hasAny =
    p.has('q') ||
    p.has('subject') ||
    p.has('level') ||
    p.has('duration') ||
    p.has('sort') ||
    p.has('page') ||
    p.has('pathway');

  if (!hasAny) return null;

  return {
    q: p.get('q') || '',
    subjects: p.get('subject') ? p.get('subject').split(',') : [],
    levels: p.get('level') ? p.get('level').split(',') : [],
    duration: p.get('duration') || null,
    sort: p.get('sort') || 'popular',
    page: Number(p.get('page')) || 1,
  };
}

function writeToUrl(state) {
  const p = new URLSearchParams();

  if (state.q) p.set('q', state.q);
  if (state.subjects.length) p.set('subject', state.subjects.join(','));
  if (state.levels.length) p.set('level', state.levels.join(','));
  if (state.duration) p.set('duration', state.duration);
  if (state.sort && state.sort !== 'popular') p.set('sort', state.sort);
  if (state.page > 1) p.set('page', String(state.page));

  const qs = p.toString();
  const url = qs
    ? `${window.location.pathname}?${qs}`
    : window.location.pathname;
  window.history.replaceState({}, '', url);
}