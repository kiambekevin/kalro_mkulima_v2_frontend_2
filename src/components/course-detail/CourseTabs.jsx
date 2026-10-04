// src/components/course-detail/CourseTabs.jsx
const TABS = [
  { id: 'overview',   label: 'Overview',   icon: 'fa-solid fa-circle-info' },
  { id: 'curriculum', label: 'Curriculum', icon: 'fa-solid fa-list-check' },
  { id: 'instructor', label: 'Instructor', icon: 'fa-solid fa-chalkboard-user' },
  { id: 'reviews',    label: 'Reviews',    icon: 'fa-solid fa-star' },
];

export default function CourseTabs({ value, onChange }) {
  return (
    <div className="cd-tabs" role="tablist" aria-label="Course sections">
      {TABS.map((t) => (
        <button
          key={t.id}
          role="tab"
          aria-selected={value === t.id}
          aria-controls={`panel-${t.id}`}
          id={`tab-${t.id}`}
          className={`cd-tab ${value === t.id ? 'is-on' : ''}`}
          onClick={() => onChange(t.id)}
        >
          <i className={t.icon} aria-hidden="true" />
          {t.label}
        </button>
      ))}
    </div>
  );
}