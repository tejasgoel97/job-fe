import React, { useState } from "react";
import ReactModal from "react-modal";
import "./styles.css";

// accessibility root (change if your app root is different)
ReactModal.setAppElement?.("#root");

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
  const [modalMode, setModalMode] = useState(""); // "add" | "edit" | ""
  const [modalIdx, setModalIdx] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState(initForm());

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

  function openAddModal(e) {
    e?.preventDefault?.();
    setModalMode("add");
    setForm(initForm());
    setModalIdx(null);
    setIsOpen(true);
  }

  function openEditModal(e, idx) {
        e?.preventDefault?.();

    setModalMode("edit");
    setForm(initForm(educations[idx]));
    setModalIdx(idx);
    setIsOpen(true);
  }

  function handleFormChange(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function validateEducation(edu) {
    if (!edu.degreeType.trim()) return "Degree Type is mandatory.";
    if (!edu.degree.trim()) return "Degree is mandatory.";
    if (!edu.institution.trim()) return "Institution is mandatory.";
    if (!edu.country.trim()) return "Country is mandatory.";
    if (!edu.toYear.trim()) return "To Year is mandatory.";
    if (!/^\d{4}$/.test(edu.toYear)) return "To Year must be a 4-digit year.";
    if (edu.fromYear && !/^\d{4}$/.test(edu.fromYear))
      return "From Year must be a 4-digit year.";
    if (edu.fromYear && parseInt(edu.toYear) < parseInt(edu.fromYear))
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
      setEducations((prev) => [{ ...form, id: Date.now() }, ...prev]);
    } else if (modalMode === "edit" && modalIdx !== null) {
      setEducations((prev) =>
        prev.map((edu, idx) => (idx === modalIdx ? { ...form, id: edu.id } : edu))
      );
    }
    handleModalClose();
  }

  function handleModalClose() {
    setModalMode("");
    setModalIdx(null);
    setForm(initForm());
    setIsOpen(false);
  }

  function handleDelete(idx) {
    if (window.confirm("Delete this education record?")) {
      setEducations((prev) => prev.filter((_, i) => i !== idx));
    }
  }

  return (
    <div className="resume-outer">
      {/* Local styles ONLY for the modal shell; your .edit-card/.edit-grid remain untouched */}
      <style>{`
        .rm-edu-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,.5);
          z-index: 1055;
        }
        .rm-edu-content {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: min(92vw, 860px);
          max-height: calc(100vh - 4rem);
          overflow: hidden;
          background: #fff;
          border: 1px solid rgba(0,0,0,.2);
          border-radius: .75rem;
          box-shadow: 0 .5rem 1rem rgba(0,0,0,.15);
          padding: 0; /* We'll use header/body/footer structure below */
        }
        .rm-edu-body {
          overflow: auto;
          max-height: calc(100vh - 12rem);
          padding: 1rem 1.25rem;
        }
      `}</style>

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
                  <button onClick={(e) => openEditModal(e,idx)}>
                    <span className="la la-pencil"></span>
                  </button>
                  <button onClick={() => handleDelete(idx)}>
                    <span className="la la-trash"></span>
                  </button>
                </div>
              </div>
            </div>
            {edu.description && (
              <div className="text">
                <p>{edu.description}</p>
              </div>
            )}
          </div>
        </div>
      ))}

      {/* REACT-MODAL */}
      <ReactModal
        isOpen={isOpen}
        onRequestClose={handleModalClose}
        shouldCloseOnEsc
        shouldCloseOnOverlayClick
        overlayClassName="rm-edu-overlay"
        className="rm-edu-content"
        contentLabel={modalMode === "edit" ? "Edit Education" : "Add Education"}
      >
        {/* Header — keep Bootstrap classes for look consistency */}
        <div className="modal-header px-4 py-2 border-bottom">
          <h5 className="modal-title">
            {modalMode === "edit" ? "Edit Education" : "Add Education"}
          </h5>
          <button type="button" className="btn-close" aria-label="Close" onClick={handleModalClose}></button>
        </div>

        {/* Body — your existing .edit-card / .edit-grid styles */}
