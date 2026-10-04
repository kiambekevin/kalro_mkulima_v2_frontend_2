// src/components/lesson/LessonNav.jsx
import { Link } from 'react-router-dom';

export default function LessonNav({
  course,
  prev,
  next,
  isDone,
  onToggle,
  progress,
}) {
  const lessonPath = (l) => {
    const identifier = l.slug || l.id;
    return `/courses/${course.slug}/lessons/${identifier}`;
  };

  return (
    <nav className="lesson-nav" aria-label="Lesson navigation">
      <div className="lesson-nav__row">
        {prev ? (
          <Link
            to={lessonPath(prev)}
            className="lesson-nav__btn lesson-nav__btn--prev"
          >
            <span className="lesson-nav__dir">
              <i className="fa-solid fa-arrow-left" aria-hidden="true" />
              Previous
            </span>
            <strong>{prev.title}</strong>
          </Link>
        ) : (
          <span className="lesson-nav__btn lesson-nav__btn--prev is-disabled">
            <span className="lesson-nav__dir">Previous</span>
            <strong>You’re at the start</strong>
          </span>
        )}

        {next ? (
          <Link
            to={lessonPath(next)}
            className="lesson-nav__btn lesson-nav__btn--next"
          >
            <span className="lesson-nav__dir">
              Next
              <i className="fa-solid fa-arrow-right" aria-hidden="true" />
            </span>
            <strong>{next.title}</strong>
          </Link>
        ) : (
          <Link
            to={`/courses/${course.slug}`}
            className="lesson-nav__btn lesson-nav__btn--next"
          >
            <span className="lesson-nav__dir">Finish</span>
            <strong>Back to course overview</strong>
          </Link>
        )}
      </div>

      <div className="lesson-nav__footer">
        <button
          type="button"
          className="btn btn--primary"
          onClick={onToggle}
        >
          <i
            className={`fa-solid ${isDone ? 'fa-circle-check' : 'fa-circle'}`}
            aria-hidden="true"
          />
          {isDone ? 'Mark as incomplete' : 'Mark lesson as complete'}
        </button>

        <span className="lesson-nav__progress">
          {progress.completed.size} of {progress.total ?? progress.completed.size}{' '}
          lessons complete
        </span>
      </div>
    </nav>
  );
}