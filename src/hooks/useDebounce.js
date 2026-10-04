// src/hooks/useDebounce.js
import { useEffect, useState } from 'react';

/**
 * Returns a debounced copy of `value` that only updates after
 * `delay` ms of no change. Handy for search inputs.
 */
export function useDebounce(value, delay = 250) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);

  return debounced;
}