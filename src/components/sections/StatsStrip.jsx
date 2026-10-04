const stats = [
  { value: '101+', label: 'Modules' },
  { value: '100K+', label: 'Trainees' },
  { value: '47', label: 'Counties reached' },
  { value: '1K+', label: 'Badges awarded' },
];

export default function StatsStrip() {
  return (
    <div className="stats-strip">
      <div className="stats" role="list">
        {stats.map((s) => (
          <div role="listitem" key={s.label}>
            <b>{s.value}</b><span>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}