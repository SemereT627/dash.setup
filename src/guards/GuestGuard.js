import { Navigate } from "react-router-dom";
import { PATH_DASHBOARD } from "../routes/paths";
import { useSelector } from "react-redux";

export default function GuestGuard({ children }) {
  const { token } = useSelector((state) => state.auth);

  if (token) {
    return <Navigate to={PATH_DASHBOARD.root} />;
  }

  return <>{children}</>;
}
