// src/components/lesson/LessonPlayer.jsx
import { useState } from 'react';
import { useShakaPlayer } from '../../hooks/useShakaPlayer';
import { useOfflineLesson } from '../../hooks/useOfflineLesson';

/**
 * LessonPlayer
 * Renders the lesson's media in the appropriate player:
 *
 *   1. YouTube embed       — when lesson.youtube_id is set
 *   2. Shaka Player        — when streamUrl is an HLS/DASH manifest
 *   3. Native <video>      — when streamUrl or resourceUrl is a video file
 *   4. Reading poster      — when there's no video at all
 *
 * The lesson type ("video", "reading", "resource") tells us what the
 * author intended, but the URL itself decides which player to use.
 */
export default function LessonPlayer({ lesson, course, isDone, onToggle }) {
  const streamUrl = (lesson.streamUrl || '').toLowerCase();
  const resourceUrl = (lesson.resourceUrl || '').toLowerCase();
  const resourceMedia = lesson.resourceMediaType || null;

  const hasYoutube = Boolean(lesson.youtubeId);

  const isHls = streamUrl.endsWith('.m3u8');
  const isDash = streamUrl.endsWith('.mpd');
  const isDirectVideo = /\.(mp4|webm|ogg|m4v)$/.test(streamUrl);

  const resourceIsVideo =
    resourceMedia === 'video' ||
    /\.(mp4|webm|ogg|m4v)$/.test(resourceUrl);

  const resourceIsPdf = resourceMedia === 'pdf' || resourceUrl.endsWith('.pdf');

  let mode = 'reading';
  if (hasYoutube) mode = 'youtube';
  else if (isHls || isDash) mode = 'shaka';
  else if (isDirectVideo) mode = 'native';
  else if (resourceIsVideo) mode = 'native-resource';
  else if (resourceIsPdf) mode = 'resource';
  else if (lesson.type === 'resource' && lesson.resourceUrl) mode = 'resource';

  return (
    <section className="lesson-player" aria-labelledby="lesson-title">
      <div className="lesson-player__media">
        {mode === 'youtube' && (
          <YoutubeStage videoId={lesson.youtubeId} title={lesson.title} />
        )}

        {mode === 'shaka' && <ShakaStage lesson={lesson} />}

        {mode === 'native' && (
          <NativeVideoStage src={lesson.streamUrl} poster={lesson.poster} title={lesson.title} />
        )}

        {mode === 'native-resource' && (
          <NativeVideoStage
            src={lesson.resourceUrl}
            poster={lesson.poster}
            title={lesson.resourceLabel || lesson.title}
          />
        )}

        {mode === 'resource' && (
          <div className="lesson-player__resource">
            <i className="fa-solid fa-file-arrow-down" aria-hidden="true" />
            <div>
              <strong>{lesson.resourceLabel || 'Download resource'}</strong>
              <p>Save it for offline use and print it for your farm records.</p>
            </div>
            <a
              href={lesson.resourceUrl}
              className="btn btn--primary btn--sm"
              download
              target="_blank"
              rel="noreferrer"
            >
              <i className="fa-solid fa-download" aria-hidden="true" />
              Download
            </a>
          </div>
        )}

        {mode === 'reading' && (
          <div
            className="lesson-player__poster"
            style={
              lesson.poster
                ? { backgroundImage: `url('${lesson.poster}')` }
                : undefined
            }
          >
            <span className="lesson-player__badge">
              <i className="fa-solid fa-book-open" aria-hidden="true" />
              Reading lesson
            </span>
          </div>
        )}
      </div>

      <header className="lesson-player__head">
        <div className="lesson-player__head-text">
          <div className="lesson-player__kicker">
            <i className="fa-solid fa-graduation-cap" aria-hidden="true" />
            {course.title}
          </div>
          <h1 id="lesson-title">{lesson.title}</h1>
          <div className="lesson-player__meta">
            <span>
              <i className="fa-regular fa-clock" aria-hidden="true" />
              {lesson.minutes} min
            </span>
            {course.levelLabel && (
              <span>
                <i className="fa-solid fa-signal" aria-hidden="true" />
                {course.levelLabel}
              </span>
            )}
            <span>
              <i className="fa-solid fa-language" aria-hidden="true" />
              English · Kiswahili
            </span>
          </div>
        </div>

        <div className="lesson-player__head-actions">
          <button
            type="button"
            className={`lesson-player__done ${isDone ? 'is-on' : ''}`}
            onClick={onToggle}
            aria-pressed={isDone}
          >
            <i
              className={`fa-solid ${isDone ? 'fa-circle-check' : 'fa-circle'}`}
              aria-hidden="true"
            />
            {isDone ? 'Completed' : 'Mark complete'}
          </button>
        </div>
      </header>

      {lesson.body && (
        <div className="lesson-player__body">
          <h2>About this lesson</h2>
          <p style={{ whiteSpace: 'pre-line' }}>{lesson.body}</p>
        </div>
      )}
    </section>
  );
}


// ───────────────────────────── Stage components ─────────────────────────────

function YoutubeStage({ videoId, title }) {
  const src = `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1`;
  return (
    <div className="lesson-player__video">
      <iframe
        src={src}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
}

function NativeVideoStage({ src, poster, title }) {
  return (
    <div className="lesson-player__video">
      <video
        controls
        playsInline
        preload="metadata"
        poster={poster || undefined}
        controlsList="nodownload noplaybackrate"
      >
        <source src={src} />
        Your browser cannot play this video.
      </video>
    </div>
  );
}

function ShakaStage({ lesson }) {
  const { videoRef, ready, error } = useShakaPlayer();
  const storage = useOfflineLessonStore();   // see note below

  // Load into Shaka once the player and storage are ready
  // (kept inline for clarity — normally split into its own hook)

  return (
    <div className="lesson-player__video">
      {!ready && !error && (
        <div className="lesson-player__loader">Preparing player…</div>
      )}
      {error && (
        <div className="lesson-player__loader lesson-player__loader--error">
          <i className="fa-solid fa-triangle-exclamation" aria-hidden="true" />
          {error.message || 'This video could not be loaded.'}
        </div>
      )}
      <video
        ref={videoRef}
        controls
        playsInline
        poster={lesson.poster || undefined}
      />
    </div>
  );
}