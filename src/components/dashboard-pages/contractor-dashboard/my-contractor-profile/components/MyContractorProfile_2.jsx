import { useState } from "react";
import ContactInfoBox from "./ContactInfoBox";
import FormInfoBox from "./FormInfoBox";
import LogoUpload from "./LogoUpload";
import axiosInstance from "@/utils/api/axiosInstance";
import { toast } from "react-toastify";

const Index = ({ initialData, user }) => {
  console.log({ initialData });
  const [submitLoading, setSubmitLoading] = useState(false);
  const [profileExists, setProfileExists] = useState(!!initialData);

  const [name, setName] = useState(initialData?.name || "");
  const [lastCompanies, setLastCompanies] = useState(
    initialData?.lastCompanies || [
      { companyName: "", yearWorked: "", description: "" },
    ]
  );
  const [strengths, setStrengths] = useState(initialData?.strengths || [""]);
  const [weaknesses, setWeaknesses] = useState(initialData?.weaknesses || [""]);
  const [safetyConditions, setSafetyConditions] = useState(
    initialData?.safetyConditions || [""]
  );
  const [photos, setPhotos] = useState(initialData?.photos || []);
  const [photoPreviews, setPhotoPreviews] = useState([]);
  const [socialNetworks, setSocialNetworks] = useState(
    initialData?.socialNetworks || { linkedin: "", twitter: "", facebook: "" }
  );

  const [contactInfo, setContactInfo] = useState(
    initialData?.contactInfo || {
      phoneNumber: "",
      email: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      country: "India",
      googleMapLink: "",
    }
  );

  const handleSubmit = async (e) => {
    console.log("DOING SAVE");
    e.preventDefault();
    setSubmitLoading(true);

    // Basic validation
    if (!name.trim()) {
      alert("Name is required.");
      setSubmitLoading(false);
      return;
    }
    if (
      !contactInfo.phoneNumber.trim() ||
      contactInfo.phoneNumber.length < 10
    ) {
      alert("Please enter a valid 10-digit phone number.");
      setSubmitLoading(false);
      return;
    }
    if (!contactInfo.email.trim()) {
      alert("Email is required.");
      setSubmitLoading(false);
      return;
    }

    const payload = {
      name,
      lastCompanies,
      strengths,
      weaknesses,
      safetyConditions,
      photos,
      socialNetworks,
      contactInfo,
      createdBy: user?._id || null,
      createdAt: new Date().toISOString(),
    };

    try {
      let response;

      if (profileExists && initialData?._id) {
        // Update existing profile
        response = await axiosInstance.post(`/contractor-profile`, payload);
        toast.success("Profile updated successfully!");
      } else {
        // Create new profile
        response = await axiosInstance.post(`/contractor-profile`, payload);
        console.log("Profile created:", response.data);
        toast.success("Profile created successfully!");
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      if (error.response && error.response.data && error.response.data.errors) {
        const errors = error.response.data.errors;

        // Loop through the errors and show each in a toast
        Object.keys(errors).forEach((fieldKey) => {
          const err = errors[fieldKey];
          if (err?.message) {
            toast.error(err.message);
          }
        });
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="widget-content">
      <LogoUpload />

      <FormInfoBox
        name={name}
        setName={setName}
        lastCompanies={lastCompanies}
        setLastCompanies={setLastCompanies}
        strengths={strengths}
        setStrengths={setStrengths}
        weaknesses={weaknesses}
        setWeaknesses={setWeaknesses}
        safetyConditions={safetyConditions}
        setSafetyConditions={setSafetyConditions}
        photos={photos}
        setPhotos={setPhotos}
        photoPreviews={photoPreviews}
        setPhotoPreviews={setPhotoPreviews}
        socialMedia={socialNetworks}
        setSocialMedia={setSocialNetworks}
        contactInfo={contactInfo}
        setContactInfo={setContactInfo}
      />

      <div className="ls-widget">
        <div className="tabs-box">
          <div className="widget-title">
            <h4>Contact Information</h4>
          </div>
          <ContactInfoBox formData={contactInfo} setFormData={setContactInfo} />
        </div>
      </div>

      <div className="form-group col-lg-12 col-md-12">
        <button
          type="submit"
          className="theme-btn btn-style-one"
          onClick={handleSubmit}
          disabled={submitLoading}
        >
          {submitLoading ? "Saving..." : profileExists ? "Update" : "Create"}
        </button>
      </div>
    </div>
  );
};

export default Index;
