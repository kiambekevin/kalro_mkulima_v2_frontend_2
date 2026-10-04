// src/components/badges/BadgeDesign.jsx
import { forwardRef } from 'react';
import { subjectTheme } from '../../data/badges';

/**
 * BadgeDesign
 * The visual KALRO course badge rendered as an SVG. This exact SVG is
 * what gets rasterised to PNG for download, so keep everything inside
 * a single <svg> element.
 *
 * Uses the same rosette geometry as the site's Rosette component so the
 * badge is visually consistent with the rest of the platform.
 *
 * Props:
 *   badge — { courseTitle, subject, subjectLabel, level, hours, lessons,
 *             badgeId, earnedAt }
 *   size  — pixel width (default 480)
 */
const BadgeDesign = forwardRef(function BadgeDesign({ badge, size = 480 }, ref) {
  const theme = subjectTheme(badge.subject);
  const earned = new Date(badge.earnedAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 480 480"
      role="img"
      aria-label={`KALRO badge for ${badge.courseTitle}`}
    >
      <defs>
        <linearGradient id="bd-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={theme.tint} />
          <stop offset="100%" stopColor="#0C2B1A" />
        </linearGradient>
        <linearGradient id="bd-ribbon" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={theme.accent} />
          <stop offset="100%" stopColor="#B7801A" />
        </linearGradient>
        <filter id="bd-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#000" floodOpacity=".25" />
        </filter>
      </defs>

      {/* Background circle */}
      <rect width="480" height="480" fill="#F5F7F2" />
      <circle
        cx="240" cy="220" r="180"
        fill="url(#bd-bg)"
        filter="url(#bd-shadow)"
      />

      {/* Inner ring */}
      <circle cx="240" cy="220" r="158" fill="none" stroke="#fff" strokeOpacity=".35" strokeWidth="2" strokeDasharray="4 6" />
      <circle cx="240" cy="220" r="146" fill="none" stroke="#fff" strokeOpacity=".18" strokeWidth="1" />

      {/* Subject label */}
      <text
        x="240" y="140"
        textAnchor="middle"
        fontFamily="'Bricolage Grotesque', system-ui, sans-serif"
        fontSize="14"
        fontWeight="800"
        letterSpacing="3"
        fill="#fff"
        fillOpacity=".85"
      >
        {theme.label.toUpperCase()}
      </text>

      {/* KALRO wordmark */}
      <text
        x="240" y="180"
        textAnchor="middle"
        fontFamily="'Bricolage Grotesque', system-ui, sans-serif"
        fontSize="34"
        fontWeight="800"
        letterSpacing="-0.5"
        fill="#fff"
      >
        KALRO
      </text>
      <text
        x="240" y="204"
        textAnchor="middle"
        fontFamily="'Source Sans 3', system-ui, sans-serif"
        fontSize="13"
        fontWeight="600"
        letterSpacing="2"
        fill={theme.accent}
      >
        MKULIMA
      </text>

      {/* Course title (wrapped to two lines max) */}
      <foreignObject x="70" y="232" width="340" height="60">
        <div
          xmlns="http://www.w3.org/1999/xhtml"
          style={{
            fontFamily: "'Bricolage Grotesque', system-ui, sans-serif",
            fontSize: '17px',
            fontWeight: 700,
            color: '#fff',
            textAlign: 'center',
            lineHeight: 1.25,
            letterSpacing: '-0.3px',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {badge.courseTitle}
        </div>
      </foreignObject>

      {/* Stats row */}
      <g transform="translate(240, 312)">
        <text
          textAnchor="middle"
          fontFamily="'Source Sans 3', system-ui, sans-serif"
          fontSize="12"
          fontWeight="600"
          letterSpacing="1.5"
          fill="#fff"
          fillOpacity=".75"
        >
          {badge.level.toUpperCase()} · {badge.hours} HRS · {badge.lessons} LESSONS
        </text>
      </g>

      {/* Ribbon */}
      <g transform="translate(240, 430)" filter="url(#bd-shadow)">
        <rect x="-150" y="-22" width="300" height="44" rx="22" fill="url(#bd-ribbon)" />
        <text
          textAnchor="middle"
          y="5"
          fontFamily="'Bricolage Grotesque', system-ui, sans-serif"
          fontSize="14"
          fontWeight="800"
          letterSpacing="2"
          fill="#123B26"
        >
          VERIFIED · {earned.toUpperCase()}
        </text>
      </g>

      {/* Badge ID */}
      <text
        x="240" y="470"
        textAnchor="middle"
        fontFamily="ui-monospace, Menlo, monospace"
        fontSize="11"
        fill="#55655B"
        letterSpacing="0.5"
      >
        {badge.badgeId}
      </text>
    </svg>
  );
});

export default BadgeDesign;