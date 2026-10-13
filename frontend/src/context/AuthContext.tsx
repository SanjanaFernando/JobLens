import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  apiClient,
  UserProfile,
  TOKEN_STORAGE_KEY,
  REFRESH_TOKEN_STORAGE_KEY,
  USER_STORAGE_KEY,
} from '../api/client';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
  deleteAccount: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const stored = localStorage.getItem(USER_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const saveAuthSession = (data: {
    accessToken: string;
    refreshToken: string;
    userId: string;
    email: string;
    tenantSchema: string;
    role: string;
  }) => {
    const profile: UserProfile = {
      userId: data.userId,
      email: data.email,
      tenantSchema: data.tenantSchema,
      role: data.role,
    };
    localStorage.setItem(TOKEN_STORAGE_KEY, data.accessToken);
    localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, data.refreshToken);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(profile));
    setUser(profile);
  };

  const clearAuthSession = () => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
    localStorage.removeItem(USER_STORAGE_KEY);
    setUser(null);
  };

  useEffect(() => {
    const handleLogoutEvent = () => clearAuthSession();
    window.addEventListener('joblens-logout', handleLogoutEvent);

    // Verify current token on mount if present
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (token) {
      apiClient
        .get<UserProfile>('/api/auth/me')
        .then((res) => {
          setUser(res.data);
          localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(res.data));
        })
        .catch(() => {
          // Handled by refresh interceptor or clears on 401
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }

    return () => {
      window.removeEventListener('joblens-logout', handleLogoutEvent);
    };
  }, []);

  const login = async (email: string, password: string) => {
    const res = await apiClient.post('/api/auth/login', { email, password });
    saveAuthSession(res.data);
  };

  const register = async (email: string, password: string) => {
    const res = await apiClient.post('/api/auth/register', { email, password });
    saveAuthSession(res.data);
  };

  const logout = () => {
    clearAuthSession();
  };

  const deleteAccount = async () => {
    await apiClient.delete('/api/auth/account');
    clearAuthSession();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        deleteAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
