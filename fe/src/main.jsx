import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import RoleBasedLayout from './layouts/roleBasedLayout';

import { AuthProvider } from './contexts/authContext';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import ProtectedRoute from './components/protectedRoute';
import { Home, Unauthorized, InvalidRequest, SignOut, VerificationSuccess } from './pages/general/index'
import UserList from './pages/admin/user/UserList';
import Login from './pages/account/login';
import Register from './pages/account/register';
import Yard from './pages/general/yard';
/**
 * Roles include GUEST, CUSTOMER, ADMIN, MANAGER
 */

const router = createBrowserRouter([
  {
    path: "/",
    element: <RoleBasedLayout />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        )

      },
           {
        path: "/login",
        element: (
          <ProtectedRoute>
            <Login />
          </ProtectedRoute>
        )

      },
            {
        path: "/register",
        element: (
          <ProtectedRoute>
            <Register />
          </ProtectedRoute>
        )

      },
      {
        path: "sign-out",
        element: (
          <ProtectedRoute>
            <SignOut />,
          </ProtectedRoute>
        )
      },
        {
        path: "yard",
        element: (
          <ProtectedRoute>
            <Yard />,
          </ProtectedRoute>
        )
      },
      {
        path: "admin",
        children: [
          {
            path: "user-list",
            element: (
              <ProtectedRoute>
                <UserList />
              </ProtectedRoute>
            ),
          }
        ],
      },
      {
        path: "unauthorized",
        element: (
          <ProtectedRoute>
            <Unauthorized />
          </ProtectedRoute>
        )
      },
      {
        path: "invalid",
        element: (
          <ProtectedRoute>
            <InvalidRequest />
          </ProtectedRoute>
        )
      },
      {
        path: "verification-success",
        element: (
          <ProtectedRoute >
            <VerificationSuccess />
          </ProtectedRoute>
        )
      },
    ],
  },


]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
