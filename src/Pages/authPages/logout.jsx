import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useAuthStore from "@/utils/authStoreZusland";

const Logout = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = () => {
      // Call the logout function from your Zustand store
      logout();

      // Show a success toast notification with custom blue styling
      toast.success("You have been logged out successfully.", {
        style: {
          border: "1px solid #1967d2", // A nice blue color from your theme
          padding: "16px",
          color: "#1967d2",
          background: "#e8f0fe", // A light blue background
        },
        iconTheme: {
          primary: "#1967d2",
          secondary: "#FFFFFF",
        },
      });

      // Redirect the user to the homepage
      navigate("/");
    };

    performLogout();
    // The dependency array ensures this effect runs only once on mount.
  }, [logout, navigate]);

  // This component can render a loading state while the logout process happens.
  return <div className="mt-10">Logging out...</div>;
};

export default Logout;

