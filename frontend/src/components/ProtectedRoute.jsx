import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const token = Cookies.get("auth_token");

  if (!token) {
    return <Navigate to={"/"} replace />;
  }

  return children;
};
