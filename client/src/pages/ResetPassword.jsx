import React from 'react';

import { useState } from 'react';

import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';

function ResetPassword() {
  const [resetPassword, setResetPassword] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  function handlePasswordChange(e) {
    setResetPassword({ ...resetPassword, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-white">
        <div className="w-full max-w-md animate-fade-in">
          <div className="mb-8">
            <h2 className="text-slate-500 text-sm sm:text-base mt-2">
              Reset Password
            </h2>
          </div>
          {error && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-xl flex items-start-gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* <div>
              <label
                htmlFor="currentPassword"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Current Password
              </label>
              <input
                type="password"
                placeholder="Enter Current Password"
                required
                name="currentPassword"
                value={resetPassword.currentPassword}
                onChange={handlePasswordChange}
              />
            </div> */}
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                New Password
              </label>
              <input
                type="password"
                placeholder="Enter New Password"
                required
                name="password"
                value={resetPassword.newPassword}
                onChange={handlePasswordChange}
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
                value={resetPassword.confirmPassword}
                onChange={handlePasswordChange}
                className="pr-11"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-linear-to-r from-indigo-600 to-indigo-500 text-white rounded-md text-sm font-semibold hover:from-indigo-700 hover:to-indigo-600 disabled:opacity-50  transition-all  duration-200 shadow-lg shadow-indigo-500/25 active:scale-[0.98] flex iems-center justify-center"
            >
              {loading
                ? '<FontAwesomeIcon icon={faCircleNotch} />'
                : 'Reset Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
