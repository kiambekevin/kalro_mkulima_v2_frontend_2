// src/components/course-detail/RelatedCourses.jsx
import { useRelatedCourses } from '../../hooks/useCourse';
import SectionHead from '../ui/SectionHead';
import CourseCard from '../cards/CourseCard';

export default function RelatedCourses({ currentSlug }) {
  const courses = useRelatedCourses(currentSlug);
  if (!courses?.length) return null;

  return (
    <section className="section section--paper">
      <div className="wrap">
        <SectionHead
          title="You might also like"
          subtitle="Keep the learning going with a related course."
          link="/courses"
          linkLabel="Browse all courses"
        />
        <div className="courses">
          {courses.map((c) => (
            <CourseCard
              key={c.id || c.slug}
              course={{
                subject: c.subjectLabel || c.subject_label,
                title: c.title,
                level: c.levelLabel || c.level_label,
                rating: c.rating,
                reviews: c.reviews ?? 0,
                hours: c.hours,
                lessons: c.lessons ?? 0,
                image: c.image,
                alt: c.alt,
                href: `/courses/${c.slug}`,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}