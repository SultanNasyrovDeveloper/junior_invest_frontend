import React, { createContext, useState } from 'react';
import { useAsync } from 'react-use';

import { fetchMe } from '../api';
import authService from '../services/auth';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => authService.user);

  useAsync(async () => {
    if (user) {
      const user = await fetchMe();
      setUser(user);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      { children }
    </AuthContext.Provider>
  );
};

export default AuthContext;
