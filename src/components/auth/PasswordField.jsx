// src/components/auth/PasswordField.jsx
import { useState } from 'react';
import Field from './Field';

export default function PasswordField({
  id,
  label = 'Password',
  value,
  onChange,
  error,
  hint,
  showStrength = false,
  autoComplete = 'new-password',
  required,
}) {
  const [visible, setVisible] = useState(false);
  const strength = showStrength ? scoreStrength(value) : null;

  return (
    <Field id={id} label={label} error={error} hint={hint} required={required}>
      <div className="af-password">
        <input
          id={id}
          type={visible ? 'text' : 'password'}
          className="af-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
        />
        <button
          type="button"
          className="af-password__toggle"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? 'Hide password' : 'Show password'}
        >
          <i className={`fa-regular ${visible ? 'fa-eye-slash' : 'fa-eye'}`} aria-hidden="true" />
        </button>
      </div>

      {showStrength && value && (
        <div className="af-strength" data-score={strength.score}>
          <div className="af-strength__bar">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className={`af-strength__seg ${i < strength.score ? 'is-on' : ''}`}
              />
            ))}
          </div>
          <span className="af-strength__label">{strength.label}</span>
        </div>
      )}
    </Field>
  );
}

function scoreStrength(pw) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;

  const labels = ['Too short', 'Weak', 'Fair', 'Good', 'Strong'];
  return { score, label: labels[score] };
}