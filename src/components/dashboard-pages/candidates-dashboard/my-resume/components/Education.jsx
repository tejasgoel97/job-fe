import React, { useState } from "react";

const Education = () => {
  const [educations, setEducations] = useState([
    {
      id: 1,
      degree: "Bachelors in Fine Arts",
      institution: "Modern College",
      fromYear: "2012",
      toYear: "2014",
      description: "Lorem ipsum dolor sit amet...",
      editing: false,
    },
    {
      id: 2,
      degree: "Computer Science",
      institution: "Harvard University",
      fromYear: "2008",
      toYear: "2012",
      description: "Lorem ipsum dolor sit amet...",
      editing: false,
    },
  ]);

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
      ...prev,
      {
        id: newId,
        degree: "",
        institution: "",
        fromYear: "",
        toYear: "",
        description: "",
        editing: true,
      },
    ]);
  };

  const handleSave = (id) => {
    const current = educations.find((edu) => edu.id === id);
    if (!current.toYear.trim()) {
      alert("To Year is mandatory.");
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
            <div className="title-box">
              <div className="info-box">
                {edu.editing ? (
                  <>
                    <div>
                      <label>Degree</label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) =>
                          handleChange(edu.id, "degree", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <label>Institution</label>
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) =>
                          handleChange(edu.id, "institution", e.target.value)
                        }
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <h3>{edu.degree}</h3>
                    <span>{edu.institution}</span>
                  </>
                )}
              </div>

              <div className="edit-box">
                {edu.editing ? (
                  <div className="flex gap-2 items-center">
                    <div>
                      <label>From Year</label>
                      <input
                        type="text"
                        value={edu.fromYear}
                        onChange={(e) =>
                          handleChange(edu.id, "fromYear", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <label>To Year<span style={{ color: "red" }}>*</span></label>
                      <input
                        type="text"
                        value={edu.toYear}
                        onChange={(e) =>
                          handleChange(edu.id, "toYear", e.target.value)
                        }
                        required
                      />
                    </div>
                  </div>
                ) : (
                  <span className="year">{edu.fromYear} - {edu.toYear}</span>
                )}
                {!edu.editing  &&<div className="edit-btns">
                  <button onClick={() => (edu.editing ? handleSave(edu.id) : handleEditToggle(edu.id))}>
                    <span className={edu.editing ? "la la-save" : "la la-pencil"}></span>
                  </button>
                  <button onClick={() => handleDelete(edu.id)}>
                    <span className="la la-trash"></span>
                  </button>
                </div> } 
              </div>
            </div>

            <div className="text">
              {edu.editing ? (
                <div>
                  <label>Description</label>
                  <textarea
                    value={edu.description}
                    onChange={(e) =>
                      handleChange(edu.id, "description", e.target.value)
                    }
                  />
                  <div style={{ marginTop: "10px" }}>
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
                  </div>
                </div>
              ) : (
                <p>{edu.description}</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Education;
