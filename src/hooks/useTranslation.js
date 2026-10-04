// src/hooks/useTranslation.js
import { useCallback, useEffect, useState } from 'react';
import { translations } from '../i18n/translations';

const STORAGE_KEY = 'kalro.lang';
const DEFAULT_LANG = 'en';

function readLang() {
  if (typeof window === 'undefined') return DEFAULT_LANG;
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved && translations[saved]) return saved;
  } catch { /* ignore */ }
  return DEFAULT_LANG;
}

/**
 * useTranslation
 * Returns a `t(key, fallback?)` function that resolves a translation
 * key against the current language. Falls back to English, then to
 * the provided fallback string, then to the key itself.
 *
 *   const { t, lang } = useTranslation();
 *   <h1>{t('hero.title.line1')}</h1>
 *
 * Reacts to language changes even if the caller is outside the same
 * component tree as the language switcher.
 */
export function useTranslation() {
  const [lang, setLang] = useState(readLang);

  useEffect(() => {
    const onLangChange = (e) => setLang(e.detail || readLang());

    // Listen for the CustomEvent dispatched by useLanguage
    window.addEventListener('kalro:lang', onLangChange);

    // Also listen for cross-tab changes (another tab flips language)
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY) setLang(readLang());
    };
    window.addEventListener('storage', onStorage);

    return () => {
      window.removeEventListener('kalro:lang', onLangChange);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  const t = useCallback(
    (key, fallback) => {
      const dict = translations[lang] || {};
      const en = translations.en || {};
      return dict[key] ?? en[key] ?? fallback ?? key;
    },
    [lang],
  );

  return { t, lang };
}