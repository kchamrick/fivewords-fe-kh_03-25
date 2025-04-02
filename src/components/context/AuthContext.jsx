// src/components/context/AuthContext.jsx
import { createContext, useState, useEffect } from 'react';
import api from '../services/Api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      loadUser();
    } else {
      setLoading(false);
    }
  }, []);

  const loadUser = async () => {
    try {
      setLoading(true);
      const res = await api.get('/users/profile');
      setUser(res.data.user);
      setLoading(false);
    } catch (err) {
      localStorage.removeItem('token');
      setUser(null);
      setError('Session expired. Please log in again.');
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      const res = await api.post('/users/register', userData);
      localStorage.setItem('token', res.data.token);
      await loadUser();
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      setLoading(false);
      throw err;
    }
  };

  const login = async (credentials) => {
    try {
      setLoading(true);
      const res = await api.post('/users/login', credentials);
      localStorage.setItem('token', res.data.token);
      await loadUser();
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      setLoading(false);
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        register,
        login,
        logout,
        loadUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};