import React from 'react';

import { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext.jsx';

import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

function LoginPage() {
  const [loginInput, setLoginInput] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  const { login, user } = useAuth();

  const navigate = useNavigate();

  // if (loading) return <div>Loading...</div>;
  // if (user) {
  //   return <Navigate to="/" />;
  // }

  function handleLoginChange(e) {
    setLoginInput({ ...loginInput, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    try {
      await login(loginInput.email, loginInput.password);

      navigate('/');
    } catch (error) {
      setError(e.response?.data?.error || e.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-white">
        <div className="w-full max-w-md animate-fade-in">
          <div className="mb-8">
            <h2 className="text-slate-500 text-sm sm:text-base mt-2">
              Sign in
            </h2>
          </div>
          {error && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-xl flex items-start-gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                required
                name="email"
                value={loginInput.email}
                onChange={handleLoginChange}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                required
                name="password"
                value={loginInput.password}
                onChange={handleLoginChange}
                className="pr-11"
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              {/* Forgot Password */}
              <Link
                to="/forgot-password"
                className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-700 text-sm transition-colors"
              >
                Forgot Password
              </Link>

              {/* Register  */}
              <Link
                to="/register"
                className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-700 text-sm  transition-colors"
              >
                Register
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-linear-to-r from-indigo-600 to-indigo-500 text-white rounded-md text-sm font-semibold hover:from-indigo-700 hover:to-indigo-600 disabled:opacity-50  transition-all  duration-200 shadow-lg shadow-indigo-500/25 active:scale-[0.98] flex iems-center justify-center"
            >
              {loading ? '<FontAwesomeIcon icon={faCircleNotch} />' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
