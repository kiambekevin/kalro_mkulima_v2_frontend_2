// src/components/about/PartnersGrid.jsx
import SectionHead from '../ui/SectionHead';
import { partners } from '../../data/about';

export default function PartnersGrid() {
  return (
    <section className="section" id="partners">
      <div className="wrap">
        <SectionHead
          title="Partners & collaborators"
          subtitle="KALRO Mkulima is delivered with the support of national and international partners."
        />

        <ul className="partners">
          {partners.map((p) => (
            <li key={p.short} className="partners__item">
              <b>{p.short}</b>
              <span>{p.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}