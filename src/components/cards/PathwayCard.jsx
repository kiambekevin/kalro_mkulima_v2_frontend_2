// src/components/cards/PathwayCard.jsx
import Button from '../ui/Button';
import { Rosette } from '../ui/Rosette';

/**
 * PathwayCard
 * Renders a learning pathway tile with a rosette badge, meta counts
 * and a "Start pathway" CTA. The CTA variant can be 'primary' for the
 * featured pathway or 'ghost' for the rest.
 *
 * Props:
 *  - pathway: {
 *      title:  string          e.g. 'Climate-Smart Agriculture'
 *      icon:   string          Font Awesome class e.g. 'fa-solid fa-cloud-sun-rain'
 *      desc:   string          Short description
 *      courses:number          Number of courses in the pathway
 *      hours:  number          Total hours
 *      badge:  string          Badge name earned on completion
 *      cta:    'primary'|'ghost'  Visual style for the CTA
 *      href:   string?         optional target (defaults to '#')
 *    }
 */
export default function PathwayCard({ pathway }) {
  const {
    title,
    icon,
    desc,
    courses,
    hours,
    badge,
    cta = 'ghost',
    href = '#',
  } = pathway;

  return (
    <article className="pathway">
      <div className="pathway__top">
        <h3>{title}</h3>
        <Rosette variant="pathway" size="sm" icon={icon} />
      </div>

      <p>{desc}</p>

      <div className="meta">
        <span>
          <i className="fa-solid fa-book" aria-hidden="true" />
          {courses} courses
        </span>
        <span>
          <i className="fa-regular fa-clock" aria-hidden="true" />
          {hours} hrs
        </span>
      </div>

      <div className="earn">
        Earn the <b>{badge}</b> badge
      </div>

      <Button variant={cta} size="sm" href={href}>
        Start pathway
      </Button>
    </article>
  );
}