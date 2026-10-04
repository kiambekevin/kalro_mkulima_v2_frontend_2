// src/pages/CallCentrePage.jsx
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/ui/Breadcrumbs';

/**
 * CallCentrePage
 * Dedicated page for the KALRO Mkulima farmer call centre.
 * Highlights the toll-free number 0800 721 741, illustrates the
 * service with an image, and answers the most common questions.
 */
export default function CallCentrePage() {
  const phone = '0800 721 741';
  const phoneHref = 'tel:0800721741';

  return (
    <main id="main">
      {/* ─── Hero ──────────────────────────────────────────── */}
      <section className="call-hero">
        <div className="wrap call-hero__inner">
          <div className="call-hero__text">
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'Call centre' },
              ]}
            />

            <span className="call-hero__kicker">
              <i className="fa-solid fa-phone-volume" aria-hidden="true" />
              KALRO Farmer Call Centre
            </span>

            <h1>
              Talk to a KALRO expert: <em>free of charge.</em>
            </h1>

            <p className="call-hero__lead">
              Ask any farming question and get a practical answer from a
              KALRO researcher or extension specialist. The service is
              toll-free from any phone in Kenya.
            </p>

            <a
              href={phoneHref}
              className="call-number"
              aria-label={`Call ${phone}`}
            >
              <span className="call-number__icon">
                <i className="fa-solid fa-phone" aria-hidden="true" />
              </span>
              <span className="call-number__body">
                <small>Toll-free helpline</small>
                <b>{phone}</b>
              </span>
              <span className="call-number__hint">
                Tap to call
                <i className="fa-solid fa-arrow-right" aria-hidden="true" />
              </span>
            </a>

            <ul className="call-hero__meta">
              <li>
                <i className="fa-solid fa-clock" aria-hidden="true" />
                Mon–Fri · 8:00 AM – 6:00 PM
              </li>
              <li>
                <i className="fa-solid fa-language" aria-hidden="true" />
                English · Kiswahili
              </li>
              <li>
                <i className="fa-solid fa-headset" aria-hidden="true" />
                Real people, not bots
              </li>
            </ul>
          </div>

          <div className="call-hero__art">
            <img
              src="/images/kacc.png"
              alt="A Kenyan farmer making a phone call from a maize field while an agent in the KALRO call centre answers"
              loading="eager"
            />
            <span className="call-hero__art-caption">
              <i className="fa-solid fa-circle-check" aria-hidden="true" />
              Over 40,000 calls answered last year
            </span>
          </div>
        </div>
      </section>

      {/* ─── What we help with ───────────────────────────── */}
      <section className="section">
        <div className="wrap">
          <header className="section-head">
            <div>
              <h2>What we can help you with</h2>
              <p>
                If it affects your farm, ask us. If we don't know, we'll
                connect you to a KALRO researcher who does.
              </p>
            </div>
          </header>

          <div className="call-topics">
            <article className="call-topic">
              <span className="call-topic__ico">
                <i className="fa-solid fa-wheat-awn" aria-hidden="true" />
              </span>
              <h3>Crops</h3>
              <p>
                Variety choice, planting dates, spacing, fertiliser, pests
                and diseases, post-harvest handling.
              </p>
            </article>

            <article className="call-topic">
              <span className="call-topic__ico">
                <i className="fa-solid fa-cow" aria-hidden="true" />
              </span>
              <h3>Livestock</h3>
              <p>
                Breeding, feeding, disease symptoms, milk hygiene,
                vaccination schedules, housing.
              </p>
            </article>

            <article className="call-topic">
              <span className="call-topic__ico">
                <i className="fa-solid fa-droplet" aria-hidden="true" />
              </span>
              <h3>Water &amp; irrigation</h3>
              <p>
                Drip systems, pumps, rainwater harvesting, irrigation
                scheduling for your crop.
              </p>
            </article>

            <article className="call-topic">
              <span className="call-topic__ico">
                <i className="fa-solid fa-cloud-sun-rain" aria-hidden="true" />
              </span>
              <h3>Weather &amp; climate</h3>
              <p>
                Seasonal forecasts, drought coping, conservation
                agriculture, agroforestry guidance.
              </p>
            </article>

            <article className="call-topic">
              <span className="call-topic__ico">
                <i className="fa-solid fa-chart-line" aria-hidden="true" />
              </span>
              <h3>Markets &amp; pricing</h3>
              <p>
                Where to sell, current market prices, cooperatives,
                value-addition ideas.
              </p>
            </article>

            <article className="call-topic">
              <span className="call-topic__ico">
                <i className="fa-solid fa-graduation-cap" aria-hidden="true" />
              </span>
              <h3>KALRO Mkulima platform</h3>
              <p>
                Help with registering, downloading courses, earning
                badges, or finding a specific lesson.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* ─── How it works ────────────────────────────────── */}
      <section className="section section--paper">
        <div className="wrap">
          <header className="section-head">
            <div>
              <h2>How a call works</h2>
              <p>Three steps from dialling to a practical answer.</p>
            </div>
          </header>

          <ol
            className="call-steps"
            style={{ listStyle: 'none', margin: 0, padding: 0 }}
          >
            <li className="call-step">
              <span className="call-step__num">1</span>
              <h3>Dial the number</h3>
              <p>
                Call <b>{phone}</b> from any phone. The line is toll-free on
                Safaricom, Airtel and Telkom.
              </p>
            </li>
            <li className="call-step">
              <span className="call-step__num">2</span>
              <h3>Describe your issue</h3>
              <p>
                Tell the agent what you're seeing — the crop, the animal,
                the weather, the pest. Photos are welcome if you have them.
              </p>
            </li>
            <li className="call-step">
              <span className="call-step__num">3</span>
              <h3>Get an answer</h3>
              <p>
                Most questions are answered on the call. Complex cases get
                a follow-up from a KALRO researcher within 48 hours.
              </p>
            </li>
          </ol>
        </div>
      </section>

      {/* ─── Contact card ─────────────────────────────────── */}
      <section className="section">
        <div className="wrap">
          <div className="call-contact">
            <div className="call-contact__body">
              <h2>Get in touch</h2>
              <p>
                The call centre is the fastest way to reach KALRO. If you
                prefer a different channel, we're here on those too.
              </p>
            </div>

            <ul className="call-contact__list">
              <li>
                <span className="call-contact__ico call-contact__ico--phone">
                  <i className="fa-solid fa-phone" aria-hidden="true" />
                </span>
                <div>
                  <small>Call toll-free</small>
                  <b>
                    <a href={phoneHref}>{phone}</a>
                  </b>
                </div>
              </li>
              <li>
                <span className="call-contact__ico">
                  <i className="fa-regular fa-envelope" aria-hidden="true" />
                </span>
                <div>
                  <small>Email</small>
                  <b>
                    <a href="mailto:mkulima@kalro.org">mkulima@kalro.org</a>
                  </b>
                </div>
              </li>
              <li>
                <span className="call-contact__ico">
                  <i className="fa-solid fa-comment-sms" aria-hidden="true" />
                </span>
                <div>
                  <small>SMS</small>
                  <b>Text your question to 22345</b>
                </div>
              </li>
              <li>
                <span className="call-contact__ico">
                  <i className="fa-brands fa-whatsapp" aria-hidden="true" />
                </span>
                <div>
                  <small>WhatsApp</small>
                  <b>+254 700 000 000</b>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────── */}
      <section className="section section--paper">
        <div className="wrap faq-grid">
          <div className="faq-aside">
            <h2 style={{ fontSize: 'clamp(1.6rem,2.6vw,2.1rem)' }}>
              Frequently asked
            </h2>
            <p>
              Still have a question? Call us —{' '}
              <a href={phoneHref}>{phone}</a> — or browse the platform.
            </p>
            <Link to="/courses" className="btn btn--primary">
              <i className="fa-solid fa-book-open" aria-hidden="true" />
              Browse courses
            </Link>
          </div>

          <div className="faq">
            <details open>
              <summary>
                Is the call really free?{' '}
                <i className="fa-solid fa-plus" aria-hidden="true" />
              </summary>
              <p>
                Yes. {phone} is toll-free on all major Kenyan networks. You
                pay nothing for the call, even from a basic phone.
              </p>
            </details>

            <details>
              <summary>
                What languages do the agents speak?{' '}
                <i className="fa-solid fa-plus" aria-hidden="true" />
              </summary>
              <p>
                English and Kiswahili. Some agents also speak local
                languages — ask when you connect and we'll try to match
                you with a suitable agent.
              </p>
            </details>

            <details>
              <summary>
                When is the line open?{' '}
                <i className="fa-solid fa-plus" aria-hidden="true" />
              </summary>
              <p>
                Monday to Friday, 8:00 AM to 6:00 PM. Calls received
                outside those hours go to a callback list and are returned
                the next working day.
              </p>
            </details>

            <details>
              <summary>
                Can I send photos of the problem?{' '}
                <i className="fa-solid fa-plus" aria-hidden="true" />
              </summary>
              <p>
                Yes, by WhatsApp to +254 700 000 000 or by SMS if you
                include a short MMS. Photos of pests, sick animals or crop
                symptoms help us give you a more precise answer.
              </p>
            </details>

            <details>
              <summary>
                Will my call be private?{' '}
                <i className="fa-solid fa-plus" aria-hidden="true" />
              </summary>
              <p>
                Calls may be recorded for training and quality purposes.
                Personal information is never shared outside KALRO. See
                our <a href="/privacy">privacy policy</a>.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* ─── Closing CTA ──────────────────────────────────── */}
      <section className="cta">
        <div className="wrap">
          <div className="cta__box">
            <div>
              <h2>One call can change your season.</h2>
              <p>Free advice from KALRO researchers, whenever you need it.</p>
            </div>
            <div
              style={{
                display: 'flex',
                gap: 12,
                flexWrap: 'wrap',
                position: 'relative',
              }}
            >
              <a href={phoneHref} className="btn btn--primary btn--lg">
                <i className="fa-solid fa-phone" aria-hidden="true" />
                Call {phone}
              </a>
              <Link to="/courses" className="btn btn--ghost btn--lg">
                Explore courses
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}