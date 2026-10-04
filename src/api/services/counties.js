// src/api/services/counties.js
import { api } from '../client';
import { endpoints } from '../endpoints';

export const countiesService = {
  list() {
    return api.get(endpoints.counties.list, { auth: false });
  },
  detail(code) {
    return api.get(endpoints.counties.detail(code), { auth: false });
  },
  subCounties(code) {
    return api.get(endpoints.counties.subCounties(code), { auth: false });
  },
  regions() {
    return api.get(endpoints.counties.regions, { auth: false });
  },
};