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
import { PublicProvider } from "./contexts/publicContext";
import BookingSchedule from './pages/general/bookingSchedule';
import BookingSuccess from './pages/general/bookingSuccess';
import ConsumableDashboard from './pages/manager/consumable/ConsumableDashboard';
import EquipmentDashboard from './pages/manager/equipment/EquipmentDashboard';
import BookingList from './pages/manager/booking/BookingList';
import MatchmakingList from './pages/general/MatchmakingList';
import BookingHistory from './pages/general/BookingHistory';
import MaintenanceSchedule from './pages/manager/maintenance/MaintenanceSchedule';
import VnpayReturn from './pages/general/VnpayReturn';
import MatchmakingHistory from './pages/general/MatchmakingHistory';
import WalletHistory from './pages/general/WalletHistory';
import AnalyticsDashboard from './pages/manager/statistics/AnalyticsDashboard';
import Voucher from './pages/general/voucher';
import Event from './pages/general/Event';
import EventDashboard from './pages/manager/event/EventDashboard';
import About from './pages/general/About';
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
        path: "/yard-detail/:id",
        element: (
          <ProtectedRoute requiredRoles={['GUEST', 'CUSTOMER']}>
            <YardDetail />
          </ProtectedRoute>
        )
      },
      {
        path: "/booking/:typeId",
        element: (
          <ProtectedRoute requiredRoles={['GUEST', 'CUSTOMER']}>
            <BookingSchedule />
          </ProtectedRoute>
        )
      },
      {
        path: "/booking-success/:id",
        element: (
          <ProtectedRoute requiredRoles={['GUEST', 'CUSTOMER']}>
            <BookingSuccess />
          </ProtectedRoute>
        )
      },
      {
        path: "/matchmaking-list",
        element: (
          <ProtectedRoute requiredRoles={['GUEST', 'CUSTOMER']}>
            <MatchmakingList />
          </ProtectedRoute>
        )
      },
      {
        path: "/booking-history",
        element: (
          <ProtectedRoute requiredRoles={['GUEST', 'CUSTOMER']}>
            <BookingHistory />
          </ProtectedRoute>
        )
      },
       {
        path: "/matchmaking-history",
        element: (
          <ProtectedRoute requiredRoles={['GUEST', 'CUSTOMER']}>
            <MatchmakingHistory />
          </ProtectedRoute>
        )
      },
        {
        path: "/wallet-history",
        element: (
          <ProtectedRoute requiredRoles={['GUEST', 'CUSTOMER']}>
            <WalletHistory />
          </ProtectedRoute>
        )
      },
       {
        path: "/vnpay_return_url",
        element: (
          <ProtectedRoute requiredRoles={['GUEST', 'CUSTOMER']}>
            <VnpayReturn />
          </ProtectedRoute>
        )
      },
      {
        path: "/voucher",
        element: (
          <ProtectedRoute requiredRoles={['GUEST', 'CUSTOMER']}>
            <Voucher />
          </ProtectedRoute>
        )
      },
          {
        path: "/event",
        element: (
          <ProtectedRoute requiredRoles={['GUEST', 'CUSTOMER']}>
            <Event />
          </ProtectedRoute>
        )
      },
          {
        path: "/about",
        element: (
          <ProtectedRoute requiredRoles={['GUEST', 'CUSTOMER']}>
            <About />
          </ProtectedRoute>
        )
      },
      {
        path: "manager",
        children: [
          {
            path: "dashboard",
            element: (
              <ProtectedRoute requiredRoles={['MANAGER']}>
                <AnalyticsDashboard />
              </ProtectedRoute>
            ),
          },
          {
            path: "user-list",
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
            path: "equipment-list",
            element: (
              <ProtectedRoute requiredRoles={['MANAGER']}>
                <EquipmentDashboard />
              </ProtectedRoute>
            ),
          },
          {
            path: "consumable-list",
            element: (
              <ProtectedRoute requiredRoles={['MANAGER']}>
                <ConsumableDashboard />
              </ProtectedRoute>
            ),
          },
          {
            path: "booking-list",
            element: (
              <ProtectedRoute requiredRoles={['MANAGER']}>
                <BookingList />
              </ProtectedRoute>
            ),
          },
          {
            path: "maintenance-schedule/:typeId",
            element: (
              <ProtectedRoute requiredRoles={['MANAGER']}>
                <MaintenanceSchedule />
              </ProtectedRoute>
            ),
          },
              {
            path: "event-list",
            element: (
              <ProtectedRoute requiredRoles={['MANAGER']}>
                <EventDashboard />
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
                <UserList />
              </ProtectedRoute>
            ),
          },
          {
            path: "sport-field-list",
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
      <PublicProvider>
        <RouterProvider router={router} />
      </PublicProvider>
    </AuthProvider>
  </StrictMode>
);
