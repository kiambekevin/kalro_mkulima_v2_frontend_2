// src/components/about/ContactCta.jsx
import Button from '../ui/Button';

export default function ContactCta() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="about-cta">
          <div>
            <h2>Ready to learn with KALRO?</h2>
            <p>
              Join over Kenyans building skills for increased
              agricultural productivity. Free, always.
            </p>
          </div>

          <div className="about-cta__actions">
            <Button variant="primary" size="lg" href="/register">
              Create free account
            </Button>
            <Button variant="ghost" size="lg" href="/courses">
              Explore courses
            </Button>
          </div>
        </div>

        <div className="about-contact">
          <div>
            <i className="fa-solid fa-phone" aria-hidden="true" />
            <div>
              <b>0800 721 741</b>
              <span>Toll free, Mon–Fri 8am–5pm</span>
            </div>
          </div>
          <div>
            <i className="fa-regular fa-envelope" aria-hidden="true" />
            <div>
              <b>info@kalro.org</b>
              <span>We reply within 2 working days</span>
            </div>
          </div>
          <div>
            <i className="fa-solid fa-location-dot" aria-hidden="true" />
            <div>
              <b>KALRO Headquarters</b>
              <span>Kaptagat Road, Loresho, Nairobi</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}