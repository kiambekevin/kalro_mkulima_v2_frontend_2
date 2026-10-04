// src/components/sections/Subjects.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SectionHead from '../ui/SectionHead';
import { coursesService } from '../../api/services/courses';

export default function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    coursesService.subjects()
      .then((res) => setSubjects(res.results ?? res))
      .catch(() => setSubjects([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="section" id="catalogue">
      <div className="wrap">
        <SectionHead
          title="Explore by subject"
          subtitle="Courses built by KALRO researchers for Kenyan farms."
          link="/courses"
          linkLabel="View all courses"
        />

        <div className="subjects">
          {loading &&
            Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="subject subject--skeleton" aria-hidden="true" />
            ))}

          {!loading &&
            subjects.map((s) => (
              <Link
                key={s.slug}
                to={`/courses?subject=${s.slug}`}
                className="subject"
              >
                <span className="subject__ico">
                  <i className={s.icon || 'fa-solid fa-book-open'} aria-hidden="true" />
                </span>
                <span>
                  <h3>{s.label}</h3>
                  <p>{s.course_count ?? 0} courses</p>
                </span>
              </Link>
            ))}

          {!loading && (
            <Link to="/courses" className="subject subject--all">
              <span className="subject__ico">
                <i className="fa-solid fa-book-open" aria-hidden="true" />
              </span>
              <span>
                <h3>Full catalogue</h3>
                <p>All courses</p>
              </span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}