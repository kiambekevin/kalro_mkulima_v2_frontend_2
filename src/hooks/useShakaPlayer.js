// src/hooks/useShakaPlayer.js
import { useEffect, useRef, useState } from 'react';

/**
 * useShakaPlayer
 * Loads Shaka Player lazily, attaches it to a <video> element, and
 * exposes the player instance + a storage instance pre-wired for
 * offline downloads.
 *
 * Usage:
 *   const { videoRef, player, storage, ready, error } = useShakaPlayer();
 */
export function useShakaPlayer() {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const storageRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        // Lazy-load Shaka — keeps the main bundle small
        const shaka = await import('shaka-player');
        const mod = shaka.default ?? shaka;

        mod.polyfill.installAll();
        if (!mod.Player.isBrowserSupported()) {
          throw new Error('This browser does not support Shaka Player.');
        }

        const player = new mod.Player();
        await player.attach(videoRef.current);

        // Optional: wire in DRM licence servers here
        // player.configure({ drm: { servers: { ... } } });

        const storage = new mod.offline.Storage(player);

        // Sensible offline defaults
        storage.configure({
          offline: {
            // Show download progress in the UI later
            progressCallback: () => {},
            // Pick a balanced variant (SD preferred, moderate bandwidth)
            trackSelectionCallback: (tracks) => {
              const variants = tracks.filter((t) => t.type === 'variant');
              const sd = variants
                .filter((t) => t.height && t.height <= 480)
                .sort((a, b) => b.bandwidth - a.bandwidth)[0];
              return sd ? [sd] : variants.slice(0, 1);
            },
          },
        });

        if (cancelled) return;
        playerRef.current = player;
        storageRef.current = storage;
        setReady(true);
      } catch (err) {
        if (!cancelled) setError(err);
      }
    })();

    return () => {
      cancelled = true;
      // Clean up so StrictMode double-mounts don't leak
      if (playerRef.current) {
        playerRef.current.destroy().catch(() => {});
        playerRef.current = null;
      }
      storageRef.current = null;
    };
  }, []);

  return {
    videoRef,
    player: playerRef,
    storage: storageRef,
    ready,
    error,
  };
}