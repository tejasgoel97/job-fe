import React from "react";

const Experiences = ({ items: experiences, setItems: setExperiences }) => {
  const handleEditToggle = (id) => {
    setExperiences((prev) =>
      prev.map((exp) =>
        exp.id === id ? { ...exp, editing: !exp.editing } : exp
      )
    );
  };

  const handleDelete = (id) => {
    setExperiences((prev) => prev.filter((exp) => exp.id !== id));
  };

  const handleChange = (id, field, value) => {
    setExperiences((prev) =>
      prev.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    );
  };

  const handleAdd = () => {
    const newId = Date.now();
    setExperiences((prev) => [
      {
        id: newId,
        title: "",
        company: "",
        fromYear: "",
        toYear: "",
        description: "",
        editing: true,
      },
      ...prev,
    ]);
  };

  const handleSave = (id) => {
    const current = experiences.find((exp) => exp.id === id);
    if (!current.toYear.trim()) {
      alert("To Year is mandatory.");
      return;
    }
    setExperiences((prev) =>
      prev.map((exp) =>
        exp.id === id ? { ...exp, editing: false } : exp
      )
    );
  };

  return (
    <div className="resume-outer theme-blue">
      <div className="upper-title">
        <h4>Work & Experience</h4>
        <button className="add-info-btn" onClick={handleAdd}>
          <span className="icon flaticon-plus"></span> Add Work
        </button>
      </div>

      {experiences.map((exp) => (
        <div className="resume-block" key={exp.id}>
          <div className="inner">
            <span className="name">{exp.company?.[0] || "?"}</span>
            <div className="title-box">
              <div className="info-box">
                {exp.editing ? (
                  <>
                    <div>
                      <label>Job Title</label>
                      <input
                        type="text"
                        value={exp.title}
                        onChange={(e) =>
                          handleChange(exp.id, "title", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <label>Company</label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) =>
                          handleChange(exp.id, "company", e.target.value)
                        }
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <h3>{exp.title}</h3>
                    <span>{exp.company}</span>
                  </>
                )}
              </div>

              <div className="edit-box">
                {exp.editing ? (
                  <div className="flex gap-2 items-center">
                    <div>
                      <label>From Year</label>
                      <input
                        type="text"
                        value={exp.fromYear}
                        onChange={(e) =>
                          handleChange(exp.id, "fromYear", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <label>
                        To Year <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        type="text"
                        value={exp.toYear}
                        onChange={(e) =>
                          handleChange(exp.id, "toYear", e.target.value)
                        }
                        required
                      />
                    </div>
                  </div>
                ) : (
                  <span className="year">
                    {exp.fromYear} - {exp.toYear}
                  </span>
                )}

                {!exp.editing && <div className="edit-btns">
                  <button
                    onClick={() =>
                      exp.editing ? handleSave(exp.id) : handleEditToggle(exp.id)
                    }
                  >
                    <span
                      className={exp.editing ? "la la-save" : "la la-pencil"}
                    ></span>
                  </button>
                  <button onClick={() => handleDelete(exp.id)}>
                    <span className="la la-trash"></span>
                  </button>
                </div>}
              </div>
            </div>

            <div className="text">
              {exp.editing ? (
                <div>
                  <label>Description</label>
                  <textarea
                    value={exp.description}
                    onChange={(e) =>
                      handleChange(exp.id, "description", e.target.value)
                    }
                  />
                  <div style={{ marginTop: "10px" }}>
                    <button
                      style={{
                        backgroundColor: "#0a58ca",
                        color: "#fff",
                        padding: "8px 16px",
                        fontWeight: "bold",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                      onClick={() => handleSave(exp.id)}
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <p>{exp.description}</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Experiences;
