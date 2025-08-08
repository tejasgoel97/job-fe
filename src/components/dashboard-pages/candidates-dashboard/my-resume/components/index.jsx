import { useEffect, useState } from "react";
import AddPortfolio from "./AddPortfolio";
import Awards from "./Awards";
import ContactInfoBox from "./ContactInfoBox";
import Education from "./Education";
import Experiences from "./Experiences";
import SkillsMultiple from "./SkillsMultiple";
import SocialNetworkBox from "./SocialNetworkBox";
import axiosInstance from "@/utils/api/axiosInstance";
import OtherDetails from "./OtherDetails";
import { toast } from "react-toastify";
import CandidateExpertiseSelector from "./CandidateExpertiseSelector";
import "./styles.css";
const Resume = ({ initialData, user, setMode }) => {
  const [submitLoading, setSubmitLoading] = useState(false);
  const [resumeExists, setResumeExists] = useState(!!initialData);
  const [lookingForChange, setLookingForChange] = useState(
    initialData?.lookingForChange ?? false
  );

  const [cvFileURL, setCvFileURL] = useState(initialData.cvFileURL || "");
  const [profileImageURL, setProfileImageURL] = useState(
    initialData.profileImageURL || ""
  );
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  // State for ContactInfoBox
  const [contactInfo, setContactInfo] = useState({
    phoneNumber: initialData?.contactInfo?.phoneNumber || "",
    email: initialData?.contactInfo?.email || "",
    country: initialData?.contactInfo?.country || "",
    state: initialData?.contactInfo?.state || "",
    pinCode: initialData?.contactInfo?.pinCode || "",
    city: initialData?.contactInfo?.city || "",
    addressLine1: initialData?.contactInfo?.addressLine1 || "",
    addressLine2: initialData?.contactInfo?.addressLine2 || "",
  });

  // State for SocialNetworkBox
  const [socialNetworks, setSocialNetworks] = useState({
    facebook: initialData?.socialNetworks?.facebook || "",
    x: initialData?.socialNetworks?.x || "", // for X (formerly Twitter)
    linkedin: initialData?.socialNetworks?.linkedin || "",
    instagram: initialData?.socialNetworks?.instagram || "", // replaced googlePlus
  });

  // State for Education, Experiences, and Awards
  const [education, setEducation] = useState(initialData?.education || []);
  const [experiences, setExperiences] = useState(
    initialData?.experiences || []
  );
  const [awards, setAwards] = useState(initialData?.awards || []);
  const [age, setAge] = useState(initialData?.age || "");
  const [totalExperienceYears, setTotalExperienceYears] = useState(
    initialData?.totalExperienceYears || ""
  );
  const [totalExperienceMonths, setTotalExperienceMonths] = useState(
    initialData?.totalExperienceMonths || ""
  );
  const [currentlyWorking, setCurrentlyWorking] = useState(
    initialData?.currentlyWorking || false
  );
  const [currentSalary, setCurrentSalary] = useState(
    initialData?.currentSalary || ""
  );
  const [currentSalaryCurrency, setCurrentSalaryCurrency] = useState(
    initialData?.currentSalaryCurrency || "INR"
  );
  const [expectedSalaryCurrency, setExpectedSalaryCurrency] = useState(
    initialData?.expectedSalaryCurrency || "INR"
  );
  const [expectedSalary, setExpectedSalary] = useState(
    initialData?.expectedSalary || ""
  );
  const [selectedExpertise, setSelectedExpertise] = useState({});
  const [initialExpertise, setInitialExpertise] = useState(
    initialData?.expertise || []
  );
  const [languages, setLanguages] = useState(
    initialData?.languages?.map((lang) => ({ value: lang, label: lang })) || []
  );
  const handleContactInfoChange = (field, value) => {
    setContactInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleSocialNetworkChange = (field, value) => {
    setSocialNetworks((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic checks

    if (!description.trim()) {
      alert("Description is required.");
      return;
    }

    if (!contactInfo.phoneNumber || !contactInfo.email) {
      alert("Please Phone Number and email in  contact information fields.");
      return;
    }
    if (!contactInfo.country) {
      alert("Please choose a country in contact information fields.");
      return;
    }
    if (!contactInfo.city) {
      alert("Please choose a city in contact information fields");
      return;
    }
    if (!contactInfo.addressLine1) {
      alert("Please fill proper address contact information fields.");
      return;
    }

    // Consolidate all data
    // Use FormData to handle file uploads along with other data

    const finalExpertise = Object.entries(selectedExpertise)
      .filter(([key, value]) => value.isSelected) // Only selected categories
      .map(([key, value]) => ({
        category: key,
        subcategories: value.subcategories,
        processes: value.processes,
      }));
    console.log({ finalExpertise });
    const body = {
      cvFileURL,
      profileImageURL,
      firstName,
      lastName,
      description,
      age,
      totalExperienceYears,
      totalExperienceMonths,
      currentlyWorking,
      currentSalaryCurrency,
      expectedSalaryCurrency,
      currentSalary,
      expectedSalary,
      languages: languages.map((l) => l.value),
      education,
      experiences,
      // skills: skills.map((s) => s.value),
      contactInfo,
      socialNetworks,
      expertise: finalExpertise,
    };
    console.log("Request Body:", body);

    setSubmitLoading(true);
    try {
      let response;
      if (resumeExists) {
        // Update existing resume
        response = await axiosInstance.post("/resume", body);
        toast.success("Resume updated successfully!");
        window.scroll(0, 0);
        setMode("view");
      } else {
        // Create new resume
        response = await axiosInstance.post("/resume", body, {});
        toast.success("Resume saved successfully!");
        window.scroll(0, 0);
        setMode("view");

        setResumeExists(true); // After a successful save, the resume now exists for future edits.
      }
      console.log("Server Response:", response.data);
    } catch (error) {
      console.error(
        "Error submitting resume:",
        error.response ? error.response.data : error.message
      );
      alert("Failed to save resume. Please check the console for details.");
    } finally {
      setSubmitLoading(false);
    }
  };

  useEffect;
  return (
    <form className="default-form" onSubmit={handleSubmit}>
      <div className="row">
        
        <div className="form-group col-lg-12 col-md-12">
          <div className="form-group mb-3 p-3 bg-light border rounded shadow-sm d-flex align-items-center">
            {/* Icon */}
            <i
              className="bi bi-briefcase-fill me-2 text-primary"
              style={{ fontSize: 28 }}
            ></i>
            {/* Label & Status */}
            <div className="flex-grow-1">
              <label
                htmlFor="lookingForChangeSwitch"
                className="form-label mb-1 fw-bold text-primary"
              >
                Looking for Change?
                {lookingForChange && (
                  <span className="badge bg-success ms-2">
                    Open for Opportunities
                  </span>
                )}
              </label>
              <div className="text-muted" style={{ fontSize: "0.96rem" }}>
                Let recruiters know you’re open to new roles.
              </div>
            </div>
            {/* Switch */}
            <div className="form-check form-switch ms-4">
              <input
                className="form-check-input"
                type="checkbox"
                id="lookingForChangeSwitch"
                checked={lookingForChange}
                onChange={(e) => setLookingForChange(e.target.checked)}
              />
            </div>
          </div>
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <AddPortfolio
            cvFileURL={cvFileURL}
            setCvFileURL={setCvFileURL}
            profileImageURL={profileImageURL}
            setProfileImageURL={setProfileImageURL}
          />
        </div>
         <div className="form-group col-lg-6 col-md-12"></div>

        {/* <!-- Input --> */}

        <div className="form-group col-lg-6 col-md-6">
          <label>First Name</label>
          <input
            required
            type="text"
            name="first Name"
            placeholder=""
            value={firstName}
            disabled
            onChange={(e) => setFirstName(e.target.value)}
          ></input>
        </div>
        <div className="form-group col-lg-6 col-md-6">
          <label>Last Name</label>
          <input
            required
            type="text"
            name="last Name"
            placeholder=""
            disabled
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          ></input>
        </div>

        <div className="form-group col-lg-12 col-md-12">
          <label>Description</label>
          <textarea
            required
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description about yourself"
          ></textarea>
        </div>
        {/* <!-- About Company --> */}
        <OtherDetails
          age={age}
          setAge={setAge}
          totalExperienceYears={totalExperienceYears}
          setTotalExperienceYears={setTotalExperienceYears}
          totalExperienceMonths={totalExperienceMonths}
          setTotalExperienceMonths={setTotalExperienceMonths}
          currentlyWorking={currentlyWorking}
          setCurrentlyWorking={setCurrentlyWorking}
          languages={languages}
          setLanguages={setLanguages}
          currentSalary={currentSalary}
          currentSalaryCurrency={currentSalaryCurrency}
          setCurrentSalaryCurrency={setCurrentSalaryCurrency}
          setCurrentSalary={setCurrentSalary}
          expectedSalary={expectedSalary}
          setExpectedSalary={setExpectedSalary}
          expectedSalaryCurrency={expectedSalaryCurrency}
          setExpectedSalaryCurrency={setExpectedSalaryCurrency}
        />
        <div className="form-group col-lg-12 col-md-12">
          <Education items={education} setItems={setEducation} />
          {/* <!-- Resume / Education --> */}

          <Experiences items={experiences} setItems={setExperiences} />
          {/* <!-- Resume / Work & Experience --> */}
        </div>
        {/* <!--  education and word-experiences --> */}

        {/* <!-- End more portfolio upload --> */}

        <div className="form-group col-lg-12 col-md-12">
          {/* <!-- Resume / Awards --> */}
          {/* <Awards items={awards} setItems={setAwards} /> */}
        </div>
        {/* <!-- End Award --> */}

        {/* <div className="form-group col-lg-6 col-md-12">
          <label>Skills </label>
          <SkillsMultiple value={skills} onChange={setSkills} />
        </div> */}
        <div className="form-group col-lg-12 col-md-12">
          <label>EXpertise selection </label>
          <CandidateExpertiseSelector
            initialExpertise={initialExpertise}
            selectedExpertise={selectedExpertise}
            setSelectedExpertise={setSelectedExpertise}
          />
        </div>
        {/* <!-- End Skills --> */}

        {/* <!-- Contact Info --> */}
        <div className="form-group col-lg-12 col-md-12 resume-outer">
          <div className="upper-title">
            <h4>Contact Info </h4>
          </div>
          <ContactInfoBox
            data={contactInfo}
            onChange={handleContactInfoChange}
          />
        </div>
        <div className="form-group col-lg-12 col-md-12 resume-outer">
          <div className="upper-title">
            <h4>Social Network </h4>
          </div>
          <SocialNetworkBox
            data={socialNetworks}
            onChange={handleSocialNetworkChange}
          />
        </div>
        <div className="form-group col-lg-12 col-md-12">
          <button
            type="submit"
            className="theme-btn btn-style-one"
            disabled={submitLoading}
          >
            {submitLoading ? "Saving..." : resumeExists ? "Update" : "Save"}
          </button>
        </div>
        {/* <!-- Input --> */}
      </div>
      {/* End .row */}
    </form>
  );
};

export default Resume;
