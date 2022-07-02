import React, { createContext, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import AuthService from 'apps/auth/service';
import { fetchMe } from 'apps/user/api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(() => AuthService.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchMe);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      { children }
    </AuthContext.Provider>
  );
};

export default AuthContext;
