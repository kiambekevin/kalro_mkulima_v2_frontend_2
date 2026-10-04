// src/components/dashboard/FieldDaysPanel.jsx
export default function FieldDaysPanel({ events }) {
  if (!events?.length) return null;

  return (
    <section className="dash-panel">
      <header className="dash-panel__head">
        <h2>
          <i className="fa-solid fa-map-location-dot" aria-hidden="true" />
          Upcoming field days
        </h2>
      </header>

      <ul className="dash-events">
        {events.map((e) => {
          const date = new Date(e.date);
          const day = date.getDate();
          const month = date.toLocaleDateString('en-GB', { month: 'short' });
          const spotsLeft = e.spots - e.booked;

          return (
            <li key={e.id} className="event-card">
              <div className="event-card__date">
                <b>{day}</b>
                <span>{month}</span>
              </div>
              <div className="event-card__body">
                <b>{e.title}</b>
                <span>
                  <i className="fa-solid fa-location-dot" aria-hidden="true" />
                  {e.county} · {e.venue}
                </span>
                <span className="event-card__time">
                  <i className="fa-regular fa-clock" aria-hidden="true" />
                  {e.time}
                </span>
                <span className="event-card__spots">
                  <i className="fa-solid fa-users" aria-hidden="true" />
                  {spotsLeft} spots left
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}