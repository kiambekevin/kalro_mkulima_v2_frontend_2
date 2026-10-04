// src/hooks/usePathways.js
import { useEffect, useState } from 'react';
import { pathwaysService } from '../api/services/courses';

/**
 * usePathways
 * Returns the list of published pathways. Cached at module scope so
 * navigating between homepage and /pathways doesn't refetch.
 */
let cache = null;

export function usePathways() {
  const [pathways, setPathways] = useState(cache || []);
  const [loading, setLoading] = useState(!cache);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (cache) return;
    let cancelled = false;
    setLoading(true);
    pathwaysService
      .list()
      .then((res) => {
        if (cancelled) return;
        const items = res.results ?? res;
        cache = items;
        setPathways(items);
      })
      .catch((err) => {
        if (!cancelled) setError(err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  return { pathways, loading, error };
}