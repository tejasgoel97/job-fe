import useAuthStore from "@/utils/authStoreZusland";
import { useState, useEffect } from "react";

const contractTypeOptions = [
  "Full Time",
  "Part Time",
  "Contract",
  "Shift Work",
  "Apprenticeship",
];
const countryOptions = ["USA", "India", "China", "Germany", "Japan"];
const cityOptions = ["Pittsburgh", "Mumbai", "Shanghai", "Dusseldorf", "Tokyo"];

const PostContractBoxForm = ({ contractId, mode, initialData }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [experience, setExperience] = useState("");
  const [contractType, setContractType] = useState("");
  const [address, setAddress] = useState({
    country: "",
    city: "",
    fullAddress: "",
  });
  const [facilities, setFacilities] = useState({
    canteen: false,
    accommodation: false,
    transportation: false,
    ppes: false,
    dress: false,
    medicalInsurance: false,
    others: [],
  });
  const [loading, setLoading] = useState(false);
  const { user } = useAuthStore();
  const [newFacility, setNewFacility] = useState("");

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setTitle(initialData.title || "");
      setDescription(initialData.description || "");
      setExperience(initialData.experience || "");
      setContractType(initialData.contractType || "");
      setAddress(initialData.address || { country: "", city: "", fullAddress: "" });
      setFacilities(initialData.facilities || {
        canteen: false,
        accommodation: false,
        transportation: false,
        ppes: false,
        dress: false,
        medicalInsurance: false,
        others: [],
      });
    }
  }, [mode, initialData]);

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFacilities(prev => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleAddFacility = () => {
    if (newFacility.trim()) {
      setFacilities(prev => ({
        ...prev,
        others: [...prev.others, newFacility.trim()]
      }));
      setNewFacility("");
    }
  };

  const handleRemoveFacility = (indexToRemove) => {
    setFacilities(prev => ({
      ...prev,
      others: prev.others.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("Please login to post a contract");
      return;
    }

    const finalFormData = {
      title,
      description,
      experience,
      contractType,
      address,
      facilities,
      createdBy: user.id,
      email: user.email,
    };

    console.log("Submitting Contract Data:", finalFormData);
    setLoading(true);

    try {
      const url =
        mode === "edit"
          ? `http://localhost:3000/api/contracts/update-contract/${contractId}`
          : `http://localhost:3000/api/contracts/create-contract`;
      const method = mode === "edit" ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(finalFormData),
      });

      const result = await response.json();

      if (response.ok) {
        alert(
          mode === "edit"
            ? "Contract updated successfully!"
            : "Contract posted successfully!"
        );
        // Reset form if needed
      } else {
        alert(result.message || "Failed to submit contract");
      }
    } catch (error) {
      console.error("Error submitting contract:", error);
      alert("An error occurred while submitting the contract");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="default-form" onSubmit={handleSubmit}>
      <div className="row">
        {/* Contract Title */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Contract Title</label>
          <input
            type="text"
            name="title"
            placeholder="Title of the contract"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Contract Description */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Contract Description</label>
          <textarea
            name="description"
            placeholder="Describe the contract requirements..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Contract Type */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Contract Type</label>
          <select
            className="chosen-single form-select"
            value={contractType}
            onChange={(e) => setContractType(e.target.value)}
          >
            <option value="">Select</option>
            {contractTypeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Min Experience */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Min Experience (Years)</label>
          <input
            type="number"
            name="experience"
            placeholder="e.g., 5"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            min="0"
          />
        </div>

        {/* Facilities */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Facilities Provided</label>
          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-12 form-group">
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="canteen" name="canteen" checked={facilities.canteen} onChange={handleCheckboxChange} />
                <label className="form-check-label" htmlFor="canteen">Canteen</label>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 form-group">
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="accommodation" name="accommodation" checked={facilities.accommodation} onChange={handleCheckboxChange} />
                <label className="form-check-label" htmlFor="accommodation">Accommodation</label>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 form-group">
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="transportation" name="transportation" checked={facilities.transportation} onChange={handleCheckboxChange} />
                <label className="form-check-label" htmlFor="transportation">Transportation</label>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 form-group">
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="ppes" name="ppes" checked={facilities.ppes} onChange={handleCheckboxChange} />
                <label className="form-check-label" htmlFor="ppes">PPEs</label>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 form-group">
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="dress" name="dress" checked={facilities.dress} onChange={handleCheckboxChange} />
                <label className="form-check-label" htmlFor="dress">Dress</label>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 form-group">
              <div className="form-check">
                <input type="checkbox" className="form-check-input" id="medicalInsurance" name="medicalInsurance" checked={facilities.medicalInsurance} onChange={handleCheckboxChange} />
                <label className="form-check-label" htmlFor="medicalInsurance">Medical Insurance</label>
              </div>
            </div>
          </div>
          {/* Other Facilities Section */}
          <div className="form-group mt-3">
            <label>Other Facilities</label>
            {facilities.others.map((facility, index) => (
              <div key={index} className="d-flex align-items-center mb-2">
                <input
                  type="text"
                  className="form-control"
                  value={facility}
                  readOnly
                />
                <button
                  type="button"
                  className="btn btn-danger ms-2"
                  onClick={() => handleRemoveFacility(index)}
                >
                  &times;
                </button>
              </div>
            ))}
            <div className="d-flex align-items-center">
              <input
                type="text"
                className="form-control"
                placeholder="Specify and add another facility"
                value={newFacility}
                onChange={(e) => setNewFacility(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddFacility())}
              />
              <button
                type="button"
                className="btn btn-primary ms-2"
                onClick={handleAddFacility}
              >
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Address Details */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Address Details</label>
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Country</label>
          <select
            className="chosen-single form-select"
            value={address.country}
            onChange={(e) => setAddress({...address, country: e.target.value})}
          >
            <option value="">Select</option>
            {countryOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>City</label>
          <select
            className="chosen-single form-select"
            value={address.city}
            onChange={(e) => setAddress({...address, city: e.target.value})}
          >
            <option value="">Select</option>
            {cityOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group col-lg-12 col-md-12">
          <label>Complete Address</label>
          <input
            type="text"
            name="fullAddress"
            placeholder="Enter full address"
            value={address.fullAddress}
            onChange={(e) => setAddress({...address, fullAddress: e.target.value})}
          />
        </div>

        <div className="form-group col-lg-12 col-md-12 text-right">
          <button type="submit" className="theme-btn btn-style-one" disabled={loading}>
            {loading ? "Submitting..." : "Submit Contract"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default PostContractBoxForm;