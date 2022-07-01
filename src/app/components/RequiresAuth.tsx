import { useLocation, Navigate, Outlet } from 'react-router-dom';

import { useAuth } from 'app/hooks';

const RequiresAuth = () => {
  const { user } = useAuth();
  const location = useLocation();

  return (
    user
      ? <Outlet />
      : <Navigate to="/signin" state={{ from: location }} replace/>
  );
};

export default RequiresAuth;
