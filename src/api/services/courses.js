// src/api/services/courses.js
import { api } from '../client';
import { endpoints } from '../endpoints';

export const coursesService = {
  list({
    q,
    subject,
    level,
    duration,
    pathway,
    sort,
    page = 1,
    pageSize = 9,
  } = {}) {
    const qs = api.qs({
      q,
      subject: Array.isArray(subject) ? subject.join(',') : subject,
      level: Array.isArray(level) ? level.join(',') : level,
      duration,
      pathway,
      ordering: sort,
      page,
      page_size: pageSize,
    });
    return api.get(`${endpoints.courses.list}${qs}`);
  },

  detail(slug) {
    return api.get(endpoints.courses.detail(slug));
  },

  curriculum(slug) {
    return api.get(endpoints.courses.curriculum(slug));
  },

  resources(slug) {
    return api.get(endpoints.courses.resources(slug));
  },

  related(slug) {
    return api.get(endpoints.courses.related(slug));
  },

  popular() {
    return api.get(endpoints.courses.popular);
  },

  subjects() {
    return api.get(endpoints.subjects.list);
  },
};

export const lessonsService = {
  detail(courseSlug, identifier) {
    return api.get(endpoints.lessons.detail(courseSlug, identifier));
  },
};

export const pathwaysService = {
  list() {
    return api.get(endpoints.pathways.list);
  },
  detail(slug) {
    return api.get(endpoints.pathways.detail(slug));
  },
};