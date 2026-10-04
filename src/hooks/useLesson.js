// src/hooks/useLesson.js
import { useEffect, useState } from 'react';
import { lessonsService } from '../api/services/courses';
import { progressService } from '../api/services/progress';

/**
 * useLesson
 * Fetch a single lesson by course slug + lesson identifier (slug or UUID).
 *
 * On successful load, tells the backend which lesson the learner is
 * viewing so the dashboard's "Resume" button works.
 *
 * Returns:
 *   { lesson, loading, error, refetch }
 */
export function useLesson(courseSlug, lessonIdentifier) {
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    if (!courseSlug || !lessonIdentifier) return;
    let cancelled = false;

    setLoading(true);
    setError(null);

    lessonsService
      .detail(courseSlug, lessonIdentifier)
      .then((data) => {
        if (!cancelled) setLesson(data);
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
  }, [courseSlug, lessonIdentifier, reloadKey]);

  // Notify the backend of the current position (uses lesson.id, not
  // the URL identifier — the backend expects a real UUID here).
  useEffect(() => {
    if (courseSlug && lesson?.id) {
      progressService.setLastLesson(courseSlug, lesson.id).catch(() => {});
    }
  }, [courseSlug, lesson?.id]);

  const refetch = () => setReloadKey((k) => k + 1);

  return { lesson, loading, error, refetch };
}