import React, { useState, useRef } from "react";

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

const months = [
  { value: "01", label: "Jan" }, { value: "02", label: "Feb" }, { value: "03", label: "Mar" }, { value: "04", label: "Apr" },
  { value: "05", label: "May" }, { value: "06", label: "Jun" }, { value: "07", label: "Jul" }, { value: "08", label: "Aug" },
  { value: "09", label: "Sep" }, { value: "10", label: "Oct" }, { value: "11", label: "Nov" }, { value: "12", label: "Dec" },
];
const years = Array.from({ length: 51 }, (_, i) => {
  const y = 1980 + i;
  return { value: String(y), label: String(y) };
});
const countryOptions = [
  "India", "USA", "UK", "Germany", "France", "Australia", "Canada",
  "China", "Japan", "Russia", "Brazil", "South Africa", "Italy", "Other"
];

function Experience({ items: exps, setItems: setExps }) {
  const [modalMode, setModalMode] = useState(""); // "add" or "edit"
  const [modalIdx, setModalIdx] = useState(null); // index of exp being edited
  const [form, setForm] = useState(initForm());
  const modalRef = useRef();

  function initForm(exp = null) {
    return exp
      ? { ...exp }
      : {
          title: "",
          company: "",
          region: "",
          country: "",
          fromMonth: "",
          fromYear: "",
          toMonth: "",
          toYear: "",
          achievements: [""],
          responsibilities: [""],
        };
  }

  function openAddModal() {
    setModalMode("add");
    setForm(initForm());
    setModalIdx(null);
    setTimeout(() => showBsModal(modalRef), 1);
  }
  function openEditModal(e,idx) {
    e.preventDefault()
    setModalMode("edit");
    setForm(initForm(exps[idx]));
    setModalIdx(idx);
    setTimeout(() => showBsModal(modalRef), 1);
  }

  function handleFormChange(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }
  function handlePointChange(field, idx, value) {
    setForm((f) => ({
      ...f,
      [field]: f[field].map((pt, i) => (i === idx ? value : pt)),
    }));
  }
  function handleAddPoint(field) {
    setForm((f) => ({ ...f, [field]: [...f[field], ""] }));
  }
  function handleRemovePoint(field, idx) {
    setForm((f) => ({
      ...f,
      [field]: f[field].filter((_, i) => i !== idx),
    }));
  }

  function validate(form) {
    if (!form.title.trim()) return "Job Title is  .";
    if (!form.company.trim()) return "Company Name is  .";
    if (!form.country.trim()) return "Country is  .";
    if (!form.fromMonth || !form.fromYear) return "From Date is  .";
    if (!form.toMonth || !form.toYear) return "To Date is  .";
    const fromDate = new Date(`${form.fromYear}-${form.fromMonth}-01`);
    const toDate = new Date(`${form.toYear}-${form.toMonth}-01`);
    if (toDate < fromDate) return "To Date cannot be before From Date.";
    if (!form.achievements.filter((pt) => pt.trim()).length)
      return "At least one Achievement is  .";
    if (!form.responsibilities.filter((pt) => pt.trim()).length)
      return "At least one Responsibility is  .";
    return null;
  }

  function handleSave() {
    const err = validate(form);
    if (err) {
      alert(err);
      return;
    }
    if (modalMode === "add") {
      setExps((prev) => [
        { ...form, id: Date.now() },
        ...prev,
      ]);
    } else if (modalMode === "edit" && modalIdx !== null) {
      setExps((prev) =>
        prev.map((exp, idx) =>
          idx === modalIdx ? { ...form, id: exp.id } : exp
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
    if (window.confirm("Delete this experience?")) {
      setExps((prev) => prev.filter((_, i) => i !== idx));
    }
  }

  return (
    <div className="resume-outer">
      <div className="upper-title d-flex align-items-center justify-content-between">
        <h4>Experience</h4>
        <button className="btn btn-sm btn-outline-primary" onClick={openAddModal}>
          <span className="icon flaticon-plus"></span> Add Experience
        </button>
      </div>
      {exps.length === 0 && (
        <div className="alert alert-secondary">No experience added.</div>
      )}
      {exps.map((exp, idx) => (
        <div className="resume-block" key={exp.id}>
          <div className="inner">
            <span className="name">{exp.company?.[0] || "?"}</span>
            <div className="title-box">
              <div className="info-box">
                <h3>{exp.title}</h3>
                <span>
                  {exp.company}
                  {exp.region && `, ${exp.region}`}
                  {exp.country && `, ${exp.country}`}
                </span>
              </div>
              <div className="edit-box">
                <span className="year">
                  {exp.fromMonth && months.find(m => m.value === exp.fromMonth)?.label} {exp.fromYear} -{" "}
                  {exp.toMonth && months.find(m => m.value === exp.toMonth)?.label} {exp.toYear}
                </span>
                <div className="edit-btns">
                  <button className="btn btn-link p-0" onClick={(e) => openEditModal(e,idx)}>
                    <span className="la la-pencil"></span>
                  </button>
                  <button className="btn btn-link text-danger p-0" onClick={() => handleDelete(idx)}>
                    <span className="la la-trash"></span>
                  </button>
                </div>
              </div>
            </div>
            <div className="my-2">
              <strong>Achievements:</strong>
              <ol className="ps-4">
                {exp.achievements.filter(Boolean).map((pt, idx) => (
                  <li key={idx}>{pt}</li>
                ))}
              </ol>
            </div>
            <div>
              <strong>Roles & Responsibilities:</strong>
              <ol className="ps-4">
                {exp.responsibilities.filter(Boolean).map((pt, idx) => (
                  <li key={idx}>{pt}</li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      ))}

      {/* Modal (styling and form same as previous inline form, now in modal) */}
      <div className="modal fade" tabIndex={-1} ref={modalRef}>
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{modalMode === "edit" ? "Edit Experience" : "Add Experience"}</h5>
              <button type="button" className="btn-close" onClick={handleModalClose}></button>
            </div>
            <div className="modal-body">
              <div className="row g-3">
                <div className="col-12 col-md-6">
                  <label className="form-label">Job Title <span className="text-danger">*</span></label>
                  <input className="form-control" value={form.title} onChange={e => handleFormChange("title", e.target.value)} />
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label">Company Name <span className="text-danger">*</span></label>
                  <input className="form-control" value={form.company} onChange={e => handleFormChange("company", e.target.value)} />
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label">Region/State</label>
                  <input className="form-control" value={form.region} onChange={e => handleFormChange("region", e.target.value)} />
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label">Country <span className="text-danger">*</span></label>
                  <select className="form-select" value={form.country} onChange={e => handleFormChange("country", e.target.value)}>
                    <option value="">Select Country</option>
                    {countryOptions.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label">From <span className="text-danger">*</span></label>
                  <div className="d-flex gap-2">
                    <select className="form-select" value={form.fromMonth} onChange={e => handleFormChange("fromMonth", e.target.value)} style={{ maxWidth: 100 }}>
                      <option value="">Month</option>
                      {months.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
                    </select>
                    <select className="form-select" value={form.fromYear} onChange={e => handleFormChange("fromYear", e.target.value)} style={{ maxWidth: 100 }}>
                      <option value="">Year</option>
                      {years.map(y => <option key={y.value} value={y.value}>{y.label}</option>)}
                    </select>
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <label className="form-label">To <span className="text-danger">*</span></label>
                  <div className="d-flex gap-2">
                    <select className="form-select" value={form.toMonth} onChange={e => handleFormChange("toMonth", e.target.value)} style={{ maxWidth: 100 }}>
                      <option value="">Month</option>
                      {months.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
                    </select>
                    <select className="form-select" value={form.toYear} onChange={e => handleFormChange("toYear", e.target.value)} style={{ maxWidth: 100 }}>
                      <option value="">Year</option>
                      {years.map(y => <option key={y.value} value={y.value}>{y.label}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* Achievements */}
              <div className="mt-4">
                <label className="form-label">
                  Achievements <span className="text-danger">*</span>
                  <span className="fw-normal text-secondary ms-2" style={{ fontSize: "0.95em" }}>(add 1 or more)</span>
                </label>
                {form.achievements.map((pt, idx) => (
                  <div className="d-flex align-items-center gap-2 mb-2" key={idx}>
                    <span className="fw-semibold text-secondary" style={{ minWidth: "2em", textAlign: "right" }}>{idx + 1}.</span>
                    <input type="text" className="form-control" value={pt} onChange={e => handlePointChange("achievements", idx, e.target.value)} placeholder={`Achievement ${idx + 1}`}   />
                    <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => handleRemovePoint("achievements", idx)} disabled={form.achievements.length === 1} title="Remove">&times;</button>
                  </div>
                ))}
                <button type="button" className="btn btn-sm btn-danger mt-1" onClick={() => handleAddPoint("achievements")}>+ Add Achievement</button>
              </div>

              {/* Responsibilities */}
              <div className="mt-4">
                <label className="form-label">
                  Roles & Responsibilities <span className="text-danger">*</span>
                  <span className="fw-normal text-secondary ms-2" style={{ fontSize: "0.95em" }}>(add 1 or more)</span>
                </label>
                {form.responsibilities.map((pt, idx) => (
                  <div className="d-flex align-items-center gap-2 mb-2" key={idx}>
                    <span className="fw-semibold text-secondary" style={{ minWidth: "2em", textAlign: "right" }}>{idx + 1}.</span>
                    <input type="text" className="form-control" value={pt} onChange={e => handlePointChange("responsibilities", idx, e.target.value)} placeholder={`Responsibility ${idx + 1}`}   />
                    <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => handleRemovePoint("responsibilities", idx)} disabled={form.responsibilities.length === 1} title="Remove">&times;</button>
                  </div>
                ))}
                <button type="button" className="btn btn-sm btn-danger mt-1" onClick={() => handleAddPoint("responsibilities")}>+ Add Role/Responsibility</button>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleModalClose}>Cancel</button>
              <button type="button" className="btn btn-danger" onClick={handleSave}>Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Experience;
