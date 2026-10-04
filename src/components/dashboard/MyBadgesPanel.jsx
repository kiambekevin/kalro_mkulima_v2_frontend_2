// src/components/dashboard/MyBadgesPanel.jsx
import { Link } from 'react-router-dom';
import BadgeCard from '../badges/BadgeCard';

/**
 * MyBadgesPanel
 * Dashboard sidebar panel showing the learner's most recently earned
 * badges. Uses the compact variant of BadgeCard so three tiles fit
 * comfortably in the narrow sidebar column.
 *
 * Props:
 *   badges — array from the dashboard payload (`data.recentBadges`).
 *            Each item is `{ id, badgeId, courseTitle, subject,
 *            subjectLabel, earnedAt, pngUrl, lessons, level }`.
 *
 * Renders an empty state when the learner has no badges yet.
 */
export default function MyBadgesPanel({ badges = [] }) {
  const recent = Array.isArray(badges) ? badges.slice(0, 3) : [];

  return (
    <section className="dash-panel" aria-labelledby="my-badges-title">
      <header className="dash-panel__head">
        <h2 id="my-badges-title">
          <i className="fa-solid fa-award" aria-hidden="true" />
          My badges
        </h2>

        {recent.length > 0 && (
          <Link to="/badges" className="text-link">
            All
            <i className="fa-solid fa-arrow-right" aria-hidden="true" />
          </Link>
        )}
      </header>

      {recent.length === 0 ? (
        <div className="dash-empty dash-empty--sm">
          <p>No badges yet. Finish a course to earn your first.</p>
          <Link to="/courses" className="btn btn--primary btn--sm">
            Browse courses
          </Link>
        </div>
      ) : (
        <ul className="dash-badges">
          {recent.map((badge) => (
            <li key={badge.badgeId || badge.id}>
              <BadgeCard badge={badge} compact />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}