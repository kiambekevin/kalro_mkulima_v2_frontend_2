// src/hooks/useLessonNav.js
import { useMemo } from 'react';

/**
 * useLessonNav
 * Given a flat lesson list and the current index, returns the previous
 * and next lesson objects (or null at the boundaries).
 */
export function useLessonNav(flatLessons, currentIndex) {
  return useMemo(() => {
    if (!flatLessons?.length) return { prev: null, next: null };
    return {
      prev: currentIndex > 0 ? flatLessons[currentIndex - 1] : null,
      next:
        currentIndex < flatLessons.length - 1
          ? flatLessons[currentIndex + 1]
          : null,
    };
  }, [flatLessons, currentIndex]);
}