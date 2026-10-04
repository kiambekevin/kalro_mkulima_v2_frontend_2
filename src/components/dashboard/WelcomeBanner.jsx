// src/components/dashboard/WelcomeBanner.jsx
export default function WelcomeBanner({ user, stats }) {
  const name = user?.firstName || user?.name || 'learner';
  const today = new Date().toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
    <div className="dash-welcome">
      <div className="dash-welcome__text">
        <span className="dash-welcome__date">
          <i className="fa-regular fa-calendar" aria-hidden="true" />
          {today}
        </span>
        <h1>
          Karibu, <em>{name}</em>.
        </h1>
        <p>
          {stats.streak > 0
            ? `You’re on a ${stats.streak}-day streak. Keep going!`
            : 'Ready to continue your training today?'}
        </p>
      </div>

      <div className="dash-welcome__stats">
        <div>
          <b>{stats.coursesCompleted}</b>
          <span>Courses completed</span>
        </div>
        <div>
          <b>{stats.badgesEarned}</b>
          <span>Badges earned</span>
        </div>
        <div>
          <b>{Math.round(stats.minutesLearned / 60)}</b>
          <span>Hours learned</span>
        </div>
        <div className="dash-welcome__streak">
          <b>
            <i className="fa-solid fa-fire" aria-hidden="true" />
            {stats.streak}
          </b>
          <span>Day streak</span>
        </div>
      </div>
    </div>
  );
}