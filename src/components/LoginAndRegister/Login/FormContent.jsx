import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import useAuthStore from "@/utils/authStoreZusland";
import axiosInstance from "@/utils/api/axiosInstance";

const FormContent = () => {
  const { login } = useAuthStore();
  const formTopRef = useRef(null);
  const [userType, setUserType] = useState(""); // initially none
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  useEffect(() => {
    const storedRole = localStorage.getItem("jp-current-role");
    if (storedRole) {
      setUserType("");
    }
  }, []);

  const handleRoleSelect = (role) => {
    setUserType(role);
    localStorage.setItem("jp-current-role", role);

    // Scroll to form top
    if (formTopRef.current) {
      setTimeout(() => {
        formTopRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100); // slight delay to ensure DOM update
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post("/auth/login", {
        email: formData.email,
        password: formData.password,
        role: userType,
      });

      const { email, userId, role, capabilities, token, phoneNumber, firstName, lastName } = res.data;

      login({ email, userId, role, capabilities, token, phoneNumber, firstName, lastName });

      if (formData.rememberMe) {
        localStorage.setItem("token", token);
      }

      const dashboardMap = {
        candidate: "/candidates-dashboard/dashboard",
        employer: "/employers-dashboard/dashboard",
        contractor: "/contractor-dashboard/dashboard",
      };

      window.location.href = dashboardMap[userType] || "/";
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-inner">
      {/* Role Selector Always Visible */}
      <div className="text-center mb-4" ref={formTopRef}>
        <h4 className="mb-3">Choose your role to continue</h4>
        <div className="btn-group w-100 mb-4 p-3" role="group">
          {["candidate", "employer", "contractor"].map((role) => (
            <button
              key={role}
              className={`btn ${userType === role ? "btn-primary" : "btn-outline-primary"} p-3`}
              onClick={() => handleRoleSelect(role)}
            >
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Show login form after role selection */}
      {userType && (
        <>
          <h3 className="mb-4">Login as {userType.charAt(0).toUpperCase() + userType.slice(1)}</h3>

          <form method="post" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <div className="field-outer">
                <div className="input-group checkboxes square">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    id="remember"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                  />
                  <label htmlFor="remember" className="remember">
                    <span className="custom-checkbox"></span> Remember me
                  </label>
                </div>
                <a href="#" className="pwd">Forgot password?</a>
              </div>
            </div>

            <div className="form-group">
              <button
                className="theme-btn btn-style-one"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" />
                    Logging in...
                  </>
                ) : (
                  "Log In"
                )}
              </button>
            </div>
          </form>

          <div className="bottom-box text-center">
            <div className="text">
              Don't have an account?{" "}
              <Link
                to="#"
                className="call-modal signup"
                data-bs-toggle="modal"
                data-bs-target="#registerModal"
              >
                Signup
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FormContent;
