import React, { createContext, useContext, useState, useEffect } from 'react';
import { DoctorUser } from '../types';
import { clinicApi } from '../services/api';

interface AuthContextType {
  doctor: DoctorUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [doctor, setDoctor] = useState<DoctorUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const saved = clinicApi.getCurrentDoctor();
    if (saved) {
      setDoctor(saved);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, pass: string) => {
    setIsLoading(true);
    try {
      const res = await clinicApi.login(email, pass);
      setDoctor(res.doctor);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    clinicApi.logout();
    setDoctor(null);
  };

  return (
    <AuthContext.Provider value={{ doctor, isAuthenticated: !!doctor, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
