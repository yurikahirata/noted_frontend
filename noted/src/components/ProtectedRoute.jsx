import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (user["isAuthenticated"] === false) {
    // user is not authenticated
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;