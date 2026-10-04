// src/components/layout/Footer.jsx
import { Link } from 'react-router-dom';

/**
 * Footer
 * Site-wide footer with:
 *   - brand block (logo + short description)
 *   - three link columns: Learn, Badges, Support
 *   - a bottom row with legal line and social icons
 *
 * Internal links use <Link> so navigation stays client-side. External
 * links (tel:, mailto:) use <a> with the appropriate scheme.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__grid">
          {/* ─── Brand column ──────────────────────────────── */}
          <div>
            <Link to="/" className="logo" aria-label="KALRO Mkulima home">
              <span className="logo__mark">
                <img 
                src="/images/logo.png" 
                alt="Logo" 
                className="logo__img" 
                style={{ borderRadius: '10px' }} 
              />
              </span>
              <span>
                <span className="logo__name">KALRO Mkulima</span>
                <span className="logo__sub" style={{ display: 'block' }}>
                  eLearning Training Centre
                </span>
              </span>
            </Link>

            <p className="footer__about">
              The official eLearning platform of the Kenya Agricultural and
              Livestock Research Organization, delivering free, practical
              training across Kenya.
            </p>
          </div>

          {/* ─── Learn column ──────────────────────────────── */}
          <div>
            <h4>Learn</h4>
            <ul>
              <li><Link to="/courses">Course catalogue</Link></li>
              <li><Link to="/courses?pathway=climate-smart-agriculture">Learning pathways</Link></li>
              <li><a href="#fielddays">Field days</a></li>
              <li><a href="#offline">Mobile apps</a></li>
            </ul>
          </div>

          {/* ─── Badges column ─────────────────────────────── */}
          <div>
            <h4>Badges</h4>
            <ul>
              <li><Link to="/badges">My badges</Link></li>
              <li><Link to="/badges/verify">Verify a badge</Link></li>
              <li><a href="#badges">How badges work</a></li>
              <li><a href="#county">For counties</a></li>
            </ul>
          </div>

          {/* ─── Support column ────────────────────────────── */}
          <div>
            <h4>Support</h4>
            <ul>
              <li><Link to="/about">About KALRO Mkulima</Link></li>
              <li><a href="#faq">Help and FAQ</a></li>
              <li>
                <a href="tel:0800721741">0800 721 741</a>
              </li>
              <li>
                <Link to="/call-centre">Farmer call centre</Link>
              </li>
              <li>
                <a href="mailto:mkulima@kalro.org">info@kalro.org</a>
              </li>
              <li>KALRO Headquarters, Nairobi</li>
            </ul>
          </div>
        </div>

        {/* ─── Bottom row: legal + socials ─────────────────── */}
        <div className="footer__bottom">
          <div>
            © <span>{year}</span> KALRO. All rights reserved.{' '}
            <Link to="/privacy">Privacy</Link>{' '}
            <Link to="/terms" style={{ marginLeft: 12 }}>
              Terms of use
            </Link>
          </div>

          <div className="socials">
            <a
              href="https://facebook.com/Kalromkulima"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <i className="fa-brands fa-facebook-f" aria-hidden="true" />
            </a>
            <a
              href="https://twitter.com/kalromkulima"
              target="_blank"
              rel="noreferrer"
              aria-label="X"
            >
              <i className="fa-brands fa-x-twitter" aria-hidden="true" />
            </a>
            <a
              href="https://www.youtube.com/channel/UCCiK13RnXgpJzI8gCnkHHTg"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
            >
              <i className="fa-brands fa-youtube" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}