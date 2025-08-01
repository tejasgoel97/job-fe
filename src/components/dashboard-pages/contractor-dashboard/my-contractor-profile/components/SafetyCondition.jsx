import React, { useState } from "react";

// You can change these explanations as per your actual meanings
const STAR_MEANINGS = [
  "1 - Very Unsafe (Major safety issues, not suitable for work)",
  "2 - Unsafe (Multiple safety concerns, proceed with caution)",
  "3 - Average (Basic safety present, but could be improved)",
  "4 - Safe (Mostly safe, minor improvements possible)",
  "5 - Very Safe (Excellent safety conditions, no issues found)"
];

const SafetyConditionSection = ({  }) => {
  const [showInfo, setShowInfo] = useState(false);
  const [safetyCondition, setSafetyCondition] = useState(0); // [1, 2, 3, 4, 5

  return (
    <div className="form-group col-lg-12 col-md-12">
      <label className="fw-bold" style={{ fontSize: 16 }}>
        Safety Condition
        <span
          style={{ marginLeft: 8, color: "#21b573", cursor: "pointer" }}
          title="What do the stars mean?"
          onClick={() => setShowInfo(true)}
        >
<i className="bi bi-info-circle"></i>
            <i className="fas fa-info-circle fa-sm text-primary mb-2"></i>

        </span>
      </label>
      <div className="d-flex align-items-center my-2" style={{ gap: 4 }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => setSafetyCondition(star)}
            style={{
              cursor: "pointer",
              fontSize: 28,
              color: safetyCondition >= star ? "#f7b500" : "#e3e3e3",
              transition: "color 0.2s"
            }}
            title={STAR_MEANINGS[star - 1]}
          >
            ★
          </span>
        ))}
        <span style={{ marginLeft: 12, fontWeight: 500, color: "#333" }}>
          {safetyCondition
            ? STAR_MEANINGS[safetyCondition - 1]
            : "Click to rate"}
        </span>
      </div>

      {/* Popup/Modal for star explanation */}
      {showInfo && (
        <div
          className="modal d-block"
          tabIndex="-1"
          style={{ background: "rgba(0,0,0,0.2)" }}
          onClick={() => setShowInfo(false)}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content p-3">
              <div className="modal-header">
                <h5 className="modal-title">Safety Star Rating Explanation</h5>
                <button type="button" className="btn-close" onClick={() => setShowInfo(false)}></button>
              </div>
              <div className="modal-body">
                <ul className="mb-0">
                  {STAR_MEANINGS.map((desc, idx) => (
                    <li key={idx}>
                      <span style={{ color: "#f7b500", fontWeight: 700, marginRight: 6 }}>
                        {Array.from({ length: idx + 1 }).map((_, i) => "★")}
                      </span>
                      {desc.replace(/^\d+\s-\s/, "")}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SafetyConditionSection;
