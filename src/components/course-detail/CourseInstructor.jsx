// src/components/course-detail/CourseInstructor.jsx

export default function CourseInstructor({ instructor }) {
  return (
    <div className="cd-panel" id="panel-instructor" role="tabpanel" aria-labelledby="tab-instructor">
      <section className="cd-block">
        <h2>Meet your instructor</h2>

        <div className="cd-instructor">
          <span className="cd-avatar" style={{ background: instructor.colour }}>
            {instructor.initials}
          </span>
          <div className="cd-instructor__info">
            <h3>{instructor.name}</h3>
            <p className="cd-muted">{instructor.title}</p>
            <p>{instructor.bio}</p>

            <div className="cd-instructor__stats">
              {instructor.stats.map((s) => (
                <div key={s.label}>
                  <b>{s.value}</b>
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}