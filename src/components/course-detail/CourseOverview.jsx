// src/components/course-detail/CourseOverview.jsx

export default function CourseOverview({ course, highlights }) {
  return (
    <div className="cd-panel" id="panel-overview" role="tabpanel" aria-labelledby="tab-overview">
      {highlights?.length > 0 && (
        <section className="cd-block">
          <h2>What you’ll learn</h2>
          <ul className="cd-highlights">
            {highlights.map((h) => (
              <li key={h}>
                <i className="fa-solid fa-circle-check" aria-hidden="true" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="cd-block">
        <h2>About this course</h2>
        <p>{course.summary}</p>
        <p>
          This is a self-paced course you can finish online or offline. Every lesson
          is short and practical, with field examples from Kenyan farms. When you
          finish, you’ll earn a verifiable KALRO digital badge you can share with
          buyers, cooperatives and county programs.
        </p>
        <p>
          Downloads total about 15 MB — perfect for learning on a phone with limited
          data. Progress syncs the next time you’re online.
        </p>
      </section>

      <section className="cd-block">
        <h2>Who this course is for</h2>
        <div className="cd-audience">
          <div><i className="fa-solid fa-user-tie" /><span>Smallholder farmers</span></div>
          <div><i className="fa-solid fa-people-group" /><span>Farmer groups &amp; cooperatives</span></div>
          <div><i className="fa-solid fa-clipboard-user" /><span>Extension officers</span></div>
          <div><i className="fa-solid fa-briefcase" /><span>Agripreneurs</span></div>
        </div>
      </section>
    </div>
  );
}