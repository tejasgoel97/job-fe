import axiosInstance from "@/utils/api/axiosInstance";
import { useEffect, useState } from "react";

const ContractTypeSelector = ({  initialExpertise, selectedExpertise, setSelectedExpertise }) => {
  const [expertiseData, setExpertiseData] = useState([]);
//   const [selectedExpertise, setSelectedExpertise] = useState({});
  const [newInputs, setNewInputs] = useState({}); // holds temp input values
  console.log("ss",selectedExpertise)
  console.log("ss",initialExpertise)
  useEffect(() => {
    const fetchExpertise = async () => {
      try {
        const res = await axiosInstance("/expertise/get-contract-type");
          console.log(res)
        const fetchedExpertise = res.data.contractType || [];
        console.log(fetchedExpertise)
      const updatedExpertise = [];

        const initialSelection = {};
        fetchedExpertise.forEach((cat) => {
          const existing = initialExpertise?.find((e) => e.name === cat.name);
                    const existingSubs = existing?.subTypes || [];
        const allSubs = [
          ...cat.subTypes.map((s) => s),
          ...existingSubs,
        ];
        const uniqueSubs = [...new Set(allSubs)].map((name) => ({ name }));

          initialSelection[cat.name] = {
            isSelected: !!existing,
            subTypes: existing?.subTypes || [],
          
          };
              updatedExpertise.push({
          ...cat,
          subTypes: uniqueSubs,
        });
          setNewInputs((prev) => ({
            ...prev,
            [cat.name]: { subTypes: "" },
          }));
        });
        console.log(updatedExpertise)
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
          subTypes: [],
         
        },
      };
    });
  };

  const toggleSubType = (catName, subName) => {
    setSelectedExpertise((prev) => {
      const currentSubs = prev[catName]?.subTypes || [];
      const updatedSubs = currentSubs.includes(subName)
        ? currentSubs.filter((s) => s !== subName)
        : [...currentSubs, subName];

      return {
        ...prev,
        [catName]: {
          ...prev[catName],
          subTypes: updatedSubs,
        },
      };
    });
  };



  const handleAddSubType = (e,catName) => { 
    e.preventDefault();
    const newSub = newInputs[catName]?.subTypes?.trim();
    if (!newSub) return;

    setExpertiseData((prev) =>
      prev.map((cat) =>
        cat.name === catName
          ? {
              ...cat,
              subTypes: [...cat.subTypes, { name: newSub }],
            }
          : cat
      )
    );
    console.log(catName, newSub)
    toggleSubType(catName, newSub)
    setNewInputs((prev) => ({
      ...prev,
      [catName]: {
        ...prev[catName],
        subTypes: "",
      },
    }));
  };

  console.log(expertiseData)
  console.log(selectedExpertise)
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

          {/* SubTypes & Processes */}
          {selectedExpertise[cat.name]?.isSelected && (
            <div className="ms-4 mt-2">
              {/* SubTypes */}
              <div>
                <label className="mb-1">
                  <strong>SubTypes:</strong>
                </label>
                {cat.subTypes.map((sub) => {
                  console.log(sub)
                  return(
                  <div key={sub.name} className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`sub-${cat.name}-${sub.name}`}
                      checked={
                        selectedExpertise[cat.name]?.subTypes?.includes(sub.name) || false
                      }
                      onChange={() => toggleSubType(cat.name, sub.name)}
                    />
                    <label className="form-check-label" htmlFor={`sub-${cat.name}-${sub.name}`}>
                      {sub.name}
                    </label>
                  </div>
                )})}

                {/* Add new subType */}
                <div className="d-flex mt-2 align-items-center gap-2">
                  <input
                    type="text"
                    placeholder="New SubType"
                    className="form-control form-control-sm"
                    value={newInputs[cat.name]?.subTypes || ""}
                    onChange={(e) =>
                      setNewInputs((prev) => ({
                        ...prev,
                        [cat.name]: {
                          ...prev[cat.name],
                          subTypes: e.target.value,
                        },
                      }))
                    }
                  />
                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={(e) => handleAddSubType(e,cat.name)}
                  >
                    Add
                  </button>
                </div>
              </div>

            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default ContractTypeSelector;
