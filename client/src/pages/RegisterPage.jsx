import React from 'react';

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

function RegisterPage() {
  const [registerInput, setRegisterInput] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  const { register } = useAuth();

  const navigate = useNavigate();

  function handleRegisterChange(e) {
    setRegisterInput({ ...registerInput, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setError('');
    setLoading(true);

    try {
      await register(
        registerInput.firstName,
        registerInput.lastName,
        registerInput.email,
        registerInput.password,
      );

      navigate('/login');
    } catch (e) {
      setError(e.response?.data?.e || e.message || 'Register failed');
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
              Register
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
                htmlFor="firstName"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                First Name
              </label>
              <input
                type="text"
                placeholder="Enter First Name"
                required
                name="firstName"
                value={registerInput.firstName}
                onChange={handleRegisterChange}
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Last Name
              </label>
              <input
                type="text"
                placeholder="Enter Last Name"
                required
                name="lastName"
                value={registerInput.lastName}
                onChange={handleRegisterChange}
              />
            </div>
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
                value={registerInput.email}
                onChange={handleRegisterChange}
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
                value={registerInput.password}
                onChange={handleRegisterChange}
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Enter Confirm Password"
                required
                name="confirmPassword"
                value={registerInput.confirmPassword}
                onChange={handleRegisterChange}
                className="pr-11"
              />
            </div>

            {/* Login  */}
            <Link
              to="/login"
              className="inline-flex  items-center gap-2 text-slate-400 hover:text-slate-700 text-sm transition-colors"
            >
              Login
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-linear-to-r from-indigo-600 to-indigo-500 text-white rounded-md text-sm font-semibold hover:from-indigo-700 hover:to-indigo-600 disabled:opacity-50  transition-all  duration-200 shadow-lg shadow-indigo-500/25 active:scale-[0.98] flex iems-center justify-center"
            >
              {loading
                ? '<FontAwesomeIcon icon={faCircleNotch} />'
                : 'Register'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
