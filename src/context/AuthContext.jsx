import React, { createContext, useState } from 'react';
import { useAsync } from 'react-use';

import AuthService from 'apps/auth/service';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => AuthService.isLoggedIn);

  useAsync(async () => {
    if (isLoggedIn) {}
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      { children }
    </AuthContext.Provider>
  );
};

export default AuthContext;
