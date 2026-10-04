// src/components/layout/MegaMenu.jsx
import { Rosette } from '../ui/Rosette';
import VerifyForm from '../ui/VerifyForm';
import { useTranslation } from '../../hooks/useTranslation';

/**
 * MegaMenu
 * Renders a dropdown panel. Menu data uses `labelKey`, `titleKey`,
 * `descKey` — this component resolves them through `t()`.
 */
export default function MegaMenu({
  menu,
  panelId,
  isOpen,
  onMouseEnter,
  onMouseLeave,
}) {
  const { t } = useTranslation();
  if (!menu) return null;

  const { columns = [], feature, variant = '' } = menu;

  return (
    <div
      className={`mega ${isOpen ? 'is-open' : ''}`}
      id={panelId}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className={`wrap mega__inner ${variant}`}>
        {columns.map((col, colIndex) => (
          <div key={colIndex}>
            {col.titleKey && (
              <div className="mega__title">{t(col.titleKey)}</div>
            )}

            <ul className={col.linksClass || 'mega__links'}>
              {col.links.map((link, i) => (
                <li key={i}>
                  <a href={link.href}>
                    <span className="ico">
                      <i className={link.icon} aria-hidden="true" />
                    </span>
                    <span>
                      <strong>{t(link.titleKey)}</strong>
                      {link.descKey && <small>{t(link.descKey)}</small>}
                    </span>
                    {link.count != null && (
                      <span className="count">{link.count}</span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {feature && <MegaFeature feature={feature} />}
      </div>
    </div>
  );
}

function MegaFeature({ feature }) {
  const { t } = useTranslation();
  const { variant, icon, titleKey, descKey, cta, stats, dark, verify } = feature;

  return (
    <div className={`mega__feature ${dark ? 'mega__feature--dark' : ''}`}>
      {variant && <Rosette variant={variant} size="sm" icon={icon} />}

      {titleKey && <h3>{t(titleKey)}</h3>}
      {descKey && <p>{t(descKey)}</p>}

      {Array.isArray(stats) && stats.length > 0 && (
        <div className="mega__stats">
          {stats.map((s, i) => (
            <div key={i}>
              <b>{s.value}</b>
              <span>{t(s.labelKey)}</span>
            </div>
          ))}
        </div>
      )}

      {verify && <VerifyForm mini />}

      {cta && (
        <a href={cta.href} className="btn btn--primary btn--sm">
          {cta.icon && <i className={cta.icon} aria-hidden="true" />}
          {t(cta.labelKey)}
        </a>
      )}
    </div>
  );
}