// src/api/services/fielddays.js
import { api } from '../client';
import { endpoints } from '../endpoints';

export const fieldDaysService = {
  list({ county, topic, upcoming, past, from, to, q, page = 1, pageSize = 20 } = {}) {
    const qs = api.qs({
      county, topic, upcoming, past,
      from_date: from, to_date: to, q,
      page, page_size: pageSize,
    });
    return api.get(`${endpoints.fielddays.list}${qs}`);
  },

  detail(slug) {
    return api.get(endpoints.fielddays.detail(slug));
  },

  upcoming() {
    return api.get(endpoints.fielddays.upcoming);
  },

  myBookings() {
    return api.get(endpoints.fielddays.myBookings);
  },

  book(slug) {
    return api.post(endpoints.fielddays.book(slug), {});
  },

  cancel(slug) {
    return api.post(endpoints.fielddays.cancel(slug), {});
  },

  bookings(slug) {
    return api.get(endpoints.fielddays.bookings(slug));
  },

  checkIn({ code, latitude, longitude, notes }) {
    return api.post(endpoints.fielddays.checkin, { code, latitude, longitude, notes });
  },

  attendance(slug) {
    return api.get(endpoints.fielddays.attendance(slug));
  },
};