import { Navigate, useRoutes } from "react-router-dom";

import DashboardLayout from "../layouts/dashboard";
import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";
import GeneralApp from "../pages/dashboard/GeneralApp";
import ResetPassword from "../pages/authentication/ResetPassword";

export default function Router() {
  return useRoutes([
    {
      path: "auth",
      children: [
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "reset-password",
          element: <ResetPassword />,
        },
      ],
    },

    //   Dashboard Routes
    {
      path: "dashboard",
      element: (
        <>
          <DashboardLayout />
        </>
      ),
      children: [
        {
          path: "/dashboard",
          element: <Navigate to="/dashboard/app" replace />,
        },
        { path: "app", element: <GeneralApp /> },
      ],
    },

    // Main Routes
    {
      path: "*",
      element: <>Everything</>,
    },
    {
      path: "/",
      element: <>ABCD</>,
    },
  ]);
}
