import { useRef, useState, useEffect } from "react";
import axiosInstance from "@/utils/api/axiosInstance";
import useAuthStore from "@/utils/authStoreZusland";
import Select from "react-select";

// Put this near the top of the file
const COUNTRIES = [
  { code: "IN", name: "India", dial: "+91" },
  { code: "US", name: "United States", dial: "+1" },
  { code: "CA", name: "Canada", dial: "+1" },
  { code: "GB", name: "United Kingdom", dial: "+44" },
  { code: "AU", name: "Australia", dial: "+61" },
  { code: "NZ", name: "New Zealand", dial: "+64" },
  { code: "SG", name: "Singapore", dial: "+65" },
  { code: "MY", name: "Malaysia", dial: "+60" },
  { code: "TH", name: "Thailand", dial: "+66" },
  { code: "ID", name: "Indonesia", dial: "+62" },
  { code: "PH", name: "Philippines", dial: "+63" },
  { code: "VN", name: "Vietnam", dial: "+84" },
  { code: "AE", name: "United Arab Emirates", dial: "+971" },
  { code: "QA", name: "Qatar", dial: "+974" },
  { code: "KW", name: "Kuwait", dial: "+965" },
  { code: "OM", name: "Oman", dial: "+968" },
  { code: "BH", name: "Bahrain", dial: "+973" },
  { code: "SA", name: "Saudi Arabia", dial: "+966" },
  { code: "TR", name: "Turkey", dial: "+90" },
  { code: "IL", name: "Israel", dial: "+972" },
  { code: "EG", name: "Egypt", dial: "+20" },
  { code: "ZA", name: "South Africa", dial: "+27" },
  { code: "KE", name: "Kenya", dial: "+254" },
  { code: "NG", name: "Nigeria", dial: "+234" },
  { code: "DE", name: "Germany", dial: "+49" },
  { code: "FR", name: "France", dial: "+33" },
  { code: "ES", name: "Spain", dial: "+34" },
  { code: "IT", name: "Italy", dial: "+39" },
  { code: "NL", name: "Netherlands", dial: "+31" },
  { code: "BE", name: "Belgium", dial: "+32" },
  { code: "SE", name: "Sweden", dial: "+46" },
  { code: "NO", name: "Norway", dial: "+47" },
  { code: "DK", name: "Denmark", dial: "+45" },
  { code: "FI", name: "Finland", dial: "+358" },
  { code: "IE", name: "Ireland", dial: "+353" },
  { code: "CH", name: "Switzerland", dial: "+41" },
  { code: "AT", name: "Austria", dial: "+43" },
  { code: "PT", name: "Portugal", dial: "+351" },
  { code: "GR", name: "Greece", dial: "+30" },
  { code: "PL", name: "Poland", dial: "+48" },
  { code: "CZ", name: "Czechia", dial: "+420" },
  { code: "HU", name: "Hungary", dial: "+36" },
  { code: "RO", name: "Romania", dial: "+40" },
  { code: "RU", name: "Russia", dial: "+7" },
  { code: "UA", name: "Ukraine", dial: "+380" },
  { code: "CN", name: "China", dial: "+86" },
  { code: "HK", name: "Hong Kong", dial: "+852" },
  { code: "TW", name: "Taiwan", dial: "+886" },
  { code: "JP", name: "Japan", dial: "+81" },
  { code: "KR", name: "South Korea", dial: "+82" },
  { code: "MX", name: "Mexico", dial: "+52" },
  { code: "BR", name: "Brazil", dial: "+55" },
  { code: "AR", name: "Argentina", dial: "+54" },
  { code: "CL", name: "Chile", dial: "+56" },
  { code: "CO", name: "Colombia", dial: "+57" },
  { code: "PE", name: "Peru", dial: "+51" },
  { code: "BD", name: "Bangladesh", dial: "+880" },
  { code: "PK", name: "Pakistan", dial: "+92" },
  { code: "LK", name: "Sri Lanka", dial: "+94" },
  { code: "NP", name: "Nepal", dial: "+977" },
];

const flagFromCode = (cc) =>
  cc
    .toUpperCase()
    .replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt(0)));

  const defaultCountry = COUNTRIES.find((c) => c.code === "IN") || COUNTRIES[0];

const RegisterFormContent = () => {
  const { login } = useAuthStore();
  const formTopRef = useRef(null);

  const [userType, setUserType] = useState("");
  const [step, setStep] = useState("role"); // role | register | verify-otp
  const [otp, setOtp] = useState("");

  const [country, setCountry] = useState(defaultCountry);
  const [nationalNumber, setNationalNumber] = useState(""); // digits only

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "", // will store full intl number like +91xxxxxxxxxx
    password: "",
    rememberMe: false,
  });

  const countryOptions = COUNTRIES.map((c) => ({
    value: c.code,
    label: `${flagFromCode(c.code)}  ${c.name} (${c.dial})`,
    data: c,
  }));

  useEffect(() => {
    // keep formData.phoneNumber in sync with country dial + nationalNumber
    setFormData((prev) => ({
      ...prev,
      phoneNumber: `${country.dial}${nationalNumber}`,
    }));
  }, [country, nationalNumber]);

  const handleUserTypeChange = (newType) => {
    setUserType(newType);
    localStorage.setItem("jp-current-role", newType);
    setStep("register");
    setTimeout(() => {
      formTopRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
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
      // send phone in E.164 style via formData.phoneNumber
      await axiosInstance.post("/auth/register", {
        ...formData,
        role: userType,
        phoneCountry: country.code, // optional: useful for server logs
        phoneDialCode: country.dial, // optional
        phoneNational: nationalNumber, // optional
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

      const {
        token,
        userId,
        role,
        capabilities,
        email,
        phoneNumber,
        firstName,
        lastName,
      } = res.data;

      login({
        email,
        userId,
        role,
        capabilities,
        token,
        phoneNumber,
        firstName,
        lastName,
      });
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
            className={`btn ${
              userType === type ? "btn-primary" : "btn-outline-primary"
            }`}
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
                        <small className="form-text text-muted">
              We’ll send the OTP to email for verification.
            </small>
          </div>

          {/* Country + Phone */}
          <div className="form-group">
            <label>Country</label>
            <Select
              classNamePrefix="rs"
              options={countryOptions}
              defaultValue={countryOptions.find(
                (o) => o.value === defaultCountry.code
              )}
              value={countryOptions.find((o) => o.value === country.code)}
              onChange={(opt) => setCountry(opt.data)}
              placeholder="Start typing a country or code…"
              isSearchable
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">{country.dial}</span>
              </div>
              <input
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                className="form-control"
                placeholder="Enter phone number"
                value={nationalNumber}
                onChange={(e) => {
                  const onlyDigits = e.target.value.replace(/\D/g, "");
                  setNationalNumber(onlyDigits);
                }}
                required
              />
            </div>

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
      )}

      {/* Show OTP Step */}
      {step === "verify-otp" && (
        <form onSubmit={handleVerifyOtp}>
          <div className="form-group">
            <div className="d-flex justify-content-between align-items-center">
              <label>Enter OTP</label>
              <button
                type="button"
                className="btn btn-secondary p-1 m-1"
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
    </div>
  );
};

export default RegisterFormContent;
