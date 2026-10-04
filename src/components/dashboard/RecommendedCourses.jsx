// src/components/dashboard/RecommendedCourses.jsx
import { Link } from 'react-router-dom';

export default function RecommendedCourses({ courses }) {
  if (!courses?.length) return null;

  return (
    <section className="dash-panel">
      <header className="dash-panel__head">
        <h2>
          <i className="fa-solid fa-wand-magic-sparkles" aria-hidden="true" />
          Recommended for you
        </h2>
        <Link to="/courses" className="text-link">
          See all <i className="fa-solid fa-arrow-right" />
        </Link>
      </header>

      <ul className="dash-recos">
        {courses.map((c) => (
          <li key={c.id} className="reco-card">
            <Link to={`/courses/${c.slug}`} className="reco-card__link">
              <div className="reco-card__thumb">
                <img src={c.image} alt={c.alt} loading="lazy" />
              </div>
              <div className="reco-card__body">
                <span className="reco-card__subject">{c.subjectLabel}</span>
                <b>{c.title}</b>
                <div className="reco-card__meta">
                  <span>
                    <i className="fa-solid fa-star" aria-hidden="true" /> {c.rating}
                  </span>
                  <span>
                    <i className="fa-regular fa-clock" aria-hidden="true" /> {c.hours} hrs
                  </span>
                  <span>
                    <i className="fa-solid fa-signal" aria-hidden="true" /> {c.levelLabel}
                  </span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}