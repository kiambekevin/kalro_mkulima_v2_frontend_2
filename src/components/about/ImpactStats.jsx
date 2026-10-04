// src/components/about/ImpactStats.jsx
import { impact } from '../../data/about';

export default function ImpactStats() {
  return (
    <section className="about-impact">
      <div className="wrap">
        <div className="impact-grid">
          {impact.map((s) => (
            <div key={s.label} className="impact-stat">
              <b>{s.value}</b>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}