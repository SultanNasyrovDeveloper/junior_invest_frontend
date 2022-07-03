import { observer } from 'mobx-react-lite';
import { useAsync } from 'react-use';
import React, { createContext, useState } from 'react';

import { userStore } from 'store';
import AuthService from 'apps/auth/service';
import { fetchMe } from 'apps/user/api';

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => AuthService.isLoggedIn);

  useAsync(async () => {
    if (isLoggedIn) {
      const user = await fetchMe();
      userStore.setUser(user);
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
