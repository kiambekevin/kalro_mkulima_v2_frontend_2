// src/App.jsx
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';

// ── Global chrome ────────────────────────────────────────────
import UtilityBar from './components/layout/UtilityBar';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import RosetteSprite from './components/ui/Rosette';

// ── Homepage sections ────────────────────────────────────────
import Hero from './components/sections/Hero';
import Subjects from './components/sections/Subjects';
import Pathways from './components/sections/Pathways';
import PopularCourses from './components/sections/PopularCourses';
import BadgesSection from './components/sections/BadgesSection';
import HowItWorks from './components/sections/HowItWorks';
import Voices from './components/sections/Voices';
import Faq from './components/sections/Faq';
import CtaBanner from './components/sections/CtaBanner';

// ── Pages ────────────────────────────────────────────────────
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import LessonPage from './pages/LessonPage';
import BadgesPage from './pages/BadgesPage';
import BadgeVerifyPage from './pages/BadgeVerifyPage';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import AboutPage from './pages/AboutPage';
import CallCentrePage from './pages/CallCentrePage';
import PlaceholderPage from './pages/PlaceholderPage';

// ── Auth guard ───────────────────────────────────────────────
import { useAuth } from './hooks/useAuth';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
/**
 * RequireAuth
 * Renders `children` when the user is signed in. Otherwise redirects
 * to /login with a `next` parameter carrying the intended URL, so the
 * learner lands back where they meant to go after signing in.
 */
function RequireAuth({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <main id="main" className="section">
        <div className="wrap" style={{ textAlign: 'center', padding: '80px 0' }}>
          <i className="fa-solid fa-circle-notch fa-spin" aria-hidden="true" />
        </div>
      </main>
    );
  }

  if (!user) {
    const next = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?next=${next}`} replace />;
  }

  return children;
}

/**
 * HomePage
 * Marketing homepage. Chrome lives in <App>, so this renders only <main>.
 */
function HomePage() {
  return (
    <main id="main">
      <Hero />
      <Subjects />
      <Pathways />
      <PopularCourses />
      <BadgesSection />
      <HowItWorks />
      <Voices />
      <Faq />
      <CtaBanner />
    </main>
  );
}

export default function App() {
  return (
    <>
      <RosetteSprite />
      <a href="#main" className="skip">Skip to content</a>

      <UtilityBar />
      <Header />

      <Routes>
        {/* Home */}
        <Route path="/" element={<HomePage />} />

        {/* Courses — public list and detail */}
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/:slug" element={<CourseDetailPage />} />

        {/* Lessons — require sign-in */}
        <Route
          path="/courses/:slug/lessons/:lessonIdentifier"
          element={
            <RequireAuth>
              <LessonPage />
            </RequireAuth>
          }
        />

        {/* Badges — public verify, wallet requires sign-in */}
        <Route path="/badges/verify" element={<BadgeVerifyPage />} />
        <Route path="/badges/verify/:badgeId" element={<BadgeVerifyPage />} />
        <Route
          path="/badges"
          element={
            <RequireAuth>
              <BadgesPage />
            </RequireAuth>
          }
        />

        {/* Auth */}
        <Route path="/login" element={<AuthPage />} />
        <Route path="/register" element={<AuthPage />} />

        {/* Dashboard — requires sign-in */}
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <DashboardPage />
            </RequireAuth>
          }
        />

        {/* Public info */}
        <Route path="/about" element={<AboutPage />} />
        <Route path="/call-centre" element={<CallCentrePage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />

        {/* Fallback — must be last */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />
    </>
  );
}