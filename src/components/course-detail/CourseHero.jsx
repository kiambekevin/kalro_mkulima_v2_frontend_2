// src/components/course-detail/CourseHero.jsx
import { Rosette } from '../ui/Rosette';
import { imgSrc } from '../../utils/media';

/**
 * CourseHero
 * Banner at the top of the course detail page.
 *
 * Left column: image with the level pill overlaid.
 * Right column: subject label, title, summary, meta row, badge block.
 *
 * All the snake_case → camelCase mapping is done by the parent
 * (CourseDetailPage); this component expects a camelCase `course` prop.
 */
export default function CourseHero({ course, totalMinutes }) {
  const hours = Math.max(
    1,
    Math.round((totalMinutes || course.hours * 60) / 60)
  );
  const rating = Number(course.rating) || 0;
  const reviews = Number(course.reviews) || 0;
  const src = imgSrc(course.image);

  return (
    <div className="cd-hero">
      {/* ── Image ─────────────────────────────────────────── */}
      <div className="cd-hero__thumb">
        {src ? (
          <img src={src} alt={course.alt || course.title} loading="eager" />
        ) : (
          <div className="cd-hero__thumb-fallback" aria-hidden="true">
            <i className="fa-solid fa-graduation-cap" />
          </div>
        )}
        <span className="cd-hero__level">{course.levelLabel}</span>
      </div>

      {/* ── Text ──────────────────────────────────────────── */}
      <div className="cd-hero__info">
        <div className="cd-hero__subject">{course.subjectLabel}</div>

        <h1>{course.title}</h1>

        <p className="cd-hero__summary">{course.summary}</p>

        <div className="cd-hero__meta">
          <span className="cd-meta">
            <i className="fa-solid fa-star" aria-hidden="true" />
            <b>{rating.toFixed(1)}</b>
            <span>({reviews.toLocaleString()} reviews)</span>
          </span>

          <span className="cd-meta">
            <i className="fa-regular fa-clock" aria-hidden="true" />
            {hours} hrs
          </span>

          <span className="cd-meta">
            <i className="fa-solid fa-book" aria-hidden="true" />
            {course.lessons} lessons
          </span>

          <span className="cd-meta">
            <i className="fa-solid fa-signal" aria-hidden="true" />
            {course.levelLabel}
          </span>

          <span className="cd-meta">
            <i className="fa-solid fa-language" aria-hidden="true" />
            English · Kiswahili
          </span>
        </div>

        {course.badge && (
          <div className="cd-hero__badge">
            <Rosette variant="course" size="sm" icon="fa-solid fa-award" />
            <div>
              <strong>Earns a verified KALRO badge</strong>
              <span>
                Shareable with a QR code you can print or send on WhatsApp.
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}