// src/components/about/AudienceGrid.jsx
import SectionHead from '../ui/SectionHead';
import { audience } from '../../data/about';

export default function AudienceGrid() {
  return (
    <section className="section" id="audience">
      <div className="wrap">
        <SectionHead
          title="Who uses the platform"
          subtitle="From a single farmer with a phone to a national cooperative network."
        />

        <div className="audience">
          {audience.map((a) => (
            <article key={a.title} className="audience__card">
              <span className="audience__icon">
                <i className={a.icon} aria-hidden="true" />
              </span>
              <h3>{a.title}</h3>
              <p>{a.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}