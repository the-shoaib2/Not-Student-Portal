'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { LoginResponse } from '@/services/proxy-api';

interface AuthContextType {
  user: LoginResponse | null;
  isAuthenticated: boolean;
  login: (userData: LoginResponse) => void;
  logout: () => void;
  checkAuthStatus: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<LoginResponse | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const logout = useCallback(() => {
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const checkAuthStatus = useCallback(() => {
    setIsLoading(true);
    const userString = localStorage.getItem('user');
    const isAuthenticatedFlag = localStorage.getItem('isAuthenticated');

    if (userString && isAuthenticatedFlag === 'true') {
      try {
        const userData = JSON.parse(userString);
        const lastLoginTime = new Date(userData.lastLoginTime);
        const currentTime = new Date();
        const hoursSinceLogin = (currentTime.getTime() - lastLoginTime.getTime()) / (1000 * 60 * 60);

        // If last login was more than 24 hours ago, log out
        if (hoursSinceLogin > 24) {
          logout();
          return;
        }

        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing user data:', error);
        logout();
      }
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
    setIsLoading(false);
  }, [logout]);

  useEffect(() => {
    checkAuthStatus();
    // Check auth status every 5 minutes
    const interval = setInterval(checkAuthStatus, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [checkAuthStatus]);

  const login = useCallback((userData: LoginResponse) => {
    const userDataWithTimestamp = {
      ...userData,
      lastLoginTime: new Date().toISOString()
    };
    localStorage.setItem('user', JSON.stringify(userDataWithTimestamp));
    localStorage.setItem('isAuthenticated', 'true');
    setUser(userDataWithTimestamp);
    setIsAuthenticated(true);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, checkAuthStatus }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};