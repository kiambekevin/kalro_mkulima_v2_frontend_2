// src/components/auth/RegisterForm.jsx
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Field from './Field';
import PasswordField from './PasswordField';
import CountySelect from './CountySelect';
import Button from '../ui/Button';
import { roles, valueChains, groupSizes } from '../../data/kenya';
import { useAuth } from '../../hooks/useAuth';

const STEPS = ['Account', 'Personal', 'Location', 'Farming', 'Preferences'];

const initialState = {
  // Step 1 — Account
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  // Step 2 — Personal
  firstName: '',
  lastName: '',
  gender: '',
  dob: '',
  nationalId: '',
  // Step 3 — Location
  county: '',
  subCounty: '',
  ward: '',
  // Step 4 — Farming
  role: 'farmer',
  valueChains: [],
  acreage: '',
  groupName: '',
  groupSize: '',
  // Step 5 — Preferences
  language: 'en',
  channel: 'app',
  consentData: false,
  consentUpdates: true,
};

export default function RegisterForm({ onSwitch, redirectTo = '/dashboard' }) {
  const { register, checkEmail, checkPhone } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(0);
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [busy, setBusy] = useState(false);

  const set = (k, v) => setValues((s) => ({ ...s, [k]: v }));
  const toggleChain = (chain) =>
    setValues((s) => ({
      ...s,
      valueChains: s.valueChains.includes(chain)
        ? s.valueChains.filter((c) => c !== chain)
        : [...s.valueChains, chain],
    }));

  // ── Validation per step ───────────────────────────────────────
  const validateStep = async () => {
    const e = {};

    if (step === 0) {
      if (!values.email.trim()) e.email = 'Email is required.';
      else if (!/^\S+@\S+\.\S+$/.test(values.email)) e.email = 'Enter a valid email.';
      else {
        const { available } = await checkEmail(values.email.trim().toLowerCase());
        if (!available) e.email = 'An account with this email already exists.';
      }

      if (!values.phone.trim()) e.phone = 'Phone number is required.';
      else if (!/^(\+?254|0)?[17]\d{8}$/.test(values.phone.replace(/\s/g, '')))
        e.phone = 'Enter a valid Kenyan phone number.';
      else {
        const { available } = await checkPhone(values.phone.trim());
        if (!available) e.phone = 'An account with this phone number already exists.';
      }

      if (!values.password) e.password = 'Password is required.';
      else if (values.password.length < 8) e.password = 'Use at least 8 characters.';
      if (values.password !== values.confirmPassword)
        e.confirmPassword = 'Passwords do not match.';
    }

    if (step === 1) {
      if (!values.firstName.trim()) e.firstName = 'First name is required.';
      if (!values.lastName.trim()) e.lastName = 'Last name is required.';
      if (!values.gender) e.gender = 'Select an option.';
      if (values.dob) {
        const age = (Date.now() - new Date(values.dob)) / (365.25 * 24 * 3600 * 1000);
        if (age < 13) e.dob = 'You must be at least 13 years old.';
      }
    }

    if (step === 2) {
      if (!values.county) e.county = 'Select your county.';
    }

    if (step === 3) {
      if (values.valueChains.length === 0)
        e.valueChains = 'Pick at least one value chain.';
    }

    if (step === 4) {
      if (!values.consentData) e.consentData = 'Please accept the data policy to continue.';
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = async () => {
    setServerError('');
    if (await validateStep()) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const prev = () => setStep((s) => Math.max(s - 1, 0));

  // ── Submit ────────────────────────────────────────────────────
  const submit = async (ev) => {
    ev.preventDefault();
    setServerError('');
    if (!(await validateStep())) return;

    setBusy(true);
    try {
      await register({
        email: values.email.trim().toLowerCase(),
        phone: values.phone.trim(),
        password: values.password,
        confirm_password: values.confirmPassword,
        first_name: values.firstName.trim(),
        last_name: values.lastName.trim(),
        gender: values.gender || '',
        date_of_birth: values.dob || null,
        national_id: values.nationalId || '',
        county: values.county,
        sub_county: values.subCounty,
        ward: values.ward,
        role: values.role,
        value_chains: values.valueChains,
        acreage: values.acreage || null,
        group_name: values.groupName,
        group_size: values.groupSize,
        preferred_language: values.language,
        preferred_channel: values.channel,
        consent_data: values.consentData,
        consent_updates: values.consentUpdates,
      });
      navigate(redirectTo, { replace: true });
    } catch (err) {
      if (err.isValidation?.()) {
        setErrors(err.fields);
        setServerError(err.message || 'Please fix the highlighted fields.');
        // Jump the user to the first step that has an error
        const fieldToStep = {
          email: 0, phone: 0, password: 0, confirm_password: 0,
          first_name: 1, last_name: 1, gender: 1, date_of_birth: 1, national_id: 1,
          county: 2, sub_county: 2, ward: 2,
          role: 3, value_chains: 3, acreage: 3, group_name: 3, group_size: 3,
          preferred_language: 4, preferred_channel: 4, consent_data: 4,
        };
        const firstBadStep = Math.min(
          ...Object.keys(err.fields).map((k) => fieldToStep[k] ?? 0)
        );
        if (Number.isFinite(firstBadStep)) setStep(firstBadStep);
      } else {
        setServerError(err.message || 'Could not create your account. Please try again.');
      }
    } finally {
      setBusy(false);
    }
  };

  const progress = useMemo(
    () => Math.round(((step + 1) / STEPS.length) * 100),
    [step]
  );

  return (
    <form className="auth-form auth-form--wide" onSubmit={submit} noValidate>
      <header className="auth-form__head">
        <h1>Create your free account</h1>
        <p>It takes 2 minutes and unlocks all courses and badges.</p>
      </header>

      <div className="reg-progress" aria-hidden="true">
        <div className="reg-progress__bar">
          <span style={{ width: `${progress}%` }} />
        </div>
        <ul className="reg-progress__steps">
          {STEPS.map((label, i) => (
            <li key={label} className={i <= step ? 'is-on' : ''}>
              <b>{i + 1}</b>
              <span>{label}</span>
            </li>
          ))}
        </ul>
      </div>

      {serverError && (
        <div className="af-banner af-banner--error" role="alert">
          <i className="fa-solid fa-triangle-exclamation" aria-hidden="true" />
          {serverError}
        </div>
      )}

      {/* ─── Step 1 — Account ─────────────────────────────── */}
      {step === 0 && (
        <div className="reg-step">
          <h2 className="reg-step__title">
            <i className="fa-solid fa-key" aria-hidden="true" />
            Account details
          </h2>

          <Field id="reg-email" label="Email address" error={errors.email} required>
            <input
              id="reg-email"
              type="email"
              className="af-input"
              value={values.email}
              onChange={(e) => set('email', e.target.value)}
              autoComplete="email"
              placeholder="you@example.com"
            />
          </Field>

          <Field
            id="reg-phone"
            label="Phone number"
            hint="Used for SMS reminders and account recovery."
            error={errors.phone}
            required
          >
            <input
              id="reg-phone"
              type="tel"
              className="af-input"
              value={values.phone}
              onChange={(e) => set('phone', e.target.value)}
              autoComplete="tel"
              placeholder="07XX XXX XXX"
            />
          </Field>

          <div className="af-grid af-grid--2">
            <PasswordField
              id="reg-password"
              label="Password"
              value={values.password}
              onChange={(v) => set('password', v)}
              error={errors.password}
              showStrength
              required
            />
            <PasswordField
              id="reg-confirm"
              label="Confirm password"
              value={values.confirmPassword}
              onChange={(v) => set('confirmPassword', v)}
              error={errors.confirmPassword}
              autoComplete="new-password"
              required
            />
          </div>
        </div>
      )}

      {/* ─── Step 2 — Personal ────────────────────────────── */}
      {step === 1 && (
        <div className="reg-step">
          <h2 className="reg-step__title">
            <i className="fa-solid fa-user" aria-hidden="true" />
            Personal details
          </h2>

          <div className="af-grid af-grid--2">
            <Field id="reg-first" label="First name" error={errors.first_name} required>
              <input
                id="reg-first"
                type="text"
                className="af-input"
                value={values.firstName}
                onChange={(e) => set('firstName', e.target.value)}
                autoComplete="given-name"
              />
            </Field>
            <Field id="reg-last" label="Last name" error={errors.last_name} required>
              <input
                id="reg-last"
                type="text"
                className="af-input"
                value={values.lastName}
                onChange={(e) => set('lastName', e.target.value)}
                autoComplete="family-name"
              />
            </Field>
          </div>

          <div className="af-grid af-grid--2">
            <Field id="reg-gender" label="Gender" error={errors.gender} required>
              <select
                id="reg-gender"
                className="af-input af-select"
                value={values.gender}
                onChange={(e) => set('gender', e.target.value)}
              >
                <option value="">Select…</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
                <option value="prefer-not">Prefer not to say</option>
              </select>
            </Field>
            <Field
              id="reg-dob"
              label="Date of birth"
              hint="Optional — helps us tailor youth programs."
              error={errors.date_of_birth}
            >
              <input
                id="reg-dob"
                type="date"
                className="af-input"
                value={values.dob}
                onChange={(e) => set('dob', e.target.value)}
                max={new Date().toISOString().slice(0, 10)}
              />
            </Field>
          </div>

          <Field
            id="reg-id"
            label="National ID / Passport number"
            hint="Optional now — required later for certified badges."
            error={errors.national_id}
          >
            <input
              id="reg-id"
              type="text"
              className="af-input"
              value={values.nationalId}
              onChange={(e) => set('nationalId', e.target.value)}
              placeholder="e.g. 12345678"
            />
          </Field>
        </div>
      )}

      {/* ─── Step 3 — Location ────────────────────────────── */}
      {step === 2 && (
        <div className="reg-step">
          <h2 className="reg-step__title">
            <i className="fa-solid fa-location-dot" aria-hidden="true" />
            Where do you farm?
          </h2>

          <Field
            id="county"
            label="County"
            hint="We use this to show you the right field days and extension contacts."
            error={errors.county}
            required
          >
            <CountySelect
              value={values.county}
              onChange={(v) => set('county', v)}
              error={errors.county}
            />
          </Field>

          <div className="af-grid af-grid--2">
            <Field id="reg-subcounty" label="Sub-county" error={errors.sub_county}>
              <input
                id="reg-subcounty"
                type="text"
                className="af-input"
                value={values.subCounty}
                onChange={(e) => set('subCounty', e.target.value)}
              />
            </Field>
            <Field id="reg-ward" label="Ward / Location" error={errors.ward}>
              <input
                id="reg-ward"
                type="text"
                className="af-input"
                value={values.ward}
                onChange={(e) => set('ward', e.target.value)}
              />
            </Field>
          </div>
        </div>
      )}

      {/* ─── Step 4 — Farming ─────────────────────────────── */}
      {step === 3 && (
        <div className="reg-step">
          <h2 className="reg-step__title">
            <i className="fa-solid fa-seedling" aria-hidden="true" />
            What do you do?
          </h2>

          <Field id="reg-role" label="I am a…" required>
            <select
              id="reg-role"
              className="af-input af-select"
              value={values.role}
              onChange={(e) => set('role', e.target.value)}
            >
              {roles.map((r) => (
                <option key={r.value} value={r.value}>{r.label}</option>
              ))}
            </select>
          </Field>

          <Field
            id="reg-chains"
            label="Value chains you're involved in"
            hint="Pick everything that applies — you can change this later."
            error={errors.value_chains}
            required
          >
            <div className="af-chains">
              {valueChains.map((group) => (
                <div key={group.group} className="af-chains__group">
                  <span className="af-chains__label">{group.group}</span>
                  <div className="af-chains__pills">
                    {group.options.map((opt) => {
                      const on = values.valueChains.includes(opt);
                      return (
                        <button
                          key={opt}
                          type="button"
                          className={`af-chip ${on ? 'is-on' : ''}`}
                          aria-pressed={on}
                          onClick={() => toggleChain(opt)}
                        >
                          {on && <i className="fa-solid fa-check" aria-hidden="true" />}
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </Field>

          <div className="af-grid af-grid--2">
            <Field id="reg-acreage" label="Farm size (acres)" error={errors.acreage}>
              <input
                id="reg-acreage"
                type="number"
                min="0"
                step="0.25"
                className="af-input"
                value={values.acreage}
                onChange={(e) => set('acreage', e.target.value)}
              />
            </Field>
            <Field id="reg-groupsize" label="Group size">
              <select
                id="reg-groupsize"
                className="af-input af-select"
                value={values.groupSize}
                onChange={(e) => set('groupSize', e.target.value)}
              >
                <option value="">Select…</option>
                {groupSizes.map((g) => (
                  <option key={g.value} value={g.value}>{g.label}</option>
                ))}
              </select>
            </Field>
          </div>

          <Field
            id="reg-groupname"
            label="Group / Cooperative name"
            hint="Optional — if you're enrolling as part of a group."
          >
            <input
              id="reg-groupname"
              type="text"
              className="af-input"
              value={values.groupName}
              onChange={(e) => set('groupName', e.target.value)}
            />
          </Field>
        </div>
      )}

      {/* ─── Step 5 — Preferences ─────────────────────────── */}
      {step === 4 && (
        <div className="reg-step">
          <h2 className="reg-step__title">
            <i className="fa-solid fa-sliders" aria-hidden="true" />
            Preferences
          </h2>

          <div className="af-grid af-grid--2">
            <Field id="reg-lang" label="Preferred language">
              <select
                id="reg-lang"
                className="af-input af-select"
                value={values.language}
                onChange={(e) => set('language', e.target.value)}
              >
                <option value="en">English</option>
                <option value="sw">Kiswahili</option>
              </select>
            </Field>
            <Field id="reg-channel" label="Preferred channel">
              <select
                id="reg-channel"
                className="af-input af-select"
                value={values.channel}
                onChange={(e) => set('channel', e.target.value)}
              >
                <option value="app">Mobile app</option>
                <option value="sms">SMS</option>
                <option value="web">Web browser</option>
                <option value="usd">Field / USD</option>
              </select>
            </Field>
          </div>

          <div className="af-consents">
            <label className={`af-consent ${errors.consent_data ? 'has-error' : ''}`}>
              <input
                type="checkbox"
                checked={values.consentData}
                onChange={(e) => set('consentData', e.target.checked)}
              />
              <span className="af-check__box" aria-hidden="true">
                <i className="fa-solid fa-check" />
              </span>
              <span>
                I agree to the{' '}
                <a href="#" className="af-link">Terms of use</a> and{' '}
                <a href="#" className="af-link">Privacy policy</a>.
              </span>
            </label>
            {errors.consent_data && (
              <span className="af-field__error" role="alert">
                <i className="fa-solid fa-circle-exclamation" aria-hidden="true" />
                {errors.consent_data}
              </span>
            )}

            <label className="af-consent">
              <input
                type="checkbox"
                checked={values.consentUpdates}
                onChange={(e) => set('consentUpdates', e.target.checked)}
              />
              <span className="af-check__box" aria-hidden="true">
                <i className="fa-solid fa-check" />
              </span>
              <span>Send me SMS reminders about new courses and field days.</span>
            </label>
          </div>
        </div>
      )}

      <div className="reg-actions">
        {step > 0 && (
          <button type="button" className="btn btn--ghost btn--lg" onClick={prev}>
            <i className="fa-solid fa-arrow-left" aria-hidden="true" />
            Back
          </button>
        )}

        {step < STEPS.length - 1 ? (
          <Button variant="primary" size="lg" type="button" onClick={next}>
            Continue
            <i className="fa-solid fa-arrow-right" aria-hidden="true" />
          </Button>
        ) : (
          <Button variant="primary" size="lg" type="submit" disabled={busy}>
            {busy ? (
              <>
                <i className="fa-solid fa-circle-notch fa-spin" aria-hidden="true" />
                Creating account…
              </>
            ) : (
              <>
                Create account
                <i className="fa-solid fa-circle-check" aria-hidden="true" />
              </>
            )}
          </Button>
        )}
      </div>

      <p className="auth-form__switch">
        Already have an account?{' '}
        <button type="button" className="af-link" onClick={onSwitch}>
          Sign in
        </button>
      </p>
    </form>
  );
}