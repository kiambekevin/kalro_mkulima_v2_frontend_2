// src/hooks/useFieldDays.js
import { useCallback, useEffect, useState } from 'react';
import { fieldDaysService } from '../api/services/fielddays';

export function useFieldDays(filters = {}) {
  const [items, setItems] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const key = JSON.stringify(filters);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fieldDaysService.list(filters)
      .then((res) => {
        if (cancelled) return;
        setItems(res.results ?? res);
        setCount(res.count ?? (res.results ?? res).length);
      })
      .catch((err) => { if (!cancelled) setError(err); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [key]);

  return { items, count, loading, error };
}

export function useFieldDayBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fieldDaysService.myBookings();
      setBookings(res.results ?? res);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const book = useCallback(async (slug) => {
    const booking = await fieldDaysService.book(slug);
    await load();
    return booking;
  }, [load]);

  const cancel = useCallback(async (slug) => {
    await fieldDaysService.cancel(slug);
    await load();
  }, [load]);

  return { bookings, loading, error, reload: load, book, cancel };
}