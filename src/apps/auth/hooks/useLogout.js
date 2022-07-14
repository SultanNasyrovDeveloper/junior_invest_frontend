import { useNavigate } from 'react-router-dom';

import { userStore } from 'store';
import useAuth from './useAuth';
import AuthService from '../service';

const useLogout = () => {
  const { setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  return () => {
    AuthService.logout()
    setIsLoggedIn(false);
    userStore.setUser(null);
    navigate('/');
  };
};

export default useLogout;
