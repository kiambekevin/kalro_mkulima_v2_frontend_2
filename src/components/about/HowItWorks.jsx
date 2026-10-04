// src/components/about/HowItWorks.jsx
import SectionHead from '../ui/SectionHead';
import { journey } from '../../data/about';

export default function HowItWorks() {
  return (
    <section className="section section--paper" id="how">
      <div className="wrap">
        <SectionHead
          title="How KALRO Mkulima works"
          subtitle="Four steps from registering to your first KALRO badge."
        />

        <ol className="journey">
          {journey.map((s) => (
            <li key={s.step} className="journey__step">
              <div className="journey__num">{s.step}</div>
              <h3>{s.title}</h3>
              <p>{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}