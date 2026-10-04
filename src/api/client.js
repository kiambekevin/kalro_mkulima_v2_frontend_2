// src/api/client.js
/**
 * Low-level fetch wrapper.
 *
 * Responsibilities:
 *   - prepend VITE_API_BASE_URL to relative paths
 *   - JSON in / JSON out
 *   - Bearer token injection from tokenStorage
 *   - automatic 401 → refresh → retry
 *   - consistent error envelope: { status, code, message, fields, raw }
 *
 * Contract with endpoints.js:
 *   - Paths returned from endpoints.js are FULL paths from the origin
 *     (including /api/v1).
 *   - BASE_URL must be an origin only. Setting it to include /api/v1
 *     will produce doubled paths.
 */
import { endpoints } from './endpoints';
import { tokenStorage } from './storage';

// ── Base URL ─────────────────────────────────────────────────────
// Fallback is a dev origin with NO path — VITE_API_BASE_URL should
// follow the same rule.
const RAW_BASE = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

// Strip any accidental trailing slash, and defensively strip a
// trailing "/api/v1" if the env var was set incorrectly.
const BASE_URL = String(RAW_BASE)
  .replace(/\/+$/, '')
  .replace(/\/api\/v\d+$/, '');

// Warn once at boot if the env var looks suspicious
if (typeof window !== 'undefined') {
  const rawHasVersion = /\/api\/v\d+\/?$/.test(String(RAW_BASE));
  if (rawHasVersion) {
    // eslint-disable-next-line no-console
    console.warn(
      '[api] VITE_API_BASE_URL appears to include the API version prefix. ' +
      'Set it to the origin only (e.g. http://127.0.0.1:8000). ' +
      'The client strips it for you, but please fix the .env file.'
    );
  }
}

// ── Custom error type ────────────────────────────────────────────
export class ApiError extends Error {
  constructor({ status, code, message, fields, raw }) {
    super(message || 'Request failed');
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.fields = fields || {};
    this.raw = raw;
  }
  isValidation() {
    return this.status === 400 && Object.keys(this.fields).length > 0;
  }
  isAuthError() {
    return this.status === 401 || this.status === 403;
  }
  isNotFound() {
    return this.status === 404;
  }
}

// ── URL builder ──────────────────────────────────────────────────
function buildUrl(path) {
  if (!path) return BASE_URL;
  if (/^https?:\/\//i.test(path)) return path;   // already absolute
  return `${BASE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

// ── Refresh coordination ─────────────────────────────────────────
let refreshPromise = null;

async function refreshTokens() {
  const refresh = tokenStorage.getRefresh();
  if (!refresh) {
    throw new ApiError({
      status: 401,
      code: 'no_refresh_token',
      message: 'Not signed in',
    });
  }

  const res = await fetch(buildUrl(endpoints.auth.tokenRefresh), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh }),
  });

  if (!res.ok) {
    tokenStorage.clear();
    throw new ApiError({
      status: 401,
      code: 'refresh_failed',
      message: 'Session expired',
    });
  }

  const data = await res.json();
  tokenStorage.set({ access: data.access, refresh: data.refresh || refresh });
  return data.access;
}

// ── Core request helper ──────────────────────────────────────────
async function request(
  method,
  path,
  {
    body,
    headers = {},
    auth = true,
    signal,
    isForm = false,
    _retry = false,
  } = {}
) {
  const finalHeaders = { ...headers };

  if (!isForm && body !== undefined) {
    finalHeaders['Content-Type'] = 'application/json';
  }

  if (auth) {
    const token = tokenStorage.getAccess();
    if (token) finalHeaders.Authorization = `Bearer ${token}`;
  }

  const url = buildUrl(path);

  let res;
  try {
    res = await fetch(url, {
      method,
      headers: finalHeaders,
      body:
        body === undefined
          ? undefined
          : isForm
          ? body
          : JSON.stringify(body),
      signal,
    });
  } catch (err) {
    if (err.name === 'AbortError') throw err;
    throw new ApiError({
      status: 0,
      code: 'network_error',
      message: 'Network error. Check your connection.',
    });
  }

  // 401 → refresh once, then retry the original request
  if (res.status === 401 && auth && !_retry) {
    try {
      if (!refreshPromise) {
        refreshPromise = refreshTokens().finally(() => {
          refreshPromise = null;
        });
      }
      await refreshPromise;
      return request(method, path, {
        body,
        headers,
        auth,
        signal,
        isForm,
        _retry: true,
      });
    } catch (err) {
      tokenStorage.clear();
      throw err instanceof ApiError
        ? err
        : new ApiError({
            status: 401,
            code: 'auth_failed',
            message: 'Session expired',
          });
    }
  }

  // 204 No Content
  if (res.status === 204) return null;

  // Parse response based on content-type
  const contentType = res.headers.get('content-type') || '';
  let data = null;

  if (contentType.includes('application/json')) {
    try {
      data = await res.json();
    } catch {
      data = null;
    }
  } else if (contentType.includes('image/')) {
    data = await res.blob();
  } else if (contentType.includes('text/')) {
    try {
      data = await res.text();
    } catch {
      data = null;
    }
  }

  if (!res.ok) {
    throw parseError(res, data);
  }

  return data;
}

// ── Error parsing ────────────────────────────────────────────────
function parseError(res, data) {
  // Backend envelope: { error: { code, message, detail, fields } }
  const envelope = data?.error || {};

  // Fall back to DRF's default shape if the custom envelope isn't there
  let fields = envelope.fields || {};
  if (!Object.keys(fields).length && data && typeof data === 'object') {
    fields = Object.fromEntries(
      Object.entries(data).filter(([k]) => k !== 'detail')
    );
  }

  const message =
    envelope.message ||
    data?.detail ||
    defaultMessage(res.status);

  return new ApiError({
    status: res.status,
    code: envelope.code || `http_${res.status}`,
    message,
    fields,
    raw: data,
  });
}

function defaultMessage(status) {
  const map = {
    400: 'Invalid request.',
    401: 'Please sign in to continue.',
    403: 'You don\u2019t have permission for this.',
    404: 'Not found.',
    409: 'That already exists.',
    429: 'Too many requests. Try again shortly.',
    500: 'Something went wrong on our end.',
    503: 'Service temporarily unavailable.',
  };
  return map[status] || `Request failed (${status})`;
}

// ── Convenience wrappers ────────────────────────────────────────
export const api = {
  get: (path, opts) => request('GET', path, opts),
  post: (path, body, opts) => request('POST', path, { ...opts, body }),
  put: (path, body, opts) => request('PUT', path, { ...opts, body }),
  patch: (path, body, opts) => request('PATCH', path, { ...opts, body }),
  delete: (path, opts) => request('DELETE', path, opts),

  /** Build a query string from a plain object, dropping empty values. */
  qs(params = {}) {
    const clean = Object.entries(params).filter(
      ([, v]) => v !== undefined && v !== null && v !== ''
    );
    if (!clean.length) return '';
    const sp = new URLSearchParams();
    clean.forEach(([k, v]) => {
      if (Array.isArray(v)) v.forEach((x) => sp.append(k, x));
      else sp.append(k, v);
    });
    return `?${sp.toString()}`;
  },

  /** Expose the resolved base URL for services that need it. */
  baseUrl: BASE_URL,
};

export default api;