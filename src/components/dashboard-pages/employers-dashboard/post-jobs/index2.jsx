import { useEffect, useState } from "react";

const Index2 = ({ jobId, mode, initialData }) => {
  const [expertiseData, setExpertiseData] = useState([]);
  const [selectedExpertise, setSelectedExpertise] = useState({});

  useEffect(() => {
    const fetchExpertise = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/expertise/get-all-expertise`);
        const data = await res.json();
        const fetchedExpertise = data.data.expertiseList || [];

        setExpertiseData(fetchedExpertise);

        const initialSelection = {};

        fetchedExpertise.forEach((cat) => {
          const existing = initialData?.expertise?.find((e) => e.category === cat.name);

          initialSelection[cat.name] = {
            isSelected: !!existing,
            subcategories: existing?.subcategories || [],
            processes: existing?.processes || [],
          };
        });

        setSelectedExpertise(initialSelection);
      } catch (error) {
        console.error("Failed to load expertise", error);
      }
    };

    fetchExpertise();
  }, [initialData]);

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

  return (
    <>
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
              {cat.subCategory.length > 0 && (
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
                </div>
              )}

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
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default Index2;
