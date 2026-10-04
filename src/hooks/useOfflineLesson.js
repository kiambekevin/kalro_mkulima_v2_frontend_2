// src/hooks/useOfflineLesson.js
import { useCallback, useEffect, useState } from 'react';

const METADATA_NAMESPACE = 'kalro.lesson';

/**
 * useOfflineLesson
 * Thin wrapper around Shaka's Storage API scoped to a single lesson.
 * Gives the UI four things: whether the lesson is already saved,
 * a download() trigger with progress, a remove() trigger, and the
 * offlineUri to feed into player.load().
 */
export function useOfflineLesson(storage, { lessonId, courseSlug, manifestUrl, title }) {
  const [stored, setStored] = useState(null); // shaka.extern.StoredContent
  const [progress, setProgress] = useState(0); // 0..1
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  // Check what's already stored
  const refresh = useCallback(async () => {
    if (!storage.current) return;
    try {
      const list = await storage.current.list();
      const match = list.find(
        (c) =>
          c.appMetadata?.namespace === METADATA_NAMESPACE &&
          c.appMetadata?.lessonId === lessonId
      );
      setStored(match ?? null);
    } catch (err) {
      setError(err);
    }
  }, [storage, lessonId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  // Download the lesson's manifest into IndexedDB
  const download = useCallback(async () => {
    if (!storage.current || busy) return;
    setBusy(true);
    setError(null);
    setProgress(0);

    // Hook into progress via the storage configuration
    storage.current.configure({
      offline: {
        progressCallback: (_content, pct) => setProgress(pct),
      },
    });

    try {
      const op = storage.current.store(manifestUrl, {
        namespace: METADATA_NAMESPACE,
        lessonId,
        courseSlug,
        title,
        downloadedAt: new Date().toISOString(),
      });
      await op.promise;
      await refresh();
    } catch (err) {
      setError(err);
    } finally {
      setBusy(false);
    }
  }, [storage, busy, manifestUrl, lessonId, courseSlug, title, refresh]);

  const remove = useCallback(async () => {
    if (!storage.current || !stored) return;
    await storage.current.remove(stored.offlineUri);
    await refresh();
  }, [storage, stored, refresh]);

  return {
    stored,
    isSaved: Boolean(stored),
    progress,
    busy,
    error,
    download,
    remove,
    offlineUri: stored?.offlineUri ?? null,
  };
}