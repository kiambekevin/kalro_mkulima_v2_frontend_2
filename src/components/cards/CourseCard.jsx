import { Link } from 'react-router-dom';
import Button from '../ui/Button';
import { imgSrc } from '../../utils/media';

export default function CourseCard({ course }) {
  const {
    subject,
    title,
    level,
    rating,
    reviews,
    hours,
    lessons,
    image,
    alt,
    href = '#',
  } = course;

  const isRouted = href && href !== '#';
  const src = imgSrc(image);

  return (
    <article className="course">
      <Link
        to={isRouted ? href : undefined}
        href={isRouted ? undefined : '#'}
        className="course__thumb"
        tabIndex={-1}
        aria-hidden="true"
      >
        {src ? (
          <img src={src} alt={alt || title} loading="lazy" />
        ) : (
          <div className="course__thumb-fallback" aria-hidden="true">
            <i className="fa-solid fa-graduation-cap" />
          </div>
        )}
        <span className="level">{level}</span>
      </Link>

      <div className="course__body">
        <div className="course__subject">{subject}</div>

        <h3>
          {isRouted ? (
            <Link to={href} className="course__title-link">
              {title}
            </Link>
          ) : (
            title
          )}
        </h3>

        <div className="rating">
          <i className="fa-solid fa-star" aria-hidden="true" />
          {rating} ({reviews})
          <span aria-hidden="true">·</span>
          {hours} hrs, {lessons} lessons
        </div>

        <div className="course__foot">
          <span className="badge-pill">
            <i className="fa-solid fa-award" aria-hidden="true" />
            Badge
          </span>
          {isRouted ? (
            <Link to={href} className="btn btn--primary btn--sm">
              View course
            </Link>
          ) : (
            <Button variant="primary" size="sm" href="#">
              Enroll
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}