import { useState } from "react";
import AddPortfolio from "./AddPortfolio";
import Awards from "./Awards";
import ContactInfoBox from "./ContactInfoBox";
import Education from "./Education";
import Experiences from "./Experiences";
import SkillsMultiple from "./SkillsMultiple";
import SocialNetworkBox from "./SocialNetworkBox";
import axiosInstance from "@/utils/api/axiosInstance";

const Resume = ({ initialData }) => {
  const [submitLoading, setSubmitLoading] = useState(false);
  const [resumeExists, setResumeExists] = useState(!!initialData);

  const [portfolioFile, setPortfolioFile] = useState(null);
 const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [skills, setSkills] = useState(
    initialData?.skills?.map((skill) => ({ value: skill, label: skill })) || []
  );
  // State for ContactInfoBox
  const [contactInfo, setContactInfo] = useState({
    phoneNumber: initialData?.contactInfo?.phoneNumber || "",
    email: initialData?.contactInfo?.email || "",
    country: initialData?.contactInfo?.country || "",
    city: initialData?.contactInfo?.city || "",
    completeAddress: initialData?.contactInfo?.completeAddress || "",
    googleMapLink: initialData?.contactInfo?.googleMapLink || "",
  });

  // State for SocialNetworkBox
  const [socialNetworks, setSocialNetworks] = useState({
    facebook: initialData?.socialNetworks?.facebook || "",
    twitter: initialData?.socialNetworks?.twitter || "",
    linkedin: initialData?.socialNetworks?.linkedin || "",
    googlePlus: initialData?.socialNetworks?.googlePlus || "",
  });

  // State for Education, Experiences, and Awards
  const [education, setEducation] = useState(initialData?.education || []);
  const [experiences, setExperiences] = useState(initialData?.experiences || []);
  const [awards, setAwards] = useState(initialData?.awards || []);

  const handleContactInfoChange = (field, value) => {
    setContactInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleSocialNetworkChange = (field, value) => {
    setSocialNetworks((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic checks
    if (!name){
      alert("Name is required.");
      return;
    }

    if (!description.trim()) {
      alert("Description is required.");
      return;
    }
    if (skills.length === 0) {
      alert("Please select at least one skill.");
      return;
    }
    if (
      !contactInfo.phoneNumber 
      || !contactInfo.email
    ) {
      alert("Please Phone Number and email in  contact information fields.");
      return;
    }
      if (

      !contactInfo.country ||
      !contactInfo.city ||
      !contactInfo.completeAddress
    ) {
      alert("Please fill proper address contact information fields.");
      return;
    }

    // Consolidate all data
// Use FormData to handle file uploads along with other data

    if (portfolioFile) {
      formData.append("portfolioFile", portfolioFile);
    }
    const body = {
      portfolioFile,
        name,
        description,
        education,
        experiences,
        awards,
        skills: skills.map((s) => s.value), // Extracting just the value
        contactInfo,
        socialNetworks,
      }


    setSubmitLoading(true);
    try {
      let response;
      if (resumeExists) {
        // Update existing resume
        response = await axiosInstance.post("/resume", body, );
        alert("Resume updated successfully!");
      } else {
        // Create new resume
        response = await axiosInstance.post("/resume", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Resume saved successfully!");
        setResumeExists(true); // After a successful save, the resume now exists for future edits.
      }
      console.log("Server Response:", response.data);
    } catch (error) {
      console.error("Error submitting resume:", error.response ? error.response.data : error.message);
      alert("Failed to save resume. Please check the console for details.");
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <form className="default-form" onSubmit={handleSubmit}>
      
      <div className="row">

        <div className="form-group col-lg-6 col-md-12">
          <AddPortfolio onFileSelect={setPortfolioFile} />
        </div>
        {/* <!-- Input --> */}

        <div className="form-group col-lg-12 col-md-12">
          <label>Name</label>
          <input
            required
            type="text"
            name="name"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>

        <div className="form-group col-lg-12 col-md-12">
          <label>Description</label>
          <textarea
          required
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Spent several years working on sheep on Wall Street..."
          ></textarea>
        </div>
        {/* <!-- About Company --> */}

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
          <Awards items={awards} setItems={setAwards} />
        </div>
        {/* <!-- End Award --> */}

        <div className="form-group col-lg-6 col-md-12">
          <label>Skills </label>
          <SkillsMultiple value={skills} onChange={setSkills} />
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
            {submitLoading
              ? "Saving..."
              : resumeExists
              ? "Update"
              : "Save"}
          </button>
        </div>
        {/* <!-- Input --> */}
      </div>
      {/* End .row */}
    </form>
  );
};

export default Resume;
