// src/components/lesson/LessonHeader.jsx
import { Link } from 'react-router-dom';

export default function LessonHeader({ course, module, lesson, progress }) {
  return (
    <header className="lesson-header">
      <div className="wrap lesson-header__inner">
        <div className="lesson-header__crumbs">
          <Link to="/courses" className="lesson-header__back">
            <i className="fa-solid fa-arrow-left" aria-hidden="true" />
            <span>All courses</span>
          </Link>
          <span className="lesson-header__sep" aria-hidden="true">/</span>
          <Link to={`/courses/${course.slug}`} className="lesson-header__course">
            {course.title}
          </Link>
        </div>

        <div className="lesson-header__meta">
          <span className="lesson-header__module">{module.title}</span>
          <span className="lesson-header__chip">
            <i className="fa-solid fa-book-open" aria-hidden="true" />
            Lesson {lesson.id.toUpperCase?.() ?? lesson.id}
          </span>
        </div>

        <div className="lesson-header__progress">
          <div className="lesson-header__bar">
            <span style={{ width: `${progress.percent}%` }} />
          </div>
          <span className="lesson-header__pct">{progress.percent}% complete</span>
        </div>
      </div>
    </header>
  );
}