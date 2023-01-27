import { useRoutes } from "react-router-dom";
import { Login } from "../pages/authentication/Login";
import { Register } from "../pages/authentication/Register";

import DashboardLayout from "../layouts/dashboard";

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
    },
  ]);
}
