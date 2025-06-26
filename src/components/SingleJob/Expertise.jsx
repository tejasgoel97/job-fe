import React from "react";
import "./Expertise.css";

const ExpertiseList = ({ expertise }) => {
  return (
    <div className="expertise-section my-10">
      <h2 className="expertise-section-title">Required Job Expertise</h2>
      <div className="expertise-grid">
        {expertise && expertise.length > 0 ? (
          expertise.map((category) => (
            <div key={category._id} className="expertise-category-card">
              <h4 className="expertise-category-title">{category.category}</h4>

              {category.subcategories.length > 0 && (
                <div className="expertise-subsection">
                  <div className="expertise-subsection-title">
                    Subcategories
                  </div>
                  <div className="badge-container">
                    {category.subcategories.map((sub, i) => (
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

export default ExpertiseList;
