// src/api/endpoints.js
/**
 * Single source of truth for every API path the frontend uses.
 *
 * Rule: this file owns the version prefix. `VITE_API_BASE_URL` is an
 * origin only (no path), and `client.js` concatenates them.
 */

export const API_VERSION = 'v1';
export const API_PREFIX = `/api/${API_VERSION}`;

const v = API_PREFIX;

// Small helper: always encode path segments so UUIDs, slugs, and any
// future identifiers survive the URL round-trip.
const enc = (s) => encodeURIComponent(String(s));

export const endpoints = {
  auth: {
    register: `${v}/auth/register/`,
    login: `${v}/auth/login/`,
    logout: `${v}/auth/logout/`,
    me: `${v}/auth/me/`,
    profile: `${v}/auth/me/profile/`,
    password: `${v}/auth/me/password/`,
    checkEmail: `${v}/auth/check/email/`,
    checkPhone: `${v}/auth/check/phone/`,
    tokenRefresh: `${v}/auth/token/refresh/`,
  },

  subjects: {
    list: `${v}/subjects/`,
    detail: (slug) => `${v}/subjects/${enc(slug)}/`,
  },

  courses: {
    list: `${v}/courses/`,
    detail: (slug) => `${v}/courses/${enc(slug)}/`,
    curriculum: (slug) => `${v}/courses/${enc(slug)}/curriculum/`,
    resources: (slug) => `${v}/courses/${enc(slug)}/resources/`,
    related: (slug) => `${v}/courses/${enc(slug)}/related/`,
    popular: `${v}/courses/popular/`,
    publish: (slug) => `${v}/courses/${enc(slug)}/publish/`,
  },

  lessons: {
    /**
     * `identifier` may be a slug ("m2l1") OR a UUID. The backend
     * resolves either form. Encoding handles any characters in slugs.
     */
    detail: (courseSlug, identifier) =>
      `${v}/courses/${enc(courseSlug)}/lessons/${enc(identifier)}/`,

    complete: (lessonId) => `${v}/progress/lessons/${enc(lessonId)}/complete/`,
    uncomplete: (lessonId) => `${v}/progress/lessons/${enc(lessonId)}/uncomplete/`,
    toggle: (lessonId) => `${v}/progress/lessons/${enc(lessonId)}/toggle/`,
    lastLesson: (courseSlug) =>
      `${v}/progress/courses/${enc(courseSlug)}/last-lesson/`,
  },

  progress: {
    list: `${v}/progress/`,
    detail: (courseSlug) => `${v}/progress/${enc(courseSlug)}/`,
    resume: (courseSlug) => `${v}/progress/${enc(courseSlug)}/resume/`,
    rebuild: (courseSlug) => `${v}/progress/${enc(courseSlug)}/rebuild/`,
    completions: `${v}/progress/completions/`,
    activity: `${v}/progress/activity/`,
    streak: `${v}/progress/streak/`,
  },

  badges: {
    list: `${v}/badges/`,
    detail: (badgeId) => `${v}/badges/${enc(badgeId)}/`,
    verify: (badgeId) => `${v}/badges/verify/${enc(badgeId)}/`,
    png: (badgeId) => `${v}/badges/${enc(badgeId)}/png/`,
    templates: `${v}/badge-templates/`,
  },

  fielddays: {
    list: `${v}/fielddays/`,
    detail: (slug) => `${v}/fielddays/${enc(slug)}/`,
    upcoming: `${v}/fielddays/upcoming/`,
    myBookings: `${v}/fielddays/my-bookings/`,
    book: (slug) => `${v}/fielddays/${enc(slug)}/book/`,
    cancel: (slug) => `${v}/fielddays/${enc(slug)}/cancel/`,
    bookings: (slug) => `${v}/fielddays/${enc(slug)}/bookings/`,
    checkin: `${v}/fielddays/checkin/`,
    attendance: (slug) => `${v}/fielddays/${enc(slug)}/attendance/`,
  },

  counties: {
    list: `${v}/counties/`,
    detail: (code) => `${v}/counties/${enc(code)}/`,
    subCounties: (code) => `${v}/counties/${enc(code)}/sub-counties/`,
    regions: `${v}/counties/regions/`,
  },

  dashboard: {
    learner: `${v}/dashboard/`,
    county: (code) => `${v}/dashboard/county/${enc(code)}/`,
    refresh: `${v}/dashboard/refresh/`,
  },

  media: {
    assets: `${v}/media/assets/`,
    asset: (id) => `${v}/media/assets/${enc(id)}/`,
    playback: (id) => `${v}/media/assets/${enc(id)}/playback-url/`,
    download: (id) => `${v}/media/assets/${enc(id)}/download-url/`,
    initiate: `${v}/media/uploads/initiate/`,
    complete: `${v}/media/uploads/complete/`,
    attachManifest: (id) => `${v}/media/assets/${enc(id)}/attach-manifest/`,
  },
  pathways: {
    list: `${v}/pathways/`,
    detail: (slug) => `${v}/pathways/${enc(slug)}/`,
  },
};