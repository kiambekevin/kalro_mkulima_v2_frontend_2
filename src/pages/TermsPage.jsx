// src/pages/TermsPage.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/ui/Breadcrumbs';

/**
 * TermsPage
 * The KALRO Mkulima Terms of Use. Static content; renders a sticky
 * table of contents beside the body on wide screens.
 *
 * Route: /terms
 */
export default function TermsPage() {
  const [activeId, setActiveId] = useState(SECTIONS[0].id);

  // Highlight the current section in the TOC as the user scrolls
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
              { label: 'Terms of use' },
            ]}
          />

          <span className="legal-hero__tag">
            <i className="fa-solid fa-file-contract" aria-hidden="true" />
            Legal
          </span>

          <h1>Terms of use</h1>

          <p className="legal-hero__lead">
            These terms govern your use of KALRO Mkulima. By registering or
            using the platform, you agree to them. They're written to be
            readable - if anything is unclear, contact us at{' '}
            <a href="mailto:info@kalro.org">info@kalro.org</a>.
          </p>

          <p className="legal-hero__meta">
            <i className="fa-regular fa-calendar" aria-hidden="true" />
            Last updated: {lastUpdated}
            <span aria-hidden="true">·</span>
            <i className="fa-solid fa-scale-balanced" aria-hidden="true" />
            Governed by the laws of Kenya
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
              KALRO Mkulima ("the platform") is operated by the Kenya
              Agricultural and Livestock Research Organization ("KALRO",
              "we", "us"). These Terms of Use ("Terms") form a binding
              agreement between you ("you", "user", "learner") and KALRO.
              Please read them carefully.
            </p>

            {SECTIONS.map((s) => (
              <section key={s.id} id={s.id} className="legal-section">
                <h2>{s.title}</h2>
                {s.body}
              </section>
            ))}

            {/* Footer of the document */}
            <div className="legal-end">
              <p>
                By continuing to use KALRO Mkulima you acknowledge that you
                have read, understood, and agreed to these Terms of Use and
                the <Link to="/privacy">Privacy policy</Link>.
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
    id: 'acceptance',
    title: '1. Acceptance of these terms',
    body: (
      <>
        <p>
          By accessing, registering on, or using KALRO Mkulima in any way,
          you confirm that you have read, understood, and agree to be bound
          by these Terms and by our{' '}
          <Link to="/privacy">Privacy policy</Link>. If you do not agree,
          please do not use the platform.
        </p>
        <p>
          These Terms apply to every user of the platform, whether you are a
          farmer, extension officer, agripreneur, trainer, student,
          researcher, or member of a partner organisation.
        </p>
      </>
    ),
  },

  {
    id: 'eligibility',
    title: '2. Eligibility',
    body: (
      <>
        <p>
          KALRO Mkulima is free and open to residents of Kenya aged 18 and
          above. If you are under 18, you may only use the platform with the
          consent of a parent or guardian.
        </p>
        <p>
          By registering, you confirm that the information you provide is
          accurate and that you will keep your account details up to date.
        </p>
      </>
    ),
  },

  {
    id: 'accounts',
    title: '3. Your account',
    body: (
      <>
        <p>
          You are responsible for maintaining the confidentiality of your
          login credentials and for all activity that occurs under your
          account. If you believe your account has been compromised, contact
          us immediately at <a href="mailto:info@kalro.org">info@kalro.org</a>.
        </p>
        <ul>
          <li>Do not share your password with anyone.</li>
          <li>Do not create multiple accounts to game progress, badges, or streaks.</li>
          <li>Do not impersonate another person or organisation.</li>
          <li>Provide a valid phone number or email address for account recovery.</li>
        </ul>
      </>
    ),
  },

  {
    id: 'acceptable-use',
    title: '4. Acceptable use',
    body: (
      <>
        <p>You agree to use KALRO Mkulima only for lawful purposes. You must not:</p>
        <ul>
          <li>
            attempt to gain unauthorised access to any part of the platform,
            its servers, or its data;
          </li>
          <li>
            scrape, harvest, or bulk-download content, badges, or user data
            through automated means;
          </li>
          <li>
            upload viruses, malware, or any code designed to disrupt the
            platform;
          </li>
          <li>
            post or transmit content that is unlawful, defamatory, obscene,
            hateful, or discriminatory;
          </li>
          <li>
            misrepresent your qualifications, training, or affiliation with
            KALRO;
          </li>
          <li>
            use the platform to send spam or unsolicited commercial
            communications;
          </li>
          <li>
            circumvent or interfere with security features, rate limits, or
            access controls.
          </li>
        </ul>
        <p>
          We may suspend or terminate your access if you breach these rules.
        </p>
      </>
    ),
  },

  {
    id: 'content-licence',
    title: '5. Course content and licence',
    body: (
      <>
        <p>
          All course content on KALRO Mkulima - including lessons, videos,
          PDFs, assessments, and quiz questions - is owned by KALRO or
          licensed to KALRO by third parties. Content is protected by Kenyan
          and international copyright law.
        </p>
        <p>
          Subject to your compliance with these Terms, KALRO grants you a
          <strong> personal, non-exclusive, non-transferable, revocable licence</strong>{' '}
          to access and use course content for your own learning. You may:
        </p>
        <ul>
          <li>view, study, and take notes for personal use;</li>
          <li>download lessons through the platform's offline feature;</li>
          <li>print PDFs for personal farm records.</li>
        </ul>
        <p>You may not:</p>
        <ul>
          <li>reproduce, republish, redistribute, or sell KALRO content;</li>
          <li>modify, translate, or create derivative works without written permission;</li>
          <li>remove copyright, trademark, or attribution notices;</li>
          <li>use KALRO content to train commercial AI models.</li>
        </ul>
        <p>
          For permission to use content beyond personal learning, contact{' '}
          <a href="mailto:info@kalro.org">info@kalro.org</a>.
        </p>
      </>
    ),
  },

  {
    id: 'badges',
    title: '6. Digital badges',
    body: (
      <>
        <p>
          When you complete a course or pathway, KALRO issues you a digital
          badge. Badges carry a unique ID, a QR code, and a public
          verification page.
        </p>
        <ul>
          <li>
            Badges are issued to the individual who completed the course.
            They are not transferable.
          </li>
          <li>
            A badge confirms completion of training on this platform. It is
            <strong> not </strong>
            a professional licence or a substitute for regulatory
            certification in any field.
          </li>
          <li>
            We may revoke a badge if it was obtained through fraud, cheating,
            or misuse of the platform.
          </li>
          <li>
            KALRO does not guarantee that any third party - employer,
            cooperative, county government, or buyer - will recognise a
            badge for any specific purpose.
          </li>
        </ul>
      </>
    ),
  },

  {
    id: 'offline',
    title: '7. Offline use and downloads',
    body: (
      <>
        <p>
          Lessons you download for offline use remain accessible only through
          the KALRO Mkulima app or website. Downloaded content is
          watermarked and licensed for your personal use only.
        </p>
        <p>
          Do not extract, re-encode, or redistribute downloaded lessons. Do
          not attempt to bypass the platform's playback protections.
        </p>
      </>
    ),
  },

  {
    id: 'user-content',
    title: '8. Content you submit',
    body: (
      <>
        <p>
          If you submit feedback, reviews, testimonials, or answers to
          discussion questions, you grant KALRO a worldwide, royalty-free
          licence to use, reproduce, and display that content on the
          platform and in promotional materials.
        </p>
        <p>
          You confirm that any content you submit is your own and does not
          infringe anyone else's rights.
        </p>
      </>
    ),
  },

  {
    id: 'ip',
    title: '9. Intellectual property',
    body: (
      <>
        <p>
          The KALRO name, the KALRO Mkulima logo, the badge design, and all
          associated marks are the property of KALRO. You may not use them
          without prior written permission.
        </p>
        <p>
          All rights not expressly granted in these Terms are reserved by
          KALRO.
        </p>
      </>
    ),
  },

  {
    id: 'privacy',
    title: '10. Privacy and data',
    body: (
      <>
        <p>
          Our handling of your personal data is described in the{' '}
          <Link to="/privacy">Privacy policy</Link>. In summary:
        </p>
        <ul>
          <li>
            We collect the minimum needed to run the platform: name, phone,
            email, county, farming profile, and learning activity.
          </li>
          <li>
            We use your data to deliver courses, issue badges, provide county
            extension services, and improve the platform.
          </li>
          <li>
            We never sell your data to third parties.
          </li>
          <li>
            You can request a copy of your data or ask for your account to be
            deleted at any time.
          </li>
        </ul>
      </>
    ),
  },

  {
    id: 'third-parties',
    title: '11. Third-party links and tools',
    body: (
      <>
        <p>
          The platform links to third-party services such as KAMIS, KALRO
          Selector, and county extension portals. These services are not
          controlled by KALRO, and we are not responsible for their content,
          availability, or privacy practices.
        </p>
        <p>
          When you follow an external link, its own terms and privacy policy
          apply.
        </p>
      </>
    ),
  },

  {
    id: 'disclaimers',
    title: '12. Disclaimers',
    body: (
      <>
        <p>
          KALRO Mkulima is provided on an <strong>"as is"</strong> and{' '}
          <strong>"as available"</strong> basis. While our content is based on
          research and reviewed by specialists, we do not guarantee:
        </p>
        <ul>
          <li>any specific yield, income, or productivity outcome;</li>
          <li>uninterrupted or error-free availability of the platform;</li>
          <li>that course content is exhaustive of every situation on your farm;</li>
          <li>that third parties will accept a badge for any purpose.</li>
        </ul>
        <p>
          Farming outcomes depend on many factors outside our control -
          weather, soils, markets, and your own decisions. Always verify
          critical decisions with a local extension officer or KALRO
          researcher.
        </p>
      </>
    ),
  },

  {
    id: 'liability',
    title: '13. Limitation of liability',
    body: (
      <>
        <p>
          To the maximum extent permitted by Kenyan law, KALRO and its
          officers, employees, and partners shall not be liable for any
          indirect, incidental, special, or consequential damages arising
          from your use of the platform.
        </p>
        <p>
          Where liability cannot be excluded, KALRO's total liability to you
          is limited to the amount you paid to use the platform - which, for
          a free public service, is nil.
        </p>
        <p>
          Nothing in these Terms excludes liability for death or personal
          injury caused by KALRO's negligence, or for fraud.
        </p>
      </>
    ),
  },

  {
    id: 'termination',
    title: '14. Suspension and termination',
    body: (
      <>
        <p>
          We may suspend or terminate your access to KALRO Mkulima at any
          time if you breach these Terms. We may also suspend the platform or
          any part of it for maintenance, upgrades, or legal reasons.
        </p>
        <p>
          You can delete your account at any time by emailing{' '}
          <a href="mailto:info@kalro.org">info@kalro.org</a>. Deleting
          your account will not automatically revoke badges already earned,
          but you will lose access to your dashboard and progress history.
        </p>
      </>
    ),
  },

  {
    id: 'changes',
    title: '15. Changes to these terms',
    body: (
      <>
        <p>
          We may update these Terms from time to time. When we make material
          changes, we will notify you by email or via a notice on the
          platform before the changes take effect.
        </p>
        <p>
          Continuing to use the platform after a change means you accept the
          updated Terms.
        </p>
      </>
    ),
  },

  {
    id: 'law',
    title: '16. Governing law and disputes',
    body: (
      <>
        <p>
          These Terms are governed by the laws of Kenya. Any dispute arising
          out of or relating to KALRO Mkulima will be resolved in the
          courts of Kenya.
        </p>
        <p>
          Before going to court, we encourage you to contact us at{' '}
          <a href="mailto:info@kalro.org">info@kalro.org</a> so we can
          try to resolve the matter informally.
        </p>
      </>
    ),
  },

  {
    id: 'contact',
    title: '17. Contact',
    body: (
      <>
        <p>For any questions about these Terms, please contact:</p>
        <ul>
          <li>
            <strong>Email:</strong>{' '}
            <a href="mailto:info@kalro.org">info@kalro.org</a>
          </li>
          <li>
            <strong>Toll-free:</strong>{' '}
            <a href="tel:0800721741">0800 721 741</a> (Mon–Fri, 8am–6pm)
          </li>
          <li>
            <strong>Postal:</strong> Kenya Agricultural and Livestock Research
            Organization, Kaptagat Road, Loresho, Nairobi
          </li>
        </ul>
      </>
    ),
  },
];