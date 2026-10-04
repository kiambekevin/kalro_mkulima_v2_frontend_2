export default function RosetteSprite() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <symbol id="rosette" viewBox="0 0 120 160">
        <polygon points="38,96 24,156 40,146 52,158 60,104" fill="var(--rt)" />
        <polygon points="82,96 96,156 80,146 68,158 60,104" fill="var(--rt)" />
        <polygon points="38,96 24,156 40,146 52,158 60,104" fill="#000" opacity=".12" />
        <polygon
          fill="var(--r1)"
          points="60.0,2.0 64.4,9.2 70.1,2.9 73.2,10.7 79.8,5.5 81.6,13.8 89.0,9.8 89.3,18.2 97.3,15.6 96.1,23.9 104.4,22.7 101.8,30.7 110.2,31.0 106.2,38.4 114.5,40.2 109.3,46.8 117.1,49.9 110.8,55.6 118.0,60.0 110.8,64.4 117.1,70.1 109.3,73.2 114.5,79.8 106.2,81.6 110.2,89.0 101.8,89.3 104.4,97.3 96.1,96.1 97.3,104.4 89.3,101.8 89.0,110.2 81.6,106.2 79.8,114.5 73.2,109.3 70.1,117.1 64.4,110.8 60.0,118.0 55.6,110.8 49.9,117.1 46.8,109.3 40.2,114.5 38.4,106.2 31.0,110.2 30.7,101.8 22.7,104.4 23.9,96.1 15.6,97.3 18.2,89.3 9.8,89.0 13.8,81.6 5.5,79.8 10.7,73.2 2.9,70.1 9.2,64.4 2.0,60.0 9.2,55.6 2.9,49.9 10.7,46.8 5.5,40.2 13.8,38.4 9.8,31.0 18.2,30.7 15.6,22.7 23.9,23.9 22.7,15.6 30.7,18.2 31.0,9.8 38.4,13.8 40.2,5.5 46.8,10.7 49.9,2.9 55.6,9.2"
        />
        <circle cx="60" cy="60" r="42" fill="var(--r2)" />
        <circle
          cx="60" cy="60" r="36" fill="none" stroke="#fff"
          strokeOpacity=".35" strokeWidth="1.5" strokeDasharray="3 3"
        />
      </symbol>
    </svg>
  );
}

/** Reusable badge graphic */
export function Rosette({ variant = 'course', size = 'sm', icon, className = '' }) {
  return (
    <span className={`rosette rosette--${size} r-${variant} ${className}`}>
      <svg viewBox="0 0 120 160" aria-hidden="true">
        <use href="#rosette" />
      </svg>
      {icon && <i className={icon} aria-hidden="true" />}
    </span>
  );
}