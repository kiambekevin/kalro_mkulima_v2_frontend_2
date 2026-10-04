// src/components/badges/BadgeCard.jsx
import { Link } from 'react-router-dom';
import { imgSrc } from '../../utils/media';
import { subjectTheme } from '../../data/badges';

/**
 * BadgeCard
 * Wallet tile for an earned badge. Shown in:
 *   - the BadgesPage grid
 *   - the dashboard "My badges" panel (compact variant)
 *
 * Props:
 *   badge   — API shape: { id, badgeId, courseTitle, subject, subjectLabel,
 *                          earnedAt, pngUrl, level, lessons }
 *   compact — boolean; renders a tighter layout for the dashboard sidebar
 */
export default function BadgeCard({ badge, compact = false }) {
  const theme = subjectTheme(badge.subject);
  const earned = new Date(badge.earnedAt);
  const earnedLabel = earned.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const verifyPath = `/badges/verify/${encodeURIComponent(badge.badgeId)}`;
  const png = imgSrc(badge.pngUrl);

  return (
    <article className={`badge-card ${compact ? 'badge-card--compact' : ''}`}>
      {/* ── Rosette / PNG thumbnail ────────────────────────── */}
      <div
        className="badge-card__rosette"
        style={{
          background: `linear-gradient(140deg, ${theme.tint} 0%, #0C2B1A 100%)`,
        }}
        aria-hidden="true"
      >
        {png ? (
          <img src={png} alt="" loading="lazy" />
        ) : (
          <i className={theme.icon || 'fa-solid fa-award'} />
        )}
      </div>

      {/* ── Text ───────────────────────────────────────────── */}
      <div className="badge-card__body">
        <span className="badge-card__subject">
          {badge.subjectLabel || theme.label || badge.subject}
        </span>

        <h3>{badge.courseTitle}</h3>

        <div className="badge-card__meta">
          <span>
            <i className="fa-regular fa-calendar" aria-hidden="true" />
            {earnedLabel}
          </span>

          {badge.lessons && (
            <span>
              <i className="fa-solid fa-book" aria-hidden="true" />
              {badge.lessons} lesson{badge.lessons === 1 ? '' : 's'}
            </span>
          )}

          {badge.level && (
            <span>
              <i className="fa-solid fa-signal" aria-hidden="true" />
              {badge.level}
            </span>
          )}
        </div>

        <code className="badge-card__id">{badge.badgeId}</code>
      </div>

      {/* ── Link to verify ─────────────────────────────────── */}
      <Link
        to={verifyPath}
        className="badge-card__link"
        aria-label={`Verify ${badge.courseTitle}`}
      >
        <i className="fa-solid fa-arrow-right" aria-hidden="true" />
      </Link>
    </article>
  );
}