// src/components/course-detail/CourseCurriculum.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export default function CourseCurriculum({
  course,
  curriculum,
  totalMinutes,
  progress,
}) {
  const { user } = useAuth();
  const [openIdx, setOpenIdx] = useState(0);
  const hours = Math.max(1, Math.round(totalMinutes / 60));

  const lessonHref = (lesson) => {
    const identifier = lesson.slug || lesson.id;
    const target = `/courses/${course.slug}/lessons/${identifier}`;
    // Signed out: send the learner through login first
    if (!user) {
      return `/login?next=${encodeURIComponent(target)}`;
    }
    return target;
  };

  return (
    <div
      className="cd-panel"
      id="panel-curriculum"
      role="tabpanel"
      aria-labelledby="tab-curriculum"
    >
      <section className="cd-block">
        <header className="cd-block__head">
          <h2>Course curriculum</h2>
          <span className="cd-muted">
            {curriculum.length} modules · {hours} hrs total
          </span>
        </header>

        {!user && (
          <div className="cd-lock-notice">
            <i className="fa-solid fa-lock" aria-hidden="true" />
            <div>
              <strong>Sign in to open lessons</strong>
              <span>
                Create a free account or{' '}
                <Link to="/login">sign in</Link> to start this course. Your
                progress is saved automatically.
              </span>
            </div>
          </div>
        )}

        {progress.percent > 0 && (
          <div className="cd-progress">
            <div
              className="cd-progress__bar"
              style={{ width: `${progress.percent}%` }}
            />
            <span className="cd-progress__label">
              {progress.percent}% complete · {progress.completed.size} lesson
              {progress.completed.size === 1 ? '' : 's'}
            </span>
          </div>
        )}

        <ul className="cd-modules">
          {curriculum.map((m, i) => {
            const open = openIdx === i;
            const moduleMinutes = m.lessons.reduce(
              (s, l) => s + (l.minutes || 0),
              0,
            );

            return (
              <li
                key={m.id || m.title}
                className={`cd-module ${open ? 'is-open' : ''}`}
              >
                <button
                  type="button"
                  className="cd-module__head"
                  aria-expanded={open}
                  onClick={() => setOpenIdx(open ? -1 : i)}
                >
                  <i
                    className={`fa-solid fa-chevron-${open ? 'down' : 'right'}`}
                    aria-hidden="true"
                  />
                  <span className="cd-module__title">{m.title}</span>
                  <span className="cd-module__meta">
                    {m.lessons.length} lessons ·{' '}
                    {Math.round((moduleMinutes / 60) * 10) / 10} hrs
                  </span>
                </button>

                <ul className="cd-lessons">
                  {m.lessons.map((l) => {
                    const done = user ? progress.isDone(l.id) : false;

                    return (
                      <li
                        key={l.id}
                        className={`cd-lesson ${done ? 'is-done' : ''} ${
                          !user ? 'is-locked' : ''
                        }`}
                      >
                        <button
                          type="button"
                          className="cd-lesson__check"
                          aria-label={
                            done
                              ? `Mark ${l.title} as incomplete`
                              : `Mark ${l.title} as complete`
                          }
                          aria-pressed={done}
                          disabled={!user}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (user) progress.toggle(l.id);
                          }}
                        >
                          {done ? (
                            <i
                              className="fa-solid fa-circle-check"
                              aria-hidden="true"
                            />
                          ) : (
                            <i
                              className="fa-regular fa-circle"
                              aria-hidden="true"
                            />
                          )}
                        </button>

                        <span className="cd-lesson__icon">
                          <i
                            className={`fa-solid ${
                              l.type === 'video'
                                ? 'fa-play'
                                : l.type === 'resource'
                                ? 'fa-file-arrow-down'
                                : l.type === 'quiz'
                                ? 'fa-circle-question'
                                : 'fa-file-lines'
                            }`}
                            aria-hidden="true"
                          />
                        </span>

                        <Link
                          to={lessonHref(l)}
                          className="cd-lesson__title"
                        >
                          {l.title}
                          {l.preview && (
                            <span className="cd-lesson__preview">Preview</span>
                          )}
                          {!user && (
                            <i
                              className="fa-solid fa-lock cd-lesson__lock"
                              aria-label="Sign in to open"
                            />
                          )}
                        </Link>

                        <span className="cd-lesson__time">{l.minutes} min</span>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}