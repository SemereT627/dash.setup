import { Navigate } from "react-router-dom";
import { PATH_DASHBOARD, PATH_GYM } from "../routes/paths";
import { useSelector } from "react-redux";

export default function GuestGuard({ children }) {
  const { token, user } = useSelector((state) => state.auth);

  console.log(user?.firstGymVerified, token);

  if (!user?.firstGymVerified && token) {
    return <Navigate to={PATH_GYM.createGym} />;
  }

  if (token) {
    return <Navigate to={PATH_DASHBOARD.root} />;
  }

  return <>{children}</>;
}
