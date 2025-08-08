import React, { useState, useRef } from "react";
import "./styles.css";

// Bootstrap 5 Modal helpers
const showBsModal = (modalRef) => {
  if (window.bootstrap && modalRef.current) {
    window.bootstrap.Modal.getOrCreateInstance(modalRef.current).show();
  }
};
const hideBsModal = (modalRef) => {
  if (window.bootstrap && modalRef.current) {
    window.bootstrap.Modal.getOrCreateInstance(modalRef.current).hide();
  }
};

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

function Education({ items: educations, setItems: setEducations }) {
  const [modalMode, setModalMode] = useState(""); // "add" or "edit"
  const [modalIdx, setModalIdx] = useState(null); // index of education being edited
  const [form, setForm] = useState(initForm());
  const modalRef = useRef();

  function initForm(edu = null) {
    return edu
      ? { ...edu }
      : {
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
        };
  }

  function openAddModal() {
    setModalMode("add");
    setForm(initForm());
    setModalIdx(null);
    setTimeout(() => showBsModal(modalRef), 1);
  }
  function openEditModal(idx) {
    setModalMode("edit");
    setForm(initForm(educations[idx]));
    setModalIdx(idx);
    setTimeout(() => showBsModal(modalRef), 1);
  }

  function handleFormChange(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function validateEducation(edu) {
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
  }

  function handleSave() {
    const err = validateEducation(form);
    if (err) {
      window.alert(err);
      return;
    }
    if (modalMode === "add") {
      setEducations((prev) => [
        { ...form, id: Date.now() },
        ...prev,
      ]);
    } else if (modalMode === "edit" && modalIdx !== null) {
      setEducations((prev) =>
        prev.map((edu, idx) =>
          idx === modalIdx ? { ...form, id: edu.id } : edu
        )
      );
    }
    handleModalClose();
  }

  function handleModalClose() {
    setModalMode("");
    setModalIdx(null);
    setForm(initForm());
    hideBsModal(modalRef);
  }

  function handleDelete(idx) {
    if (window.confirm("Delete this education record?")) {
      setEducations((prev) => prev.filter((_, i) => i !== idx));
    }
  }

  return (
    <div className="resume-outer">
      <div className="upper-title d-flex align-items-center justify-content-between">
        <h4>Education</h4>
        <button className="add-info-btn" onClick={openAddModal}>
          <span className="icon flaticon-plus"></span> Add Education
        </button>
      </div>

      {educations.length === 0 && (
        <div className="alert alert-secondary">No education added.</div>
      )}
      {educations.map((edu, idx) => (
        <div className="resume-block" key={edu.id}>
          <div className="inner">
            <span className="name">{edu.institution?.[0] || "?"}</span>
            <div className="title-box">
              <div className="info-box">
                <h3>
                  {degreeTypeOptions.find(dt => dt.value === edu.degreeType)?.label || ""}
                  {edu.degree ? ` in ${edu.degree}` : ""}
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
                  <button onClick={() => openEditModal(idx)}>
                    <span className="la la-pencil"></span>
                  </button>
                  <button onClick={() => handleDelete(idx)}>
                    <span className="la la-trash"></span>
                  </button>
                </div>
              </div>
            </div>
            <div className="text">
              <p>{edu.description}</p>
            </div>
          </div>
        </div>
      ))}

      {/* Modal */}
      <div className="modal fade" tabIndex={-1} ref={modalRef}>
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{modalMode === "edit" ? "Edit Education" : "Add Education"}</h5>
              <button type="button" className="btn-close" onClick={handleModalClose}></button>
            </div>
            <div className="modal-body">
              <div className="edit-card">
                <div className="edit-grid">
                  <div>
                    <label>Degree Type <span style={{ color: "red" }}>*</span></label>
                    <select
                      value={form.degreeType}
                      onChange={e => handleFormChange("degreeType", e.target.value)}
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
                      value={form.degree}
                      onChange={e => handleFormChange("degree", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label>Institution <span style={{ color: "red" }}>*</span></label>
                    <input
                      type="text"
                      value={form.institution}
                      onChange={e => handleFormChange("institution", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label>Region/State</label>
                    <input
                      type="text"
                      value={form.region}
                      onChange={e => handleFormChange("region", e.target.value)}
                    />
                  </div>
                  <div>
                    <label>Country <span style={{ color: "red" }}>*</span></label>
                    <select
                      value={form.country}
                      onChange={e => handleFormChange("country", e.target.value)}
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
                      value={form.fromYear}
                      onChange={e =>
                        handleFormChange("fromYear", e.target.value.replace(/\D/, ""))
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
                      value={form.toYear}
                      onChange={e =>
                        handleFormChange("toYear", e.target.value.replace(/\D/, ""))
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
                      value={form.marks}
                      onChange={e =>
                        handleFormChange("marks", e.target.value.replace(/[^\d.]/g, ""))
                      }
                      placeholder="e.g. 89"
                      min="0"
                      max="100"
                    />
                  </div>
                </div>
                <div style={{ marginTop: "1rem" }}>
                  <label>Description</label>
                  <textarea
                    value={form.description}
                    onChange={e => handleFormChange("description", e.target.value)}
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
                      onClick={handleSave}
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
                      onClick={handleModalClose}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Education;
