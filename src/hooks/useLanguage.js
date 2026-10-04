// src/hooks/useLanguage.js
import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'kalro.lang';
const DEFAULT_LANG = 'en';
const SUPPORTED = ['en', 'sw'];

/**
 * useLanguage
 * Manages the active language and broadcasts changes to the page.
 *
 *   - Reads the initial value from localStorage (falls back to 'en').
 *   - Persists changes back to localStorage.
 *   - Dispatches a `kalro:lang` CustomEvent so components that don't
 *     consume this hook directly (e.g. cached Hero subcomponents) can
 *     still react.
 *   - Sets `document.documentElement.lang` for accessibility and SEO.
 */
export function useLanguage() {
  const [lang, setLangState] = useState(() => {
    if (typeof window === 'undefined') return DEFAULT_LANG;
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved && SUPPORTED.includes(saved)) return saved;
    } catch { /* ignore */ }
    return DEFAULT_LANG;
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch { /* ignore */ }
    document.documentElement.lang = lang;
    window.dispatchEvent(new CustomEvent('kalro:lang', { detail: lang }));
  }, [lang]);

  const setLang = useCallback((next) => {
    if (SUPPORTED.includes(next)) setLangState(next);
  }, []);

  return { lang, setLang, languages: SUPPORTED };
}