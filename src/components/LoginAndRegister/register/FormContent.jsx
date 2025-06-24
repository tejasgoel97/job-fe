import { useState } from "react";
import axiosInstance from "@/utils/api/axiosInstance";
import useAuthStore from "@/utils/authStoreZusland";
import { useNavigate } from "react-router-dom";

const RegisterFormContent = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const [userType, setUserType] = useState("candidate");
  const [step, setStep] = useState("register"); // "register" | "verify-otp"
  const [otp, setOtp] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    rememberMe: false,
  });

  // Reset to registration step on role change
  const handleUserTypeChange = (newType) => {
    setUserType(newType);
    localStorage.setItem("jp-current-role", newType);
    setStep("register"); // Reset flow to register
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/auth/register", {
        ...formData,
        role: userType,
      });
      console.log("Registration success:", response.data);
      setStep("verify-otp");
    } catch (error) {
      console.error("Registration error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/auth/verify-otp", {
        email: formData.email,
        otp,
      });

      const { token, userId, role, capabilities, email } = response.data;
      login({ email, userId, role, capabilities, token });

      if (formData.rememberMe) {
        localStorage.setItem("token", token);
      }

      // Navigate based on role
      if (role === "candidate") navigate("/candidates-dashboard/dashboard");
      else if (role === "employer") navigate("/employers-dashboard/dashboard");
      else if (role === "contractor") navigate("/contractor-dashboard/dashboard");
      else navigate("/");

    } catch (error) {
      console.error("OTP verification failed:", error.response?.data || error.message);
      alert(error.response?.data?.message || "OTP verification failed");
    }
  };

  return (
    <div className="form-inner">
      <h3>Register on Superio</h3>

      <div className="btn-group w-100 mb-3" role="group">
        {["candidate", "employer", "contractor"].map((type) => (
          <button
            key={type}
            type="button"
            className={`btn ${userType === type ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => handleUserTypeChange(type)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {step === "register" ? (
        <form method="post" onSubmit={handleRegisterSubmit}>
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
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
          </div>

          <div className="form-group">
            <button className="theme-btn btn-style-one" type="submit">
              Register
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleVerifyOtp}>
          <div className="form-group">
            <div className="d-flex justify-content-between align-items-center">
                  <label>Enter OTP</label>
            <button
              type="button"
              className="btn btn-secondary p-1   m-1"
              onClick={() => setStep("register")}
            >
              Edit Details
            </button>
            </div>
          
            <input
              type="text"
              name="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter the OTP sent to your phone"
              required
            />
          </div>
          <div className="form-group d-flex justify-content-between">
           
            <button type="submit" className="theme-btn btn-style-one">
              Verify OTP
            </button>
          </div>
        </form>
      )}
{/* 
      <div className="bottom-box">
        <div className="text">
          Already have an account?{" "}
          <a
            href="#"
            className="call-modal login"
            data-bs-toggle="modal"
            data-bs-target="#loginModal"
          >
            Login
          </a>
        </div>
      </div> */}
    </div>
  );
};

export default RegisterFormContent;
