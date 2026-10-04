// src/components/auth/CountySelect.jsx
import { countiesByRegion } from '../../data/kenya';

export default function CountySelect({ value, onChange, error, required }) {
  return (
    <select
      id="county"
      className={`af-input af-select ${error ? 'has-error' : ''}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      required={required}
    >
      <option value="">Select your county</option>
      {Object.entries(countiesByRegion).map(([region, list]) => (
        <optgroup key={region} label={region}>
          {list.map((c) => (
            <option key={c.code} value={c.name}>
              {c.name}
            </option>
          ))}
        </optgroup>
      ))}
    </select>
  );
}