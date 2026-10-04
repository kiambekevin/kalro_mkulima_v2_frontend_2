// src/hooks/useDashboardData.js
import { useCallback, useEffect, useState } from 'react';
import { dashboardService } from '../api/services/dashboard';

export function useDashboardData({ refresh = false } = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async (opts = {}) => {
    setLoading(true);
    setError(null);
    try {
      const payload = await dashboardService.learner({ refresh: opts.refresh ?? refresh });
      setData(payload);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [refresh]);

  useEffect(() => { load(); }, [load]);

  return { data, loading, error, reload: load };
}