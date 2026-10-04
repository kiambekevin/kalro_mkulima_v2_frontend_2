// src/components/dashboard/WeeklyActivity.jsx
export default function WeeklyActivity({ activity }) {
  const total = activity.reduce((s, d) => s + d.value, 0);

  return (
    <section className="dash-panel">
      <header className="dash-panel__head">
        <h2>
          <i className="fa-solid fa-chart-column" aria-hidden="true" />
          Weekly activity
        </h2>
        <span className="dash-muted">
          {total} lesson{total === 1 ? '' : 's'} this week
        </span>
      </header>

      <div className="weekly" aria-hidden="true">
        {activity.map((d) => (
          <div key={d.date} className="weekly__col">
            <div className="weekly__bar">
              <span
                className={d.value === 0 ? 'is-zero' : ''}
                style={{ height: `${Math.max(4, d.percent)}%` }}
              />
            </div>
            <span className="weekly__label">{d.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}