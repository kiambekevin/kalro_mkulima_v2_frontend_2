// src/components/auth/Field.jsx
export default function Field({
  id,
  label,
  hint,
  error,
  required,
  children,
  className = '',
}) {
  return (
    <div className={`af-field ${error ? 'has-error' : ''} ${className}`}>
      {label && (
        <label htmlFor={id} className="af-field__label">
          {label}
          {required && <span className="af-field__req" aria-hidden="true">*</span>}
        </label>
      )}
      {children}
      {error ? (
        <span className="af-field__error" role="alert">
          <i className="fa-solid fa-circle-exclamation" aria-hidden="true" />
          {error}
        </span>
      ) : hint ? (
        <span className="af-field__hint">{hint}</span>
      ) : null}
    </div>
  );
}