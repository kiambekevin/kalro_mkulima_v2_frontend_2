// src/components/lesson/LessonOutline.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * LessonOutline
 * Sticky sidebar with collapsible modules, completion ticks, and a
 * percentage ring. Prefers `lesson.slug` for links, falls back to id.
 */
export default function LessonOutline({
  course,
  modules,
  flatLessons,
  currentLessonId,
  progress,
  currentIndex,
}) {
  const currentModuleIdx =
    flatLessons.find((l) => l.id === currentLessonId)?.moduleIndex ?? 0;
  const [openIdx, setOpenIdx] = useState(currentModuleIdx);

  // If the current lesson changes (via prev/next), open its module
  useEffect(() => {
    setOpenIdx(currentModuleIdx);
  }, [currentModuleIdx]);

  const completedInModule = (lessons) =>
    lessons.filter((l) => progress.isDone(l.id)).length;

  const lessonPath = (l) => {
    const identifier = l.slug || l.id;
    return `/courses/${course.slug}/lessons/${identifier}`;
  };

  return (
    <div className="lesson-outline">
      <header className="lesson-outline__head">
        <div>
          <h2>Course outline</h2>
          <p className="lesson-outline__meta">
            {flatLessons.length} lessons · {progress.completed.size} complete
          </p>
        </div>
        <div className="lesson-outline__ring" style={{ '--pct': progress.percent }}>
          <span>{progress.percent}%</span>
        </div>
      </header>

      <ul className="lesson-outline__modules">
        {modules.map((m, mi) => {
          const open = openIdx === mi;
          const doneCount = completedInModule(m.lessons);
          const total = m.lessons.length;

          return (
            <li key={m.id || m.title} className={`lo-module ${open ? 'is-open' : ''}`}>
              <button
                type="button"
                className="lo-module__head"
                aria-expanded={open}
                onClick={() => setOpenIdx(open ? -1 : mi)}
              >
                <i
                  className={`fa-solid fa-chevron-${open ? 'down' : 'right'}`}
                  aria-hidden="true"
                />
                <span className="lo-module__title">{m.title}</span>
                <span className="lo-module__count">
                  {doneCount}/{total}
                </span>
              </button>

              {open && (
                <ul className="lo-lessons">
                  {m.lessons.map((l) => {
                    const isCurrent = l.id === currentLessonId;
                    const isDone = progress.isDone(l.id);

                    return (
                      <li
                        key={l.id}
                        className={`lo-lesson ${isCurrent ? 'is-current' : ''} ${
                          isDone ? 'is-done' : ''
                        }`}
                      >
                        <Link
                          to={lessonPath(l)}
                          className="lo-lesson__link"
                        >
                          <span className="lo-lesson__icon">
                            {isDone ? (
                              <i className="fa-solid fa-circle-check" aria-hidden="true" />
                            ) : (
                              <i
                                className={`fa-solid ${
                                  l.type === 'video'
                                    ? 'fa-play'
                                    : l.type === 'quiz'
                                    ? 'fa-circle-question'
                                    : 'fa-file-lines'
                                }`}
                                aria-hidden="true"
                              />
                            )}
                          </span>
                          <span className="lo-lesson__title">{l.title}</span>
                          <span className="lo-lesson__time">{l.minutes}m</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        })}
      </ul>

      <footer className="lesson-outline__foot">
        <Link to={`/courses/${course.slug}`} className="btn btn--ghost btn--sm">
          <i className="fa-solid fa-arrow-left" aria-hidden="true" />
          Back to course
        </Link>
      </footer>
    </div>
  );
}