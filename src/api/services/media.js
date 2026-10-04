// src/api/services/media.js
import { api } from '../client';
import { endpoints } from '../endpoints';

export const mediaService = {
  list({ page = 1, pageSize = 20 } = {}) {
    return api.get(
      `${endpoints.media.assets}${api.qs({ page, page_size: pageSize })}`
    );
  },

  detail(id) {
    return api.get(endpoints.media.asset(id));
  },

  async playbackUrl(id) {
    const res = await api.get(endpoints.media.playback(id));
    return res.url;
  },

  async downloadUrl(id) {
    const res = await api.get(endpoints.media.download(id));
    return res.url;
  },

  initiateUpload({ kind, filename, sizeBytes, title = '', mimeType = '' }) {
    return api.post(endpoints.media.initiate, {
      kind,
      filename,
      size_bytes: sizeBytes,
      title,
      mime_type: mimeType,
    });
  },

  completeUpload({ sessionId, checksumSha256 = '', durationSeconds }) {
    return api.post(endpoints.media.complete, {
      session_id: sessionId,
      checksum_sha256: checksumSha256,
      duration_seconds: durationSeconds,
    });
  },

  attachManifest(id, { manifestUrl, segmentsBaseUrl = '', durationSeconds, posterUrl = '' }) {
    return api.post(endpoints.media.attachManifest(id), {
      manifest_url: manifestUrl,
      segments_base_url: segmentsBaseUrl,
      duration_seconds: durationSeconds,
      poster_url: posterUrl,
    });
  },

  // ── Absolute URL helpers (no fetch) ──────────────────────────

  /** Absolute URL for a media asset's PNG or file. Used by <img src>. */
  absoluteUrl(path) {
    if (!path) return null;
    if (/^https?:\/\//i.test(path)) return path;
    return `${api.baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
  },

  // ── High-level helpers ───────────────────────────────────────

  async resolveStreamUrl(lesson) {
    if (!lesson) return null;
    if (lesson.mediaAssetId) {
      try {
        return await mediaService.playbackUrl(lesson.mediaAssetId);
      } catch {
        /* fall through */
      }
    }
    return lesson.streamUrl || null;
  },

  async resolveResourceUrl(resource) {
    if (!resource) return null;
    if (resource.mediaAssetId) {
      try {
        return await mediaService.downloadUrl(resource.mediaAssetId);
      } catch {
        /* fall through */
      }
    }
    return resource.url || null;
  },
};

export default mediaService;