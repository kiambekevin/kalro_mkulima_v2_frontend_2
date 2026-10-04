// src/hooks/useAuth.js
/**
 * useAuth
 * Public entry point for authentication state.
 *
 * Delegates to AuthProvider (see src/contexts/AuthContext.jsx) so every
 * component shares the same user object. Adds two convenience helpers
 * used by the register form:
 *   - checkEmail(email)
 *   - checkPhone(phone)
 * Both hit the availability endpoints and never throw on 400/404.
 */
import { useCallback } from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import { authService } from '../api/services/auth';

export function useAuth() {
  const ctx = useAuthContext();

  const checkEmail = useCallback(async (email) => {
    if (!email) return { available: false, reason: 'empty' };
    try {
      const res = await authService.checkEmail(email);
      return { available: Boolean(res?.available), reason: 'ok' };
    } catch (err) {
      // Backend returns 400 for malformed emails; treat as unavailable
      return {
        available: false,
        reason: err?.isValidation?.() ? 'invalid' : 'error',
      };
    }
  }, []);

  const checkPhone = useCallback(async (phone) => {
    if (!phone) return { available: false, reason: 'empty' };
    try {
      const res = await authService.checkPhone(phone);
      return { available: Boolean(res?.available), reason: 'ok' };
    } catch (err) {
      return {
        available: false,
        reason: err?.isValidation?.() ? 'invalid' : 'error',
      };
    }
  }, []);

  return {
    ...ctx,
    checkEmail,
    checkPhone,
  };
}

export default useAuth;