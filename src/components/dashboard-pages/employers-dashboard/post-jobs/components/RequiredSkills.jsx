import React, { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RequiredSkillsInput = ({ requiredSkills, setRequiredSkills }) => {
  useEffect(() => {
    if (typeof requiredSkills === "string") {
      setRequiredSkills([requiredSkills]);
    }
  }, [requiredSkills]);

  const handleChange = (index, value) => {
    const updated = [...requiredSkills];
    updated[index] = value;
    setRequiredSkills(updated);
  };

  const handleAdd = () => {
    setRequiredSkills([...requiredSkills, ""]);
  };

  const handleRemove = (index) => {
    if (requiredSkills.length <= 1) {
      toast.info("At least one required skill is needed.", {
        className: "bg-primary text-white",
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    const updated = requiredSkills.filter((_, i) => i !== index);
    setRequiredSkills(updated);
  };

  return (
    <div className="form-group col-lg-12 col-md-12">
      <label>Required Skills</label>
      {requiredSkills.map((item, index) => (
        <div key={index} className="d-flex align-items-center mb-2">
          <span className="me-2">{index + 1}.</span>
          <input
            type="text"
            className="form-control me-2"
            value={item}
            onChange={(e) => handleChange(index, e.target.value)}
            placeholder={`Required Skill ${index + 1}`}
          />
          <button
            type="button"
            className="btn btn-danger btn-sm"
            onClick={() => handleRemove(index)}
          >
            Delete
          </button>
        </div>
      ))}

      <button
        type="button"
        className="btn btn-primary btn-sm mt-2"
        onClick={handleAdd}
      >
        Add Required Skill
      </button>
    </div>
  );
};

export default RequiredSkillsInput;
