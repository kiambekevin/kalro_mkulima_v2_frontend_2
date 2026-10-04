// src/components/courses/CourseEmpty.jsx

/**
 * CourseEmpty
 * Empty state when no courses match the current filters.
 */
export default function CourseEmpty({ onClear }) {
  return (
    <div className="courses-empty">
      <div className="courses-empty__icon">
        <i className="fa-solid fa-seedling" aria-hidden="true" />
      </div>
      <h3>No courses match your filters</h3>
      <p>Try removing a filter or searching for something more general.</p>
      <button type="button" className="btn btn--primary" onClick={onClear}>
        Clear all filters
      </button>
    </div>
  );
}