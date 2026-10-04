// src/components/courses/Pagination.jsx

/**
 * Pagination
 * Simple prev / numbered pages / next control. Hides itself when
 * there is only a single page.
 */
export default function Pagination({ page, totalPages, setPage }) {
  if (totalPages <= 1) return null;

  const go = (p) => {
    setPage(Math.min(Math.max(1, p), totalPages));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const windowSize = 2;
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      Math.abs(i - page) <= windowSize
    ) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== '…') {
      pages.push('…');
    }
  }

  return (
    <nav className="pager" aria-label="Pagination">
      <button
        type="button"
        className="pager__btn"
        onClick={() => go(page - 1)}
        disabled={page === 1}
        aria-label="Previous page"
      >
        <i className="fa-solid fa-chevron-left" aria-hidden="true" />
      </button>

      {pages.map((p, i) =>
        p === '…' ? (
          <span key={`gap-${i}`} className="pager__gap">…</span>
        ) : (
          <button
            key={p}
            type="button"
            className={`pager__btn ${p === page ? 'is-on' : ''}`}
            aria-current={p === page ? 'page' : undefined}
            onClick={() => go(p)}
          >
            {p}
          </button>
        )
      )}

      <button
        type="button"
        className="pager__btn"
        onClick={() => go(page + 1)}
        disabled={page === totalPages}
        aria-label="Next page"
      >
        <i className="fa-solid fa-chevron-right" aria-hidden="true" />
      </button>
    </nav>
  );
}