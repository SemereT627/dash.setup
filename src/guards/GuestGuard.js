import { Navigate } from "react-router-dom";
import { PATH_DASHBOARD, PATH_GYM } from "../routes/paths";
import { useSelector } from "react-redux";

export default function GuestGuard({ children }) {
  const { token, firstGymVerified } = useSelector((state) => state.auth);

  if (!firstGymVerified && token) {
    return <Navigate to={PATH_GYM.createGym} />;
  }

  if (token) {
    return <Navigate to={PATH_DASHBOARD.root} />;
  }

  return <>{children}</>;
}
