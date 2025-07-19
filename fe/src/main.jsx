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
import SportsVenueDashboard from './pages/manager/sportField/SportsVenueDashboard';
import TypeDashboard from './pages/manager/type/TypeDashboard';
import YardDetail from './pages/general/yardDetail';
import Policy from './pages/general/policy';
import { PublicProvider } from "./contexts/publicContext";
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
        path: "/yard/:id",
        element: (
          <ProtectedRoute requiredRoles={['GUEST', 'CUSTOMER']}>
            <YardDetail />
          </ProtectedRoute>
        )
      },
      {
        path: "/policy",
        element: (
          <ProtectedRoute requiredRoles={['GUEST', 'CUSTOMER']}>
            <Policy />
          </ProtectedRoute>
        )
      },
      {
        path: "manager",
        children: [
          {
            path: "booking-list",
            element: (
              <ProtectedRoute requiredRoles={['MANAGER']}>
                <UserList />
              </ProtectedRoute>
            ),
          },
          {
            path: "type-list",
            element: (
              <ProtectedRoute requiredRoles={['MANAGER']}>
                <TypeDashboard />
              </ProtectedRoute>
            ),
          },
          {
            path: "sport-field-list",
            element: (
              <ProtectedRoute requiredRoles={['MANAGER']}>
                <SportsVenueDashboard />
              </ProtectedRoute>
            ),
          },
          {
            path: "category-policy-list",
            element: (
              <ProtectedRoute requiredRoles={['MANAGER']}>
                <CategoryPolicyList />
              </ProtectedRoute>
            ),
          },
          {
            path: "policy-list",
            element: (
              <ProtectedRoute requiredRoles={['MANAGER']}>
                <PolicyList />
              </ProtectedRoute>
            ),
          },
        ]
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
          },
          {
            path: "type-list",
            element: (
              <ProtectedRoute>
                <TypeDashboard />
              </ProtectedRoute>
            ),
          },
          {
            path: "sport-field-list",
            element: (
              <ProtectedRoute>
                <SportsVenueDashboard />
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
      <PublicProvider>
      <RouterProvider router={router} />
      </PublicProvider>
    </AuthProvider>
  </StrictMode>
);