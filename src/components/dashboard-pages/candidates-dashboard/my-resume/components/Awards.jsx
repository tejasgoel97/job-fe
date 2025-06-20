import React, { useState } from "react";

const Awards = () => {
  const [awards, setAwards] = useState([
    {
      id: 1,
      title: "Perfect Attendance Programs",
      fromYear: "2012",
      toYear: "2014",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      editing: false,
    },
    {
      id: 2,
      title: "Top Performer Recognition",
      fromYear: "2010",
      toYear: "2012",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      editing: false,
    },
  ]);

  const handleEditToggle = (id) => {
    setAwards((prev) =>
      prev.map((award) =>
        award.id === id ? { ...award, editing: !award.editing } : award
      )
    );
  };

  const handleDelete = (id) => {
    setAwards((prev) => prev.filter((award) => award.id !== id));
  };

  const handleChange = (id, field, value) => {
    setAwards((prev) =>
      prev.map((award) =>
        award.id === id ? { ...award, [field]: value } : award
      )
    );
  };

  const handleAdd = () => {
    const newId = Date.now();
    setAwards((prev) => [
      ...prev,
      {
        id: newId,
        title: "",
        fromYear: "",
        toYear: "",
        description: "",
        editing: true,
      },
    ]);
  };

  const handleSave = (id) => {
    const current = awards.find((a) => a.id === id);
    if (!current.toYear.trim()) {
      alert("To Year is mandatory.");
      return;
    }
    setAwards((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, editing: false } : a
      )
    );
  };

  return (
    <div className="resume-outer theme-yellow">
      <div className="upper-title">
        <h4>Awards</h4>
        <button className="add-info-btn" onClick={handleAdd}>
          <span className="icon flaticon-plus"></span> Awards
        </button>
      </div>

      {awards.map((award) => (
        <div className="resume-block" key={award.id}>
          <div className="inner">
            <span className="name">{award.title?.[0] || "?"}</span>
            <div className="title-box">
              <div className="info-box">
                {award.editing ? (
                  <div>
                    <label>Award Title</label>
                    <input
                      type="text"
                      value={award.title}
                      onChange={(e) =>
                        handleChange(award.id, "title", e.target.value)
                      }
                    />
                  </div>
                ) : (
                  <h3>{award.title}</h3>
                )}
              </div>

              <div className="edit-box">
                {award.editing ? (
                  <div className="flex gap-2 items-center">
                    <div>
                      <label>From Year</label>
                      <input
                        type="text"
                        value={award.fromYear}
                        onChange={(e) =>
                          handleChange(award.id, "fromYear", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <label>
                        To Year <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        type="text"
                        value={award.toYear}
                        onChange={(e) =>
                          handleChange(award.id, "toYear", e.target.value)
                        }
                      />
                    </div>
                  </div>
                ) : (
                  <span className="year">
                    {award.fromYear} - {award.toYear}
                  </span>
                )}

                <div className="edit-btns">
                  <button
                    onClick={() =>
                      award.editing
                        ? handleSave(award.id)
                        : handleEditToggle(award.id)
                    }
                  >
                    <span
                      className={award.editing ? "la la-save" : "la la-pencil"}
                    ></span>
                  </button>
                  <button onClick={() => handleDelete(award.id)}>
                    <span className="la la-trash"></span>
                  </button>
                </div>
              </div>
            </div>

            <div className="text">
              {award.editing ? (
                <div>
                  <label>Description</label>
                  <textarea
                    value={award.description}
                    onChange={(e) =>
                      handleChange(award.id, "description", e.target.value)
                    }
                  />
                  <div style={{ marginTop: "10px" }}>
                    <button
                      style={{
                        backgroundColor: "#f4a300",
                        color: "#fff",
                        padding: "8px 16px",
                        fontWeight: "bold",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                      onClick={() => handleSave(award.id)}
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <p>{award.description}</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Awards;
