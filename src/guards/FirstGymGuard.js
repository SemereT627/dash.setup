import { Navigate } from "react-router-dom";
import { PATH_DASHBOARD } from "../routes/paths";
import { useSelector } from "react-redux";

export default function FirstGymGuard({ children }) {
  const { token, user } = useSelector((state) => state.auth);

  console.log(user);

  if (user?.firstGymVerified && token) {
    return <Navigate to={PATH_DASHBOARD.root} />;
  }

  //   if (token) {
  //     return <Navigate to={PATH_DASHBOARD.root} />;
  //   }

  return <>{children}</>;
}
