// src/components/auth/AuthCard.jsx
import { Link } from 'react-router-dom';
import AuthAside from './AuthAside';

export default function AuthCard({ mode, children }) {
  return (
    <div className="auth-page">
      <div className="auth-page__bg" aria-hidden="true" />

      <div className="auth-card">
        <Link to="/" className="auth-card__logo" aria-label="KALRO Mkulima home">
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
            <span className="logo__sub" style={{ display: 'block' }}>eLearning Training Centre</span>
          </span> 
        </Link>

        <AuthAside mode={mode} />

        <div className="auth-card__form">
          {children}
        </div>
      </div>

      <p className="auth-page__foot">
        © {new Date().getFullYear()} KALRO · <a href="#">Privacy</a> · <a href="#">Terms</a>
      </p>
    </div>
  );
}