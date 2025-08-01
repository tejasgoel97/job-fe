import React, { useState, useEffect } from "react";
import Select from "react-select";
import PhotoUpload from "./PhotoUpload";
import SafetyConditionSection from "./SafetyCondition";

const monthOptions = [
  { value: "01", label: "January" },
  { value: "02", label: "February" },
  { value: "03", label: "March" },
  { value: "04", label: "April" },
  { value: "05", label: "May" },
  { value: "06", label: "June" },
  { value: "07", label: "July" },
  { value: "08", label: "August" },
  { value: "09", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

const getYearOptions = () => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: 50 }, (_, i) => {
    const year = currentYear - i;
    return { value: String(year), label: String(year) };
  });
};

const contractTypeOptions = [
  { value: "Full-Time", label: "Full-Time" },
  { value: "Part-Time", label: "Part-Time" },
  { value: "Contractual", label: "Contractual" },
];

const calculateWorkDuration = (fromMonth, fromYear, toMonth, toYear) => {
  try {
    const start = new Date(`${fromYear}-${fromMonth}-01`);
    const end = new Date(`${toYear}-${toMonth}-01`);
    const months =
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth());
    const years = Math.floor(months / 12);
    const remMonths = months % 12;
    return `${years} year(s), ${remMonths} month(s)`;
  } catch {
    return "";
  }
};

