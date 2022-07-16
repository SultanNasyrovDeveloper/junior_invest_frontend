import { observer } from 'mobx-react-lite';
import { useAsync } from 'react-use';
import React, { createContext, useState } from 'react';

import { userStore } from 'store';
import { useLogout } from 'apps/auth';
import AuthService from 'apps/auth/service';
import { fetchMe } from 'apps/user/api';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const logout = useLogout();

  const [isLoggedIn, setIsLoggedIn] = useState(() => AuthService.isLoggedIn);

  useAsync(async () => {
    if (isLoggedIn) {
      try {
        const user = await fetchMe();
        userStore.setUser(user);
      } catch(error) {
        logout();
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      { children }
    </AuthContext.Provider>
  );
};

export default AuthContext;
export const ObservableAuthProvider = observer(AuthProvider);
