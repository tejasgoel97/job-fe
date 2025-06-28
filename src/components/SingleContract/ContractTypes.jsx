import React from "react";
import "./Expertise.css";

const ContractTypes = ({ jobTypes }) => {
    console.log(jobTypes)
  return (
    <div className="expertise-section my-10">
      <h2 className="expertise-section-title">Required Contract Types</h2>
      <div className="expertise-grid">
        {jobTypes && jobTypes.length > 0 ? (
          jobTypes.map((category) => (
            <div key={category._id} className="expertise-category-card">
              <h4 className="expertise-category-title">{category.name}</h4>

              {category.subTypes.length > 0 && (
                <div className="expertise-subsection">
                  <div className="expertise-subsection-title">
                    Subcategories
                  </div>
                  <div className="badge-container">
                    {category.subTypes.map((sub, i) => (
                      <span key={i} className="expertise-badge">
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {category.processes && category.processes.length > 0 && (
                <div className="expertise-subsection">
                  <div className="expertise-subsection-title">Processes</div>
                  <div className="badge-container">
                    {category.processes.map((proc, i) => (
                      <span key={i} className="expertise-badge process-badge">
                        {proc}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No expertise information available.</p>
        )}
      </div>
    </div>
  );
};

export default ContractTypes;
