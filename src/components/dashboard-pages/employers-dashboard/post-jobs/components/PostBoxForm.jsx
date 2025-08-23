import useAuthStore from "@/utils/authStoreZusland";
import { useEffect, useState } from "react";
import Select from "react-select";
import ExpertiseSection from "./ExpertiseSection";
import JobAndContractExpertiseSelector from "@/components/dashboard-pages/comman/job-contract-expertise-selector/JobAndContractExpertiseSelector";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SalaryRanges from "./SalaryRanges";
import KeyResponsibilitiesInput from "./KeyResponsibilitiesInput ";
import RequiredSkillsInput from "./RequiredSkills";


const jobTypeOptions = [
  "Full Time",
  "Part Time",
  "Contract",
  "Shift Work",
  "Apprenticeship",
];


const countryOptions = ["USA", "India", "China", "Germany", "Japan"];

const cityOptions = ["Pittsburgh", "Mumbai", "Shanghai", "Dusseldorf", "Tokyo"];

const jobTitleOptions = [
  "CEO",
  "MD",
  "President",
  "Vice President",
  "General Manager",
  "DGM",
  "AGM",
  "Sr. Manager",
  "Deputy Manager",
  "Manager",
  "Assistant Manager",
  "Sr. Engineer",
  "Engineer",
  "Jr. Engineer",
  "Sr. Executive",
  "Executive",
  "Jr. Executive",
  "Other",
];

