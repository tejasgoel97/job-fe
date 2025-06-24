import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import useAuthStore from "@/utils/authStoreZusland";
import axiosInstance from "@/utils/api/axiosInstance";

const FormContent = () => {
  const navigate = useNavigate(); // For redirecting after login
  const [userType, setUserType] = useState("candidate");

  // Local state for form inputs
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  // Zustand store actions
  const { login } = useAuthStore();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(
        "/auth/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );
      const { token, userId, role, capabilities, email } = response.data;
      console.log(response.data);
      console.log(token);

      // Store user data and token in Zustand
      login({
        email,
        userId,
        role,
        capabilities,
        token,
      });

      // Optionally save token to localStorage if not using Zustand persist
      if (formData.rememberMe) {
        localStorage.setItem("token", token);
      }
      const currentRole = localStorage.getItem("jp-current-role");
      console.log(role)
      if(currentRole === "candidate"){
         navigate("/candidates-dashboard/dashboard");
      }
      else if (currentRole === "employer") {
        navigate("/employers-dashboard/dashboard"); // Adjust the route as per your app
      }
      else if (currentRole === "contractor") {
        navigate("/contractor-dashboard/dashboard"); // Adjust the route as per your app
      } else {
        navigate("/"); // Adjust the route as per your app
      }
      // Redirect to a dashboard or home page
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Login failed");
    }
  };
  function handleUserTypeChange(newType) {
    setUserType(newType);
    localStorage.setItem("jp-current-role", newType);
  }
  return (
    <div className="form-inner">
      <h3>Login to Superio</h3>
<div className="btn-group w-100 mb-3" role="group">
        <button
          type="button"
          className={`btn ${
            userType === "candidate" ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => handleUserTypeChange("candidate")}
        >
          Candidate
        </button>
        <button
          type="button"
          className={`btn ${
            userType === "employer" ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => handleUserTypeChange("employer")}
        >
          Employer
        </button>
        <button
          type="button"
          className={`btn ${
            userType === "contractor" ? "btn-primary" : "btn-outline-primary"
          }`}
          onClick={() => handleUserTypeChange("contractor")}
        >
          Contractor
        </button>
      </div>
      {/* Login Form */}
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
        {/* Email */}
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
        {/* Password */}

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
            <a href="#" className="pwd">
              Forgot password?
            </a>
          </div>
        </div>
        {/* Remember me & Forgot password */}

        <div className="form-group">
          <button
            className="theme-btn btn-style-one"
            type="submit"
            name="log-in"
            data-dismiss="modal"
            aria-label="Close"
            data-bs-dismiss="modal"
          >
            Log In
          </button>
        </div>
        {/* Login button */}
      </form>
      {/* End form */}

      <div className="bottom-box">
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
      {/* End bottom-box */}
    </div>
  );
};

export default FormContent;