<div className="rm-edu-body">
  <div className="p-4">
    <div className="edit-grid">
      <div className="">
        <label className="form-label">
          Degree Type <span className="text-danger">*</span>
        </label>
        <select
          className="form-select"
          value={form.degreeType}
          onChange={(e) => handleFormChange("degreeType", e.target.value)}
        >
          <option value="">Select Degree Type</option>
          {degreeTypeOptions.map((dt) => (
            <option key={dt.value} value={dt.value}>
              {dt.label}
            </option>
          ))}
        </select>
      </div>

      <div className="">
        <label className="form-label">
          Degree <span className="text-danger">*</span>
        </label>
        <input
          className="form-control"
          type="text"
          value={form.degree}
          onChange={(e) => handleFormChange("degree", e.target.value)}
        />
      </div>

      <div className="">
        <label className="form-label">
          Institution <span className="text-danger">*</span>
        </label>
        <input
          className="form-control"
          type="text"
          value={form.institution}
          onChange={(e) => handleFormChange("institution", e.target.value)}
        />
      </div>

      <div className="">
        <label className="form-label">Region/State</label>
        <input
          className="form-control"
          type="text"
          value={form.region}
          onChange={(e) => handleFormChange("region", e.target.value)}
        />
      </div>

      <div className="">
        <label className="form-label">
          Country <span className="text-danger">*</span>
        </label>
        <select
          className="form-select"
          value={form.country}
          onChange={(e) => handleFormChange("country", e.target.value)}
        >
          <option value="">Select Country</option>
          {countryOptions.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="">
        <label className="form-label">From Year</label>
        <input
          className="form-control"
          type="number"
          value={form.fromYear}
          onChange={(e) =>
            handleFormChange(
              "fromYear",
              e.target.value.replace(/\D/g, "").slice(0, 4)
            )
          }
          placeholder="e.g. 2019"
          min="1900"
          max="2100"
        />
      </div>

      <div className="">
        <label className="form-label">
          To Year <span className="text-danger">*</span>
        </label>
        <input
          className="form-control"
          type="number"
          value={form.toYear}
          onChange={(e) =>
            handleFormChange(
              "toYear",
              e.target.value.replace(/\D/g, "").slice(0, 4)
            )
          }
          placeholder="e.g. 2023"
          min="1900"
          max="2100"
        />
      </div>

      <div className="">
        <label className="form-label">Marks/CGPA/Percentage</label>
        <input
          className="form-control"
          type="text"
          value={form.marks}
          onChange={(e) =>
            handleFormChange("marks", e.target.value.replace(/[^\d.]/g, ""))
          }
          placeholder="e.g. 89%"

        />
      </div>

      {/* <div className="">
        <label className="form-label">CGPA</label>
        <input
          className="form-control"
          type="number"
          value={form.cgpa}
          onChange={(e) =>
            handleFormChange("cgpa", e.target.value.replace(/[^\d.]/g, ""))
          }
          placeholder="0 - 10"
          min="0"
          max="10"
          step="0.01"
        />
      </div> */}
    </div>

    <div className="mt-3">
      <label className="form-label">Description</label>
      <textarea
        className="form-control"
        value={form.description}
        onChange={(e) => handleFormChange("description", e.target.value)}
        rows={3}
      />
      <div className="mt-3 d-flex gap-3">
        <button className="btn btn-danger" onClick={handleSave}>
          Save
        </button>
        <button className="btn btn-outline-secondary" onClick={handleModalClose}>
          Cancel
        </button>
      </div>
    </div>
  </div>
</div>


        {/* Footer (empty—actions are inside .edit-card to match your current layout) */}
      </ReactModal>
    </div>
  );
}

export default Education;
