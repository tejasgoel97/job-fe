import { useRef, useState, useEffect } from "react";
import axiosInstance from "@/utils/api/axiosInstance";
import useAuthStore from "@/utils/authStoreZusland";

const RegisterFormContent = () => {
  const { login } = useAuthStore();
  const formTopRef = useRef(null);

  const [userType, setUserType] = useState("");
  const [step, setStep] = useState("role"); // role | register | verify-otp
  const [otp, setOtp] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    rememberMe: false,
  });

  const handleUserTypeChange = (newType) => {
    setUserType(newType);
    localStorage.setItem("jp-current-role", newType);
    setStep("register");

    // Smooth scroll to top of form
    setTimeout(() => {
      formTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
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
      await axiosInstance.post("/auth/register", {
        ...formData,
        role: userType,
      });
      setStep("verify-otp");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/auth/verify-otp", {
        email: formData.email,
        otp,
      });

      const { token, userId, role, capabilities, email, phoneNumber, firstName, lastName } = res.data;

      login({ email, userId, role, capabilities, token, phoneNumber, firstName, lastName });
      localStorage.setItem("token", token);

      const dashboardMap = {
        candidate: "/candidates-dashboard/dashboard",
        employer: "/employers-dashboard/dashboard",
        contractor: "/contractor-dashboard/dashboard",
      };

      window.location.href = dashboardMap[userType] || "/";
    } catch (error) {
      alert(error.response?.data?.message || "OTP verification failed");
    }
  };

  return (
    <div className="form-inner">
      <div ref={formTopRef} />

      {/* Role Selector always at top */}
      <h3 className="mb-3">Register on Job Portal</h3>
      <div className="btn-group w-100 mb-4" role="group">
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

      {/* Show Register Form */}
      {step === "register" && userType && (
        <form onSubmit={handleRegisterSubmit}>
          <div className="form-group">
            <label>First Name</label>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
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
            <button className="theme-btn btn-style-one" type="submit">Register</button>
          </div>
        </form>
      )}

      {/* Show OTP Step */}
      {step === "verify-otp" && (
        <form onSubmit={handleVerifyOtp}>
          <div className="form-group">
            <div className="d-flex justify-content-between align-items-center">
              <label>Enter OTP</label>
              <button type="button" className="btn btn-secondary p-1 m-1" onClick={() => setStep("register")}>
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
            <button type="submit" className="theme-btn btn-style-one">Verify OTP</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default RegisterFormContent;
