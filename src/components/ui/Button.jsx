// src/components/ui/Button.jsx
export default function Button({
  as: As = 'button',
  variant = 'primary',
  size = '',
  href,
  children,
  icon,
  iconRight,
  className = '',
  ...rest
}) {
  const classes = [
    'btn',
    `btn--${variant}`,
    size ? `btn--${size}` : '',
    className,
  ].filter(Boolean).join(' ');

  const content = (
    <>
      {icon && <i className={icon} aria-hidden="true" />}
      {children}
      {iconRight && <i className={iconRight} aria-hidden="true" />}
    </>
  );

  if (href) {
    return <a href={href} className={classes} {...rest}>{content}</a>;
  }

  return <As className={classes} {...rest}>{content}</As>;
}