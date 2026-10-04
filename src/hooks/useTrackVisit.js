// src/hooks/useTrackVisit.js
import { useEffect, useRef } from 'react';
import { analyticsService } from '../api/services/analytics';

/**
 * useTrackVisit
 * Fires once per mount when the `key` changes. Debounces duplicate
 * fires from React StrictMode.
 *
 *   useTrackVisit('course', slug);
 *   useTrackVisit('lesson', courseSlug, lessonIdentifier);
 */
export function useTrackVisit(type, courseSlug, lessonIdentifier) {
  const firedRef = useRef(null);

  useEffect(() => {
    if (!courseSlug) return;

    const key = `${type}:${courseSlug}:${lessonIdentifier || ''}`;
    if (firedRef.current === key) return;
    firedRef.current = key;

    if (type === 'course') {
      analyticsService.trackCourse(courseSlug);
    } else if (type === 'lesson') {
      analyticsService.trackLesson(courseSlug, lessonIdentifier);
    }
  }, [type, courseSlug, lessonIdentifier]);
}