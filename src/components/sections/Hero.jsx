// src/components/sections/Hero.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Rosette } from '../ui/Rosette';
import StatsStrip from './StatsStrip';
import { useTranslation } from '../../hooks/useTranslation';

/**
 * Hero
 * The homepage hero. Every string is translated via useTranslation.
 * The search bar navigates to the catalogue; the popular chips do the
 * same with a fixed term.
 */
export default function Hero() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [q, setQ] = useState('');

  const go = (term) => {
    const trimmed = (term ?? q).trim();
    if (!trimmed) return;
    navigate(`/courses?q=${encodeURIComponent(trimmed)}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    go();
  };

  const popularChips = [
    { key: 'hero.chip.maize', value: 'Maize' },
    { key: 'hero.chip.dairy', value: 'Dairy' },
    { key: 'hero.chip.poultry', value: 'Poultry' },
    { key: 'hero.chip.irrigation', value: 'Irrigation' },
  ];

  return (
    <section className="hero">
      <div className="wrap">
        <div className="hero__inner">
          <div>
            <div className="hero__kicker">
              <i className="fa-solid fa-circle-check" aria-hidden="true" />
              {t('hero.kicker')}
            </div>

            <h1>
              {t('hero.title.line1')}
              <br />
              <em>{t('hero.title.line2')}</em>
            </h1>

            <p className="hero__lead">{t('hero.lead')}</p>

            <form className="search" role="search" onSubmit={handleSubmit}>
              <i className="fa-solid fa-magnifying-glass" aria-hidden="true" />
              <label className="sr-only" htmlFor="hero-q">
                {t('hero.search.placeholder')}
              </label>
              <input
                id="hero-q"
                type="search"
                placeholder={t('hero.search.placeholder')}
                value={q}
                onChange={(e) => setQ(e.target.value)}
                autoComplete="off"
              />
              <button className="btn btn--primary" type="submit">
                {t('hero.search.button')}
              </button>
            </form>

            <div className="quick">
              <span>{t('hero.popular')}</span>
              {popularChips.map((chip) => (
                <button
                  key={chip.key}
                  className="chip"
                  type="button"
                  onClick={() => go(chip.value)}
                >
                  {t(chip.key)}
                </button>
              ))}
            </div>

            <ul className="hero__proof">
              <li>
                <i className="fa-solid fa-check" aria-hidden="true" />
                {t('hero.proof.free')}
              </li>
              <li>
                <i className="fa-solid fa-check" aria-hidden="true" />
                {t('hero.proof.offline')}
              </li>
              <li>
                <i className="fa-solid fa-check" aria-hidden="true" />
                {t('hero.proof.languages')}
              </li>
            </ul>
          </div>

          <div className="hero__panel">
            <div className="hero__panel-title">{t('hero.panel.title')}</div>
            <div className="hero__panel-stats">
              <div>
                <b>101+</b>
                <span>{t('hero.panel.courses')}</span>
              </div>
              <div>
                <b>1M+</b>
                <span>{t('hero.panel.learners')}</span>
              </div>
              <div>
                <b>47</b>
                <span>{t('hero.panel.counties')}</span>
              </div>
              <div>
                <b>99.9%</b>
                <span>{t('hero.panel.badges')}</span>
              </div>
            </div>

            <div className="hero__award">
              <Rosette variant="course" size="sm" icon="fa-solid fa-cow" />
              <div>
                <small>{t('hero.award.earned')}</small>
                <strong>{t('hero.award.course')}</strong>
                <small>{t('hero.award.learner')}</small>
              </div>
            </div>

            <div className="hero__trust">
              <i className="fa-solid fa-shield-halved" aria-hidden="true" />
              <span>{t('hero.trust')}</span>
            </div>
          </div>
        </div>
      </div>

      <StatsStrip />
    </section>
  );
}