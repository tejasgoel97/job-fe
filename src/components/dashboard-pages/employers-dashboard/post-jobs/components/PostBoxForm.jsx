import useAuthStore from "@/utils/authStoreZusland";
import { useEffect, useState } from "react";
import Select from "react-select";
import ExpertiseSection from "./ExpertiseSection";
import JobAndContractExpertiseSelector from "@/components/dashboard-pages/comman/job-contract-expertise-selector/JobAndContractExpertiseSelector";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SalaryRanges from "./SalaryRanges";
import KeyResponsibilitiesInput from "./KeyResponsibilitiesInput ";

const salaryRangesOptions = [
  { value: "30000-40000", label: "$30,000 - $40,000" },
  { value: "40000-50000", label: "$40,000 - $50,000" },
  { value: "50000-70000", label: "$50,000 - $70,000" },
  { value: "70000-90000", label: "$70,000 - $90,000" },
  { value: "90000+", label: "$90,000+" },
];

const qualificationOptions = [
  { value: "diploma", label: "Diploma in Foundry Technology" },
  { value: "btech_metallurgy", label: "B.Tech in Metallurgy" },
  { value: "cert_casting", label: "Certification in Casting Technology" },
  { value: "bs_mech_eng", label: "BS in Mechanical Engineering" },
  { value: "ms_materials", label: "MS in Materials Science" },
];

const jobTypeOptions = [
  "Full Time",
  "Part Time",
  "Contract",
  "Shift Work",
  "Apprenticeship",
];

