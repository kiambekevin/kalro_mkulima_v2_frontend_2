// src/hooks/useCourseFilters.js
import { useEffect, useMemo, useState } from 'react';
import { courses, durations } from '../data/courses';
import { useDebounce } from './useDebounce';

const PER_PAGE = 9;

const initialState = {
  q: '',
  subjects: [],   // array of subject slugs
  levels: [],     // array of level slugs
  duration: null, // duration slug
  sort: 'popular', // 'popular' | 'newest' | 'rating' | 'az'
  page: 1,
};

/**
 * useCourseFilters
 * Centralised filter + sort + pagination state for the courses page.
 * Keeps the URL in sync via query params so filters are shareable.
 */
export function useCourseFilters() {
  const [state, setState] = useState(() => readFromUrl() || initialState);
  const debouncedQ = useDebounce(state.q, 250);

  /* Push state to the URL whenever it changes */
  useEffect(() => {
    writeToUrl({ ...state, q: debouncedQ });
  }, [state, debouncedQ]);

  /* Reset to page 1 whenever filters/sort change */
  useEffect(() => {
    setState((s) => ({ ...s, page: 1 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedQ, state.subjects.join(','), state.levels.join(','), state.duration, state.sort]);

  const filtered = useMemo(() => {
    const q = debouncedQ.trim().toLowerCase();

    let list = courses.filter((c) => {
      if (q && !(c.title + ' ' + c.summary + ' ' + c.subjectLabel).toLowerCase().includes(q)) {
        return false;
      }
      if (state.subjects.length && !state.subjects.includes(c.subject)) return false;
      if (state.levels.length && !state.levels.includes(c.level)) return false;
      if (state.duration) {
        const bucket = durations.find((d) => d.slug === state.duration);
        if (bucket && (c.hours < bucket.min || c.hours > bucket.max)) return false;
      }
      return true;
    });

    switch (state.sort) {
      case 'newest':
        list = [...list].sort((a, b) => new Date(b.updated) - new Date(a.updated));
        break;
      case 'rating':
        list = [...list].sort((a, b) => b.rating - a.rating);
        break;
      case 'az':
        list = [...list].sort((a, b) => a.title.localeCompare(b.title));
        break;
      default: // popular
        list = [...list].sort((a, b) => Number(b.popular) - Number(a.popular) || b.rating - a.rating);
    }

    return list;
  }, [debouncedQ, state.subjects, state.levels, state.duration, state.sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const page = Math.min(state.page, totalPages);
  const pageItems = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  /* ─── Mutators ─── */
  const setQ = (q) => setState((s) => ({ ...s, q }));
  const toggleSubject = (slug) =>
    setState((s) => ({
      ...s,
      subjects: s.subjects.includes(slug)
        ? s.subjects.filter((x) => x !== slug)
        : [...s.subjects, slug],
    }));
  const toggleLevel = (slug) =>
    setState((s) => ({
      ...s,
      levels: s.levels.includes(slug)
        ? s.levels.filter((x) => x !== slug)
        : [...s.levels, slug],
    }));
  const setDuration = (slug) =>
    setState((s) => ({ ...s, duration: s.duration === slug ? null : slug }));
  const setSort = (sort) => setState((s) => ({ ...s, sort }));
  const setPage = (page) => setState((s) => ({ ...s, page }));
  const clearAll = () => setState({ ...initialState });

  const activeCount =
    (debouncedQ ? 1 : 0) +
    state.subjects.length +
    state.levels.length +
    (state.duration ? 1 : 0);

  return {
    state: { ...state, q: debouncedQ },
    results: pageItems,
    totalResults: filtered.length,
    totalPages,
    page,
    activeCount,
    // mutators
    setQ,
    toggleSubject,
    toggleLevel,
    setDuration,
    setSort,
    setPage,
    clearAll,
  };
}

/* ───────────────────────────── URL helpers ───────────────────────────── */

function readFromUrl() {
  if (typeof window === 'undefined') return null;
  const p = new URLSearchParams(window.location.search);
  const hasAny =
    p.has('q') || p.has('subject') || p.has('level') || p.has('duration') || p.has('sort') || p.has('page');
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
  const url = qs ? `${window.location.pathname}?${qs}` : window.location.pathname;
  window.history.replaceState({}, '', url);
}