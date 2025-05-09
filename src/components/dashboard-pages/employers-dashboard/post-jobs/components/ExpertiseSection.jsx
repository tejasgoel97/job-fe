import { useEffect, useState } from "react";

const ExpertiseSection = ({ initialData }) => {
  const [expertiseData, setExpertiseData] = useState([]);
  const [selectedExpertise, setSelectedExpertise] = useState({});
  const toggleCategory = (catName) => {
    setSelectedExpertise((prev) => {
      const isSelected = prev[catName].isSelected;
      return {
        ...prev,
        [catName]: {
          isSelected: !isSelected,
          subcategories: [],
          processes: [],
        },
      };
    });
  };
  const toggleSubcategory = (catName, subName) => {
    setSelectedExpertise((prev) => {
      const currentSubs = prev[catName].subcategories;
      const isSelected = currentSubs.includes(subName);

      return {
        ...prev,
        [catName]: {
          ...prev[catName],
          subcategories: isSelected
            ? currentSubs.filter((s) => s !== subName)
            : [...currentSubs, subName],
        },
      };
    });
  };

  const toggleProcess = (catName, procName) => {
    setSelectedExpertise((prev) => {
      const currentProcs = prev[catName].processes;
      const isSelected = currentProcs.includes(procName);

      return {
        ...prev,
        [catName]: {
          ...prev[catName],
          processes: isSelected
            ? currentProcs.filter((p) => p !== procName)
            : [...currentProcs, procName],
        },
      };
    });
  };

  useEffect(() => {
    const fetchExpertise = async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/api/expertise/get-all-expertise"
        );
        const data = await res.json();
        setExpertiseData(data.data.expertiseList);
        // Initial state setup
        const initialSelection = JSON.parse(JSON.stringify(initialData));
        data.data.expertiseList.forEach((cat) => {
          if (!initialSelection[cat.name]) {
            initialSelection[cat.name] = {
              isSelected: false,
              subcategories: [],
              processes: [],
            };
          } else {
            initialSelection[cat.name].isSelected = false;
          }
          cat.subCategory.forEach((sub) => {
            if (
              !initialSelection[cat.name].subcategories.find(
                (sc) => sc.name === sub.name
              )
            ) {
              initialSelection[cat.name].subcategories.push(sub);
            }
          });
        });
        setSelectedExpertise(initialSelection);
      } catch (error) {
        console.error("Failed to load expertise", error);
      }
    };

    fetchExpertise();
  }, []);
  return (
    <div className="form-group col-lg-12 col-md-12">
      <label>
        <strong>Expertise Selection</strong>
      </label>

      {expertiseData.map((cat) => (
        <div key={cat.name} className="border rounded p-2 mb-3">
          {/* Category Checkbox */}
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id={`cat-${cat.name}`}
              checked={selectedExpertise[cat.name]?.isSelected || false}
              onChange={() => toggleCategory(cat.name)}
            />
            <label
              className="form-check-label fw-bold"
              htmlFor={`cat-${cat.name}`}
            >
              {cat.name}
            </label>
          </div>

          {/* Subcategories and Processes appear ONLY if Category selected */}
          {selectedExpertise[cat.name]?.isSelected && (
            <div className="ms-4 mt-2">
              {/* Subcategories */}
              <div>
                <label className="mb-1">
                  <strong>Subcategories:</strong>
                </label>
                {cat.subCategory.map((sub) => (
                  <div key={sub.name} className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`sub-${cat.name}-${sub.name}`}
                      checked={selectedExpertise[cat.name]?.subcategories.find(
                        (sc) => sc.namesub.name
                      )}
                      onChange={() => toggleSubcategory(cat.name, sub.name)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={`sub-${cat.name}-${sub.name}`}
                    >
                      {sub.name}
                    </label>
                  </div>
                ))}
              </div>

              {/* Processes */}
              {cat.keyProcesses.length > 0 && (
                <div className="mt-2">
                  <label className="mb-1">
                    <strong>Processes:</strong>
                  </label>
                  {cat.keyProcesses.map((proc) => (
                    <div key={proc.name} className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`proc-${cat.name}-${proc.name}`}
                        checked={selectedExpertise[
                          cat.name
                        ]?.processes.includes(proc.name)}
                        onChange={() => toggleProcess(cat.name, proc.name)}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`proc-${cat.name}-${proc.name}`}
                      >
                        {proc.name}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ExpertiseSection;
