// src/hooks/useBadgeIssuance.js
import { useCallback } from 'react';
import { useBadges } from './useBadges';

/**
 * useBadgeIssuance
 * Returns an `issue(course, progress)` function that produces a badge
 * object and saves it. If the same course already has a badge, the
 * existing one is returned unchanged (idempotent).
 *
 * Badge shape:
 *   {
 *     badgeId,     // KALRO-B-2025-XXXXXX
 *     courseId, courseSlug, courseTitle, subject,
 *     subjectLabel, level, hours, lessons,
 *     earnedAt,    // ISO timestamp
 *   }
 */
export function useBadgeIssuance() {
  const { addBadge, getBadge } = useBadges();

  const issue = useCallback(
    (course, progress) => {
      const existing = getBadge(course.id);
      if (existing) return existing;

      const badge = {
        badgeId: makeBadgeId(course.id),
        courseId: course.id,
        courseSlug: course.slug,
        courseTitle: course.title,
        subject: course.subject,
        subjectLabel: course.subjectLabel,
        level: course.levelLabel,
        hours: course.hours,
        lessons: progress?.completed?.size ?? course.lessons,
        earnedAt: new Date().toISOString(),
      };

      addBadge(badge);
      return badge;
    },
    [addBadge, getBadge]
  );

  return { issue };
}

/**
 * Deterministic-looking badge ID.
 * In production, replace with a server-issued ID from your badge registry.
 */
function makeBadgeId(courseId) {
  const year = new Date().getFullYear();
  const seed = hash(`${courseId}-${Date.now()}`);
  const num = String(seed % 1_000_000).padStart(6, '0');
  return `KALRO-B-${year}-${num}`;
}

function hash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}