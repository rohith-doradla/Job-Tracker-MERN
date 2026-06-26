import { createContext, useContext, useState, useEffect } from 'react';

import api from '../api/axios.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  async function refreshSession() {
    const storedToken = localStorage.getItem('token');

    if (!storedToken) {
      setUser(null);
      setToken(null);
      setLoading(false);

      return;
    }

    try {
      const { data } = await api.get('/auth/session');

      setUser(data.user);
    } catch (e) {
      //Token is invalid
      localStorage.removeItem('token');
      setUser(null);

      setToken(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refreshSession();
  }, []);

  async function register(firstName, lastName, email, password) {
    const { data } = await api.post('auth/register', {
      firstName,
      lastName,
      email,
      password,
    });

    // localStorage.setItem('token', data.token);

    // setToken(data.token);
    // setUser(data.user);

    return data.user;
  }

  async function login(email, password) {
    const { data } = await api.post('/auth/login', { email, password });

    localStorage.setItem('token', data.token);

    setToken(data.token);
    setUser(data.user);

    return data.user;
  }

  async function logout() {
    localStorage.removeItem('token');

    setToken(null);
    setUser(null);
  }

  const value = {
    user,
    token,
    loading,
    register,
    login,
    logout,
    refreshSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return ctx;
}