const experienceOptions = ["0-2 Years", "2-5 Years", "5-10 Years", "10+ Years"];

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
  const [salaryCurrency, setSalaryCurrency] = useState("");
  const [fromSalaryINR, setFromSalaryINR] = useState("");
  const [toSalaryINR, setToSalaryINR] = useState("");

  const [loading, setLoading] = useState(false);
  const { user } = useAuthStore();
  const navigate = useNavigate();

  // Foundry-specific dropdown options
  useEffect(() => {
    if (mode === "edit" && initialData) {
      setFormData({
        description: initialData.description || "",
        jobType: initialData.jobType || "",
        // qualification: initialData.qualification || "",
        minExperience: initialData.minExperience || "",
        salaryFrom: initialData.salaryFrom || "",
        salaryTo: initialData.salaryTo || "",
        deadline: initialData.deadline
          ? initialData.deadline.split("T")[0]
          : "", // remove time part
        country: initialData.country || "",
        city: initialData.city || "",
        state: initialData.state || "",
        pinCode: initialData.pinCode || "",
        address: initialData.address || "",
      });
      setJobTitle(initialData.title || "");
      setDepartment(initialData.department || "");
      // If you also want to prefill expertise
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
    }
  }, [mode, initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please login to post a job");
      return;
    }

    if (!formData.description) {
      alert("Job Description is required");
      return;
    }

    if (!formData.salaryFrom || !formData.salaryTo) {
      alert("Salary Range is required");
      return;
    }
    const finalJobTitle = jobTitle === "Other" ? customJobTitle : jobTitle;
    const finalExpertise = Object.entries(selectedExpertise)
      .filter(([key, value]) => value.isSelected) // Only selected categories
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
      createdBy: user.id, // Add userId from Zustand store
      email: user.email,
      // your existing form data...
    };

    console.log(finalFormData);

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
        alert(result.message || "Failed to submit job");
      }
    } catch (error) {
      console.error("Error submitting job:", error);
      alert("An error occurred while submitting the job");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectChange = (name) => (selectedOption) => {
    setFormData({ ...formData, [name]: selectedOption?.value });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <form className="default-form" onSubmit={handleSubmit}>
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
        </div>

        {jobTitle === "Other" && (
          <div className="form-group col-lg-6 col-md-12 mt-2">
            <label>Specify Job Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter custom title"
              value={customJobTitle}
              onChange={(e) => setCustomJobTitle(e.target.value)}
              required
            />
          </div>
        )}

        <div className="form-group col-lg-6 col-md-12 mt-3">
          <label>Department</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          />
        </div>

        <div className="form-group col-lg-12 col-md-12">
          <label>Job Description</label>
          <textarea
            name="description"
            placeholder="Enter job description..."
            value={formData.description || ""}
            onChange={handleInputChange}
          />
        </div>
        <KeyResponsibilitiesInput
          keyResponsibilities={keyResponsibilities}
          setKeyResponsibilities={setKeyResponsibilities}
        />
        <div className="form-group col-lg-6 col-md-12">
          <label>Job Type</label>
          <select
            className="chosen-single form-select"
            name="jobType"
            onChange={handleInputChange}
          >
            <option value="">Select</option>
            {jobTypeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* <div className="form-group col-lg-6 col-md-12">
          <label>Qualification</label>
          <Select
            name="qualification"
            options={qualificationOptions}
            className="basic-select"
            classNamePrefix="select"
            value={qualificationOptions.find(
              (option) => option.value === formData.qualification
            )}
            onChange={handleSelectChange("qualification")}
          />
        </div> */}

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
        {/* <div className="form-group col-lg-6 col-md-12">
          <label>Salary Range (Monthly)</label>
          <div className="row">
            <div className="col-6">
              <select
                className="form-select"
                value={formData.salaryFrom || ""}
                onChange={(e) =>
                  setFormData({ ...formData, salaryFrom: e.target.value })
                }
              >
                <option value="">From</option>
                {[...Array(100)].map((_, i) => {
                  const value = (i + 1) * 1000;
                  return (
                    <option key={value} value={value}>
                      ₹{value.toLocaleString()}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="col-6">
              <select
                className="form-select"
                value={formData.salaryTo || ""}
                onChange={(e) =>
                  setFormData({ ...formData, salaryTo: e.target.value })
                }
              >
                <option value="">To</option>
                {[...Array(100)].map((_, i) => {
                  const value = (i + 1) * 1000;
                  return (
                    <option key={value} value={value}>
                      ₹{value.toLocaleString()}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div> */}

        {/* Experience */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Minimum Experience (Years)</label>
          <select
            className="form-select"
            name="minExperience"
            value={formData.minExperience || ""}
            onChange={handleInputChange}
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
        </div>

        {/* Deadline */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Application Deadline Date</label>
          <input
            type="date"
            className="form-control"
            name="deadline"
            value={formData.deadline || ""}
            onChange={handleInputChange}
          />
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
          />
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
          />
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
          />
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Country</label>
          <select
            className="chosen-single form-select"
            name="country"
            value={formData.country || ""}
            onChange={handleInputChange}
          >
            <option value="">Select</option>
            {countryOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>City</label>
          <select
            className="chosen-single form-select"
            name="city"
            value={formData.city || ""}
            onChange={handleInputChange}
          >
            <option value="">Select</option>
            {cityOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group col-lg-12 col-md-12">
          <label>Complete Address</label>
          <input
            type="text"
            name="address"
            placeholder="Enter foundry address"
            onChange={handleInputChange}
          />
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

          {/* {expertiseData.map((cat) => (
            <div key={cat.name} className="border rounded p-2 mb-3">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`cat-${cat.name}`}
                  checked={selectedExpertise[cat.name]?.isSelected || false}
                  onChange={() => toggleCategory(cat.name)}
                />
                <label
                  className="form-check-label fw-bold"
                  htmlFor={`cat-${cat.name}`}
                >
                  {cat.name}
                </label>
              </div>

              {selectedExpertise[cat.name]?.isSelected && (
                <div className="ms-4 mt-2">
                  <div>
                    <label className="mb-1">
                      <strong>Subcategories:</strong>
                    </label>
                    {cat.subCategory.map((sub) => (
                      <div key={sub.name} className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id={`sub-${cat.name}-${sub.name}`}
                          checked={selectedExpertise[
                            cat.name
                          ]?.subcategories.includes(sub.name)}
                          onChange={() => toggleSubcategory(cat.name, sub.name)}
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`sub-${cat.name}-${sub.name}`}
                        >
                          {sub.name}
                        </label>
                      </div>
                    ))}
                  </div>

                  {cat.keyProcesses.length > 0 && (
                    <div className="mt-2">
                      <label className="mb-1">
                        <strong>Processes:</strong>
                      </label>
                      {cat.keyProcesses.map((proc) => (
                        <div key={proc.name} className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={`proc-${cat.name}-${proc.name}`}
                            checked={selectedExpertise[
                              cat.name
                            ]?.processes.includes(proc.name)}
                            onChange={() => toggleProcess(cat.name, proc.name)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`proc-${cat.name}-${proc.name}`}
                          >
                            {proc.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div> 
          ))}
            */}
        </div>

        {/* <h1>New Wxpertise</h1>
        <ExpertiseSection initialData={initialData} /> */}

        <div className="form-group col-lg-12 col-md-12 text-right">
          <button type="submit" className="theme-btn btn-style-one">
            Submit Job
          </button>
        </div>
      </div>
    </form>
  );
};

export default PostBoxForm;
