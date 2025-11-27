import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import routesConfig from "./routesConfig";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute"; 
import Sidebar from "../components/Sidebar";
import Home from "../pages/Home";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";

const userRole = "admin"; // From context/auth
const isAuthenticated = true; // From context/auth

export default function AppRouter() {
  const roleRoutes = routesConfig[userRole] || [];

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes - Redirect to dashboard if already authenticated */}
        <Route path="/" element={
          <PublicRoute isAuthenticated={isAuthenticated}>
            <Home />
          </PublicRoute>
        } />
        <Route path="/login" element={
          <PublicRoute isAuthenticated={isAuthenticated}>
            <Login />
          </PublicRoute>
        } />
        <Route path="/register" element={
          <PublicRoute isAuthenticated={isAuthenticated}>
            <Register />
          </PublicRoute>
        } />
        
        <Route path="/unauthorized" element={<div>Unauthorized Access</div>} />

        {/* Protected Routes */}
        <Route path="/*" element={
          <ProtectedRoute 
            role={userRole} 
            allowed={[userRole]}
            isAuthenticated={isAuthenticated}
          >
            <div className="">
              <Sidebar role={userRole} />
              <div className="">
                <Routes>
                  {roleRoutes.map(route => (
                    <Route
                      key={route.path}
                      path={route.path}
                      element={<route.element />}
                    />
                  ))}
                  <Route path="*" element={<div>Page Not Found</div>} />
                </Routes>
              </div>
            </div>
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}