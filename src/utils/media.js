// src/utils/media.js
/**
 * Resolve a stored media reference into a URL the browser can load.
 *
 * Accepts:
 *   "https://cdn.kalro.org/x.jpg"         → unchanged
 *   "http://127.0.0.1:8000/media/x.jpg"   → unchanged
 *   "/media/courses/images/x.jpg"         → http://127.0.0.1:8000/media/courses/images/x.jpg
 *   "media/courses/images/x.jpg"          → http://127.0.0.1:8000/media/courses/images/x.jpg
 *   "courses/images/x.jpg"                → http://127.0.0.1:8000/media/courses/images/x.jpg
 *   null / "" / "   "                     → null
 *
 * The API is expected to send absolute URLs already. This helper exists
 * as a defensive fallback so a missing `context={"request": request}`
 * on the backend doesn't ship a broken image to the user.
 */

// Base origin for the API and media. `VITE_MEDIA_BASE_URL` lets you
// point to a CDN in production while the API lives elsewhere.
const API_BASE = (
  import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000'
).replace(/\/+$/, '');

const MEDIA_BASE = (
  import.meta.env.VITE_MEDIA_BASE_URL || API_BASE
).replace(/\/+$/, '');

// The prefix Django uses for user-uploaded files. Read from
// `settings.MEDIA_URL` at the backend — matches this constant.
const MEDIA_PREFIX = 'media';

const ABSOLUTE_RE = /^https?:\/\//i;
const PROTOCOL_RELATIVE_RE = /^\/\//;

/**
 * Resolve a media path to a fully-qualified URL.
 *
 * @param {string|null|undefined} value - The value from the API.
 * @returns {string|null}
 */
export function resolveMediaUrl(value) {
  if (value === null || value === undefined) return null;

  const path = String(value).trim();
  if (!path) return null;

  // Already absolute — the common case now that the backend is correct
  if (ABSOLUTE_RE.test(path)) return path;

  // Protocol-relative ("//cdn.example.com/x.jpg") — keep the host,
  // let the browser pick the scheme
  if (PROTOCOL_RELATIVE_RE.test(path)) return path;

  // Absolute path from origin ("/media/courses/images/x.jpg")
  if (path.startsWith('/')) {
    return `${MEDIA_BASE}${path}`;
  }

  // Relative path — decide whether it already includes the media prefix
  const withoutLeadingSlash = path.replace(/^\/+/, '');
  if (
    withoutLeadingSlash === MEDIA_PREFIX ||
    withoutLeadingSlash.startsWith(`${MEDIA_PREFIX}/`)
  ) {
    // "media/courses/images/x.jpg" → origin + "/" + path
    return `${MEDIA_BASE}/${withoutLeadingSlash}`;
  }

  // "courses/images/x.jpg" → origin + "/media/" + path
  return `${MEDIA_BASE}/${MEDIA_PREFIX}/${withoutLeadingSlash}`;
}

/**
 * Same as `resolveMediaUrl`, but returns a fallback string when the
 * input is empty or null. Useful when you want a placeholder image.
 *
 * @param {string|null|undefined} value
 * @param {string} fallback - URL or path to use when `value` is empty.
 */
export function resolveMediaUrlOr(value, fallback = null) {
  return resolveMediaUrl(value) || fallback || null;
}

/**
 * Resolve a media path, and return `null` if the resolved URL can't be
 * constructed. Equivalent to `resolveMediaUrl`, kept for symmetry with
 * other helpers in the codebase.
 */
export function safeMediaUrl(value) {
  return resolveMediaUrl(value);
}

/**
 * Convenience for `<img>` — returns a plain string that React can put
 * straight into `src`, or an empty string so the browser doesn't
 * request the page URL as an image.
 */
export function imgSrc(value) {
  return resolveMediaUrl(value) || '';
}

export default {
  resolveMediaUrl,
  resolveMediaUrlOr,
  safeMediaUrl,
  imgSrc,
};