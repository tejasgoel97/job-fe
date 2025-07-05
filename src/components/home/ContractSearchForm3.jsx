import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ContractorSearchForm3 = ({ expertiseData }) => {
  const [selectedExpertise, setSelectedExpertise] = useState("all");
  const [contractTitle, setContractTitle] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const categories = expertiseData.map((exp) => exp.name);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // You can build query params or state here
    const query = new URLSearchParams({
      searchText: contractTitle,
      location,
      category: selectedExpertise,
    }).toString();

    navigate(`/contract-list?${query}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="form-group col-lg-4 col-md-12 col-sm-12">
          <span className="icon flaticon-search-1"></span>
          <input
            type="text"
            name="contractTitle"
            placeholder="Contract title, keywords, or company"
            value={contractTitle}
            onChange={(e) => setContractTitle(e.target.value)}
          />
        </div>

        <div className="form-group col-lg-3 col-md-12 col-sm-12 location">
          <span className="icon flaticon-map-locator"></span>
          <input
            type="text"
            name="location"
            placeholder="City or postcode"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="form-group col-lg-3 col-md-12 col-sm-12 category">
          <span className="icon flaticon-briefcase"></span>
          <select
            className="chosen-single form-select"
            value={selectedExpertise}
            onChange={(e) => setSelectedExpertise(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group col-lg-2 col-md-12 col-sm-12 text-right">
          <button type="submit" className="theme-btn btn-style-one">
            Find Contracts
          </button>
        </div>
      </div>
    </form>
  );
};

export default ContractorSearchForm3;
