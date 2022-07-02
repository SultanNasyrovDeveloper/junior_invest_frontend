import { useLocation, Navigate, Outlet } from 'react-router-dom';

import { useAuth } from 'app/hooks';

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
