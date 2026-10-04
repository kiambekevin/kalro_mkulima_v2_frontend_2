// src/components/about/TeamGrid.jsx
import SectionHead from '../ui/SectionHead';
import { team } from '../../data/about';

export default function TeamGrid() {
  return (
    <section className="section section--paper" id="team">
      <div className="wrap">
        <SectionHead
          title="The people behind the platform"
          subtitle="A small team at KALRO working with researchers and extension officers across the country."
        />

        <div className="team">
          {team.map((m) => (
            <article key={m.name} className="team__card">
              <span
                className="team__avatar"
                style={{ background: m.colour }}
                aria-hidden="true"
              >
                {m.initials}
              </span>
              <h3>{m.name}</h3>
              <span className="team__role">{m.role}</span>
              <p>{m.bio}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}