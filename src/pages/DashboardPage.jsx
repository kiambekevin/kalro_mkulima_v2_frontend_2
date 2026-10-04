// src/pages/DashboardPage.jsx
import { Link } from 'react-router-dom';
import Breadcrumbs from '../components/ui/Breadcrumbs';
import WelcomeBanner from '../components/dashboard/WelcomeBanner';
import ContinueLearning from '../components/dashboard/ContinueLearning';
import MyBadgesPanel from '../components/dashboard/MyBadgesPanel';
import WeeklyActivity from '../components/dashboard/WeeklyActivity';
import RecommendedCourses from '../components/dashboard/RecommendedCourses';
import FieldDaysPanel from '../components/dashboard/FieldDaysPanel';
import QuickActions from '../components/dashboard/QuickActions';
import { useAuth } from '../hooks/useAuth';
import { useDashboardData } from '../hooks/useDashboardData';

/**
 * DashboardPage
 * The authenticated learner dashboard.
 *
 * Route guard: mounted only inside <RequireAuth> in App.jsx, so `user`
 * is guaranteed to be set. This component never performs a redirect —
 * that keeps the routing logic in one place.
 */
export default function DashboardPage() {
  const { user } = useAuth();
  const { data, loading, error, reload } = useDashboardData();

  // ── Loading ────────────────────────────────────────────
  if (loading) {
    return (
      <main id="main" className="section">
        <div className="wrap dash-loading">
          <i className="fa-solid fa-circle-notch fa-spin" aria-hidden="true" />
          <p>Loading your dashboard…</p>
        </div>
      </main>
    );
  }

  // ── Error ──────────────────────────────────────────────
  if (error) {
    return (
      <main id="main" className="section">
        <div className="wrap dash-error">
          <h1>Could not load your dashboard</h1>
          <p>{error.message || 'Please try again in a moment.'}</p>
          <button
            type="button"
            className="btn btn--primary btn--lg"
            onClick={() => reload({ refresh: true })}
          >
            <i className="fa-solid fa-rotate-right" aria-hidden="true" />
            Try again
          </button>
        </div>
      </main>
    );
  }

  // ── Empty (defensive — shouldn't happen with RequireAuth) ──
  if (!user || !data) {
    return (
      <main id="main" className="section">
        <div className="wrap dash-error">
          <h1>Session expired</h1>
          <p>Please sign in again to view your dashboard.</p>
          <Link to="/login" className="btn btn--primary btn--lg">
            Sign in
          </Link>
        </div>
      </main>
    );
  }

  const {
    stats,
    inProgress,
    recentBadges,
    weeklyActivity,
    recommended,
    fieldDays,
  } = data;

  return (
    <main id="main" className="dashboard">
      <section className="dash-hero">
        <div className="wrap">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Dashboard' },
            ]}
          />
          <WelcomeBanner user={user} stats={stats} />
        </div>
      </section>

      <section className="section dashboard-body">
        <div className="wrap dashboard-grid">
          <div className="dashboard-main">
            <ContinueLearning items={inProgress} />
            <RecommendedCourses courses={recommended} />
            <WeeklyActivity activity={weeklyActivity} />
          </div>

          <aside className="dashboard-aside">
            <QuickActions />
            <MyBadgesPanel badges={recentBadges} />
            <FieldDaysPanel events={fieldDays} />
          </aside>
        </div>
      </section>
    </main>
  );
}