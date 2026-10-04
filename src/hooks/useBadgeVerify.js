// src/hooks/useBadgeVerify.js
import { useCallback, useState } from 'react';
import { badgesService } from '../api/services/badges';

const BADGE_PATTERN = /^KALRO-B-\d{4}-\d{6}$/;

export function useBadgeVerify() {
  const [value, setValue] = useState('');
  const [result, setResult] = useState(null);   // { verified, reason, message, badge }
  const [status, setStatus] = useState('idle'); // idle | checking | done

  const verify = useCallback(async (raw) => {
    const id = (raw ?? value).trim().toUpperCase();
    if (!id) {
      setResult({ verified: false, reason: 'empty', message: 'Enter a badge ID to check it.' });
      setStatus('done');
      return;
    }
    if (!BADGE_PATTERN.test(id)) {
      setResult({
        verified: false,
        reason: 'invalid_format',
        message: 'That ID doesn\u2019t match the KALRO format. Check the characters under the QR code.',
      });
      setStatus('done');
      return;
    }

    setStatus('checking');
    try {
      const data = await badgesService.verify(id);
      setResult(data);
    } catch (err) {
      if (err.status === 404) {
        setResult({ verified: false, reason: 'not_found', message: 'No badge found with this ID.' });
      } else {
        setResult({ verified: false, reason: 'error', message: 'Could not verify. Try again shortly.' });
      }
    } finally {
      setStatus('done');
    }
  }, [value]);

  return { value, setValue, result, status, verify };
}