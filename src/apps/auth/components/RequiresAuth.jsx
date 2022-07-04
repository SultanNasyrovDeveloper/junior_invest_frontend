import { useLocation, Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '../hooks';

const RequiresAuth = () => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  return (
    isLoggedIn
      ? <Outlet />
      : <Navigate to="/signin" state={{ from: location }} replace />
  );
};

export default RequiresAuth;
