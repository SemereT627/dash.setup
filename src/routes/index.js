import { useRoutes } from "react-router-dom";
import { Login } from "../pages/authentication/Login";
import { Register } from "../pages/authentication/Register";

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
      element: <DashboardLayout />,
    },
  ]);
}
