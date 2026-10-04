// src/pages/PrivacyPage.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/ui/Breadcrumbs';

/**
 * PrivacyPage
 * The KALRO Mkulima Privacy Policy. Static content with a sticky
 * table of contents that highlights the current section on scroll.
 *
 * Route: /privacy
 */
export default function PrivacyPage() {
  const [activeId, setActiveId] = useState(SECTIONS[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const lastUpdated = '1 October 2025';

  return (
    <main id="main">
      {/* ─── Hero ──────────────────────────────────────────── */}
      <section className="legal-hero">
        <div className="wrap legal-hero__inner">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Privacy policy' },
            ]}
          />

          <span className="legal-hero__tag">
            <i className="fa-solid fa-shield-halved" aria-hidden="true" />
            Privacy
          </span>

          <h1>Privacy policy</h1>

          <p className="legal-hero__lead">
            This policy explains what personal data KALRO Mkulima collects,
            why we collect it, how we protect it, and the choices you have.
            We keep it simple - no hidden trackers, no selling your data.
          </p>

          <p className="legal-hero__meta">
            <i className="fa-regular fa-calendar" aria-hidden="true" />
            Last updated: {lastUpdated}
            <span aria-hidden="true">·</span>
            <i className="fa-solid fa-scale-balanced" aria-hidden="true" />
            Compliant with the Kenya Data Protection Act 2019
          </p>
        </div>
      </section>

      {/* ─── Body ──────────────────────────────────────────── */}
      <section className="section legal-body">
        <div className="wrap legal-layout">
          {/* Table of contents */}
          <nav className="legal-toc" aria-label="On this page">
            <p className="legal-toc__title">On this page</p>
            <ol>
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className={activeId === s.id ? 'is-active' : ''}
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {/* Content */}
          <article className="legal-content">
            <p className="legal-intro">
              KALRO Mkulima is operated by the Kenya Agricultural and
              Livestock Research Organization ("KALRO", "we", "us"). This
              Privacy Policy describes how we handle your personal data when
              you use the platform. It should be read together with our{' '}
              <Link to="/terms">Terms of use</Link>.
            </p>

            {SECTIONS.map((s) => (
              <section key={s.id} id={s.id} className="legal-section">
                <h2>{s.title}</h2>
                {s.body}
              </section>
            ))}

            <div className="legal-end">
              <p>
                If you have questions about this policy, want to exercise
                any of your rights, or want to make a complaint, contact us.
                We respond to all privacy enquiries within 7 working days.
              </p>
              <p className="legal-end__contact">
                <i className="fa-solid fa-phone" aria-hidden="true" />
                <a href="tel:0800721741">0800 721 741</a>
                <span aria-hidden="true">·</span>
                <i className="fa-regular fa-envelope" aria-hidden="true" />
                <a href="mailto:info@kalro.org">info@kalro.org</a>
              </p>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}

/* ───────────────────────────── Sections ───────────────────────────── */

const SECTIONS = [
  {
    id: 'who-we-are',
    title: '1. Who we are',
    body: (
      <>
        <p>
          The data controller for KALRO Mkulima is the{' '}
          <strong>
            Kenya Agricultural and Livestock Research Organization (KALRO)
          </strong>
          , a state corporation established under the Kenya Agricultural and
          Livestock Research Act, 2013. Our registered office is on Kaptagat
          Road, Loresho, Nairobi.
        </p>
        <p>
          KALRO is registered as a data controller with the Office of the
          Data Protection Commissioner (ODPC) of Kenya. For any privacy
          matter, contact our Data Protection Officer at{' '}
          <a href="mailto:info@kalro.org">info@kalro.org</a>.
        </p>
      </>
    ),
  },

  {
    id: 'what-we-collect',
    title: '2. What we collect',
    body: (
      <>
        <p>We collect only the data needed to run the platform:</p>

        <p><strong>Account details</strong></p>
        <ul>
          <li>First and last name</li>
          <li>Email address</li>
          <li>Phone number</li>
          <li>Password (hashed, never stored in plain text)</li>
          <li>Role (farmer, extension officer, agripreneur, etc.)</li>
        </ul>

        <p><strong>Profile and location</strong></p>
        <ul>
          <li>County, sub-county and ward (optional)</li>
          <li>Gender and year of birth (optional)</li>
          <li>Value chains you're interested in (optional)</li>
          <li>Farm size and group name (optional)</li>
        </ul>

        <p><strong>Learning activity</strong></p>
        <ul>
          <li>Courses and lessons you've opened or completed</li>
          <li>Assessment results and quiz scores</li>
          <li>Badges earned and their issue dates</li>
          <li>Field-day registrations and attendance</li>
          <li>Timestamps for each of the above</li>
        </ul>

        <p><strong>Technical data</strong></p>
        <ul>
          <li>IP address</li>
          <li>Browser and device type</li>
          <li>Language preference (English or Kiswahili)</li>
          <li>Approximate location derived from IP (region only, never precise GPS)</li>
        </ul>

        <p>
          We do not collect payment information - the platform is free. We
          do not collect biometric data. We do not use advertising trackers.
        </p>
      </>
    ),
  },

  {
    id: 'how-we-use',
    title: '3. How we use your data',
    body: (
      <>
        <p>We use your personal data to:</p>
        <ul>
          <li>create and secure your account;</li>
          <li>deliver course content and track your learning progress;</li>
          <li>issue verifiable badges when you complete a course or pathway;</li>
          <li>send reminders about field days and courses you've registered for;</li>
          <li>recommend courses and content relevant to your region and interests;</li>
          <li>
            provide aggregated statistics to county governments and
            development partners (never individually identifying you);
          </li>
          <li>respond to your questions via the call centre or email;</li>
          <li>detect and prevent fraud, cheating, or abuse of the platform;</li>
          <li>improve the platform based on aggregated usage patterns.</li>
        </ul>
        <p>
          We do <strong>not</strong> use your data for advertising, and we
          do not sell it to any third party.
        </p>
      </>
    ),
  },

  {
    id: 'legal-basis',
    title: '4. Legal basis for processing',
    body: (
      <>
        <p>
          Under the Kenya Data Protection Act 2019, we rely on the following
          legal bases:
        </p>
        <ul>
          <li>
            <strong>Consent</strong> - when you register, you give explicit
            consent to the processing described in this policy. You can
            withdraw consent at any time by closing your account.
          </li>
          <li>
            <strong>Performance of a contract</strong> - we need your data
            to deliver the courses and badges you've requested.
          </li>
          <li>
            <strong>Legal obligation</strong> - some processing is required
            by law, such as record-keeping for public-sector accountability.
          </li>
          <li>
            <strong>Legitimate interest</strong> - improving the platform
            and preventing fraud. We balance these interests against your
            rights.
          </li>
        </ul>
      </>
    ),
  },

  {
    id: 'sharing',
    title: '5. Who we share with',
    body: (
      <>
        <p>We share limited data with:</p>
        <ul>
          <li>
            <strong>County governments and extension services</strong> - the
            name and contact details of learners in their county, so an
            extension officer can follow up on field days or course
            completion. You can opt out of this at any time.
          </li>
          <li>
            <strong>Development partners</strong> - aggregated, anonymised
            statistics only (e.g. "1,204 learners completed the dairy course
            in Nakuru last quarter"). Never individual data.
          </li>
          <li>
            <strong>Service providers</strong> - companies that help us run
            the platform (hosting, SMS delivery, email). They process data
            on our instructions and are bound by confidentiality agreements.
          </li>
          <li>
            <strong>Legal authorities</strong> - where required by Kenyan
            law, court order, or to protect the rights and safety of our
            users.
          </li>
        </ul>
        <p>
          We do not transfer your personal data outside Kenya except to
          service providers who maintain adequate data-protection standards
          as required by the ODPC.
        </p>
      </>
    ),
  },

  {
    id: 'badges-public',
    title: '6. Public badges and verification',
    body: (
      <>
        <p>
          When you earn a badge, a public verification page is created. This
          page shows:
        </p>
        <ul>
          <li>your full name;</li>
          <li>the course or pathway title;</li>
          <li>the date the badge was issued;</li>
          <li>a unique badge ID and QR code.</li>
        </ul>
        <p>
          This is intentional - badges are meant to be shareable with buyers,
          cooperatives and county programs. If you don't want a badge to be
          publicly verifiable, you can choose not to share it. Contact{' '}
          <a href="mailto:info@kalro.org">info@kalro.org</a> to have a
          specific badge made private.
        </p>
      </>
    ),
  },

  {
    id: 'retention',
    title: '7. How long we keep your data',
    body: (
      <>
        <p>
          We keep your personal data only as long as necessary for the
          purpose it was collected for.
        </p>
        <ul>
          <li>
            <strong>Active account data</strong> - retained while your
            account is open.
          </li>
          <li>
            <strong>Learning records and badges</strong> - retained for
            seven years after your last activity, so badges remain
            verifiable and progress isn't lost if you return.
          </li>
          <li>
            <strong>Call centre recordings</strong> - retained for 12 months
            for quality and training purposes.
          </li>
          <li>
            <strong>Anonymised statistics</strong> - retained indefinitely,
            as they no longer identify you.
          </li>
        </ul>
        <p>
          When you close your account, we delete or anonymise your personal
          data within 30 days, except where retention is required by law or
          where the record is needed for badge verification.
        </p>
      </>
    ),
  },

  {
    id: 'security',
    title: '8. How we protect your data',
    body: (
      <>
        <p>
          We use industry-standard security measures to protect your data,
          including:
        </p>
        <ul>
          <li>encryption of data in transit (HTTPS/TLS) and at rest;</li>
          <li>hashed passwords - we never store your password in plain text;</li>
          <li>role-based access controls so staff only see data they need;</li>
          <li>regular security reviews and dependency updates;</li>
          <li>audit logs for administrative actions.</li>
        </ul>
        <p>
          No online service is 100% secure. If you discover a vulnerability,
          please report it to <a href="mailto:info@kalro.org">info@kalro.org</a>.
        </p>
      </>
    ),
  },

  {
    id: 'your-rights',
    title: '9. Your rights',
    body: (
      <>
        <p>
          Under the Kenya Data Protection Act 2019, you have the right to:
        </p>
        <ul>
          <li>
            <strong>Access</strong> - request a copy of the personal data we
            hold about you;
          </li>
          <li>
            <strong>Correction</strong> - ask us to correct inaccurate or
            incomplete data;
          </li>
          <li>
            <strong>Deletion</strong> - ask us to delete your data, subject
            to our legal obligations;
          </li>
          <li>
            <strong>Objection</strong> - object to specific processing, such
            as county follow-up or marketing SMS;
          </li>
          <li>
            <strong>Portability</strong> - receive your data in a
            machine-readable format (JSON or CSV);
          </li>
          <li>
            <strong>Withdraw consent</strong> - at any time, by closing your
            account or contacting us.
          </li>
        </ul>
        <p>
          To exercise any of these rights, email{' '}
          <a href="mailto:info@kalro.org">info@kalro.org</a> or call{' '}
          <a href="tel:0800721741">0800 721 741</a>. We respond within 7
          working days.
        </p>
      </>
    ),
  },

  {
    id: 'cookies',
    title: '10. Cookies and local storage',
    body: (
      <>
        <p>We use a minimal set of browser storage to make the platform work:</p>
        <ul>
          <li>
            <strong>Session cookies</strong> - to keep you signed in while
            you use the platform.
          </li>
          <li>
            <strong>Local storage</strong> - to remember your language
            preference, your progress on lessons you've started, and lessons
            you've downloaded for offline use.
          </li>
          <li>
            <strong>No advertising cookies</strong> - we don't use Google
            Analytics, Facebook Pixel, or any third-party tracker.
          </li>
        </ul>
        <p>
          You can clear local storage at any time through your browser
          settings. Doing so will sign you out and clear offline lessons,
          but will not delete your account.
        </p>
      </>
    ),
  },

  {
    id: 'children',
    title: '11. Children and young people',
    body: (
      <>
        <p>
          KALRO Mkulima is intended for users aged 13 and above. If you are
          between 13 and 18, you should only use the platform with the
          consent of a parent or guardian.
        </p>
        <p>
          We do not knowingly collect personal data from children under 13.
          If you believe a child has provided us with personal data, contact{' '}
          <a href="mailto:info@kalro.org">info@kalro.org</a> and we'll
          delete it.
        </p>
      </>
    ),
  },

  {
    id: 'changes',
    title: '12. Changes to this policy',
    body: (
      <>
        <p>
          We may update this Privacy Policy from time to time. When we make
          material changes, we'll notify you by email or via a notice on the
          platform before the change takes effect.
        </p>
        <p>
          The "Last updated" date at the top of this page tells you when the
          policy was last revised. Continuing to use KALRO Mkulima after a
          change means you accept the updated policy.
        </p>
      </>
    ),
  },

  {
    id: 'complaints',
    title: '13. Complaints',
    body: (
      <>
        <p>
          If you believe we've handled your personal data improperly, please
          contact us first at{' '}
          <a href="mailto:info@kalro.org">info@kalro.org</a>. We take
          every complaint seriously and will respond within 7 working days.
        </p>
        <p>
          If you are not satisfied with our response, you have the right to
          lodge a complaint with the{' '}
          <strong>Office of the Data Protection Commissioner (ODPC)</strong>:
        </p>
        <ul>
          <li>
            Website: <a href="https://www.odpc.go.ke" target="_blank" rel="noreferrer">odpc.go.ke</a>
          </li>
          <li>
            Email: <a href="mailto:info@odpc.go.ke">info@odpc.go.ke</a>
          </li>
         
        </ul>
      </>
    ),
  },

  {
    id: 'contact',
    title: '14. Contact us',
    body: (
      <>
        <p>For any questions about this Privacy Policy, contact:</p>
        <ul>
          <li>
            <strong>Data Protection Officer</strong> -{' '}
            <a href="mailto:info@kalro.org">info@kalro.org</a>
          </li>
          <li>
            <strong>General enquiries</strong> -{' '}
            <a href="mailto:datahub@kalro.org">datahub@kalro.org</a>
          </li>
          <li>
            <strong>Toll-free helpline</strong> -{' '}
            <a href="tel:0800721741">0800 721 741</a> (Mon–Fri, 8am–6pm)
          </li>
          <li>
            <strong>Postal address</strong> - Kenya Agricultural and
            Livestock Research Organization, Kaptagat Road, Loresho, Nairobi,
            Kenya
          </li>
        </ul>
      </>
    ),
  },
];