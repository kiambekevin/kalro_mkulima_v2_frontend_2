// src/components/courses/CourseGrid.jsx
import CourseCard from '../cards/CourseCard';

/**
 * CourseGrid
 * Renders a grid (or list) of CourseCards. The wrapper class drives
 * the layout — `.courses` for grid, `.courses--list` for list.
 */
export default function CourseGrid({ courses, view = 'grid' }) {
  return (
    <div className={`courses ${view === 'list' ? 'courses--list' : ''}`}>
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          course={{
            subject: course.subjectLabel,
            title: course.title,
            level: course.levelLabel,
            rating: course.rating,
            reviews: course.reviews,
            hours: course.hours,
            lessons: course.lessons,
            image: course.image,
            alt: course.alt,
            href: `/courses/${course.slug}`,
          }}
        />
      ))}
    </div>
  );
}