const PostBoxForm = ({ jobId, mode = "new", initialData = {} }) => {
  const [formData, setFormData] = useState({});
  const [selectedExpertise, setSelectedExpertise] = useState([]);
  const [jobTitle, setJobTitle] = useState("");
  const [customJobTitle, setCustomJobTitle] = useState("");
  const [department, setDepartment] = useState("");
  const [fromSalary, setFromSalary] = useState("");
  const [toSalary, setToSalary] = useState("");
  const [keyResponsibilities, setKeyResponsibilities] = useState([""]);
  const [requiredSkills, setRequiredSkills] = useState([""]);
  const [salaryCurrency, setSalaryCurrency] = useState("");
  const [fromSalaryINR, setFromSalaryINR] = useState("");
  const [toSalaryINR, setToSalaryINR] = useState("");
  const [ageFrom, setAgeFrom] = useState("");
const [ageTo, setAgeTo] = useState("");
const [expFrom, setExpFrom] = useState("");
const [expTo, setExpTo] = useState("");

  const [loading, setLoading] = useState(false);
  const [oneTimeSubmitted, setOneTimeSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const { user } = useAuthStore();
  const navigate = useNavigate();
  useEffect(() => {
    if(!oneTimeSubmitted) return
    validateFields();
  
}, [keyResponsibilities, requiredSkills, fromSalary, toSalary, formData, selectedExpertise, jobTitle, department, salaryCurrency]);
  // Prefill for edit mode
  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData({
        description: initialData.description || "",
        jobType: initialData.jobType || "",
        minExperience: initialData.minExperience || "1",
        // salaryFrom: initialData.salaryFrom || "",
        // salaryTo: initialData.salaryTo || "",
        deadline: initialData.deadline ? initialData.deadline.split("T")[0] : "",
        country: initialData.country || "",
        city: initialData.city || "",
        state: initialData.state || "",
        pinCode: initialData.pinCode || "",
        address: initialData.address || "",
      });
      setJobTitle(initialData.title || "");
      setDepartment(initialData.department || "");
      if (initialData.expertise) {
        const expertiseState = {};
        initialData.expertise.forEach((exp) => {
          expertiseState[exp.category] = {
            isSelected: true,
            subcategories: exp.subcategories || [],
            processes: exp.processes || [],
          };
        });
        setSelectedExpertise(expertiseState);
      }
      setKeyResponsibilities(initialData.keyResponsibilities || [""]);
      setRequiredSkills(initialData.requiredSkills || [""]);
      setSalaryCurrency(initialData.salaryCurrency || "INR");
      setFromSalary(initialData.fromSalary || "");
      setToSalary(initialData.toSalary || "");
      setFromSalaryINR(initialData.fromSalaryINR || "");
      setToSalaryINR(initialData.toSalaryINR || "");
      setAgeFrom(initialData.ageFrom || "");
      setAgeTo(initialData.ageTo || "");
      setExpFrom(initialData.expFrom || "");
      setExpTo(initialData.expTo || "");
      
    }
  }, [mode, initialData]);

  // --- Field Validation ---
  const validateFields = () => {
    const newErrors = {};
    if (!user) {
      newErrors.user = "Please login to post a job";
    }
    if (!jobTitle || (jobTitle === "Other" && !customJobTitle.trim())) {
      newErrors.jobTitle = "Job Title is required";
    }
    if (!department || !department.trim()) {
      newErrors.department = "Department is required";
    }
    if (!formData.jobType) {
      newErrors.jobType = "Job Type is required";
    }
    if (!formData.description || !formData.description.trim()) {
      newErrors.description = "Job Description is required";
    }
    if (!fromSalary || !toSalary) {
      newErrors.salary = "Salary Range is required";
    } else if (+fromSalary > +toSalary) {
      newErrors.salary = "From Salary cannot be greater than To Salary";
    }
    if (
      !Array.isArray(keyResponsibilities) ||
      !keyResponsibilities.filter((kr) => !!kr && kr.trim()).length
    ) {
      newErrors.keyResponsibilities = "At least one key responsibility is required";
    }
    if (
      !Array.isArray(requiredSkills) ||
      !requiredSkills.filter((sk) => !!sk && sk.trim()).length
    ) {
      newErrors.requiredSkills = "At least one skill is required";
    }
    if (!formData.minExperience) {
      newErrors.minExperience = "Experience is required";
    }
    if (!formData.deadline) {
      newErrors.deadline = "Application Deadline is required";
    }
    if (!formData.address || !formData.address.trim()) {
      newErrors.address = "Address is required";
    }
    if (!formData.state || !formData.state.trim()) {
      newErrors.state = "State is required";
    }
    if (!formData.pinCode || !/^\d{4,10}$/.test(formData.pinCode)) {
      newErrors.pinCode = "Valid Pin Code is required";
    }
    if (!formData.country) {
      newErrors.country = "Country is required";
    }
    if (!formData.city) {
      newErrors.city = "City is required";
    }if (!ageFrom || !ageTo) {
  newErrors.age = "Both Age fields are required";
} else if (+ageFrom > +ageTo) {
  newErrors.age = "Age From cannot be greater than Age To";
} else if (+ageFrom < 14 || +ageTo > 100) {
  newErrors.age = "Enter valid ages (14-100)";
}
if (!expFrom || !expTo) {
  newErrors.experienceRange = "Both Experience fields are required";
} else if (+expFrom > +expTo) {
  newErrors.experienceRange = "Experience From cannot be greater than Experience To";
} else if (+expFrom < 0 || +expTo > 50) {
  newErrors.experienceRange = "Enter a valid experience range (0-50)";
}
    if (
      !selectedExpertise ||
      !Object.values(selectedExpertise).some((exp) => exp.isSelected)
    ) {
      newErrors.expertise = "Select at least one expertise area";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --- Submit Handler ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setOneTimeSubmitted(true);
    if (!validateFields()) {
      toast.error("Please fill all required fields correctly.");
      return;
    }
    const finalJobTitle = jobTitle === "Other" ? customJobTitle : jobTitle;
    const finalExpertise = Object.entries(selectedExpertise)
      .filter(([key, value]) => value.isSelected)
      .map(([key, value]) => ({
        category: key,
        subcategories: value.subcategories,
        processes: value.processes,
      }));

 const finalFormData = {
  ...formData,
  title: finalJobTitle,
  department,
  expertise: finalExpertise,
  keyResponsibilities: keyResponsibilities.filter((kr) => !!kr && kr.trim()),
  requiredSkills: requiredSkills.filter((sk) => !!sk && sk.trim()),
  fromSalary,
  toSalary,
  fromSalaryINR,
  toSalaryINR,
  salaryCurrency,
  createdBy: user.id,
  email: user.email,
  ageFrom,
  ageTo,
  expFrom,
  expTo,
};
    console.log("Final Form Data:", finalFormData);
    setLoading(true);
    try {
      const url =
        mode === "edit"
          ? `${import.meta.env.VITE_API_BASE_URL}/api/jobs/update-job/${jobId}`
          : `${import.meta.env.VITE_API_BASE_URL}/api/jobs/create-job`;
      const method = mode === "edit" ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(finalFormData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(
          mode === "edit"
            ? "Job updated successfully!"
            : "Job posted successfully!"
        );
        setFormData({});
        navigate("/employers-dashboard/manage-jobs");
      } else {
        toast.error(result.message || "Failed to submit job");
      }
    } catch (error) {
      console.error("Error submitting job:", error);
      toast.error("An error occurred while submitting the job");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectChange = (name) => (selectedOption) => {
    setFormData({ ...formData, [name]: selectedOption?.value });
  };

  const handleInputChange = (e) => {
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- Error Message Helper ---
  const renderError = (key) =>
    errors[key] && (
      <div style={{ color: "#e63946", fontSize: "0.95em", marginTop: 2 }}>
        {errors[key]}
      </div>
    );

  return (
    <form className="default-form" onSubmit={handleSubmit} noValidate>
      <div className="row">
        <div className="form-group col-lg-6 col-md-12">
          <label>Job Title</label>
          <select
            className="form-select"
            value={jobTitle}
            onChange={(e) => {
              const value = e.target.value;
              setJobTitle(value);
              if (value !== "Other") setCustomJobTitle("");
              if (value === "CEO" || value === "MD" || value === "President")
                setDepartment("All");
              else setDepartment("");
            }}
            required
          >
            <option value="">Select Title</option>
            {jobTitleOptions.map((title) => (
              <option key={title} value={title}>
                {title}
              </option>
            ))}
          </select>
          {renderError("jobTitle")}
        </div>

        {jobTitle === "Other" && (
          <div className="form-group col-lg-6 col-md-12">
            <label>Specify Job Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter custom title"
              value={customJobTitle}
              onChange={(e) => setCustomJobTitle(e.target.value)}
              required
            />
            {renderError("jobTitle")}
          </div>
        )}

        <div className="form-group col-lg-6 col-md-12">
          <label>Department</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Department"
            name="department"
            value={department}
            onChange={(e) => {
              setErrors((prev) => ({ ...prev, department: "" }));
              setDepartment(e.target.value)}}
            required
          />
          {renderError("department")}
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Job Type</label>
          <select
            className="chosen-single form-select"
            name="jobType"
            value={formData.jobType || ""}
            onChange={handleInputChange}
            required
          >
            <option value="">Select</option>
            {jobTypeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {renderError("jobType")}
        </div>

        <div className="form-group col-lg-12 col-md-12">
          <label>Job Description</label>
          <textarea
            name="description"
            placeholder="Enter job description..."
            value={formData.description || ""}
            onChange={handleInputChange}
            required
          />
          {renderError("description")}
        </div>

        <KeyResponsibilitiesInput
          keyResponsibilities={keyResponsibilities}
          setKeyResponsibilities={setKeyResponsibilities}
        />
        {renderError("keyResponsibilities")}

        <RequiredSkillsInput requiredSkills={requiredSkills} setRequiredSkills={setRequiredSkills} />
        {renderError("requiredSkills")}

        {/* Salary Range */}
        <SalaryRanges
          fromSalary={fromSalary}
          toSalary={toSalary}
          salaryCurrency={salaryCurrency}
          setSalaryCurrency={setSalaryCurrency}
          setFromSalary={setFromSalary}
          setToSalary={setToSalary}
          fromSalaryINR={fromSalaryINR}
          toSalaryINR={toSalaryINR}
          setFromSalaryINR={setFromSalaryINR}
          setToSalaryINR={setToSalaryINR}
        />
        {renderError("salary")}

        {/* Experience */}
        {/* <div className="form-group col-lg-6 col-md-12">
          <label>Minimum Experience (Years)</label>
          <select
            className="form-select"
            name="minExperience"
            value={formData.minExperience || ""}
            onChange={handleInputChange}
            required
          >
            <option value="">Select</option>
            {[...Array(36)].map((_, i) => (
              <option key={i} value={i === 10 ? "10+" : i}>
                {i === 10
                  ? "10+ years"
                  : i === 0
                  ? "Fresher"
                  : `${i} year${i !== 1 ? "s" : ""}`}
              </option>
            ))}
          </select>
          {renderError("minExperience")}
        </div> */}
{/* Age From / To Dropdowns */}
<div className="form-group col-lg-3 col-md-6">
  <label>Age From</label>
  <select
    className="form-select"
    value={ageFrom}
    onChange={e => {
      if (+e.target.value > +ageTo && ageTo) {
        toast.error("Age From cannot be greater than Age To");
        return;
      }
      setAgeFrom(e.target.value);
      setErrors(prev => ({ ...prev, age: "" }));
    }}
    // required
  >
    <option value="">From</option>
    {Array.from({ length: 87 }, (_, i) => 14 + i).map(age => (
      <option key={age} value={age}>{age}</option>
    ))}
  </select>
</div>
<div className="form-group col-lg-3 col-md-6">
  <label>Age To</label>
  <select
    className="form-select"
    value={ageTo}
    onChange={e => {
      if (+e.target.value < +ageFrom && ageFrom) {
        toast.error("Age To cannot be less than Age From");
        return;
      }
      setAgeTo(e.target.value);
      setErrors(prev => ({ ...prev, age: "" }));
    }}
    // required
  >
    <option value="">To</option>
    {Array.from({ length: 87 }, (_, i) => 14 + i).map(age => (
      <option key={age} value={age}>{age}</option>
    ))}
  </select>
</div>
{renderError("age")}

{/* Experience From / To Dropdowns */}
<div className="form-group col-lg-3 col-md-6">
  <label>Experience From (years)</label>
  <select
    className="form-select"
    value={expFrom}
    onChange={e => {
            if(+e.target.value > +expTo && expTo) {
        toast.error("Experience To cannot be less than Experience From");
        return
      }
      setExpFrom(e.target.value);
      setErrors(prev => ({ ...prev, experienceRange: "" }));
    }}
    required
  >
    <option value="">From</option>
    {Array.from({ length: 51 }, (_, i) => i).map(exp => (
      <option key={exp} value={exp}>{exp}</option>
    ))}
  </select>
</div>
<div className="form-group col-lg-3 col-md-6">
  <label>Experience To (years)</label>
  <select
    className="form-select"
    value={expTo}
    onChange={e => {
      if(+e.target.value < +expFrom) {
        toast.error("Experience To cannot be less than Experience From");
        return
      }
      setExpTo(e.target.value);
      setErrors(prev => ({ ...prev, experienceRange: "" }));
    }}
    required
  >
    <option value="">To</option>
    {Array.from({ length: 51 }, (_, i) => i).map(exp => (
      <option key={exp} value={exp}>{exp}</option>
    ))}
  </select>
</div>
{renderError("experienceRange")}

        {/* Deadline */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Application Deadline Date</label>
          <input
            type="date"
            className="form-control"
            name="deadline"
            value={formData.deadline || ""}
            onChange={handleInputChange}
            required
          />
          {renderError("deadline")}
        </div>

        {/* Address */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Address Line</label>
          <input
            type="text"
            className="form-control"
            name="address"
            placeholder="Enter foundry address"
            value={formData.address || ""}
            onChange={handleInputChange}
            required
          />
          {renderError("address")}
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>State</label>
          <input
            type="text"
            className="form-control"
            name="state"
            placeholder="Enter State"
            value={formData.state || ""}
            onChange={handleInputChange}
            required
          />
          {renderError("state")}
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Pin Code</label>
          <input
            type="text"
            className="form-control"
            name="pinCode"
            placeholder="Enter Pin Code"
            value={formData.pinCode || ""}
            onChange={handleInputChange}
            required
          />
          {renderError("pinCode")}
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Country</label>
          <select
            className="chosen-single form-select"
            name="country"
            value={formData.country || ""}
            onChange={handleInputChange}
            required
          >
            <option value="">Select</option>
            {countryOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {renderError("country")}
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>City</label>
          <select
            className="chosen-single form-select"
            name="city"
            value={formData.city || ""}
            onChange={handleInputChange}
            required
          >
            <option value="">Select</option>
            {cityOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {renderError("city")}
        </div>

        <div className="form-group col-lg-12 col-md-12">
          <label>
            <strong>Expertise Selection</strong>
          </label>
          <JobAndContractExpertiseSelector
            initialExpertise={initialData.expertise}
            setSelectedExpertise={setSelectedExpertise}
            selectedExpertise={selectedExpertise}
          />
          {renderError("expertise")}
        </div>

        <div className="form-group col-lg-12 col-md-12 text-right">
          <button
            type="submit"
            className="theme-btn btn-style-one"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Job"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default PostBoxForm;