import { useNavigate } from 'react-router-dom';

import useAuth from './useAuth';
import AuthService from '../service';

const useLogout = () => {
  const { setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  return () => {
    AuthService.logout()
    setIsLoggedIn(false);
    navigate('/');
  };
};

export default useLogout;
