// src/hooks/useCounties.js
import { useEffect, useMemo, useState } from 'react';
import { countiesService } from '../api/services/counties';

let cache = null;   // module-level memo so we only fetch once

export function useCounties() {
  const [counties, setCounties] = useState(cache || []);
  const [loading, setLoading] = useState(!cache);

  useEffect(() => {
    if (cache) return;
    countiesService.list()
      .then((res) => {
        cache = res.results ?? res;
        setCounties(cache);
      })
      .finally(() => setLoading(false));
  }, []);

  const grouped = useMemo(() => {
    return counties.reduce((acc, c) => {
      (acc[c.region] ||= []).push(c);
      return acc;
    }, {});
  }, [counties]);

  return { counties, grouped, loading };
}