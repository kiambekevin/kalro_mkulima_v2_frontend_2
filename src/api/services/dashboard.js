// src/api/services/dashboard.js
import { api } from '../client';
import { endpoints } from '../endpoints';

export const dashboardService = {
  learner({ refresh = false } = {}) {
    const qs = refresh ? '?refresh=true' : '';
    return api.get(`${endpoints.dashboard.learner}${qs}`);
  },

  county(code, { refresh = false, weeks = 8 } = {}) {
    return api.get(`${endpoints.dashboard.county(code)}${api.qs({ refresh, weeks })}`);
  },

  clearCache() {
    return api.post(endpoints.dashboard.refresh, {});
  },
};