const FormInfoBox = ({
  firstName,
  lastName,
  setName,
  lastCompanies,
  setLastCompanies,
  strengths,
  setStrengths,
  weaknesses,
  setWeaknesses,
  safetyConditions,
  setSafetyConditions,
  photos,
  setPhotos,

  socialMedia,
  setSocialMedia,
}) => {
  const [hasGST, setHasGST] = useState(false);
  const [gstNumber, setGstNumber] = useState("");
  const [companyName, setCompanyName] = useState("");



  const handleCompanyChange = (index, field, value) => {
    const updated = [...lastCompanies];
    updated[index][field] = value;
    setLastCompanies(updated);
  };

  const addCompany = () => {
    setLastCompanies([
      ...lastCompanies,
      {
        companyName: "",
        fromMonth: "",
        fromYear: "",
        toMonth: "",
        toYear: "",
        description: "",
        contractType: "",
      },
    ]);
  };

  const removeCompany = (index) => {
    const updated = [...lastCompanies];
    updated.splice(index, 1);
    setLastCompanies(updated);
  };

  return (
    <form className="default-form">
      <div className="row">
        {/* Contractor Name */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Contractor Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={firstName + " " + lastName || ""}
            onChange={(e) => setName(e.target.value)}
            required
            disabled
          />
        </div>
    <SafetyConditionSection/>
        {/* Do you have GST? */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Do you have GST?</label>
          <div className="d-flex align-items-center gap-2">
            <input
              type="checkbox"
              checked={hasGST}
              onChange={(e) => setHasGST(e.target.checked)}
            />
            <span>Yes</span>
          </div>
          {hasGST && (
            <input
              type="text"
              className="form-control mt-2"
              value={gstNumber}
              onChange={(e) => setGstNumber(e.target.value)}
              placeholder="Enter GST Number"
            />
          )}
        </div>

        {/* Enter Company Name */}
        <div className="form-group col-12">
          <label>Company Name</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="e.g., XYZ Enterprises"
            className="form-control"
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
                  className="form-control"
                  placeholder="e.g., ABC Pvt Ltd"
                />
              </div>

              <div className="row">
                <div className="form-group col-md-3">
                  <label>From Month</label>
                  <Select
                    options={monthOptions}
                    value={monthOptions.find((opt) => opt.value === company.fromMonth)}
                    onChange={(option) =>
                      handleCompanyChange(index, "fromMonth", option.value)
                    }
                  />
                </div>
                <div className="form-group col-md-3">
                  <label>From Year</label>
                  <Select
                    options={getYearOptions()}
                    value={getYearOptions().find((opt) => opt.value === company.fromYear)}
                    onChange={(option) =>
                      handleCompanyChange(index, "fromYear", option.value)
                    }
                  />
                </div>
                <div className="form-group col-md-3">
                  <label>To Month</label>
                  <Select
                    options={monthOptions}
                    value={monthOptions.find((opt) => opt.value === company.toMonth)}
                    onChange={(option) =>
                      handleCompanyChange(index, "toMonth", option.value)
                    }
                  />
                </div>
                <div className="form-group col-md-3">
                  <label>To Year</label>
                  <Select
                    options={getYearOptions()}
                    value={getYearOptions().find((opt) => opt.value === company.toYear)}
                    onChange={(option) =>
                      handleCompanyChange(index, "toYear", option.value)
                    }
                  />
                </div>
              </div>

              {/* Duration Calculation */}
              {company.fromMonth &&
                company.fromYear &&
                company.toMonth &&
                company.toYear && (
                  <p className="mt-2 text-muted">
                    Duration:{" "}
                    {calculateWorkDuration(
                      company.fromMonth,
                      company.fromYear,
                      company.toMonth,
                      company.toYear
                    )}
                  </p>
              )}

              <div className="form-group">
                <label>Contract Type</label>
                <Select
                  options={contractTypeOptions}
                  value={contractTypeOptions.find(
                    (opt) => opt.value === company.contractType
                  )}
                  onChange={(option) =>
                    handleCompanyChange(index, "contractType", option.value)
                  }
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={company.description}
                  onChange={(e) =>
                    handleCompanyChange(index, "description", e.target.value)
                  }
                  className="form-control"
                  placeholder="Brief description of work"
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

        <div className="form-group col-lg-12 col-md-12">
          <label>Your Strengths</label>
          {strengths.map((item, index) => (
            <div key={index} className="d-flex gap-2 mb-2">
              <input
                type="text"
                value={item}
                onChange={(e) => {
                  const updated = [...strengths];
                  updated[index] = e.target.value;
                  setStrengths(updated);
                }}
                className="form-control"
                placeholder={`Strength ${index + 1}`}
              />
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => {
                  const updated = strengths.filter((_, i) => i !== index);
                  setStrengths(updated);
                }}
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-sm btn-secondary mt-2"
            onClick={() => setStrengths([...strengths, ""])}
          >
            + Add Strength
          </button>
        </div>

        {/* Weaknesses */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Your Weaknesses</label>
          {weaknesses.map((item, index) => (
            <div key={index} className="d-flex gap-2 mb-2">
              <input
                type="text"
                value={item}
                onChange={(e) => {
                  const updated = [...weaknesses];
                  updated[index] = e.target.value;
                  setWeaknesses(updated);
                }}
                className="form-control"
                placeholder={`Weakness ${index + 1}`}
              />
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => {
                  const updated = weaknesses.filter((_, i) => i !== index);
                  setWeaknesses(updated);
                }}
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-sm btn-secondary mt-2"
            onClick={() => setWeaknesses([...weaknesses, ""])}
          >
            + Add Weakness
          </button>
        </div>

        {/* Safety Conditions */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Safety Conditions at Your Area</label>
          {Array.isArray(safetyConditions)
            ? safetyConditions.map((item, index) => (
                <div key={index} className="d-flex gap-2 mb-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => {
                      const updated = [...safetyConditions];
                      updated[index] = e.target.value;
                      setSafetyConditions(updated);
                    }}
                    className="form-control"
                    placeholder={`Condition ${index + 1}`}
                  />
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => {
                      const updated = safetyConditions.filter(
                        (_, i) => i !== index
                      );
                      setSafetyConditions(updated);
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))
            : null}
          <button
            type="button"
            className="btn btn-sm btn-secondary mt-2"
            onClick={() =>
              setSafetyConditions((prev) =>
                Array.isArray(prev) ? [...prev, ""] : [""]
              )
            }
          >
            + Add Condition
          </button>
        </div>

        {/* Photo Upload */}
<PhotoUpload photos={photos} setPhotos={setPhotos}/>

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
        </div>      </div>
    </form>
  );
};

export default FormInfoBox;
