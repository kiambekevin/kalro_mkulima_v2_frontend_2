// src/api/services/auth.js
import { api } from '../client';
import { endpoints } from '../endpoints';
import { tokenStorage } from '../storage';

export const authService = {
  async register(payload) {
    const data = await api.post(endpoints.auth.register, payload, { auth: false });
    // Backend returns: { user, tokens: { access, refresh } }
    tokenStorage.set(data.tokens);
    return data;
  },

  async login({ identifier, password, remember = false }) {
    const data = await api.post(endpoints.auth.login, { identifier, password, remember }, { auth: false });
    tokenStorage.set(data.tokens);
    return data;
  },

  async logout() {
    const refresh = tokenStorage.getRefresh();
    try {
      if (refresh) await api.post(endpoints.auth.logout, { refresh });
    } finally {
      tokenStorage.clear();
    }
  },

  async me() {
    return api.get(endpoints.auth.me);
  },

  async updateProfile(payload) {
    return api.patch(endpoints.auth.profile, payload);
  },

  async updateMe(payload) {
    return api.patch(endpoints.auth.me, payload);
  },

  async changePassword({ oldPassword, newPassword, confirmPassword }) {
    return api.post(endpoints.auth.password, {
      old_password: oldPassword,
      new_password: newPassword,
      confirm_password: confirmPassword,
    });
  },

  async checkEmail(email) {
    return api.get(`${endpoints.auth.checkEmail}${api.qs({ email })}`, { auth: false });
  },

  async checkPhone(phone) {
    return api.get(`${endpoints.auth.checkPhone}${api.qs({ phone })}`, { auth: false });
  },
};