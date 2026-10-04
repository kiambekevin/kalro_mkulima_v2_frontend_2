// src/hooks/useBadges.js
import { useCallback, useEffect, useState } from 'react';
import { badgesService } from '../api/services/badges';

export function useBadges() {
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);

  const refetch = useCallback(async () => {
    setLoading(true);
    try {
      const res = await badgesService.list();
      setBadges(res.results ?? res);
    } catch {
      setBadges([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { refetch(); }, [refetch]);

  const findByBadgeId = useCallback(
    (badgeId) => badges.find((b) => b.badgeId === badgeId) ?? null,
    [badges],
  );

  return { badges, loading, refetch, findByBadgeId };
}