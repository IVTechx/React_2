import { Navigate } from "react-router-dom";
import { useUserContext } from "../context/user-context";

interface ProtectedRouteProps {
  children: React.JSX.Element;
}

const ProtectedRoute = ({ children }: { children: ProtectedRouteProps }) => {
  const { isLoggedIn } = useUserContext();

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
