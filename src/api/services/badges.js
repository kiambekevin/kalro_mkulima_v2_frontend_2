// src/api/services/badges.js
import { api } from '../client';
import { endpoints } from '../endpoints';

export const badgesService = {
  list({ page = 1, pageSize = 20 } = {}) {
    return api.get(
      `${endpoints.badges.list}${api.qs({ page, page_size: pageSize })}`
    );
  },

  detail(badgeId) {
    return api.get(endpoints.badges.detail(badgeId));
  },

  verify(badgeId) {
    return api.get(endpoints.badges.verify(badgeId), { auth: false });
  },

  /** Absolute URL to the badge PNG. Used by <img src>. */
  pngUrl(badgeId, { variant = 'plain' } = {}) {
    const path = `${endpoints.badges.png(badgeId)}${api.qs({ variant })}`;
    return `${api.baseUrl}${path}`;
  },

  templates() {
    return api.get(endpoints.badges.templates);
  },
};