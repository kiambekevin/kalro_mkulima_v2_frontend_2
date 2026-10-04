// src/api/storage.js
/**
 * Token persistence. Kept in one place so swapping to
 * httpOnly cookies later is a single-file change.
 */

const ACCESS_KEY = 'kalro.access';
const REFRESH_KEY = 'kalro.refresh';

export const tokenStorage = {
  getAccess() {
    try { return localStorage.getItem(ACCESS_KEY); } catch { return null; }
  },
  getRefresh() {
    try { return localStorage.getItem(REFRESH_KEY); } catch { return null; }
  },
  set({ access, refresh }) {
    try {
      if (access) localStorage.setItem(ACCESS_KEY, access);
      if (refresh) localStorage.setItem(REFRESH_KEY, refresh);
    } catch { /* ignore */ }
  },
  clear() {
    try {
      localStorage.removeItem(ACCESS_KEY);
      localStorage.removeItem(REFRESH_KEY);
    } catch { /* ignore */ }
  },
};