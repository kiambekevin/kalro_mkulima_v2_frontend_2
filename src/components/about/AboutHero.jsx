// src/components/about/AboutHero.jsx
import Button from '../ui/Button';
import { mission } from '../../data/about';

export default function AboutHero() {
  return (
    <div className="about-hero__inner">
      <span className="about-hero__tag">
        <i className="fa-solid fa-seedling" aria-hidden="true" />
        About KALRO Mkulima
      </span>

      <h1>{mission.headline}</h1>
      <p className="about-hero__lead">{mission.lead}</p>

      <div className="about-hero__actions">
        <Button variant="primary" size="lg" href="/courses">
          <i className="fa-solid fa-book-open" aria-hidden="true" />
          Browse courses
        </Button>
        <Button variant="ghost-light" size="lg" href="/register">
          Create free account
        </Button>
      </div>

      <p className="about-hero__stat">{mission.stat}</p>
    </div>
  );
}