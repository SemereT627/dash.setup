import { Suspense, lazy } from "react";
import { Navigate, useLocation, useRoutes } from "react-router-dom";

import DashboardLayout from "../layouts/dashboard";

import LoadingScreen from "../components/LoadingScreen";
import GuestGuard from "../guards/GuestGuard";
import AuthGuard from "../guards/AuthGuard";
import FirstGymGuard from "../guards/FirstGymGuard";
import LogoOnlyLayout from "../layouts/LogoOnlyLayout";

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();
  const isDashboard = pathname.includes("/dashboard");

  return (
    <Suspense
      fallback={
        <LoadingScreen
          sx={{
            ...(!isDashboard && {
              top: 0,
              left: 0,
              width: 1,
              zIndex: 9999,
              position: "fixed",
            }),
          }}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    // AUTHENTICATION ROUTES
    {
      path: "auth",
      children: [
        {
          path: "login",
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
        {
          path: "register",
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          ),
        },
        {
          path: "reset-password",
          element: <ResetPassword />,
        },

        {
          path: "verify-email",
          element: <VerifyEmail />,
        },

        {
          path: "verify-phone",
          element: <VerifyPhone />,
        },
      ],
    },

    {
      path: "gym",
      children: [
        {
          path: "create-gym",
          element: (
            <FirstGymGuard>
              <CreateGym />
            </FirstGymGuard>
          ),
        },
      ],
    },

    // DASHBOARD ROUTES
    {
      path: "dashboard",
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        {
          path: "/dashboard",
          element: <Navigate to="/dashboard/app" replace />,
        },
        { path: "app", element: <GeneralApp /> },
        {
          path: "user",
          children: [
            {
              path: "/dashboard/user",
              element: <Navigate to="/dashboard/user/profile" replace />,
            },
            {
              path: "/dashboard/user/profile",
              element: <UserProfile />,
            },
          ],
        },
      ],
    },

    // MAIN ROUTES
    {
      path: "*",
      element: <LogoOnlyLayout />,
      children: [
        {
          path: "404",
          element: <NotFound />,
        },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
    {
      path: "/",
      element: <Navigate to="/dashboard/app" replace />,
    },

    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);
}

// IMPORTING COMPONENTS

// AUTHENTICATION
const Login = Loadable(lazy(() => import("../pages/authentication/Login")));
const Register = Loadable(
  lazy(() => import("../pages/authentication/Register"))
);
const ResetPassword = Loadable(
  lazy(() => import("../pages/authentication/ResetPassword"))
);
const VerifyEmail = Loadable(
  lazy(() => import("../pages/authentication/VerifyEmail"))
);
const VerifyPhone = Loadable(
  lazy(() => import("../pages/authentication/VerifyPhone"))
);
const CreateGym = Loadable(lazy(() => import("../pages/gym/CreateGym")));

// DASHBOARD
const GeneralApp = Loadable(
  lazy(() => import("../pages/dashboard/GeneralApp"))
);

// MAIN
const NotFound = Loadable(lazy(() => import("../pages/Page404")));

const UserProfile = Loadable(
  lazy(() => import("../pages/dashboard/UserProfile"))
);
