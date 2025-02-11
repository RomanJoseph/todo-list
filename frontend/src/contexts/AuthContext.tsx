'use client'

import { createContext, useContext, useState } from 'react';
import Cookies from 'js-cookie';
import { loginUser } from '@/lib/auth/auth';
import { User } from '@/types/User';


type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    const response = await loginUser({ email, password });
    const { token, user } = response;

    if (token) {
      Cookies.set('token', token);
      Cookies.set('user', JSON.stringify(user));
      setUser(user);
    } else {
      throw new Error('Falha no login');
    }
  };

  const logout = () => {
    Cookies.remove('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Cookies.get('user') ? !!JSON.parse(Cookies.get('user') as string): false,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);