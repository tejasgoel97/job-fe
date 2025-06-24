import axiosInstance from "@/utils/api/axiosInstance";
import { init } from "aos";
import { useEffect, useState } from "react";

const JobAndContractExpertiseSelector = ({  initialExpertise, selectedExpertise, setSelectedExpertise }) => {
  const [expertiseData, setExpertiseData] = useState([]);
//   const [selectedExpertise, setSelectedExpertise] = useState({});
  const [newInputs, setNewInputs] = useState({}); // holds temp input values

  useEffect(() => {
    const fetchExpertise = async () => {
      try {
        const res = await axiosInstance("/company/get-my-company-info");

        const fetchedExpertise = res.data.company.expertise || [];
        console.log(fetchedExpertise)
      const updatedExpertise = [];

        const initialSelection = {};
        fetchedExpertise.forEach((cat) => {
          const existing = initialExpertise?.find((e) => e.category === cat.category);
                    const existingSubs = existing?.subcategories || [];
        const existingProcs = existing?.processes || [];
  const allSubs = [
          ...cat.subcategories.map((s) =>s),
          ...existingSubs,
        ];
        const uniqueSubs = [...new Set(allSubs)].map((name) => ({ name }));
        const allProcs = [
          ...cat.processes.map((p) => p),
          ...existingProcs,
        ];
        const uniqueProcs = [...new Set(allProcs)].map((name) => ({ name }));
          initialSelection[cat.category] = {
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
            [cat.category]: { subcategory: "", process: "" },
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

  const handleAddSubcategory = (catName) => {
    const newSub = newInputs[catName]?.subcategory?.trim();
    if (!newSub) return;

    setExpertiseData((prev) =>
      prev.map((cat) =>
        cat.category === catName
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

  const handleAddProcess = (catName) => {
    const newProc = newInputs[catName]?.process?.trim();
    if (!newProc) return;

    setExpertiseData((prev) =>
      prev.map((cat) =>
        cat.category === catName
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
        <div key={cat.category} className="border rounded p-2 mb-3">
          {/* Category Checkbox */}
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id={`cat-${cat.category}`}
              checked={selectedExpertise[cat.category]?.isSelected || false}
              onChange={() => toggleCategory(cat.category)}
            />
            <label className="form-check-label fw-bold" htmlFor={`cat-${cat.category}`}>
              {cat.category}
            </label>
          </div>

          {/* Subcategories & Processes */}
          {selectedExpertise[cat.category]?.isSelected && (
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
                      id={`sub-${cat.category}-${sub.name}`}
                      checked={
                        selectedExpertise[cat.category]?.subcategories?.includes(sub.name) || false
                      }
                      onChange={() => toggleSubcategory(cat.category, sub.name)}
                    />
                    <label className="form-check-label" htmlFor={`sub-${cat.category}-${sub.name}`}>
                      {sub.name}
                    </label>
                  </div>
                ))}

                {/* Add new subcategory */}
                {/* <div className="d-flex mt-2 align-items-center gap-2">
                  <input
                    type="text"
                    placeholder="New Subcategory"
                    className="form-control form-control-sm"
                    value={newInputs[cat.category]?.subcategory || ""}
                    onChange={(e) =>
                      setNewInputs((prev) => ({
                        ...prev,
                        [cat.category]: {
                          ...prev[cat.category],
                          subcategory: e.target.value,
                        },
                      }))
                    }
                  />
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => handleAddSubcategory(cat.category)}
                  >
                    Add
                  </button>
                </div> */}
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
                        id={`proc-${cat.category}-${proc.name}`}
                        checked={
                          selectedExpertise[cat.category]?.processes?.includes(proc.name) || false
                        }
                        onChange={() => toggleProcess(cat.category, proc.name)}
                      />
                      <label className="form-check-label" htmlFor={`proc-${cat.category}-${proc.name}`}>
                        {proc.name}
                      </label>
                    </div>
                  ))}

                  {/* Add new process */}
                  {/* <div className="d-flex mt-2 align-items-center gap-2">
                    <input
                      type="text"
                      placeholder="New Process"
                      className="form-control form-control-sm"
                      value={newInputs[cat.category]?.process || ""}
                      onChange={(e) =>
                        setNewInputs((prev) => ({
                          ...prev,
                          [cat.category]: {
                            ...prev[cat.category],
                            process: e.target.value,
                          },
                        }))
                      }
                    />
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => handleAddProcess(cat.category)}
                    >
                      Add
                    </button>
                  </div> */}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default JobAndContractExpertiseSelector;
