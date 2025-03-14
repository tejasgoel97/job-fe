import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import LoginWithSocial from "./LoginWithSocial";
import useAuthStore from "@/utils/authStoreZusland";

const FormContent = () => {
  const navigate = useNavigate(); // For redirecting after login

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
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        {
          email: formData.email,
          password: formData.password,
        }
      );
      const { token } = response.data;
      console.log(token);

      // Store user data and token in Zustand
      login({
        email: formData.email,
        name: formData.name,
        phoneNumber: formData.phoneNumber,
        token,
      });

      // Optionally save token to localStorage if not using Zustand persist
      if (formData.rememberMe) {
        localStorage.setItem("token", token);
      }

      // Redirect to a dashboard or home page
      navigate("/dashboard"); // Adjust the route as per your app
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="form-inner">
      <h3>Login to Superio</h3>

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

        <div className="divider">
          <span>or</span>
        </div>

        <LoginWithSocial />
      </div>
      {/* End bottom-box */}
    </div>
  );
};

export default FormContent;
