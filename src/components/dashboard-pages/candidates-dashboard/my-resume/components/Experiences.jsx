// Experience.tsx
import React, { useState } from "react";
import ModalShell from "./ModalShell";
import "./styles.css"; // your existing styles (edit-card, edit-grid, etc.)

function initForm(exp = null) {
  return exp
    ? { ...exp }
    : {
        title: "",
        company: "",
        location: "",
        fromYear: "",
        toYear: "",
        description: "",
      };
}

export default function Experience({ items: experiences, setItems: setExperiences }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState("");
  const [idx, setIdx] = useState(null);
  const [form, setForm] = useState(initForm());

  const openAdd = (e) => {
    e?.preventDefault?.();
    setMode("add");
    setForm(initForm());
    setIdx(null);
    setIsOpen(true);
  };

  const openEdit = (e,i) => {
    e?.preventDefault?.();
    setMode("edit");
    setForm(initForm(experiences[i]));
    setIdx(i);
    setIsOpen(true);
  };

  const close = () => {
    setMode("");
    setIdx(null);
    setForm(initForm());
    setIsOpen(false);
  };

  const handleChange = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const validate = (e) => {
    if (!e.title.trim()) return "Role/Title is mandatory.";
    if (!e.company.trim()) return "Company is mandatory.";
    if (!e.toYear.trim()) return "To Year is mandatory.";
    if (!/^\d{4}$/.test(e.toYear)) return "To Year must be a 4-digit year.";
    if (e.fromYear && !/^\d{4}$/.test(e.fromYear)) return "From Year must be a 4-digit year.";
    if (e.fromYear && +e.toYear < +e.fromYear) return "To Year cannot be before From Year.";
    return null;
  };

  const save = () => {
    const err = validate(form);
    if (err) return window.alert(err);

    if (mode === "add") {
      setExperiences((prev) => [{ ...form, id: Date.now() }, ...prev]);
    } else if (mode === "edit" && idx !== null) {
      setExperiences((prev) => prev.map((x, i) => (i === idx ? { ...form, id: x.id } : x)));
    }
    close();
  };

  const del = (i) => {
    if (window.confirm("Delete this experience?")) {
      setExperiences((prev) => prev.filter((_, j) => j !== i));
    }
  };

  return (
    <div className="resume-outer">
      <div className="upper-title d-flex align-items-center justify-content-between">
        <h4>Experience</h4>
        <button className="add-info-btn" onClick={openAdd}>
          <span className="icon flaticon-plus"></span> Add Experience
        </button>
      </div>

      {experiences.length === 0 && (
        <div className="alert alert-secondary">No experience added.</div>
      )}

      {experiences.map((exp, i) => (
        <div className="resume-block" key={exp.id}>
          <div className="inner">
            <span className="name">{exp.company?.[0] || "?"}</span>
            <div className="title-box">
              <div className="info-box">
                <h3>{exp.title}</h3>
                <span>
                  {exp.company}
                  {exp.location && `, ${exp.location}`}
                </span>
              </div>
              <div className="edit-box">
                <span className="year">
                  {exp.fromYear} - {exp.toYear}
                </span>
                <div className="edit-btns">
                  <button onClick={(e) => openEdit(e,i)}>
                    <span className="la la-pencil"></span>
                  </button>
                  <button onClick={() => del(i)}>
                    <span className="la la-trash"></span>
                  </button>
                </div>
              </div>
            </div>
            {exp.description && (
              <div className="text">
                <p>{exp.description}</p>
              </div>
            )}
          </div>
        </div>
      ))}

      {/* React-Modal via reusable shell, keeping your styles */}
      <ModalShell
        isOpen={isOpen}
        onRequestClose={close}
        title={mode === "edit" ? "Edit Experience" : "Add Experience"}
      >
        <div className="p-4">
          <div className="edit-grid">
            <div className="mb-3">
              <label className="form-label">
                Role/Title <span className="text-danger">*</span>
              </label>
              <input
                className="form-control"
                type="text"
                value={form.title}
                onChange={(e) => handleChange("title", e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                Company <span className="text-danger">*</span>
              </label>
              <input
                className="form-control"
                type="text"
                value={form.company}
                onChange={(e) => handleChange("company", e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Location</label>
              <input
                className="form-control"
                type="text"
                value={form.location}
                onChange={(e) => handleChange("location", e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">From Year</label>
              <input
                className="form-control"
                type="number"
                value={form.fromYear}
                onChange={(e) =>
                  handleChange("fromYear", e.target.value.replace(/\D/g, "").slice(0, 4))
                }
                placeholder="e.g. 2020"
                min="1900"
                max="2100"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">
                To Year <span className="text-danger">*</span>
              </label>
              <input
                className="form-control"
                type="number"
                value={form.toYear}
                onChange={(e) =>
                  handleChange("toYear", e.target.value.replace(/\D/g, "").slice(0, 4))
                }
                placeholder="e.g. 2024"
                min="1900"
                max="2100"
              />
            </div>
          </div>

          <div className="mt-3">
            <label className="form-label">Description</label>
            <textarea
              className="form-control"
              rows={3}
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
            <div className="mt-3 d-flex gap-3">
              <button className="btn btn-danger" onClick={save}>Save</button>
              <button className="btn btn-outline-secondary" onClick={close}>Cancel</button>
            </div>
          </div>
        </div>
      </ModalShell>
    </div>
  );
}
