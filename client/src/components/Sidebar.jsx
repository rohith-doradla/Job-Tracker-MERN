import React from 'react';

import { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext.jsx';

import { dummyProfileData } from '../data.js';

import api from '../api/axios.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBorderAll,
  faBriefcase,
  faUser,
} from '@fortawesome/free-solid-svg-icons';

function Sidebar() {
  const { pathname } = useLocation();
  const [userName, setUsername] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { loading, logout } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    setUsername(dummyProfileData.firstName + ' ' + dummyProfileData.lastName);
    // api.get('/profile').then((data) => {
    //   if (data.fistName)
    //     setUsername(`${data.firstName} ${data.lastName}`.trim());
    // });
  }, []);

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  const navItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: faBorderAll,
    },
    {
      name: 'My Boards',
      href: '/boards',
      icon: faBriefcase,
    },
    {
      name: 'Profile',
      href: '/profile',
      icon: faUser,
    },
  ];

  function handleLogout() {
    logout();
    // window.location.href = '/login';
    navigate('/login', { replace: true });
  }

  const sidebarContent = (
    <>
      {/* Header  */}
      <div className="px-5 pt-6 pb-5 border-b border-white/6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* UserIcon */}
            <div>
              <p className="font-semibold text-[13px] text-white tracking-wide">
                Job Tracker
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* User Profile */}
      {userName && (
        <div className="mx-3 mt-4 mb-1 p-3 rounded-lg bg-white/3 border border-white/4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center ring-1 ring-white/10 shrink-0">
              <span className="text-slate-400 text xs font-semibold">
                {userName.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-medium text-slate-200 truncate">
                {userName}
              </p>
            </div>
          </div>
        </div>
      )}
      {/* Navigation */}
      <div className="px-5 pt-5 pb-2">
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">
          Navigation
        </p>
      </div>

      <div className="flex-1 px-3 space-y-0.5 overflow-y-auto">
        {loading ? (
          <div className="px-3 py-3 flex items-center gap-2 text-slate-500">
            //Spinner
            <span className="text-sm">Loading...</span>
          </div>
        ) : (
          navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`group flex items-center gap-3 px-3 py-2.5 rounded md text-[13px] font-medium transition all duration 150 relative ${isActive ? 'bg-indigo-500/12 text' : 'text-slate-300 hover:text-white hover:bg-white/4'}`}
              >
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-indigo-500" />
                )}
                {/* <item.icon
                className={`w-[17px] h-[17px] shrink-0 ${isActive ? 'text-indigo-300' : 'text-slate-400 group-hover:text-slate-300'}`}
              /> */}

                <FontAwesomeIcon
                  icon={item.icon}
                  className={`w-4 h-4 shrink-0 ${
                    isActive
                      ? 'text-indigo-300'
                      : 'text-slate-400 group-hover:text-slate-300'
                  }`}
                />

                <span className="flex-1">{item.name}</span>
              </Link>
            );
          })
        )}
      </div>

      {/* Logout */}
      <div className="p-3 border-t border-white/6">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-md text-[13px] font-medium text-slate-400 hover:text-rose-400 hover:bg-rose-500/8 transition-all duration-150"
        >
          {/* LogOut Icon */}
          <span>Logout</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Sidebar */}
      {/* <button
        onClick={() => {
          setSidebarOpen(true);
        }}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-slate-900 text-white rounded-lg shadow-lg border border-white 10"
      >
        Menu 
      </button> */}

      {/* Overlay */}
      {/* {sidebarOpen && (
        <div
          onClick={() => {
            setSidebarOpen(false);
          }}
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        />
      )} */}

      {/* Sidebar Content */}
      <aside className="hidden lg:flex flex-col h-full w-[260px] bg-linear-to-b from-slate-900 via-slate-900 to-slate-950 text-white shrink-0 border-r border-white/4">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar */}
    </>
  );
}

export default Sidebar;
