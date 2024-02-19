import { createContext, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ username: "", isAuthenticated: false });
  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const login = async (data) => {
    const authUser = { username: data, isAuthenticated: true };
    setUser(authUser);
    navigate("/home");
  };

  // call this function to sign out logged in user
  const logout = () => {
    setUser({ username: "", isAuthenticated: false });
    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};