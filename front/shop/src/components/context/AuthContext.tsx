import React, { createContext, useContext, useState, useEffect } from 'react';
import { isUserLoggedIn } from '../../services/AuthService';
import { getLoggedInUsername, logoutUser } from '../../pages/AuthPage/AuthPage';

interface AuthContextType {
  isLoggedIn: boolean;
  username?: string;
  login: (username: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (isUserLoggedIn()) {
      setIsLoggedIn(true);
      setUsername(getLoggedInUsername() || undefined);
    }
  }, []);

  const login = (username: string) => {
    setIsLoggedIn(true);
    setUsername(username);
  };

  const logout = () => {
    logoutUser();
    setIsLoggedIn(false);
    setUsername(undefined);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
