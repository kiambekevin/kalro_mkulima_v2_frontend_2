// src/components/layout/UtilityBar.jsx
import { Link } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { useTranslation } from '../../hooks/useTranslation';
import { languages } from '../../i18n/translations';

export default function UtilityBar() {
  const { lang, setLang } = useLanguage();
  const { t } = useTranslation();

  return (
    <div className="utility">
      <div className="wrap">
        <div className="utility__news">
          <span className="utility__tag">New</span>
          <span>
            {t('utility.news')}{' '}
            <Link
              to="/courses?pathway=climate-smart-agriculture-csa"
              className="more"
            >
              {t('utility.news.link')}
            </Link>
          </span>
        </div>

        <div className="utility__right">
          <a className="contact" href="tel:0800721741">
            <i className="fa-solid fa-phone" aria-hidden="true" />
            {t('utility.phone')}
          </a>
          <a className="contact" href="mailto:mkulima@kalro.org">
            <i className="fa-regular fa-envelope" aria-hidden="true" />
            mkulima@kalro.org
          </a>

          <label className="sr-only" htmlFor="langSelect">
            Language
          </label>
          <select
            id="langSelect"
            className="lang-select"
            value={lang}
            onChange={(e) => setLang(e.target.value)}
          >
            {languages.map((l) => (
              <option key={l.code} value={l.code}>
                {l.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}