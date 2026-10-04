// src/components/about/Timeline.jsx
import SectionHead from '../ui/SectionHead';
import { timeline } from '../../data/about';

export default function Timeline() {
  return (
    <section className="section section--paper" id="history">
      <div className="wrap">
        <SectionHead
          title="Where we came from"
          subtitle="A short history of the platform, from pilot to national rollout."
        />

        <ol className="timeline">
          {timeline.map((t) => (
            <li key={t.year} className="timeline__item">
              <span className="timeline__year">{t.year}</span>
              <div className="timeline__body">
                <h3>{t.title}</h3>
                <p>{t.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}