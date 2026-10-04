// src/components/courses/CourseToolbar.jsx
/**
 * CourseToolbar
 * Result count, active filter chips, sort dropdown and view toggle.
 *
 * Props:
 *   totalResults   — integer
 *   sort           — 'popular' | 'newest' | 'rating' | 'az'
 *   setSort        — (value) => void
 *   onOpenFilters  — () => void  (mobile only)
 *   activeCount    — integer; total active filters
 *   view           — 'grid' | 'list'
 *   setView        — (value) => void
 *   searchTerm     — current search string or ''
 *   onClearSearch  — () => void
 *   pathwayLabel   — title of the active pathway, or null
 *   onClearPathway — () => void
 */
export default function CourseToolbar({
  totalResults,
  sort,
  setSort,
  onOpenFilters,
  activeCount,
  view,
  setView,
  searchTerm,
  onClearSearch,
  pathwayLabel,
  onClearPathway,
}) {
  return (
    <div className="toolbar">
      <button
        type="button"
        className="toolbar__filters-btn"
        onClick={onOpenFilters}
        aria-label="Open filters"
      >
        <i className="fa-solid fa-sliders" aria-hidden="true" />
        Filters
        {activeCount > 0 && (
          <span className="toolbar__badge">{activeCount}</span>
        )}
      </button>

      <p className="toolbar__count">
        <strong>{totalResults}</strong>{' '}
        {totalResults === 1 ? 'course' : 'courses'}
      </p>

      {pathwayLabel && (
        <span className="toolbar__query toolbar__query--pathway">
          <i className="fa-solid fa-route" aria-hidden="true" />
          {pathwayLabel}
          <button
            type="button"
            onClick={onClearPathway}
            aria-label="Clear pathway filter"
          >
            <i className="fa-solid fa-xmark" aria-hidden="true" />
          </button>
        </span>
      )}

      {searchTerm && (
        <span className="toolbar__query">
          <i className="fa-solid fa-magnifying-glass" aria-hidden="true" />
          “{searchTerm}”
          <button
            type="button"
            onClick={onClearSearch}
            aria-label="Clear search"
          >
            <i className="fa-solid fa-xmark" aria-hidden="true" />
          </button>
        </span>
      )}

      <div className="toolbar__right">
        <label className="toolbar__sort">
          <span className="sr-only">Sort by</span>
          <i className="fa-solid fa-arrow-down-wide-short" aria-hidden="true" />
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="popular">Most popular</option>
            <option value="newest">Newest</option>
            <option value="rating">Highest rated</option>
            <option value="az">A – Z</option>
          </select>
        </label>

        <div className="view-toggle" role="group" aria-label="View mode">
          <button
            type="button"
            aria-pressed={view === 'grid'}
            onClick={() => setView('grid')}
            aria-label="Grid view"
          >
            <i className="fa-solid fa-table-cells-large" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-pressed={view === 'list'}
            onClick={() => setView('list')}
            aria-label="List view"
          >
            <i className="fa-solid fa-list" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}