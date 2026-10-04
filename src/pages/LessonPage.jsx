// src/pages/LessonPage.jsx
import { useEffect, useMemo, useRef, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import LessonHeader from '../components/lesson/LessonHeader';
import LessonPlayer from '../components/lesson/LessonPlayer';
import LessonOutline from '../components/lesson/LessonOutline';
import LessonNav from '../components/lesson/LessonNav';
import LessonNotes from '../components/lesson/LessonNotes';
import LessonResources from '../components/lesson/LessonResources';
import LessonCompleteModal from '../components/lesson/LessonCompleteModal';
import NotFoundPage from './NotFoundPage';

import { useLesson } from '../hooks/useLesson';
import { useCourseProgress } from '../hooks/useCourseProgress';
import { useTrackVisit } from '../hooks/useTrackVisit';
import { badgesService } from '../api/services/badges';

export default function LessonPage() {
  const { slug, lessonIdentifier } = useParams();

  // Record a lesson visit on mount and whenever the lesson changes
  useTrackVisit('lesson', slug, lessonIdentifier);

  const { lesson, loading, error } = useLesson(slug, lessonIdentifier);
  const progress = useCourseProgress(slug);

  const [showComplete, setShowComplete] = useState(false);
  const [earnedBadge, setEarnedBadge] = useState(null);
  const hasCelebratedRef = useRef(false);

  const totalLessons = lesson?.total_lessons ?? 0;

  // ── Curriculum ─────────────────────────────────────────
  const modules = useMemo(() => lesson?.modules ?? [], [lesson]);

  const flatLessons = useMemo(
    () =>
      modules.flatMap((m, mi) =>
        m.lessons.map((l, li) => ({ ...l, moduleIndex: mi, lessonIndex: li })),
      ),
    [modules],
  );

  const currentIndex = useMemo(
    () => flatLessons.findIndex((l) => l.id === lesson?.id),
    [flatLessons, lesson?.id],
  );

  const prev = currentIndex > 0 ? flatLessons[currentIndex - 1] : null;
  const next =
    currentIndex >= 0 && currentIndex < flatLessons.length - 1
      ? flatLessons[currentIndex + 1]
      : null;

  // ── Completion celebration ─────────────────────────────
  useEffect(() => {
    if (!lesson || !totalLessons) return;
    const allDone = progress.completed.size >= totalLessons;

    if (allDone && !hasCelebratedRef.current) {
      hasCelebratedRef.current = true;
      const t = setTimeout(async () => {
        try {
          const badges = await badgesService.list({ page: 1, pageSize: 5 });
          const items = badges.results ?? badges;
          const match = items.find(
            (b) => b.courseTitle === lesson.course_title,
          );
          setEarnedBadge(match ?? items[0] ?? null);
        } catch {
          setEarnedBadge(null);
        }
        setShowComplete(true);
      }, 400);
      return () => clearTimeout(t);
    }

    if (!allDone) hasCelebratedRef.current = false;
  }, [lesson, totalLessons, progress.completed.size]);

  // ── Scroll to top on lesson change ─────────────────────
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [lessonIdentifier]);

  // ── Safety net: session expired mid-visit ──────────────
  if (error && (error.status === 401 || error.status === 403)) {
    const next = encodeURIComponent(
      `/courses/${slug}/lessons/${lessonIdentifier}`,
    );
    return <Navigate to={`/login?next=${next}`} replace />;
  }

  // ── Loading / error / 404 ──────────────────────────────
  if (loading) {
    return (
      <main id="main" className="section">
        <div className="wrap lesson-loading">
          <i className="fa-solid fa-circle-notch fa-spin" aria-hidden="true" />
          <p>Loading lesson…</p>
        </div>
      </main>
    );
  }

  if (error && error.status === 404) return <NotFoundPage />;

  if (error) {
    return (
      <main id="main" className="section">
        <div className="wrap lesson-error">
          <h1>Could not load this lesson</h1>
          <p>{error.message || 'Please try again shortly.'}</p>
        </div>
      </main>
    );
  }

  if (!lesson) return <NotFoundPage />;

  // ── Adapter: snake_case → camelCase ────────────────────
  const course = {
    slug: lesson.course_slug || slug,
    title: lesson.course_title || 'Course',
    levelLabel: lesson.level_label || '',
  };

  const module = {
    title: lesson.module_title || 'Module',
  };

  const normalisedLesson = {
    id: lesson.id,
    slug: lesson.slug,
    title: lesson.title,
    body: lesson.body,
    type: lesson.type,
    minutes: lesson.minutes,
    notes: lesson.notes ?? [],

    streamUrl: lesson.stream_url,
    streamMediaType: lesson.stream_media_type,
    youtubeId: lesson.youtube_id,
    poster: lesson.poster_url,

    resourceUrl: lesson.resource_file,
    resourceLabel: lesson.resource_label,
    resourceMediaType: lesson.resource_media_type,

    resources: lesson.resources ?? [],
  };

  const isDone = progress.isDone(lesson.id);

  return (
    <main id="main" className="lesson-page">
      <LessonHeader
        course={course}
        module={module}
        lesson={normalisedLesson}
        progress={progress}
      />

      <div className="wrap lesson-page__layout">
        <article className="lesson-page__main">
          <LessonPlayer
            lesson={{ ...normalisedLesson, courseSlug: course.slug }}
            course={course}
            isDone={isDone}
            onToggle={() => progress.toggle(lesson.id)}
          />

          <LessonNotes lesson={normalisedLesson} />

          <LessonResources resources={normalisedLesson.resources} />

          <LessonNav
            course={course}
            prev={prev}
            next={next}
            isDone={isDone}
            onToggle={() => progress.toggle(lesson.id)}
            progress={progress}
          />
        </article>

        <aside className="lesson-page__aside">
          <LessonOutline
            course={course}
            modules={modules}
            flatLessons={flatLessons}
            currentLessonId={lesson.id}
            progress={progress}
            currentIndex={currentIndex}
          />
        </aside>
      </div>

      <LessonCompleteModal
        open={showComplete}
        onClose={() => setShowComplete(false)}
        course={course}
        badge={earnedBadge}
      />
    </main>
  );
}