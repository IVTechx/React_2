import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../../../store/authStore";

const ProtectedRoute = () => {
  const userProfile = useAuthStore((state) => state.userProfile);

  // If the user is not logged in, send them back to the Home page
  if (!userProfile?.isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
