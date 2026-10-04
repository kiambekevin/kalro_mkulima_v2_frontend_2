// src/pages/AboutPage.jsx
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/ui/Breadcrumbs';

/**
 * AboutPage
 * The KALRO Mkulima About page: mission, pillars, impact, journey,
 * audience, team, partners, timeline, and a closing CTA.
 *
 * Every section is self-contained. The data blocks at the bottom of the
 * file drive the rendering - edit those to change the copy without
 * touching the JSX.
 */
export default function AboutPage() {
  return (
    <main id="main">
      {/* ─── Hero ──────────────────────────────────────────── */}
      <section className="about-hero">
        <div className="wrap about-hero__inner">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'About' },
            ]}
          />

          <span className="about-hero__tag">
            <i className="fa-solid fa-seedling" aria-hidden="true" />
            About KALRO Mkulima
          </span>

          <h1>
            Training for increased
            <br />
            agricultural <em>productivity.</em>
          </h1>

          <p className="about-hero__lead">
            KALRO Mkulima is the official eLearning platform of the Kenya
            Agricultural &amp; Livestock Research Organization. We turn
            decades of national research into free, practical training that
            any farmer, extension officer or agripreneur can use - online or
            offline.
          </p>

          <div className="about-hero__actions">
            <Link to="/courses" className="btn btn--primary btn--lg">
              <i className="fa-solid fa-book-open" aria-hidden="true" />
              Browse courses
            </Link>
            <Link to="/register" className="btn btn--ghost-light btn--lg">
              Create free account
            </Link>
          </div>

          <p className="about-hero__stat">
            Since 2022, over a quarter of a million Kenyans have learned on
            KALRO Mkulima.
          </p>
        </div>
      </section>

      {/* ─── Mission pillars ──────────────────────────────── */}
      <section className="section">
        <div className="wrap">
          <header className="section-head">
            <div>
              <h2>What makes KALRO Mkulima different</h2>
              <p>Three principles guide every course we publish.</p>
            </div>
          </header>

          <div className="about-pillars">
            {PILLARS.map((p) => (
              <article key={p.title} className="about-pillar">
                <span className="about-pillar__icon">
                  <i className={p.icon} aria-hidden="true" />
                </span>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Impact stats ─────────────────────────────────── */}
      <section className="about-impact">
        <div className="wrap">
          <div className="impact-grid">
            {IMPACT.map((s) => (
              <div key={s.label} className="impact-stat">
                <b>{s.value}</b>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── How it works ─────────────────────────────────── */}
      <section className="section section--paper">
        <div className="wrap">
          <header className="section-head">
            <div>
              <h2>How KALRO Mkulima works</h2>
              <p>Four steps from registering to your first KALRO badge.</p>
            </div>
          </header>

          <ol
            className="about-journey"
            style={{ listStyle: 'none', margin: 0, padding: 0 }}
          >
            {JOURNEY.map((s) => (
              <li key={s.step} className="about-journey__step">
                <div className="about-journey__num">{s.step}</div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ─── Audience ─────────────────────────────────────── */}
      <section className="section">
        <div className="wrap">
          <header className="section-head">
            <div>
              <h2>Who uses the platform</h2>
              <p>
                From a single farmer with a phone to a national cooperative
                network.
              </p>
            </div>
          </header>

          <div className="about-audience">
            {AUDIENCE.map((a) => (
              <article key={a.title} className="about-audience__card">
                <span className="about-audience__icon">
                  <i className={a.icon} aria-hidden="true" />
                </span>
                <h3>{a.title}</h3>
                <p>{a.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

     


      {/* ─── Timeline ─────────────────────────────────────── */}
      <section className="section section--paper">
        <div className="wrap">
          <header className="section-head">
            <div>
              <h2>Where we came from</h2>
              <p>
                A short history of the platform, from pilot to national
                rollout.
              </p>
            </div>
          </header>

          <ol
            className="about-timeline"
            style={{ listStyle: 'none', margin: 0, padding: 0 }}
          >
            {TIMELINE.map((t) => (
              <li key={t.year} className="about-timeline__item">
                <span className="about-timeline__year">{t.year}</span>
                <div className="about-timeline__body">
                  <h3>{t.title}</h3>
                  <p>{t.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ─── CTA + contact ────────────────────────────────── */}
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
              <Link to="/register" className="btn btn--primary btn--lg">
                Create free account
              </Link>
              <Link to="/courses" className="btn btn--ghost btn--lg">
                Explore courses
              </Link>
            </div>
          </div>

          <div className="about-contact">
            <div>
              <i className="fa-solid fa-phone" aria-hidden="true" />
              <div>
                <b>0800 721 741</b>
                <span>Toll free · Mon–Fri 8am–6pm</span>
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
    </main>
  );
}

/* ───────────────────────────── Data ───────────────────────────── */

const PILLARS = [
  {
    icon: 'fa-solid fa-flask-vial',
    title: 'Research-backed content',
    body:
      'Every lesson is authored by KALRO researchers and reviewed by ' +
      'county extension specialists. No recycled advice - the same ' +
      'science that guides national policy.',
  },
  {
    icon: 'fa-solid fa-wifi',
    title: 'Built for the last mile',
    body:
      'Courses work offline on any phone. A full module is about 15 MB, ' +
      'lessons sync automatically when the learner reconnects, and ' +
      'everything is available in English and Kiswahili.',
  },
  {
    icon: 'fa-solid fa-award',
    title: 'Skills you can prove',
    body:
      'Each completed course earns a verifiable KALRO digital badge. ' +
      'Cooperative buyers, county programs and development partners can ' +
      'check it in seconds with a QR code.',
  },
];

const IMPACT = [
  { value: '1M+', label: 'Trageted trainees' },
  { value: '101+',  label: 'Free modules' },
  { value: '47',    label: 'Counties reach' },
  { value: '99.9%',  label: 'Badges awards upon completion' },
  { value: '100K+',  label: 'Field-day attendances target' },
  { value: '8',     label: 'Languages in target' },
];

const JOURNEY = [
  {
    step: 1,
    title: 'Register free',
    body: 'Sign up with a phone number. Email is optional. No fee, ever.',
  },
  {
    step: 2,
    title: 'Choose a course or pathway',
    body: 'Pick a single short course or a full learning pathway.',
  },
  {
    step: 3,
    title: 'Learn online or offline',
    body:
      'Download lessons to your phone and study anywhere. Attend field ' +
      'days and demos when they run in your county.',
  },
  {
    step: 4,
    title: 'Earn your badge',
    body:
      'Pass the final assessment and receive a verifiable KALRO badge ' +
      'with a QR code.',
  },
];

const AUDIENCE = [
  {
    icon: 'fa-solid fa-seedling',
    title: 'Smallholder farmers',
    body:
      'Practical training for the crops and livestock you already keep. ' +
      '80% of our learners are smallholders.',
  },
  {
    icon: 'fa-solid fa-people-group',
    title: 'Farmer groups & cooperatives',
    body: 'Bulk enrolment and shared dashboards for FPOs, CIGs and cooperatives.',
  },
  {
    icon: 'fa-solid fa-clipboard-user',
    title: 'Extension officers',
    body: 'Offline attendance tools and a growing library of trainable materials.',
  },
  {
    icon: 'fa-solid fa-briefcase',
    title: 'Agripreneurs',
    body: 'Business planning, market linkages and finance for those scaling up.',
  },
  {
    icon: 'fa-solid fa-chalkboard-user',
    title: 'Lead farmers & trainers',
    body: 'ToT programs that multiply the reach of every KALRO innovation.',
  },
  {
    icon: 'fa-solid fa-graduation-cap',
    title: 'Students & researchers',
    body: 'Reference content from KALRO’s national research programs.',
  },
];

const TEAM = [
  {
    name: 'Dr. Eliud Kireger',
    role: 'Director General, KALRO',
    initials: 'EK',
    colour: '#123B26',
    bio:
      'Leads KALRO’s mandate to generate and disseminate agricultural ' +
      'research for national development.',
  },
  {
    name: 'Dr. Margaret Otieno',
    role: 'Senior Dairy Researcher',
    initials: 'MO',
    colour: '#23804A',
    bio: 'Author of the dairy curriculum and lead trainer for county livestock officers.',
  },
  {
    name: 'Joseph Mwangi',
    role: 'Head of Digital Extension',
    initials: 'JM',
    colour: '#B7801A',
    bio: 'Leads the KALRO Mkulima platform, offline learning and county dashboards.',
  },
  {
    name: 'Dr. Fatuma Noor',
    role: 'Agro-Processing Lead',
    initials: 'FN',
    colour: '#7A4A2C',
    bio: 'Oversees value-addition and food-safety courses used by small processors.',
  },
  {
    name: 'Grace Wanjiru',
    role: 'Content Studio Editor',
    initials: 'GW',
    colour: '#2F9A5A',
    bio: 'Edits and quality-assures every course before it goes live.',
  },
  {
    name: 'Daniel Kiptoo',
    role: 'Field Operations Manager',
    initials: 'DK',
    colour: '#1E6FA8',
    bio: 'Coordinates field days and demonstration plots across the 47 counties.',
  },
];

const PARTNERS = [
  { name: 'Ministry of Agriculture & Livestock Development', short: 'MoALD' },
  { name: 'Kenya Agricultural & Livestock Research Organization', short: 'KALRO' },
  { name: 'Agricultural Sector Development Support Programme', short: 'ASDSP' },
  { name: 'Kenya Climate-Smart Agriculture Project', short: 'KCSAP' },
  { name: 'Kenya Cereal Enhancement Programme', short: 'KCEP-CRAL' },
  { name: 'Alliance for a Green Revolution in Africa', short: 'AGRA' },
  { name: 'Food and Agriculture Organization', short: 'FAO' },
  { name: 'International Fund for Agricultural Development', short: 'IFAD' },
];

const TIMELINE = [
  {
    year: '2024',
    title: 'First pilot in Nakuru',
    body: 'KALRO Mkulima begins as a pilot as KALRO KilimoBora.',
  },
  {
    year: '2025',
    title: 'National rollout',
    body: 'The platform reaches all 47 counties and expands to 5 value chains.',
  },
  {
    year: '2026',
    title: 'Offline-first mobile app',
    body:
      'Android and iOS apps launched. Over 101 modules developed ' +
      'in the first six months.',
  },
  {
    year: '2026',
    title: 'Verifiable digital badges',
    body:
      'KALRO badges gain recognition in county extension programs and ' +
      'buyer networks.',
  },
];