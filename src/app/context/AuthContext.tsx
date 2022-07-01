import React, { FC, ReactNode, createContext, useState } from 'react';
import { useAsync } from 'react-use';

import { fetchMe } from '../api';
import authService from '../services/auth';

export interface IAuthProviderProps {
  children: ReactNode
}

const AuthContext = createContext({});

export const AuthProvider: FC<IAuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState(() => authService.user);

  useAsync(async () => {
    const user = await fetchMe();
    setUser(user);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      { children }
    </AuthContext.Provider>
  );
};

export default AuthContext;
