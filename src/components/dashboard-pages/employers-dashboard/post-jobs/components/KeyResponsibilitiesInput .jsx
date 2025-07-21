import React, { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const KeyResponsibilitiesInput = ({ keyResponsibilities, setKeyResponsibilities }) => {
  useEffect(() => {
    if (typeof keyResponsibilities === "string") {
      setKeyResponsibilities([keyResponsibilities]);
    }
  }, [keyResponsibilities]);

  const handleChange = (index, value) => {
    const updated = [...keyResponsibilities];
    updated[index] = value;
    setKeyResponsibilities(updated);
  };

  const handleAdd = () => {
    setKeyResponsibilities([...keyResponsibilities, ""]);
  };

  const handleRemove = (index) => {
    if (keyResponsibilities.length <= 1) {
      toast.info("At least one key responsibility is required.", {
        className: "bg-primary text-white",
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    const updated = keyResponsibilities.filter((_, i) => i !== index);
    setKeyResponsibilities(updated);
  };

  return (
    <div className="form-group col-lg-12 col-md-12">
      <label>Key Responsibilities</label>
      {keyResponsibilities.map((item, index) => (
        <div key={index} className="d-flex align-items-center mb-2">
          <span className="me-2">{index + 1}.</span>
          <input
            type="text"
            className="form-control me-2"
            value={item}
            onChange={(e) => handleChange(index, e.target.value)}
            placeholder={`Responsibility ${index + 1}`}
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
        Add Responsibility
      </button>
    </div>
  );
};

export default KeyResponsibilitiesInput;
