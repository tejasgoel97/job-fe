import React from "react";

// Bootstrap 5 required in your project

const showToast = (msg) => window.alert(msg);

const months = [
  { value: "01", label: "Jan" },
  { value: "02", label: "Feb" },
  { value: "03", label: "Mar" },
  { value: "04", label: "Apr" },
  { value: "05", label: "May" },
  { value: "06", label: "Jun" },
  { value: "07", label: "Jul" },
  { value: "08", label: "Aug" },
  { value: "09", label: "Sep" },
  { value: "10", label: "Oct" },
  { value: "11", label: "Nov" },
  { value: "12", label: "Dec" },
];

const years = Array.from({ length: 51 }, (_, i) => {
  const y = 1980 + i;
  return { value: String(y), label: String(y) };
});

const countryOptions = [
  "India", "USA", "UK", "Germany", "France", "Australia", "Canada",
  "China", "Japan", "Russia", "Brazil", "South Africa", "Italy", "Other"
];

const Experience = ({ items: exps, setItems: setExps }) => {
  const handleEditToggle = (id) => {
    setExps((prev) =>
      prev.map((exp) =>
        exp.id === id ? { ...exp, editing: !exp.editing } : exp
      )
    );
  };

  const handleDelete = (id) => {
    setExps((prev) => prev.filter((exp) => exp.id !== id));
  };

  const handleChange = (id, field, value) => {
    setExps((prev) =>
      prev.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    );
  };

  const handleAdd = () => {
    const newId = Date.now();
    setExps((prev) => [
      {
        id: newId,
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
        editing: true,
      },
      ...prev,
    ]);
  };

  const handlePointChange = (id, field, idx, value) => {
    setExps((prev) =>
      prev.map((exp) =>
        exp.id === id
          ? { ...exp, [field]: exp[field].map((pt, i) => (i === idx ? value : pt)) }
          : exp
      )
    );
  };

  const handleAddPoint = (id, field) => {
    setExps((prev) =>
      prev.map((exp) =>
        exp.id === id ? { ...exp, [field]: [...exp[field], ""] } : exp
      )
    );
  };

  const handleRemovePoint = (id, field, idx) => {
    setExps((prev) =>
      prev.map((exp) =>
        exp.id === id
          ? { ...exp, [field]: exp[field].filter((_, i) => i !== idx) }
          : exp
      )
    );
  };

  const validateExp = (exp) => {
    if (!exp.title.trim()) return "Job Title is required.";
    if (!exp.company.trim()) return "Company Name is required.";
    if (!exp.country.trim()) return "Country is required.";
    if (!exp.fromMonth || !exp.fromYear) return "From Date is required.";
    if (!exp.toMonth || !exp.toYear) return "To Date is required.";
    const fromDate = new Date(`${exp.fromYear}-${exp.fromMonth}-01`);
    const toDate = new Date(`${exp.toYear}-${exp.toMonth}-01`);
    if (toDate < fromDate)
      return "To Date cannot be before From Date.";
    if (!exp.achievements.filter(Boolean).length)
      return "At least one Achievement point is required.";
    if (!exp.responsibilities.filter(Boolean).length)
      return "At least one Role & Responsibility point is required.";
    return null;
  };

  const handleSave = (id) => {
    const current = exps.find((exp) => exp.id === id);
    const err = validateExp(current);
    if (err) {
      showToast(err);
      return;
    }
    setExps((prev) =>
      prev.map((exp) =>
        exp.id === id ? { ...exp, editing: false } : exp
      )
    );
  };

  return (
    <div className="resume-outer">
      <div className="upper-title">
        <h4>Experience</h4>
        <button className="btn btn-sm btn-outline-primary" onClick={handleAdd}>
          <span className="icon flaticon-plus"></span> Add Experience
        </button>
      </div>

      {exps.map((exp) => (
        <div className="resume-block" key={exp.id}>
          <div className="inner">
            <span className="name">{exp.company?.[0] || "?"}</span>
            {exp.editing ? (
              <div className="card shadow-sm rounded-4 p-4 mb-4">
                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <label className="form-label">
                      Job Title <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={exp.title}
                      onChange={(e) => handleChange(exp.id, "title", e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label">
                      Company Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={exp.company}
                      onChange={(e) => handleChange(exp.id, "company", e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label">Region/State</label>
                    <input
                      type="text"
                      className="form-control"
                      value={exp.region}
                      onChange={(e) => handleChange(exp.id, "region", e.target.value)}
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label">
                      Country <span className="text-danger">*</span>
                    </label>
                    <select
                      className="form-select"
                      value={exp.country}
                      onChange={(e) => handleChange(exp.id, "country", e.target.value)}
                      required
                    >
                      <option value="">Select Country</option>
                      {countryOptions.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label">
                      From <span className="text-danger">*</span>
                    </label>
                    <div className="d-flex gap-2">
                      <select
                        className="form-select"
                        value={exp.fromMonth}
                        onChange={e => handleChange(exp.id, "fromMonth", e.target.value)}
                        required
                        style={{ maxWidth: 100 }}
                      >
                        <option value="">Month</option>
                        {months.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
                      </select>
                      <select
                        className="form-select"
                        value={exp.fromYear}
                        onChange={e => handleChange(exp.id, "fromYear", e.target.value)}
                        required
                        style={{ maxWidth: 100 }}
                      >
                        <option value="">Year</option>
                        {years.map(y => <option key={y.value} value={y.value}>{y.label}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label">
                      To <span className="text-danger">*</span>
                    </label>
                    <div className="d-flex gap-2">
                      <select
                        className="form-select"
                        value={exp.toMonth}
                        onChange={e => handleChange(exp.id, "toMonth", e.target.value)}
                        required
                        style={{ maxWidth: 100 }}
                      >
                        <option value="">Month</option>
                        {months.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
                      </select>
                      <select
                        className="form-select"
                        value={exp.toYear}
                        onChange={e => handleChange(exp.id, "toYear", e.target.value)}
                        required
                        style={{ maxWidth: 100 }}
                      >
                        <option value="">Year</option>
                        {years.map(y => <option key={y.value} value={y.value}>{y.label}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <label className="form-label">
                    Achievements <span className="text-danger">*</span>
                    <span className="fw-normal text-secondary ms-2" style={{ fontSize: "0.95em" }}>(add 1 or more)</span>
                  </label>
                  {exp.achievements.map((pt, idx) => (
                    <div className="d-flex align-items-center gap-2 mb-2" key={idx}>
                      <span className="fw-semibold text-secondary" style={{ minWidth: "2em", textAlign: "right" }}>{idx + 1}.</span>
                      <input
                        type="text"
                        className="form-control"
                        value={pt}
                        onChange={e => handlePointChange(exp.id, "achievements", idx, e.target.value)}
                        placeholder={`Achievement ${idx + 1}`}
                        required
                      />
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleRemovePoint(exp.id, "achievements", idx)}
                        disabled={exp.achievements.length === 1}
                        title="Remove"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="btn btn-sm btn-danger mt-1"
                    onClick={() => handleAddPoint(exp.id, "achievements")}
                  >
                    + Add Achievement
                  </button>
                </div>
                <div className="mt-4">
                  <label className="form-label">
                    Roles & Responsibilities <span className="text-danger">*</span>
                    <span className="fw-normal text-secondary ms-2" style={{ fontSize: "0.95em" }}>(add 1 or more)</span>
                  </label>
                  {exp.responsibilities.map((pt, idx) => (
                    <div className="d-flex align-items-center gap-2 mb-2" key={idx}>
                      <span className="fw-semibold text-secondary" style={{ minWidth: "2em", textAlign: "right" }}>{idx + 1}.</span>
                      <input
                        type="text"
                        className="form-control"
                        value={pt}
                        onChange={e => handlePointChange(exp.id, "responsibilities", idx, e.target.value)}
                        placeholder={`Role/Responsibility ${idx + 1}`}
                        required
                      />
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleRemovePoint(exp.id, "responsibilities", idx)}
                        disabled={exp.responsibilities.length === 1}
                        title="Remove"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="btn btn-sm btn-danger mt-1"
                    onClick={() => handleAddPoint(exp.id, "responsibilities")}
                  >
                    + Add Role/Responsibility
                  </button>
                </div>
                <div className="mt-4 d-flex gap-3">
                  <button
                    className="btn btn-danger fw-bold px-4"
                    onClick={() => handleSave(exp.id)}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-light fw-bold px-4 border"
                    onClick={() => handleEditToggle(exp.id)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
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
                      <button className="btn btn-link p-0" onClick={() => handleEditToggle(exp.id)}>
                        <span className="la la-pencil"></span>
                      </button>
                      <button className="btn btn-link text-danger p-0" onClick={() => handleDelete(exp.id)}>
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
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Experience;
