import { BrowserRouter, Routes, Route } from "react-router";
import routesConfig from "./routesConfig";
import ProtectedRoute from "./ProtectedRoute";
import Sidebar from "../components/Sidebar";
import Home from "../pages/Home";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";

const userRole = "admin"; // come from context/auth state
const isAuthenticated = true; // come from your auth context

export default function AppRouter() {
  const roleRoutes = routesConfig[userRole] || [];

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
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