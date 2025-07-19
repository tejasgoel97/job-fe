import React from "react";
import "./styles.css"
const showToast = (msg) => window.alert(msg);

const degreeTypeOptions = [
  { value: "diploma", label: "Diploma" },
  { value: "associate", label: "Associate Degree" },
  { value: "bachelor", label: "Bachelor's" },
  { value: "master", label: "Master's" },
  { value: "phd", label: "Ph.D." },
  { value: "doctorate", label: "Doctorate" },
  { value: "certificate", label: "Certificate" },
  { value: "other", label: "Other" },
];

const countryOptions = [
  "India", "USA", "UK", "Germany", "France", "Australia", "Canada",
  "China", "Japan", "Russia", "Brazil", "South Africa", "Italy", "Other"
];

const Education = ({ items: educations, setItems: setEducations }) => {
  const handleEditToggle = (id) => {
    setEducations((prev) =>
      prev.map((edu) =>
        edu.id === id ? { ...edu, editing: !edu.editing } : edu
      )
    );
  };

  const handleDelete = (id) => {
    setEducations((prev) => prev.filter((edu) => edu.id !== id));
  };

  const handleChange = (id, field, value) => {
    setEducations((prev) =>
      prev.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    );
  };

  const handleAdd = () => {
    const newId = Date.now();
    setEducations((prev) => [
      {
        id: newId,
        degreeType: "",
        degree: "",
        institution: "",
        region: "",
        country: "",
        fromYear: "",
        toYear: "",
        marks: "",
        cgpa: "",
        description: "",
        editing: true,
      },
      ...prev,
    ]);
  };

  const validateEducation = (edu) => {
    if (!edu.degreeType.trim()) return "Degree Type is required.";
    if (!edu.degree.trim()) return "Degree is required.";
    if (!edu.institution.trim()) return "Institution is required.";
    if (!edu.country.trim()) return "Country is required.";
    if (!edu.toYear.trim()) return "To Year is mandatory.";
    if (!/^\d{4}$/.test(edu.toYear)) return "To Year must be a 4-digit year.";
    if (edu.fromYear && !/^\d{4}$/.test(edu.fromYear))
      return "From Year must be a 4-digit year.";
    if (
      edu.fromYear &&
      parseInt(edu.toYear) < parseInt(edu.fromYear)
    )
      return "To Year cannot be before From Year.";
    if (edu.marks && isNaN(Number(edu.marks)))
      return "Marks should be a number.";
    if (edu.cgpa && (isNaN(Number(edu.cgpa)) || Number(edu.cgpa) < 0 || Number(edu.cgpa) > 10))
      return "CGPA should be a number between 0 and 10.";
    return null;
  };

  const handleSave = (id) => {
    const current = educations.find((edu) => edu.id === id);
    const err = validateEducation(current);
    if (err) {
      showToast(err);
      return;
    }
    setEducations((prev) =>
      prev.map((edu) =>
        edu.id === id ? { ...edu, editing: false } : edu
      )
    );
  };

  return (
    <div className="resume-outer">
      <div className="upper-title">
        <h4>Education</h4>
        <button className="add-info-btn" onClick={handleAdd}>
          <span className="icon flaticon-plus"></span> Add Education
        </button>
      </div>

      {educations.map((edu) => (
        <div className="resume-block" key={edu.id}>
          <div className="inner">
            <span className="name">{edu.institution?.[0] || "?"}</span>
            {edu.editing ? (
              <div className="edit-card">
                <div className="edit-grid">
                  <div>
                    <label>Degree Type <span style={{ color: "red" }}>*</span></label>
                    <select
                      value={edu.degreeType}
                      onChange={(e) =>
                        handleChange(edu.id, "degreeType", e.target.value)
                      }
                      required
                    >
                      <option value="">Select Degree Type</option>
                      {degreeTypeOptions.map((dt) => (
                        <option key={dt.value} value={dt.value}>{dt.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label>Degree <span style={{ color: "red" }}>*</span></label>
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) =>
                        handleChange(edu.id, "degree", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div>
                    <label>Institution <span style={{ color: "red" }}>*</span></label>
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) =>
                        handleChange(edu.id, "institution", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div>
                    <label>Region/State</label>
                    <input
                      type="text"
                      value={edu.region}
                      onChange={(e) =>
                        handleChange(edu.id, "region", e.target.value)
                      }
                    />
                  </div>
                  <div>
                    <label>Country <span style={{ color: "red" }}>*</span></label>
                    <select
                      value={edu.country}
                      onChange={(e) =>
                        handleChange(edu.id, "country", e.target.value)
                      }
                      required
                    >
                      <option value="">Select Country</option>
                      {countryOptions.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label>From Year</label>
                    <input
                      type="number"
                      value={edu.fromYear}
                      onChange={(e) =>
                        handleChange(edu.id, "fromYear", e.target.value.replace(/\D/, ""))
                      }
                      placeholder="e.g. 2019"
                      min="1900"
                      max="2100"
                      maxLength="4"
                    />
                  </div>
                  <div>
                    <label>To Year <span style={{ color: "red" }}>*</span></label>
                    <input
                      type="number"
                      value={edu.toYear}
                      onChange={(e) =>
                        handleChange(edu.id, "toYear", e.target.value.replace(/\D/, ""))
                      }
                      placeholder="e.g. 2023"
                      min="1900"
                      max="2100"
                      maxLength="4"
                      required
                    />
                  </div>
                  <div>
                    <label>Marks/CGPA</label>
                    <input
                      type="number"
                      value={edu.marks}
                      onChange={(e) =>
                        handleChange(edu.id, "marks", e.target.value.replace(/[^\d.]/g, ""))
                      }
                      placeholder="e.g. 89"
                      min="0"
                      max="100"
                    />
                  </div>
                  {/* <div>
                    <label>CGPA</label>
                    <input
                      type="number"
                      value={edu.cgpa}
                      onChange={(e) =>
                        handleChange(edu.id, "cgpa", e.target.value.replace(/[^\d.]/g, ""))
                      }
                      placeholder="e.g. 9.2"
                      min="0"
                      max="10"
                      step="0.01"
                    />
                  </div> */}
                </div>
                <div style={{ marginTop: "1rem" }}>
                  <label>Description</label>
                  <textarea
                    value={edu.description}
                    onChange={(e) =>
                      handleChange(edu.id, "description", e.target.value)
                    }
                    style={{ width: "100%", minHeight: 60 }}
                  />
                  <div style={{ marginTop: "10px", display: "flex", gap: "1rem" }}>
                    <button
                      style={{
                        backgroundColor: "#d9230f",
                        color: "#fff",
                        padding: "8px 16px",
                        fontWeight: "bold",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                      onClick={() => handleSave(edu.id)}
                    >
                      Save
                    </button>
                    <button
                      style={{
                        background: "#eee",
                        color: "#333",
                        padding: "8px 16px",
                        fontWeight: "bold",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                      onClick={() => handleDelete(edu.id)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="title-box">
                  <div className="info-box">
                    <h3>
                      {degreeTypeOptions.find(dt => dt.value === edu.degreeType)?.label || ""}{edu.degree ? ` in ${edu.degree}` : ""}
                    </h3>
                    <span>
                      {edu.institution}
                      {edu.region && `, ${edu.region}`}
                      {edu.country && `, ${edu.country}`}
                    </span>
                  </div>
                  <div className="edit-box">
                    <span className="year">
                      {edu.fromYear} - {edu.toYear}
                      {(edu.marks || edu.cgpa) && (
                        <span>
                          {" "} | {edu.marks && `Marks: ${edu.marks}`}
                          {edu.cgpa && ` CGPA: ${edu.cgpa}`}
                        </span>
                      )}
                    </span>
                    <div className="edit-btns">
                      <button onClick={() => (edu.editing ? handleSave(edu.id) : handleEditToggle(edu.id))}>
                        <span className={edu.editing ? "la la-save" : "la la-pencil"}></span>
                      </button>
                      <button onClick={() => handleDelete(edu.id)}>
                        <span className="la la-trash"></span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="text">
                  <p>{edu.description}</p>
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Education;
