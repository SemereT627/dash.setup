import { Suspense } from "react";
import { useLocation, useRoutes } from "react-router-dom";
import { Login } from "../pages/authentication/Login";
import { Register } from "../pages/authentication/Register";
import LoadingScreen from "../components/LoadingScreen";

import DashboardLayout from "../layouts/dashboard";

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
