// src/components/ui/SectionHead.jsx
export default function SectionHead({ title, subtitle, link, linkLabel }) {
  return (
    <div className="section-head">
      <div>
        <h2>{title}</h2>
        {subtitle && <p>{subtitle}</p>}
      </div>
      {link && (
        <a href={link} className="text-link">
          {linkLabel} <i className="fa-solid fa-arrow-right" aria-hidden="true" />
        </a>
      )}
    </div>
  );
}