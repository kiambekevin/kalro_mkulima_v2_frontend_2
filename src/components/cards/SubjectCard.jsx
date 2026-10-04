// src/components/cards/SubjectCard.jsx

/**
 * SubjectCard
 * Renders a single subject tile used on the "Explore by subject" grid.
 * The `all` flag switches the card to the dark "Full catalogue" style.
 *
 * Props:
 *  - subject: {
 *      icon:  string   Font Awesome class
 *      title: string   e.g. 'Crops'
 *      count: string   e.g. '42 courses'
 *      all:   boolean? If true, uses the dark featured styling
 *      href:  string?  optional target (defaults to '#')
 *    }
 */
export default function SubjectCard({ subject }) {
  const { icon, title, count, all = false, href = '#' } = subject;

  return (
    <a href={href} className={`subject ${all ? 'subject--all' : ''}`}>
      <span className="subject__ico">
        <i className={icon} aria-hidden="true" />
      </span>
      <span>
        <h3>{title}</h3>
        <p>{count}</p>
      </span>
    </a>
  );
}