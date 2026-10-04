// src/hooks/useCourseProgress.js
import { useCallback, useEffect, useState } from 'react';
import { progressService } from '../api/services/progress';

/**
 * Server-backed lesson progress for a single course.
 * Reads/writes /api/v1/progress/{slug}/ endpoints.
 */
export function useCourseProgress(courseSlug) {
  const [state, setState] = useState({
    completedIds: new Set(),
    percent: 0,
    total: 0,
    lastLessonId: null,
    loading: true,
  });

  const refetch = useCallback(async () => {
    if (!courseSlug) return;
    try {
      const [progress, completions] = await Promise.all([
        progressService.detail(courseSlug).catch(() => null),
        progressService.completions(courseSlug).catch(() => []),
      ]);
      setState({
        completedIds: new Set(completions.map((c) => c.lesson)),
        percent: progress?.percent ?? 0,
        total: progress?.total_count ?? 0,
        lastLessonId: progress?.last_lesson_id ?? null,
        loading: false,
      });
    } catch {
      setState((s) => ({ ...s, loading: false }));
    }
  }, [courseSlug]);

  useEffect(() => { refetch(); }, [refetch]);

  const toggle = useCallback(async (lessonId) => {
    // Optimistic update
    setState((s) => {
      const next = new Set(s.completedIds);
      next.has(lessonId) ? next.delete(lessonId) : next.add(lessonId);
      return { ...s, completedIds: next };
    });
    try {
      await progressService.toggle(lessonId);
      await refetch();
    } catch {
      await refetch();   // roll back on failure
    }
  }, [refetch]);

  const isDone = useCallback((lessonId) => state.completedIds.has(lessonId), [state.completedIds]);

  return {
    completed: state.completedIds,
    percent: state.percent,
    total: state.total,
    lastLessonId: state.lastLessonId,
    loading: state.loading,
    toggle,
    isDone,
    refetch,
  };
}