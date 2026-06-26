import { createBrowserRouter } from 'react-router-dom';

import HomePage from '../pages/HomePage';

import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';

import Layout from '../pages/Layout';

import DashboardPage from '../pages/DashboardPage';
import BoardsPage from '../pages/BoardsPage';
import BoardsDetailPage from '../pages/BoardsDetailPage';
import ProfilePage from '../pages/ProfilePage';

import ErrorPage from '../pages/ErrorPage';

export const router = createBrowserRouter([
  { path: '/home', element: <HomePage /> },

  { path: '/register', element: <RegisterPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/forgot-password', element: <ForgotPassword /> },
  { path: '/reset-password', element: <ResetPassword /> },

  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <DashboardPage /> },
      { path: 'boards', element: <BoardsPage /> },
      { path: 'boards/:id', element: <BoardsDetailPage /> },
      { path: 'profile', element: <ProfilePage /> },
    ],
  },

  { path: '*', element: <ErrorPage /> },
]);
