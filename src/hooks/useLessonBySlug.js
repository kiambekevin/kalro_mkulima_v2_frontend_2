// src/hooks/useLessonBySlug.js
import { useMemo } from 'react';
import { courses, courseDetail, instructors } from '../data/courses';

/**
 * useLessonBySlug
 * Resolves a course + module + lesson from URL params:
 *   /courses/:slug/lessons/:lessonId
 *
 * Returns:
 *   {
 *     course, instructor, module, moduleIndex,
 *     lesson, lessonIndex, totalLessons, flatLessons
 *   }
 * or null if the course or lesson cannot be found.
 */
export function useLessonBySlug(courseSlug, lessonId) {
  return useMemo(() => {
    const course = courses.find((c) => c.slug === courseSlug);
    if (!course) return null;

    const detail = courseDetail[course.id] || {};
    const instructor = instructors[detail.instructorId] || instructors.default;

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
                type: 'reading',
              })),
            },
          ];

    // Flatten for prev/next navigation
    const flatLessons = modules.flatMap((m, moduleIndex) =>
      m.lessons.map((l, lessonIndex) => ({ ...l, moduleIndex, lessonIndex }))
    );

    const idx = flatLessons.findIndex((l) => l.id === lessonId);
    if (idx === -1) return null;

    const current = flatLessons[idx];
    const module = modules[current.moduleIndex];
    const lesson = module.lessons[current.lessonIndex];

    return {
      course,
      instructor,
      modules,
      flatLessons,
      module,
      moduleIndex: current.moduleIndex,
      lesson,
      lessonIndex: current.lessonIndex,
      totalLessons: flatLessons.length,
      flatIndex: idx,
    };
  }, [courseSlug, lessonId]);
}