// src/hooks/useCourse.js
import { useEffect, useState } from 'react';
import { coursesService } from '../api/services/courses';

/**
 * useCourse
 * Fetch a single course by slug.
 *
 * Returns:
 *   { course, loading, error }
 *   - course: object or null
 *   - loading: boolean; true while the first request is in flight
 *   - error: ApiError or null
 *
 * The effect is cancelled on unmount or when the slug changes so stale
 * responses don't overwrite fresh state.
 */
export function useCourse(slug) {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) {
      setCourse(null);
      setLoading(false);
      setError(null);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    coursesService
      .detail(slug)
      .then((data) => {
        if (!cancelled) setCourse(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  return { course, loading, error };
}

/**
 * useRelatedCourses
 * Fetch the "You might also like" list for a course.
 *
 * Returns the array of related courses directly (empty while loading
 * or on error). Components can map over it without destructuring.
 *
 * A `limit` option is available when a caller wants a fixed number of
 * items regardless of what the backend returns — useful for the
 * homepage strip or a sidebar variant.
 *
 *   const courses = useRelatedCourses('mango-farming');
 *   const topThree = useRelatedCourses('mango-farming', { limit: 3 });
 */
export function useRelatedCourses(slug, { limit } = {}) {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (!slug) {
      setCourses([]);
      return;
    }

    let cancelled = false;

    coursesService
      .related(slug)
      .then((res) => {
        if (cancelled) return;
        // Handle both paginated (`{ results: [...] }`) and raw array
        // responses, plus the occasional `{ data: [...] }` shape.
        const items = res?.results ?? res?.data ?? res ?? [];
        setCourses(limit ? items.slice(0, limit) : items);
      })
      .catch(() => {
        if (!cancelled) setCourses([]);
      });

    return () => {
      cancelled = true;
    };
  }, [slug, limit]);

  return courses;
}