// src/components/course-detail/CourseSidebar.jsx
import { useState } from 'react';
import Button from '../ui/Button';
import { Rosette } from '../ui/Rosette';
import EnrollModal from './EnrollModal';

/**
 * CourseSidebar
 * Sticky card on the course detail page. Shows either:
 *   - Enroll CTA (when the learner has no progress)
 *   - Continue learning CTA + progress bar (when they've started)
 *   - "Course complete" summary (when they've finished)
 *
 * Also displays the badge-included block, key facts, and a share row.
 *
 * Props:
 *   course         — camelCase normalised course object
 *   totalMinutes   — hours * 60 (used for display consistency)
 *   progress       — { percent, completed:Set, total, isDone(id), toggle(id) }
 */
export default function CourseSidebar({ course, totalMinutes, progress }) {
  const [modalOpen, setModalOpen] = useState(false);

  const hours = Math.max(1, Math.round((totalMinutes || course.hours * 60) / 60));
  const percent = progress?.percent ?? 0;
  const completedCount = progress?.completed?.size ?? 0;
  const isComplete = percent >= 100;

  const resumeSlug = progress?.lastLessonSlug || null;
  const startPath = resumeSlug
    ? `/courses/${course.slug}/lessons/${resumeSlug}`
    : `/courses/${course.slug}`;

  const shareUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/courses/${course.slug}`
      : `/courses/${course.slug}`;
  const shareText = encodeURIComponent(
    `Check out “${course.title}” on KALRO Mkulima — free training with a verified badge.`
  );

  return (
    <div className="cd-sidebar">
      <div className="cd-sidebar__card">
        {/* ── Progress (if any) ──────────────────────────────── */}
        {percent > 0 && (
          <div className="cd-sidebar__progress">
            <div className="cd-progress">
              <div
                className="cd-progress__bar"
                style={{ width: `${percent}%` }}
              />
              <span className="cd-progress__label">
                {isComplete
                  ? 'Course complete'
                  : `${percent}% · ${completedCount} lesson${completedCount === 1 ? '' : 's'}`}
              </span>
            </div>
          </div>
        )}

        {/* ── Primary CTA ────────────────────────────────────── */}
        {isComplete ? (
          <Button variant="ghost" size="lg" href="/badges">
            <i className="fa-solid fa-trophy" aria-hidden="true" />
            View your badge
          </Button>
        ) : percent > 0 ? (
          <Button variant="primary" size="lg" onClick={() => setModalOpen(true)}>
            <i className="fa-solid fa-play" aria-hidden="true" />
            Continue learning
          </Button>
        ) : (
          <Button variant="primary" size="lg" onClick={() => setModalOpen(true)}>
            <i className="fa-solid fa-graduation-cap" aria-hidden="true" />
            Enroll — it’s free
          </Button>
        )}

        <Button
          variant="ghost"
          size="lg"
          href={`/courses/${course.slug}#curriculum`}
        >
          <i className="fa-regular fa-circle-play" aria-hidden="true" />
          Preview curriculum
        </Button>

        {/* ── Course facts ───────────────────────────────────── */}
        <ul className="cd-sidebar__list">
          <li>
            <i className="fa-solid fa-clock" aria-hidden="true" />
            {hours} hours of content
          </li>
          <li>
            <i className="fa-solid fa-book" aria-hidden="true" />
            {course.lessons} lessons
          </li>
          <li>
            <i className="fa-solid fa-signal" aria-hidden="true" />
            {course.levelLabel}
          </li>
          <li>
            <i className="fa-solid fa-wifi" aria-hidden="true" />
            Works offline (≈15 MB per course)
          </li>
          <li>
            <i className="fa-solid fa-language" aria-hidden="true" />
            English · Kiswahili
          </li>
          <li>
            <i className="fa-solid fa-infinity" aria-hidden="true" />
            Lifetime access
          </li>
        </ul>

        {/* ── Badge block ────────────────────────────────────── */}
        {course.badge && (
          <div className="cd-sidebar__badge">
            <Rosette variant="course" size="sm" icon="fa-solid fa-award" />
            <div>
              <strong>Badge included</strong>
              <span>Verifiable with a QR code at the end.</span>
            </div>
          </div>
        )}

        {/* ── Share row ──────────────────────────────────────── */}
        <div className="cd-sidebar__share">
          <span>Share</span>
          <div className="cd-sidebar__socials">
            <a
              href={`https://wa.me/?text=${shareText}%20${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noreferrer"
              aria-label="Share on WhatsApp"
            >
              <i className="fa-brands fa-whatsapp" aria-hidden="true" />
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noreferrer"
              aria-label="Share on Facebook"
            >
              <i className="fa-brands fa-facebook-f" aria-hidden="true" />
            </a>
            <a
              href={`https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noreferrer"
              aria-label="Share on X"
            >
              <i className="fa-brands fa-x-twitter" aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={() => navigator.clipboard?.writeText(shareUrl)}
              aria-label="Copy link"
            >
              <i className="fa-regular fa-link" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Help block ──────────────────────────────────────── */}
      <div className="cd-sidebar__help">
        <i className="fa-solid fa-headset" aria-hidden="true" />
        <div>
          <b>Need help enrolling?</b>
          <p>
            Call 0800 720 700 (toll free) or{' '}
            <a href="mailto:mkulima@kalro.org">email us</a>.
          </p>
        </div>
      </div>

      <EnrollModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        course={course}
        resumeLessonSlug={resumeSlug}
      />
    </div>
  );
}