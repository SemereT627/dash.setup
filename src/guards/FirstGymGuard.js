import { Navigate } from "react-router-dom";
import { PATH_AUTH, PATH_DASHBOARD } from "../routes/paths";
import { useSelector } from "react-redux";

export default function FirstGymGuard({ children }) {
  const { token, firstGymVerified } = useSelector((state) => state.auth);

  if (firstGymVerified && token) {
    return <Navigate to={PATH_DASHBOARD.root} />;
  }

  if (!token) {
    return <Navigate to={PATH_AUTH.login} />;
  }

  //   if (token) {
  //     return <Navigate to={PATH_DASHBOARD.root} />;
  //   }

  return <>{children}</>;
}
