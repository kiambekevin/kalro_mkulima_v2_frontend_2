// src/components/course-detail/EnrollModal.jsx
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import { useAuth } from '../../hooks/useAuth';

/**
 * EnrollModal
 * Confirmation modal shown when the learner clicks Enroll on a course.
 *
 * If the learner isn't signed in, the modal offers a login/register
 * path with `state.from` set so they land back on this course.
 *
 * If they are signed in, "Continue" navigates to the first lesson
 * (or the resume point if progress exists).
 */
export default function EnrollModal({
  open,
  onClose,
  course,
  resumeLessonSlug,
}) {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Lock body scroll and close on Escape
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

  const startPath = resumeLessonSlug
    ? `/courses/${course.slug}/lessons/${resumeLessonSlug}`
    : `/courses/${course.slug}`;

  const handleStart = () => {
    onClose();
    navigate(startPath);
  };

  const loginState = { from: { pathname: `/courses/${course.slug}` } };

  return (
    <div className="cd-modal" role="dialog" aria-modal="true" aria-labelledby="enroll-title">
      <button
        type="button"
        className="cd-modal__backdrop"
        aria-label="Close dialog"
        onClick={onClose}
      />

      <div className="cd-modal__body">
        <button
          type="button"
          className="cd-modal__close"
          onClick={onClose}
          aria-label="Close"
        >
          <i className="fa-solid fa-xmark" aria-hidden="true" />
        </button>

        <h2 id="enroll-title">
          {user ? 'Ready to start?' : 'Sign in to enroll'}
        </h2>

        <p className="cd-muted">
          You're enrolling in <b>{course.title}</b>.{' '}
          {user
            ? 'Your progress is saved automatically.'
            : 'Create a free account or sign in — it takes a minute and unlocks every course.'}
        </p>

        <ul className="cd-modal__list">
          <li>
            <i className="fa-solid fa-circle-check" aria-hidden="true" />
            Learn online or offline
          </li>
          <li>
            <i className="fa-solid fa-circle-check" aria-hidden="true" />
            Earn a verified KALRO badge
          </li>
          <li>
            <i className="fa-solid fa-circle-check" aria-hidden="true" />
            Available in English and Kiswahili
          </li>
        </ul>

        <div className="cd-modal__actions">
          {user ? (
            <Button variant="primary" size="lg" onClick={handleStart}>
              <i className="fa-solid fa-play" aria-hidden="true" />
              {resumeLessonSlug ? 'Continue learning' : 'Start course'}
            </Button>
          ) : (
            <>
              <Link
                to="/register"
                state={loginState}
                className="btn btn--primary btn--lg"
                onClick={onClose}
              >
                <i className="fa-solid fa-user-plus" aria-hidden="true" />
                Create free account
              </Link>
              <Link
                to="/login"
                state={loginState}
                className="btn btn--ghost btn--lg"
                onClick={onClose}
              >
                I already have an account
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}