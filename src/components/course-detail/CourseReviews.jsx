// src/components/course-detail/CourseReviews.jsx

/**
 * CourseReviews
 * Rating summary with a breakdown bar chart, then the sample of
 * reviews returned by the API. The backend doesn't currently paginate
 * reviews, so we render whatever it sends.
 *
 * Review shape:
 *   { name, initials, colour, rating, when, text }
 */
export default function CourseReviews({ reviews, rating, reviewCount }) {
  const safeRating = Number(rating) || 0;
  const total = Number(reviewCount) || 0;
  const list = Array.isArray(reviews) ? reviews : [];

  // Compute the star distribution from the sample we received. If we
  // had the full dataset we'd compute it server-side; the fallback
  // here is a plausible default for display purposes.
  const distribution = computeDistribution(list, safeRating, total);

  return (
    <div
      className="cd-panel"
      id="panel-reviews"
      role="tabpanel"
      aria-labelledby="tab-reviews"
    >
      <section className="cd-block">
        <h2>Learner reviews</h2>

        <div className="cd-reviews-summary">
          <div className="cd-reviews-summary__score">
            <b>{safeRating.toFixed(1)}</b>
            <div className="cd-stars" aria-label={`${safeRating} out of 5`}>
              {[1, 2, 3, 4, 5].map((n) => (
                <i
                  key={n}
                  className={`fa-solid fa-star ${
                    n <= Math.round(safeRating) ? '' : 'is-off'
                  }`}
                  aria-hidden="true"
                />
              ))}
            </div>
            <span>{total.toLocaleString()} reviews</span>
          </div>

          <ul className="cd-reviews-summary__bars">
            {distribution.map((row) => (
              <li key={row.stars}>
                <span>{row.stars} ★</span>
                <div className="cd-bar">
                  <span style={{ width: `${row.pct}%` }} />
                </div>
                <span>{row.pct}%</span>
              </li>
            ))}
          </ul>
        </div>

        {list.length === 0 ? (
          <p className="cd-muted">
            No written reviews yet — be the first to share your experience
            after finishing the course.
          </p>
        ) : (
          <ul className="cd-reviews">
            {list.map((r, i) => (
              <li key={`${r.name}-${r.when}-${i}`} className="cd-review">
                <div className="cd-review__head">
                  <span
                    className="cd-avatar"
                    style={{ background: r.colour || '#23804A' }}
                    aria-hidden="true"
                  >
                    {r.initials || initialsOf(r.name)}
                  </span>
                  <div>
                    <b>{r.name}</b>
                    <div className="cd-review__meta">
                      <span className="cd-stars">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <i
                            key={n}
                            className={`fa-solid fa-star ${
                              n <= (r.rating || 0) ? '' : 'is-off'
                            }`}
                            aria-hidden="true"
                          />
                        ))}
                      </span>
                      <span className="cd-muted">· {r.when}</span>
                    </div>
                  </div>
                </div>
                <p>{r.text}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

// ───────────────────────────── Helpers ─────────────────────────────

function initialsOf(name = '') {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('') || '?';
}

function computeDistribution(reviews, rating, totalReviews) {
  // If we have sample reviews, count them.
  if (reviews.length > 0) {
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((r) => {
      const n = Math.max(1, Math.min(5, Math.round(r.rating || 0)));
      counts[n] += 1;
    });
    const sum = reviews.length;
    return [5, 4, 3, 2, 1].map((stars) => ({
      stars,
      pct: Math.round((counts[stars] / sum) * 100),
    }));
  }

  // Otherwise synthesize a plausible distribution around the average.
  // Real deployment should send this from the backend.
  const buckets = [5, 4, 3, 2, 1];
  const weights = buckets.map((s) => Math.exp(-Math.abs(s - rating)));
  const totalW = weights.reduce((a, b) => a + b, 0);
  return buckets.map((stars, i) => ({
    stars,
    pct: Math.round((weights[i] / totalW) * 100),
  }));
}