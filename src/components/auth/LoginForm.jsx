// src/components/auth/LoginForm.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Field from './Field';
import PasswordField from './PasswordField';
import Button from '../ui/Button';
import { useAuth } from '../../hooks/useAuth';

export default function LoginForm({ onSwitch, redirectTo = '/dashboard' }) {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    identifier: '',
    password: '',
    remember: true,
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [busy, setBusy] = useState(false);

  const set = (k, v) => setValues((s) => ({ ...s, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    setServerError('');

    const errs = {};
    if (!values.identifier.trim()) {
      errs.identifier = 'Email or phone is required.';
    }
    if (!values.password) {
      errs.password = 'Password is required.';
    }
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setBusy(true);
    try {
      await login({
        identifier: values.identifier.trim(),
        password: values.password,
        remember: values.remember,
      });
      // Land the learner back where they were trying to go
      navigate(redirectTo, { replace: true });
    } catch (err) {
      if (err.isValidation?.()) {
        setErrors(err.fields);
        if (err.message) setServerError(err.message);
      } else {
        setServerError(
          err.message || 'Could not sign you in. Please try again.',
        );
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <form className="auth-form" onSubmit={submit} noValidate>
      <header className="auth-form__head">
        <h1>Welcome back</h1>
        <p>Sign in to continue your training and access your badges.</p>
      </header>

      {serverError && (
        <div className="af-banner af-banner--error" role="alert">
          <i className="fa-solid fa-triangle-exclamation" aria-hidden="true" />
          {serverError}
        </div>
      )}

      <Field
        id="login-identifier"
        label="Email or phone"
        hint="Use the email or phone number you registered with."
        error={errors.identifier}
        required
      >
        <input
          id="login-identifier"
          type="text"
          className="af-input"
          value={values.identifier}
          onChange={(e) => set('identifier', e.target.value)}
          autoComplete="username"
          placeholder="you@example.com or 07XX XXX XXX"
          autoFocus
        />
      </Field>

      <PasswordField
        id="login-password"
        value={values.password}
        onChange={(v) => set('password', v)}
        error={errors.password}
        autoComplete="current-password"
        required
      />

      <div className="af-row af-row--between">
        <label className="af-check">
          <input
            type="checkbox"
            checked={values.remember}
            onChange={(e) => set('remember', e.target.checked)}
          />
          <span className="af-check__box" aria-hidden="true">
            <i className="fa-solid fa-check" />
          </span>
          <span>Keep me signed in</span>
        </label>

        <Link to="/forgot-password" className="af-link">
          Forgot password?
        </Link>
      </div>

      <Button variant="primary" size="lg" type="submit" disabled={busy}>
        {busy ? (
          <>
            <i className="fa-solid fa-circle-notch fa-spin" aria-hidden="true" />
            Signing in…
          </>
        ) : (
          <>
            Sign in
            <i className="fa-solid fa-arrow-right" aria-hidden="true" />
          </>
        )}
      </Button>

      <p className="auth-form__switch">
        New to KALRO Mkulima?{' '}
        <button type="button" className="af-link" onClick={onSwitch}>
          Create a free account
        </button>
      </p>
    </form>
  );
}