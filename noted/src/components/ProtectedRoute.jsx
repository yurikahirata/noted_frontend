import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    console.log("NOT AUTHENTICATED!")
    // user is not authenticated
    return <Navigate to="/" />;
  }
  console.log("AUTHENTICATED!");
  return children;
};

export default ProtectedRoute;