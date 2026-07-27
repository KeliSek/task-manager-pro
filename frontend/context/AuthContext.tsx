/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import api from '@/lib/api';
import { User } from '@/types';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('accessToken');
    }
    return null;
  });

  const fetchUser = useCallback(async () => {
  const token = localStorage.getItem('accessToken');
  try {
    const response = await api.get('/auth/me');
    setUser(response.data);
  } catch (err) {
    console.log('fetchUser - error:', err);
    localStorage.removeItem('accessToken');
    setToken(null);
  } finally {
    setIsLoading(false);
  }
}, []);

  useEffect(() => {
    if (token) {
      fetchUser();
    } else {
      setIsLoading(false);
    }
  }, [token, fetchUser]);

  const login = async(token: string) => {
    localStorage.setItem('accessToken', token);
    setToken(token);
    await fetchUser();
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setToken(null);
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}