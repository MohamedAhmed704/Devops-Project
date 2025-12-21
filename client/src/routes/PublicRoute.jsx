import { Navigate, useLocation } from "react-router";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function PublicRoute({ children }) {
  const { isAuthenticated, status, loading } = useAuth();

  if (loading) return null;

  if (status === "pending_verification") {
    if (window.location.pathname !== "/verify-otp") {
      return <Navigate to="/verify-otp" replace />;
    }
    return children; // allow OTP page
  }

  if (isAuthenticated && window.location.pathname !== "/") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
