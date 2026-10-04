// src/components/about/MissionPillars.jsx
import SectionHead from '../ui/SectionHead';
import { pillars } from '../../data/about';

export default function MissionPillars() {
  return (
    <section className="section" id="mission">
      <div className="wrap">
        <SectionHead
          title="What makes KALRO Mkulima different"
          subtitle="Three principles guide every course we publish."
        />

        <div className="pillars">
          {pillars.map((p) => (
            <article key={p.title} className="pillar">
              <span className="pillar__icon">
                <i className={p.icon} aria-hidden="true" />
              </span>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}