// src/components/dashboard/ContinueLearning.jsx
import { Link } from 'react-router-dom';

export default function ContinueLearning({ items }) {
  if (!items?.length) {
    return (
      <section className="dash-panel">
        <header className="dash-panel__head">
          <h2>
            <i className="fa-solid fa-play" aria-hidden="true" />
            Continue learning
          </h2>
        </header>
        <div className="dash-empty">
          <p>You haven’t started a course yet.</p>
          <Link to="/courses" className="btn btn--primary btn--sm">
            Browse courses
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="dash-panel">
      <header className="dash-panel__head">
        <h2>
          <i className="fa-solid fa-play" aria-hidden="true" />
          Continue learning
        </h2>
        <Link to="/courses" className="text-link">
          All courses <i className="fa-solid fa-arrow-right" />
        </Link>
      </header>

      <ul className="dash-continue">
        {items.slice(0, 3).map(({ course, done, total, percent, lastLessonId }) => (
          <li key={course.slug} className="continue-card">
            <div className="continue-card__thumb">
              <img src={course.image} alt={course.alt} />
            </div>
            <div className="continue-card__body">
              <span className="continue-card__subject">{course.subjectLabel}</span>
              <h3>{course.title}</h3>
              <div className="continue-card__meta">
                <span>
                  <i className="fa-solid fa-book" aria-hidden="true" />
                  {done} of {total} lessons
                </span>
                <span>{percent}%</span>
              </div>
              <div className="continue-card__bar">
                <span style={{ width: `${percent}%` }} />
              </div>
            </div>
            <Link
              to={
                lastLessonId
                  ? `/courses/${course.slug}/lessons/${lastLessonId}`
                  : `/courses/${course.slug}`
              }
              className="continue-card__cta"
            >
              <i className="fa-solid fa-play" aria-hidden="true" />
              {done > 0 ? 'Resume' : 'Start'}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}