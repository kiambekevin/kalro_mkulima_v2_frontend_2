// src/components/sections/BadgesSection.jsx
import { Rosette } from '../ui/Rosette';
import VerifyForm from '../ui/VerifyForm';

/**
 * BadgesSection
 * Homepage section explaining the badge system and offering a public
 * verify form. All copy is static; the only interactive part is the
 * VerifyForm, which hits POST-free GET /api/v1/badges/verify/{id}/.
 *
 * The section is designed to stand on its own — it can be dropped into
 * any page that needs to explain or verify badges.
 */
export default function BadgesSection() {
  return (
    <section className="badges" id="badges" aria-labelledby="badges-title">
      <div className="wrap badges__grid">
        {/* ── Left column: copy + verify form ─────────────── */}
        <div>
          <h2 id="badges-title">Earn badges that prove your skills</h2>

          <p className="badges__lead">
            Every course and pathway you finish earns a KALRO digital badge.
            Each one carries its own ID and QR code, so buyers, cooperatives
            and county programs can check it in seconds.
          </p>

          <ul className="badges__points">
            <li>
              <i className="fa-solid fa-qrcode" aria-hidden="true" />
              <div>
                <strong>Verifiable anywhere</strong>
                <span>Scan the QR code or enter the badge ID.</span>
              </div>
            </li>
            <li>
              <i className="fa-brands fa-whatsapp" aria-hidden="true" />
              <div>
                <strong>Easy to share</strong>
                <span>
                  Send on WhatsApp, download as an image, or print.
                </span>
              </div>
            </li>
            <li>
              <i
                className="fa-solid fa-building-columns"
                aria-hidden="true"
              />
              <div>
                <strong>Recognised by counties</strong>
                <span>Accepted in county extension programs.</span>
              </div>
            </li>
          </ul>

          <VerifyForm />
        </div>

        {/* ── Right column: badge shelf ────────────────────── */}
        <div className="shelf" aria-label="Types of KALRO badges">
          <div className="shelf__item">
            <Rosette variant="course" size="md" icon="fa-solid fa-award" />
            <div>
              <strong>Course badge</strong>
              <span>One per course</span>
            </div>
          </div>

          <div className="shelf__item">
            <Rosette variant="pathway" size="lg" icon="fa-solid fa-medal" />
            <div>
              <strong>Pathway badge</strong>
              <span>Complete a full pathway</span>
            </div>
          </div>

          <div className="shelf__item">
            <Rosette
              variant="trainer"
              size="md"
              icon="fa-solid fa-chalkboard-user"
            />
            <div>
              <strong>Trainer badge</strong>
              <span>Lead Farmers and ToT</span>
            </div>
          </div>

          {/* Sample issued badge — decorative */}
          <div className="shelf__card">
            <svg
              className="qr"
              viewBox="0 0 7 7"
              shapeRendering="crispEdges"
              aria-hidden="true"
            >
              <rect width="7" height="7" fill="#fff" />
              <path
                fill="#123B26"
                d="M0 0h3v3H0zM4 0h3v3H4zM0 4h3v3H0zM1 1v1h1V1zM5 1v1h1V1zM1 5v1h1V5zM4 4h1v1H4zM5 5h1v1H5zM6 4h1v1H6zM4 6h1v1H4zM6 6h1v1H6z"
              />
              <path
                fill="#fff"
                d="M1 1h1v1H1zM5 1h1v1H5zM1 5h1v1H1z"
              />
            </svg>
            <div>
              <small>Badge ID KALRO-B-2025-001847</small>
              <b>Dairy Farming for Increased Milk Production</b>
              <small>Wanjiku Muthoni, Nakuru County · 15 March 2025</small>
            </div>
            <span className="ok">
              <i className="fa-solid fa-circle-check" aria-hidden="true" />
              Verified
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}