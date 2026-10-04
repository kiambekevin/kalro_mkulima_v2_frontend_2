// src/components/ui/Breadcrumbs.jsx
export default function Breadcrumbs({ items = [] }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <ol>
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={i} aria-current={last ? 'page' : undefined}>
              {item.href && !last ? (
                <a href={item.href}>{item.label}</a>
              ) : (
                <span>{item.label}</span>
              )}
              {!last && (
                <i className="fa-solid fa-chevron-right" aria-hidden="true" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}