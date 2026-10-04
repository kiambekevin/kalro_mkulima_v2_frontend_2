// src/pages/CourseDetailPage.jsx
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import CourseHero from '../components/course-detail/CourseHero';
import CourseTabs from '../components/course-detail/CourseTabs';
import CourseOverview from '../components/course-detail/CourseOverview';
import CourseCurriculum from '../components/course-detail/CourseCurriculum';
import CourseInstructor from '../components/course-detail/CourseInstructor';
import CourseReviews from '../components/course-detail/CourseReviews';
import CourseSidebar from '../components/course-detail/CourseSidebar';
import RelatedCourses from '../components/course-detail/RelatedCourses';
import NotFoundPage from './NotFoundPage';
import { useCourse } from '../hooks/useCourse';
import { useCourseProgress } from '../hooks/useCourseProgress';
import { useTrackVisit } from '../hooks/useTrackVisit';

export default function CourseDetailPage() {
  const { slug } = useParams();

  // Record a course visit as soon as the page mounts. The hook debounces
  // duplicate fires from React StrictMode and stale remounts.
  useTrackVisit('course', slug);

  const { course, loading, error } = useCourse(slug);
  const [tab, setTab] = useState('overview');
  const progress = useCourseProgress(slug);

  // ── Loading ────────────────────────────────────────────
  if (loading) {
    return (
      <main id="main" className="section">
        <div className="wrap course-loading">
          <i className="fa-solid fa-circle-notch fa-spin" aria-hidden="true" />
          <p>Loading course…</p>
        </div>
      </main>
    );
  }

  // ── 404 ────────────────────────────────────────────────
  if (error && error.status === 404) return <NotFoundPage />;

  // ── Error ──────────────────────────────────────────────
  if (error) {
    return (
      <main id="main" className="section">
        <div className="wrap course-error">
          <h1>Could not load this course</h1>
          <p>{error.message || 'Please try again shortly.'}</p>
        </div>
      </main>
    );
  }

  if (!course) return <NotFoundPage />;

  // ── Adapter: snake_case → camelCase ────────────────────
  const normalised = {
    slug,
    title: course.title,
    summary: course.summary,
    description: course.description,
    subject: course.subject,
    subjectLabel: course.subject_label,
    level: course.level,
    levelLabel: course.level_label,
    rating: course.rating,
    reviews: course.reviews,
    hours: course.hours,
    lessons: course.lessons,
    badge: course.badge,
    popular: course.popular,
    image: course.image,
    alt: course.alt,
  };

  return (
    <main id="main">
      <section className="course-detail-hero">
        <div className="wrap">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Courses', href: '/courses' },
              { label: course.title },
            ]}
          />
          <CourseHero
            course={normalised}
            totalMinutes={course.hours * 60}
          />
        </div>
      </section>

      <section className="section course-detail-body">
        <div className="wrap course-detail__layout">
          <div className="course-detail__main">
            <CourseTabs value={tab} onChange={setTab} />

            {tab === 'overview' && (
              <CourseOverview
                course={normalised}
                highlights={course.highlights || []}
              />
            )}

            {tab === 'curriculum' && (
              <CourseCurriculum
                course={normalised}
                curriculum={course.curriculum || []}
                totalMinutes={course.hours * 60}
                progress={progress}
              />
            )}

            {tab === 'instructor' && course.instructor && (
              <CourseInstructor instructor={course.instructor} />
            )}

            {tab === 'reviews' && (
              <CourseReviews
                reviews={course.reviews_sample || []}
                rating={Number(course.rating) || 0}
                reviewCount={course.reviews || 0}
              />
            )}
          </div>

          <aside className="course-detail__aside">
            <CourseSidebar
              course={normalised}
              totalMinutes={course.hours * 60}
              progress={progress}
            />
          </aside>
        </div>
      </section>

      <RelatedCourses currentSlug={slug} />
    </main>
  );
}