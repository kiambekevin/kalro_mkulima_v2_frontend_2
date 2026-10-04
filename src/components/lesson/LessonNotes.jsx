// src/components/lesson/LessonNotes.jsx

export default function LessonNotes({ lesson }) {
  if (!lesson.notes?.length) return null;

  return (
    <section className="lesson-notes" aria-labelledby="notes-title">
      <header className="lesson-notes__head">
        <h2 id="notes-title">
          <i className="fa-solid fa-lightbulb" aria-hidden="true" />
          Key takeaways
        </h2>
        <button type="button" className="lesson-notes__print">
          <i className="fa-regular fa-print" aria-hidden="true" />
          Print
        </button>
      </header>

      <ul className="lesson-notes__list">
        {lesson.notes.map((n) => (
          <li key={n}>
            <i className="fa-solid fa-circle-check" aria-hidden="true" />
            <span>{n}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}