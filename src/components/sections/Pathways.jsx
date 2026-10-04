// src/components/sections/Pathways.jsx
import { Rosette } from '../ui/Rosette';
import SectionHead from '../ui/SectionHead';
import { usePathways } from '../../hooks/usePathways';

/**
 * Pathways
 * "Learning pathways" strip on the homepage. Fetches published pathways
 * from /api/v1/pathways/ and renders them as cards. Each card links to
 * a filtered catalogue view.
 */
export default function Pathways() {
  const { pathways, loading } = usePathways();

  // Nothing to show → render nothing (don't leave an empty section)
  if (!loading && pathways.length === 0) return null;

  return (
    <section className="section section--paper" id="pathways">
      <div className="wrap">
        <SectionHead
          title="Learning pathways"
          subtitle="A set of courses that builds one complete skill. Finish them all to earn a pathway badge."
          link="/courses"
          linkLabel="All pathways"
        />

        <div className="pathways">
          {loading &&
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="pathway pathway--skeleton" aria-hidden="true" />
            ))}

          {!loading &&
            pathways.map((p) => (
              <article className="pathway" key={p.id || p.slug}>
                <div className="pathway__top">
                  <h3>{p.title}</h3>
                  <Rosette
                    variant={p.badge_variant || 'pathway'}
                    size="sm"
                    icon={p.icon || 'fa-solid fa-medal'}
                  />
                </div>

                <p>{p.summary}</p>

                <div className="meta">
                  <span>
                    <i className="fa-solid fa-book" aria-hidden="true" />
                    {p.course_count} course{p.course_count === 1 ? '' : 's'}
                  </span>
                  <span>
                    <i className="fa-regular fa-clock" aria-hidden="true" />
                    {p.total_hours} hrs
                  </span>
                </div>

                {p.badge_label && (
                  <div className="earn">
                    Earn the <b>{p.badge_label}</b> badge
                  </div>
                )}

                <a
                  href={`/courses?pathway=${p.slug}`}
                  className={`btn btn--${p.cta_variant || 'ghost'} btn--sm`}
                >
                  Start pathway
                </a>
              </article>
            ))}
        </div>
      </div>
    </section>
  );
}