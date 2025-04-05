
import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useLibrary } from '@/contexts/LibraryContext';

interface AuthGuardProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

const AuthGuard = ({ children, requireAdmin = false }: AuthGuardProps) => {
  const { isAuthenticated, currentUser } = useLibrary();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (requireAdmin && currentUser?.role !== 'admin') {
    // Redirect to dashboard if admin access is required but user is not admin
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

export default AuthGuard;
