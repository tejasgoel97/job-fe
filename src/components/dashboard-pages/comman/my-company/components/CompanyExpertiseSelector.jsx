import { useEffect, useState } from "react";

const CompanyExpertiseSelector = ({  initialExpertise, selectedExpertise, setSelectedExpertise }) => {
  const [expertiseData, setExpertiseData] = useState([]);
//   const [selectedExpertise, setSelectedExpertise] = useState({});
  const [newInputs, setNewInputs] = useState({}); // holds temp input values
    console.log({initialExpertise})

  useEffect(() => {
    const fetchExpertise = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/expertise/get-all-expertise`);
        const data = await res.json();
        const fetchedExpertise = data.data.expertiseList || [];

      const updatedExpertise = [];

        const initialSelection = {};
        fetchedExpertise.forEach((cat) => {
          const existing = initialExpertise?.find((e) => e.category === cat.name);
                    const existingSubs = existing?.subcategories || [];
        const existingProcs = existing?.processes || [];
  const allSubs = [
          ...cat.subCategory.map((s) => s.name),
          ...existingSubs,
        ];
        const uniqueSubs = [...new Set(allSubs)].map((name) => ({ name }));
        const allProcs = [
          ...cat.keyProcesses.map((p) => p.name),
          ...existingProcs,
        ];
        const uniqueProcs = [...new Set(allProcs)].map((name) => ({ name }));
          initialSelection[cat.name] = {
            isSelected: !!existing,
            subcategories: existing?.subcategories || [],
            processes: existing?.processes || [],
          };
              updatedExpertise.push({
          ...cat,
          subCategory: uniqueSubs,
          keyProcesses: uniqueProcs,
        });
          setNewInputs((prev) => ({
            ...prev,
            [cat.name]: { subcategory: "", process: "" },
          }));
        });
    setExpertiseData(updatedExpertise);
        setSelectedExpertise(initialSelection);
      } catch (error) {
        console.error("Failed to load expertise", error);
      }
    };

    fetchExpertise();
  }, [initialExpertise]);

  const toggleCategory = (catName) => {
    setSelectedExpertise((prev) => {
      const isSelected = prev[catName]?.isSelected || false;
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
      const currentSubs = prev[catName]?.subcategories || [];
      const updatedSubs = currentSubs.includes(subName)
        ? currentSubs.filter((s) => s !== subName)
        : [...currentSubs, subName];

      return {
        ...prev,
        [catName]: {
          ...prev[catName],
          subcategories: updatedSubs,
        },
      };
    });
  };

  const toggleProcess = (catName, procName) => {
    setSelectedExpertise((prev) => {
      const currentProcs = prev[catName]?.processes || [];
      const updatedProcs = currentProcs.includes(procName)
        ? currentProcs.filter((p) => p !== procName)
        : [...currentProcs, procName];

      return {
        ...prev,
        [catName]: {
          ...prev[catName],
          processes: updatedProcs,
        },
      };
    });
  };

  const handleAddSubcategory = (e,catName) => { 
    e.preventDefault();
    const newSub = newInputs[catName]?.subcategory?.trim();
    if (!newSub) return;

    setExpertiseData((prev) =>
      prev.map((cat) =>
        cat.name === catName
          ? {
              ...cat,
              subCategory: [...cat.subCategory, { name: newSub }],
            }
          : cat
      )
    );
    console.log(catName, newSub)
    toggleSubcategory(catName, newSub)
    setNewInputs((prev) => ({
      ...prev,
      [catName]: {
        ...prev[catName],
        subcategory: "",
      },
    }));
  };

  const handleAddProcess = (e,catName) => {
        e.preventDefault();

    const newProc = newInputs[catName]?.process?.trim();
    if (!newProc) return;

    setExpertiseData((prev) =>
      prev.map((cat) =>
        cat.name === catName
          ? {
              ...cat,
              keyProcesses: [...cat.keyProcesses, { name: newProc }],
            }
          : cat
      )
    );

    setNewInputs((prev) => ({
      ...prev,
      [catName]: {
        ...prev[catName],
        process: "",
      },
    }));
  };

  return (
    <>
    <div>In expertise</div>
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
            <label className="form-check-label fw-bold" htmlFor={`cat-${cat.name}`}>
              {cat.name}
            </label>
          </div>

          {/* Subcategories & Processes */}
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
                      checked={
                        selectedExpertise[cat.name]?.subcategories?.includes(sub.name) || false
                      }
                      onChange={() => toggleSubcategory(cat.name, sub.name)}
                    />
                    <label className="form-check-label" htmlFor={`sub-${cat.name}-${sub.name}`}>
                      {sub.name}
                    </label>
                  </div>
                ))}

                {/* Add new subcategory */}
                <div className="d-flex mt-2 align-items-center gap-2">
                  <input
                    type="text"
                    placeholder="New Subcategory"
                    className="form-control form-control-sm"
                    value={newInputs[cat.name]?.subcategory || ""}
                    onChange={(e) =>
                      setNewInputs((prev) => ({
                        ...prev,
                        [cat.name]: {
                          ...prev[cat.name],
                          subcategory: e.target.value,
                        },
                      }))
                    }
                  />
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={(e) => handleAddSubcategory(e,cat.name)}
                  >
                    Add
                  </button>
                </div>
              </div>

              {/* Processes */}
              {cat.keyProcesses.length > 0 && (
                <div className="mt-3">
                  <label className="mb-1">
                    <strong>Processes:</strong>
                  </label>
                  {cat.keyProcesses.map((proc) => (
                    <div key={proc.name} className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`proc-${cat.name}-${proc.name}`}
                        checked={
                          selectedExpertise[cat.name]?.processes?.includes(proc.name) || false
                        }
                        onChange={() => toggleProcess(cat.name, proc.name)}
                      />
                      <label className="form-check-label" htmlFor={`proc-${cat.name}-${proc.name}`}>
                        {proc.name}
                      </label>
                    </div>
                  ))}

                  {/* Add new process */}
                  <div className="d-flex mt-2 align-items-center gap-2">
                    <input
                      type="text"
                      placeholder="New Process"
                      className="form-control form-control-sm"
                      value={newInputs[cat.name]?.process || ""}
                      onChange={(e) =>
                        setNewInputs((prev) => ({
                          ...prev,
                          [cat.name]: {
                            ...prev[cat.name],
                            process: e.target.value,
                          },
                        }))
                      }
                    />
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={(e) => handleAddProcess(e,cat.name)}
                    >
                      Add
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default CompanyExpertiseSelector;
