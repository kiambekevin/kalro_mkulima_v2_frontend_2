// src/components/layout/Header.jsx
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { navMenus } from '../../data/navMenus';
import MegaMenu from './MegaMenu';
import { useMegaMenu } from '../../hooks/useMegaMenu';
import { useAuth } from '../../hooks/useAuth';
import { useTranslation } from '../../hooks/useTranslation';

export default function Header() {
  const {
    isDesktop,
    openId,
    toggle,
    openOnHover,
    closeOnLeave,
    closeAll,
    setOpenId,
  } = useMegaMenu();

  const { user, logout } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      setOpenId(null);
      setMobileOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [setOpenId]);

  useEffect(() => {
    if (isDesktop) setMobileOpen(false);
  }, [isDesktop]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);
  const handleMegaLinkClick = () => { closeAll(); closeMobile(); };
  const handleLogout = () => { logout(); closeMobile(); navigate('/'); };

  const AuthArea = ({ compact = false }) => {
    if (user) {
      const initial = (user.firstName?.[0] || user.name?.[0] || 'U').toUpperCase();
      return (
        <div className="user-chip">
          <Link
            to="/dashboard"
            className="user-chip__link"
            onClick={closeMobile}
            aria-label={t('nav.dashboard')}
          >
            <span className="user-chip__avatar" aria-hidden="true">{initial}</span>
            {!compact && (
              <span className="user-chip__name">
                {user.firstName || user.name || t('nav.account')}
              </span>
            )}
          </Link>
          <button
            type="button"
            className="user-chip__logout"
            onClick={handleLogout}
            aria-label={t('nav.signOut')}
            title={t('nav.signOut')}
          >
            <i className="fa-solid fa-arrow-right-from-bracket" aria-hidden="true" />
          </button>
        </div>
      );
    }

    return (
      <>
        <Link to="/login" className="btn btn--ghost btn--sm hide-md">
          {t('nav.login')}
        </Link>
        <Link to="/register" className="btn btn--primary btn--sm">
          <i className="fa-solid fa-user-plus" aria-hidden="true" />
          <span>{t('nav.register')}</span>
        </Link>
      </>
    );
  };

  return (
    <header className="header" id="header">
      <div className="wrap header__top">
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

        <div className="header__actions">
          <button
            className="icon-btn hide-md hide-lg"
            aria-label={t('nav.notifications')}
          >
            <i className="fa-regular fa-bell" aria-hidden="true" />
            <span className="dot" />
          </button>
          <AuthArea />
        </div>
      </div>

      <div className="wrap header__nav-row">
        <nav
          className={`nav ${mobileOpen ? 'is-open' : ''}`}
          id="nav"
          aria-label="Main"
        >
          <ul className="nav__list">
            {navMenus.map((menu) => (
              <li className="nav__item" key={menu.id}>
                <button
                  className="nav__trigger"
                  aria-expanded={openId === menu.id}
                  aria-controls={`mega-${menu.id}`}
                  onClick={() => toggle(menu.id)}
                  onMouseEnter={() => openOnHover(menu.id)}
                  onMouseLeave={closeOnLeave}
                >
                  {t(menu.labelKey)}
                  <i className="fa-solid fa-chevron-down" aria-hidden="true" />
                </button>

                <MegaMenu
                  menu={menu}
                  panelId={`mega-${menu.id}`}
                  isOpen={openId === menu.id}
                  onMouseEnter={() => openOnHover(menu.id)}
                  onMouseLeave={closeOnLeave}
                  onLinkClick={handleMegaLinkClick}
                />
              </li>
            ))}

            <li className="nav__item">
              <Link className="nav__link" to="/courses" onClick={closeMobile}>
                {t('nav.allCourses')}
              </Link>
            </li>
            <li className="nav__item">
              <Link className="nav__link" to="/call-centre" onClick={closeMobile}>
                {t('nav.callCentre')}
              </Link>
            </li>

            <li
              className="nav__item mobile-only"
              style={{ padding: '24px 0 0', border: 0 }}
            >
              {user ? (
                <Link
                  to="/dashboard"
                  className="btn btn--ghost"
                  style={{ width: '100%' }}
                  onClick={closeMobile}
                >
                  <i className="fa-solid fa-gauge" aria-hidden="true" />
                  {t('nav.dashboard')}
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="btn btn--ghost"
                  style={{ width: '100%' }}
                  onClick={closeMobile}
                >
                  <i className="fa-solid fa-right-to-bracket" aria-hidden="true" />
                  {t('nav.login')}
                </Link>
              )}
            </li>
          </ul>
        </nav>

        <div className="header__nav-actions">
          <button className="icon-btn hide-md" aria-label={t('nav.notifications')}>
            <i className="fa-regular fa-bell" aria-hidden="true" />
            <span className="dot" />
          </button>

          <div className="hide-md">
            <AuthArea compact />
          </div>

          <button
            className="icon-btn menu-btn"
            aria-expanded={mobileOpen}
            aria-controls="nav"
            aria-label={mobileOpen ? t('nav.closeMenu') : t('nav.openMenu')}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <i
              className={`fa-solid ${mobileOpen ? 'fa-xmark' : 'fa-bars'}`}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </header>
  );
}