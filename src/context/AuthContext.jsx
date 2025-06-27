import React, { createContext, useContext, useState, useEffect } from 'react';
import apiService from '../services/api.js';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    
    if (token) {
      // Get user info from token instead of localStorage
      const userFromToken = apiService.getCurrentUser();
      if (userFromToken) {
        setUser(userFromToken);
        apiService.setToken(token);
      } else {
        // Token is invalid, clear it
        localStorage.removeItem('authToken');
        localStorage.removeItem('adminUser');
      }
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    if (userData.token) {
      // Store token and get user info from it
      localStorage.setItem('authToken', userData.token);
      apiService.setToken(userData.token);
      
      const userFromToken = apiService.getCurrentUser();
      if (userFromToken) {
        setUser(userFromToken);
        localStorage.setItem('adminUser', JSON.stringify(userFromToken));
      } else {
        setUser(userData);
        localStorage.setItem('adminUser', JSON.stringify(userData));
      }
    } else {
      setUser(userData);
      localStorage.setItem('adminUser', JSON.stringify(userData));
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('adminUser');
    localStorage.removeItem('authToken');
    apiService.setToken(null);
  };

  const updateUser = (newUserData) => {
    const updatedUser = { ...user, ...newUserData };
    setUser(updatedUser);
    localStorage.setItem('adminUser', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    login,
    logout,
    updateUser,
    loading,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};