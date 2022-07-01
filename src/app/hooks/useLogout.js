import { useNavigate } from 'react-router-dom';

import { authService } from '../services';
import useAuth from './useAuth';

const useLogout = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  return () => {
    authService.removeAuthData();
    setUser(null);
    navigate('/');
  };

};

export default useLogout;
