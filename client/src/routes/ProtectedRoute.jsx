import { Navigate } from "react-router";

export default function ProtectedRoute({ 
  children,
  allowed,
  role,
  isAuthenticated
 }) {

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // Redirect to unauthorized if role doesn't have access
  if (!allowed.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  // Render protected content
  return children;
}