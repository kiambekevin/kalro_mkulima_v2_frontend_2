// src/components/ui/VerifyForm.jsx
import { useState } from 'react';
import { badgesService } from '../../api/services/badges';

const BADGE_PATTERN = /^KALRO-B-\d{4}-\d{6}$/;

export default function VerifyForm() {
  const [value, setValue] = useState('');
  const [state, setState] = useState({ status: 'idle', result: null });

  const submit = async (e) => {
    e.preventDefault();
    const id = value.trim().toUpperCase();

    if (!id) {
      setState({
        status: 'error',
        result: { message: 'Enter a badge ID to check it.' },
      });
      return;
    }

    if (!BADGE_PATTERN.test(id)) {
      setState({
        status: 'error',
        result: {
          message:
            'That ID doesn\u2019t match the KALRO format. Check the characters under the QR code.',
        },
      });
      return;
    }

    setState({ status: 'checking', result: null });

    try {
      const data = await badgesService.verify(id);
      setState({ status: 'done', result: data });
    } catch (err) {
      if (err.status === 404) {
        setState({
          status: 'error',
          result: { message: 'No badge found with this ID.' },
        });
      } else {
        setState({
          status: 'error',
          result: {
            message: 'Could not verify right now. Please try again shortly.',
          },
        });
      }
    }
  };

  return (
    <form className="verify" onSubmit={submit}>
      <label htmlFor="verifyMain">Verify a badge</label>

      <div className="verify__row">
        <input
          id="verifyMain"
          placeholder="Badge ID, e.g. KALRO-B-2025-001847"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoComplete="off"
          spellCheck="false"
        />
        <button
          className="btn btn--maize"
          type="submit"
          disabled={state.status === 'checking'}
        >
          {state.status === 'checking' ? 'Checking…' : 'Verify'}
        </button>
      </div>

      <div className="verify__result" aria-live="polite">
        {state.status === 'done' && state.result?.verified && (
          <span className="verify__ok">
            <i className="fa-solid fa-circle-check" aria-hidden="true" />
            Verified · {state.result.badge?.courseTitle}
          </span>
        )}

        {state.status === 'done' && !state.result?.verified && (
          <span className="verify__err">
            <i className="fa-solid fa-circle-xmark" aria-hidden="true" />
            {state.result?.message || 'Badge not found.'}
          </span>
        )}

        {state.status === 'error' && (
          <span className="verify__err">
            <i className="fa-solid fa-circle-exclamation" aria-hidden="true" />
            {state.result?.message}
          </span>
        )}
      </div>
    </form>
  );
}