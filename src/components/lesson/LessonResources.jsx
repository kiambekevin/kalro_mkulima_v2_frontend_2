// src/components/lesson/LessonResources.jsx

/**
 * LessonResources
 * Renders the learning materials attached to a lesson. Accepts the
 * array from the API's `lesson.resources` and groups by `kind`:
 *
 *   - "pdf"    → download card with title, publisher, size label
 *   - "tool"   → digital tool card (KAMIS, KALRO Selector, …)
 *   - "link"   → plain link row
 *
 * Returns null when there are no resources, so the page flows
 * straight from notes into prev/next without an empty section.
 *
 * API resource shape:
 *   { id, kind, title, publisher, description, url,
 *     size_label, category, order }
 */
export default function LessonResources({ resources }) {
  if (!Array.isArray(resources) || resources.length === 0) return null;

  const pdfs = resources.filter((r) => r.kind === 'pdf');
  const tools = resources.filter((r) => r.kind === 'tool');
  const links = resources.filter((r) => r.kind === 'link');

  return (
    <section className="lesson-resources" aria-labelledby="resources-title">
      <header className="lesson-resources__head">
        <h2 id="resources-title">
          <i className="fa-solid fa-book-bookmark" aria-hidden="true" />
          Lesson resources
        </h2>
        <p className="lesson-resources__lead">
          Downloadable materials and KALRO digital tools to help you apply
          this lesson in the field.
        </p>
      </header>

      {/* ─── PDFs & e-books ─────────────────────────────────── */}
      {pdfs.length > 0 && (
        <div className="lesson-resources__group">
          <h3 className="lesson-resources__group-title">
            <i className="fa-solid fa-file-pdf" aria-hidden="true" />
            Extension materials &amp; e-books
          </h3>
          <ul className="lesson-resources__list">
            {pdfs.map((r) => (
              <li key={r.id} className="resource-card resource-card--pdf">
                <span className="resource-card__icon">
                  <i className="fa-solid fa-file-pdf" aria-hidden="true" />
                </span>

                <div className="resource-card__body">
                  <b className="resource-card__title">{r.title}</b>
                  {r.publisher && (
                    <span className="resource-card__publisher">
                      {r.publisher}
                    </span>
                  )}
                  {r.description && (
                    <p className="resource-card__desc">{r.description}</p>
                  )}
                  {r.size_label && (
                    <span className="resource-card__meta">{r.size_label}</span>
                  )}
                </div>

                <a
                  href={r.url || '#'}
                  className="resource-card__action"
                  target="_blank"
                  rel="noreferrer"
                  download
                >
                  <i className="fa-solid fa-download" aria-hidden="true" />
                  Download
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ─── Digital tools ──────────────────────────────────── */}
      {tools.length > 0 && (
        <div className="lesson-resources__group">
          <h3 className="lesson-resources__group-title">
            <i className="fa-solid fa-mobile-screen-button" aria-hidden="true" />
            KALRO digital tools
          </h3>
          <ul className="lesson-resources__list lesson-resources__list--tools">
            {tools.map((t) => (
              <li key={t.id} className="resource-card resource-card--tool">
                {t.category && (
                  <span className="resource-card__badge">{t.category}</span>
                )}
                <b className="resource-card__title">{t.title}</b>
                {t.publisher && (
                  <span className="resource-card__publisher">{t.publisher}</span>
                )}
                {t.description && (
                  <p className="resource-card__desc">{t.description}</p>
                )}
                <a
                  href={t.url}
                  className="btn btn--ghost btn--sm resource-card__btn"
                  target="_blank"
                  rel="noreferrer"
                >
                  Open tool
                  <i
                    className="fa-solid fa-arrow-up-right-from-square"
                    aria-hidden="true"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ─── Generic links ──────────────────────────────────── */}
      {links.length > 0 && (
        <ul className="lesson-resources__links">
          {links.map((l) => (
            <li key={l.id}>
              <a href={l.url} target="_blank" rel="noreferrer">
                <i className="fa-solid fa-link" aria-hidden="true" />
                {l.title}
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}