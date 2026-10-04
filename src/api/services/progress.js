// src/api/services/progress.js
import { api } from '../client';
import { endpoints } from '../endpoints';

export const progressService = {
  list({ course, subject, status, page = 1, pageSize = 20 } = {}) {
    const qs = api.qs({ course, subject, status, page, page_size: pageSize });
    return api.get(`${endpoints.progress.list}${qs}`);
  },

  detail(courseSlug) {
    return api.get(endpoints.progress.detail(courseSlug));
  },

  resume(courseSlug) {
    return api.get(endpoints.progress.resume(courseSlug));
  },

  setLastLesson(courseSlug, lessonId) {
    return api.post(endpoints.lessons.lastLesson(courseSlug), { lesson_id: lessonId });
  },

  complete(lessonId, { minutesSpent = 0 } = {}) {
    return api.post(endpoints.lessons.complete(lessonId), { minutes_spent: minutesSpent });
  },

  uncomplete(lessonId) {
    return api.post(endpoints.lessons.uncomplete(lessonId), {});
  },

  toggle(lessonId, force = false) {
    return api.post(endpoints.lessons.toggle(lessonId), { force });
  },

  completions(courseSlug) {
    const qs = courseSlug ? api.qs({ course: courseSlug }) : '';
    return api.get(`${endpoints.progress.completions}${qs}`);
  },

  activity(days = 7) {
    return api.get(`${endpoints.progress.activity}${api.qs({ days })}`);
  },

  streak() {
    return api.get(endpoints.progress.streak);
  },
};