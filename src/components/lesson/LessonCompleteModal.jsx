// src/components/lesson/LessonCompleteModal.jsx
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import BadgeGenerator from '../badges/BadgeGenerator';
import Button from '../ui/Button';

/**
 * LessonCompleteModal
 * Shown once when the final lesson of a course is completed.
 *
 * The badge is issued by the backend automatically (via the
 * LessonCompletion signal → issue_badge). By the time the modal opens,
 * the badge exists and is included in the progress payload OR fetched
 * separately. We accept `badge` as a prop; if it's missing, we render
 * a placeholder that links to the wallet.
 */
export default function LessonCompleteModal({
  open,
  onClose,
  course,
  badge,
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="lc-modal" role="dialog" aria-modal="true" aria-labelledby="lc-title">
      <button
        type="button"
        className="lc-modal__backdrop"
        aria-label="Close dialog"
        onClick={onClose}
      />

      <div className="lc-modal__body">
        <button
          type="button"
          className="lc-modal__close"
          onClick={onClose}
          aria-label="Close"
        >
          <i className="fa-solid fa-xmark" aria-hidden="true" />
        </button>

        <span className="lc-modal__spark lc-modal__spark--1" aria-hidden="true" />
        <span className="lc-modal__spark lc-modal__spark--2" aria-hidden="true" />
        <span className="lc-modal__spark lc-modal__spark--3" aria-hidden="true" />

        <h2 id="lc-title" className="lc-modal__title">
          Course complete! 🎉
        </h2>
        <p className="lc-modal__lead">
          You’ve finished <b>{course.title}</b> and earned a verifiable KALRO badge.
        </p>

        {badge ? (
          <BadgeGenerator badge={badge} size={280} />
        ) : (
          <div className="lc-modal__pending">
            <i className="fa-solid fa-circle-notch fa-spin" aria-hidden="true" />
            <span>Preparing your badge…</span>
          </div>
        )}

        <div className="lc-modal__actions">
          <Link to="/badges" className="btn btn--primary btn--lg" onClick={onClose}>
            <i className="fa-solid fa-trophy" aria-hidden="true" />
            View all badges
          </Link>
          <Link to="/courses" className="btn btn--ghost btn--lg" onClick={onClose}>
            Find another course
          </Link>
        </div>
      </div>
    </div>
  );
}