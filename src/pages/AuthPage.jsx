// src/pages/AuthPage.jsx
import { useState } from 'react';
import { Navigate, useLocation, useSearchParams } from 'react-router-dom';
import AuthCard from '../components/auth/AuthCard';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import { useAuth } from '../hooks/useAuth';

export default function AuthPage() {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [params] = useSearchParams();

  const initialMode = location.pathname.startsWith('/register') ? 'register' : 'login';
  const [mode, setMode] = useState(initialMode);

  // Where to send the user after sign-in. Prefer ?next=… then the
  // location.state.from set by an EnrollModal, then dashboard.
  const from = params.get('next') || location.state?.from?.pathname || '/dashboard';

  // Only redirect if we're actually on an auth page AND the user is
  // already signed in. This never runs when the user is on /about.
  if (!loading && user) return <Navigate to={from} replace />;

  return (
    <AuthCard mode={mode}>
      {mode === 'login' ? (
        <LoginForm onSwitch={() => setMode('register')} redirectTo={from} />
      ) : (
        <RegisterForm onSwitch={() => setMode('login')} redirectTo={from} />
      )}
    </AuthCard>
  );
}