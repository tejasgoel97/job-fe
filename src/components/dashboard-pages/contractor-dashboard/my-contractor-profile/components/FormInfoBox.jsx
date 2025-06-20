import React, { useState } from "react";
import Select from "react-select";

const FormInfoBox = () => {
  const [name, setName] = useState("");
  const [lastCompanies, setLastCompanies] = useState([
    { companyName: "", yearWorked: "", description: "" },
  ]);
  const [strengths, setStrengths] = useState("");
  const [weaknesses, setWeaknesses] = useState("");
  const [safetyConditions, setSafetyConditions] = useState("");
  const [photos, setPhotos] = useState([]);
  const [photoPreviews, setPhotoPreviews] = useState([]);
  const [socialMedia, setSocialMedia] = useState({
    linkedin: "",
    twitter: "",
    facebook: "",
  });

  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    setPhotos(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setPhotoPreviews(previews);
  };

  const handleCompanyChange = (index, field, value) => {
    const updated = [...lastCompanies];
    updated[index][field] = value;
    setLastCompanies(updated);
  };

  const addCompany = () => {
    setLastCompanies([...lastCompanies, { companyName: "", yearWorked: "", description: "" }]);
  };

  const removeCompany = (index) => {
    const updated = [...lastCompanies];
    updated.splice(index, 1);
    setLastCompanies(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formPayload = {
      name,
      lastCompanies,
      strengths,
      weaknesses,
      safetyConditions,
      photos,
      socialMedia,
    };
    console.log("Submitting Form: ", formPayload);
    alert("Form submitted. Check console for data.");
  };

  return (
    <form className="default-form" onSubmit={handleSubmit}>
      <div className="row">
        {/* Name */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Contractor Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Last Company Details */}
        <div className="col-12">
          <label className="fw-bold">Last Company Details</label>
          {lastCompanies.map((company, index) => (
            <div key={index} className="border rounded p-3 mb-3">
              <div className="form-group">
                <label>Company Name</label>
                <input
                  type="text"
                  value={company.companyName}
                  onChange={(e) =>
                    handleCompanyChange(index, "companyName", e.target.value)
                  }
                  placeholder="e.g., ABC Pvt Ltd"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Year Worked</label>
                <input
                  type="text"
                  value={company.yearWorked}
                  onChange={(e) =>
                    handleCompanyChange(index, "yearWorked", e.target.value)
                  }
                  placeholder="e.g., 2015-2020"
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={company.description}
                  onChange={(e) =>
                    handleCompanyChange(index, "description", e.target.value)
                  }
                  placeholder="Brief description of work"
                  className="form-control"
                />
              </div>
              {lastCompanies.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeCompany(index)}
                  className="btn btn-sm btn-danger"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addCompany}
            className="btn btn-sm btn-secondary"
          >
            + Add Another Company
          </button>
        </div>

        {/* Strengths */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Your Strengths</label>
          <textarea
            placeholder="List your key strengths..."
            value={strengths}
            onChange={(e) => setStrengths(e.target.value)}
          />
        </div>

        {/* Weaknesses */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Your Weakness</label>
          <textarea
            placeholder="Mention areas of improvement..."
            value={weaknesses}
            onChange={(e) => setWeaknesses(e.target.value)}
          />
        </div>

        {/* Safety Conditions */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Safety Conditions at Your Area</label>
          <textarea
            placeholder="Describe safety protocols or issues"
            value={safetyConditions}
            onChange={(e) => setSafetyConditions(e.target.value)}
          />
        </div>

        {/* Photo Upload */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Upload Photos</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handlePhotoChange}
            className="form-control"
          />
          <div className="d-flex flex-wrap gap-3 mt-2">
            {photoPreviews.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Preview ${index}`}
                width={100}
                height={100}
                style={{ objectFit: "cover", borderRadius: "8px" }}
              />
            ))}
          </div>
        </div>

        {/* Social Media Links */}
        <div className="form-group col-lg-4 col-md-12">
          <label>LinkedIn</label>
          <input
            type="text"
            value={socialMedia.linkedin}
            onChange={(e) =>
              setSocialMedia({ ...socialMedia, linkedin: e.target.value })
            }
            placeholder="LinkedIn profile URL"
          />
        </div>
        <div className="form-group col-lg-4 col-md-12">
          <label>Twitter</label>
          <input
            type="text"
            value={socialMedia.twitter}
            onChange={(e) =>
              setSocialMedia({ ...socialMedia, twitter: e.target.value })
            }
            placeholder="Twitter handle"
          />
        </div>
        <div className="form-group col-lg-4 col-md-12">
          <label>Facebook</label>
          <input
            type="text"
            value={socialMedia.facebook}
            onChange={(e) =>
              setSocialMedia({ ...socialMedia, facebook: e.target.value })
            }
            placeholder="Facebook profile URL"
          />
        </div>

        {/* Submit Button */}
        <div className="form-group col-lg-12 col-md-12 mt-3">
          <button type="submit" className="theme-btn btn-style-one">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormInfoBox;
