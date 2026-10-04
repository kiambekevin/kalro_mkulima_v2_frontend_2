// src/components/dashboard/QuickActions.jsx
import { Link } from 'react-router-dom';

export default function QuickActions() {
  return (
    <section className="dash-panel">
      <header className="dash-panel__head">
        <h2>
          <i className="fa-solid fa-bolt" aria-hidden="true" />
          Quick actions
        </h2>
      </header>

      <ul className="dash-actions">
        <li>
          <Link to="/courses">
            <span className="dash-actions__icon">
              <i className="fa-solid fa-book-open" aria-hidden="true" />
            </span>
            <span>
              <b>Browse courses</b>
              <span>150+ free options</span>
            </span>
            <i className="fa-solid fa-arrow-right" aria-hidden="true" />
          </Link>
        </li>
        <li>
          <Link to="/badges">
            <span className="dash-actions__icon">
              <i className="fa-solid fa-trophy" aria-hidden="true" />
            </span>
            <span>
              <b>My badges</b>
              <span>View &amp; download</span>
            </span>
            <i className="fa-solid fa-arrow-right" aria-hidden="true" />
          </Link>
        </li>
        <li>
          <Link to="/dashboard">
            <span className="dash-actions__icon">
              <i className="fa-solid fa-cloud-arrow-down" aria-hidden="true" />
            </span>
            <span>
              <b>Offline library</b>
              <span>Saved lessons</span>
            </span>
            <i className="fa-solid fa-arrow-right" aria-hidden="true" />
          </Link>
        </li>
        <li>
          <Link to="/badges/verify">
            <span className="dash-actions__icon">
              <i className="fa-solid fa-circle-check" aria-hidden="true" />
            </span>
            <span>
              <b>Verify a badge</b>
              <span>Enter a badge ID</span>
            </span>
            <i className="fa-solid fa-arrow-right" aria-hidden="true" />
          </Link>
        </li>
      </ul>
    </section>
  );
}