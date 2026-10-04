// src/api/services/analytics.js
import { api } from '../client';

const endpoints = {
  track: '/api/v1/analytics/track/',
  visits: '/api/v1/analytics/visits/',
};

/**
 * One session id per browser tab. Used to deduplicate anonymous hits
 * and group visits from the same device without needing a user record.
 */
const SESSION_KEY = 'kalro.session';
function getSessionId() {
  try {
    let sid = sessionStorage.getItem(SESSION_KEY);
    if (!sid) {
      sid = crypto.randomUUID
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2) + Date.now().toString(36);
      sessionStorage.setItem(SESSION_KEY, sid);
    }
    return sid;
  } catch {
    return '';
  }
}

export const analyticsService = {
  trackCourse(slug) {
    return api.post(
      endpoints.track,
      { resource_type: 'course', course_slug: slug, session_id: getSessionId() },
      { auth: true }, // send auth header if available, but Public endpoint allows anonymous
    ).catch(() => null); // never break the page if tracking fails
  },

  trackLesson(courseSlug, lessonIdentifier) {
    return api.post(
      endpoints.track,
      {
        resource_type: 'lesson',
        course_slug: courseSlug,
        lesson_identifier: lessonIdentifier,
        session_id: getSessionId(),
      },
      { auth: true },
    ).catch(() => null);
  },

  /** Admin-only: fetch aggregate stats. */
  stats({ groupBy = 'course', days = 30, county, course } = {}) {
    const qs = api.qs({ group_by: groupBy, days, county, course });
    return api.get(`${endpoints.visits}${qs}`);
  },
};