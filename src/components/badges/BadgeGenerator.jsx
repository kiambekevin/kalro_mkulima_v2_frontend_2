// src/components/badges/BadgeGenerator.jsx
import { useRef, useState } from 'react';
import BadgeDesign from './BadgeDesign';
import Button from '../ui/Button';

/**
 * BadgeGenerator
 * Shows the badge preview and provides Download / Share buttons.
 * The download rasterises the SVG to PNG at 2x for crisp sharing.
 *
 * Props:
 *   badge    — badge object (see useBadgeIssuance)
 *   size     — on-screen preview size in px (default 320)
 *   downloadName — optional override for the downloaded file name
 */
export default function BadgeGenerator({ badge, size = 320, downloadName }) {
  const svgRef = useRef(null);
  const [busy, setBusy] = useState(false);

  const filename =
    downloadName ||
    `${badge.badgeId}-${slugify(badge.courseTitle)}.png`;

  const handleDownload = async () => {
    if (!svgRef.current || busy) return;
    setBusy(true);
    try {
      const blob = await svgToPngBlob(svgRef.current, size * 2);
      triggerDownload(blob, filename);
    } finally {
      setBusy(false);
    }
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/badges/verify/${badge.badgeId}`;
    const text = `I just earned a KALRO badge for “${badge.courseTitle}”!`;

    if (navigator.share) {
      try {
        await navigator.share({ title: 'KALRO Badge', text, url });
        return;
      } catch {
        /* user cancelled */
      }
    }
    try {
      await navigator.clipboard.writeText(`${text} ${url}`);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="badge-gen">
      <div className="badge-gen__preview">
        <BadgeDesign ref={svgRef} badge={badge} size={size} />
      </div>

      <div className="badge-gen__actions">
        <Button variant="primary" onClick={handleDownload} disabled={busy}>
          <i className="fa-solid fa-download" aria-hidden="true" />
          {busy ? 'Preparing…' : 'Download PNG'}
        </Button>
        <Button variant="ghost" onClick={handleShare}>
          <i className="fa-solid fa-share-nodes" aria-hidden="true" />
          Share
        </Button>
      </div>
    </div>
  );
}

/* ───────────────────────────── helpers ───────────────────────────── */

async function svgToPngBlob(svgEl, targetWidth) {
  const xml = new XMLSerializer().serializeToString(svgEl);
  const svg64 = btoa(unescape(encodeURIComponent(xml)));
  const image = new Image();
  image.crossOrigin = 'anonymous';

  await new Promise((resolve, reject) => {
    image.onload = resolve;
    image.onerror = reject;
    image.src = `data:image/svg+xml;base64,${svg64}`;
  });

  const scale = targetWidth / image.width || 2;
  const canvas = document.createElement('canvas');
  canvas.width = image.width * scale;
  canvas.height = image.height * scale;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

  return await new Promise((resolve) => canvas.toBlob(resolve, 'image/png', 0.95));
}

function triggerDownload(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}