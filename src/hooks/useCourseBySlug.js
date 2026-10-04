// src/hooks/useCourseBySlug.js
import { useMemo } from 'react';
import { courses, courseDetail, instructors } from '../data/courses';

/**
 * useCourseBySlug
 * Returns everything the detail page needs for a given slug:
 *   { course, detail, instructor, curriculum, totalMinutes }
 * Returns null if no course matches.
 */
export function useCourseBySlug(slug) {
  return useMemo(() => {
    const course = courses.find((c) => c.slug === slug);
    if (!course) return null;

    const detail = courseDetail[course.id] || {};
    const instructor = instructors[detail.instructorId] || instructors.default;

    // Fallback curriculum if none provided
    const modules =
      detail.modules?.length > 0
        ? detail.modules
        : [
            {
              title: 'Course content',
              duration: `${course.hours} hrs`,
              lessons: Array.from({ length: course.lessons }).map((_, i) => ({
                id: `l${i + 1}`,
                title: `Lesson ${i + 1}`,
                minutes: Math.round((course.hours * 60) / course.lessons),
              })),
            },
          ];

    const totalMinutes = modules.reduce(
      (sum, m) => sum + m.lessons.reduce((s, l) => s + (l.minutes || 0), 0),
      0
    );

    return {
      course,
      detail,
      instructor,
      curriculum: modules,
      totalMinutes,
      highlights: detail.highlights || [],
      reviewsSample: detail.reviewsSample || [],
    };
  }, [slug]);
}