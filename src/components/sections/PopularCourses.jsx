// src/components/sections/PopularCourses.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CourseCard from '../cards/CourseCard';
import { coursesService } from '../../api/services/courses';
import { imgSrc } from '../../utils/media';

/**
 * PopularCourses
 * Homepage strip. The #1 popular course gets a wide editorial card;
 * the next three use the standard CourseCard.
 */
export default function PopularCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    coursesService
      .popular()
      .then((res) => setCourses(res.results ?? res))
      .catch(() => setCourses([]))
      .finally(() => setLoading(false));
  }, []);

  if (!loading && courses.length === 0) return null;

  const [featured, ...rest] = courses;

  return (
    <section className="section section--paper popular-section" id="courses">
      <div className="wrap">
        {/* ─── Header ─────────────────────────────────────── */}
        <header className="popular-head">
          <div className="popular-head__text">
            <span className="popular-head__kicker">
              <i className="fa-solid fa-fire" aria-hidden="true" />
              Trending this month
            </span>
            <h2>
              Courses learners <em>love</em>
            </h2>
            <p>
              Free, practical training from KALRO researchers — start with
              what other farmers are finishing right now.
            </p>
          </div>

          <Link to="/courses" className="popular-head__cta">
            Browse the full catalogue
            <i className="fa-solid fa-arrow-right" aria-hidden="true" />
          </Link>
        </header>

        {/* ─── Grid ───────────────────────────────────────── */}
        {loading ? (
          <PopularSkeleton />
        ) : (
          <div className="popular-grid">
            {featured && <FeaturedCourseCard course={featured} />}

            {rest.length > 0 && (
              <div className="popular-grid__rest">
                {rest.slice(0, 3).map((c) => (
                  <CourseCard key={c.id || c.slug} course={c} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

/* ───────────────────────────── Featured card ───────────────────────────── */

function FeaturedCourseCard({ course }) {
  const {
    slug,
    title,
    summary,
    subject,
    subjectLabel,
    level,
    levelLabel,
    rating,
    reviews,
    hours,
    lessons,
    badge,
    image,
    alt,
  } = course;

  const href = `/courses/${slug}`;
  const src = imgSrc(image);
  const ratingNum = Number(rating) || 0;
  const reviewsNum = Number(reviews) || 0;

  return (
    <article className="featured-course">
      <Link
        to={href}
        className="featured-course__thumb"
        aria-hidden="true"
        tabIndex={-1}
      >
        {src ? (
          <img src={src} alt={alt || title} loading="lazy" />
        ) : (
          <div className="featured-course__thumb-fallback" aria-hidden="true">
            <i className="fa-solid fa-graduation-cap" />
          </div>
        )}

        <span className="featured-course__ribbon">
          <i className="fa-solid fa-fire" aria-hidden="true" />
          #1 Popular
        </span>

        <span className="featured-course__level">
          {levelLabel || level}
        </span>
      </Link>

      <div className="featured-course__body">
        <div className="featured-course__subject">
          {subjectLabel || subject}
        </div>

        <h3 className="featured-course__title">
          <Link to={href}>{title}</Link>
        </h3>

        {summary && <p className="featured-course__summary">{summary}</p>}

        <div className="featured-course__meta">
          <span className="fc-meta">
            <i className="fa-solid fa-star" aria-hidden="true" />
            <b>{ratingNum.toFixed(1)}</b>
            <span className="fc-meta__muted">
              ({reviewsNum.toLocaleString()})
            </span>
          </span>

          <span className="fc-meta">
            <i className="fa-regular fa-clock" aria-hidden="true" />
            {hours} hrs
          </span>

          <span className="fc-meta">
            <i className="fa-solid fa-book" aria-hidden="true" />
            {lessons} lessons
          </span>

          {badge && (
            <span className="fc-meta fc-meta--badge">
              <i className="fa-solid fa-award" aria-hidden="true" />
              Badge included
            </span>
          )}
        </div>

        <div className="featured-course__actions">
          <Link to={href} className="btn btn--primary">
            <i className="fa-solid fa-play" aria-hidden="true" />
            Start learning
          </Link>
          <Link
            to={`/courses?subject=${subject}`}
            className="featured-course__link"
          >
            More in {subjectLabel || subject}
            <i className="fa-solid fa-arrow-right" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </article>
  );
}

/* ───────────────────────────── Skeleton ───────────────────────────── */

function PopularSkeleton() {
  return (
    <div className="popular-grid" aria-hidden="true">
      <div className="featured-course featured-course--skeleton" />
      <div className="popular-grid__rest">
        <div className="course course--skeleton" />
        <div className="course course--skeleton" />
        <div className="course course--skeleton" />
      </div>
    </div>
  );
}