import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuthStore from "@/utils/authStoreZusland";

const ProtectedRoute = ({ allowedRoles }) => {
  const { user } = useAuthStore();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  console.log("In Protected Routes")
  console.log(user)
  // Check if user's roles intersect with allowedRoles
  if (allowedRoles && !user.role?.some((r) => allowedRoles.includes(r))) {
    // User is logged in but does not have any of the required roles
    const primaryRole = user.role?.[0]; // fallback to first role or handle better based on priority

    switch (primaryRole) {
      case "employer":
        return <Navigate to="/employers-dashboard/dashboard" replace />;
      case "candidate":
        return <Navigate to="/candidates-dashboard/dashboard" replace />;
      case "contractor":
        return <Navigate to="/contractor-dashboard/dashboard" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;
