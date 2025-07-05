import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchForm3 = ({ expertiseData }) => {
  const [selectedExpertise, setSelectedExpertise] = useState("all");
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const categories = expertiseData.map((exp) => exp.name);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // You can build query params or state here
    const query = new URLSearchParams({
      searchText: jobTitle,
      location,
      category: selectedExpertise,
    }).toString();

    navigate(`/job-list?${query}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="form-group col-lg-4 col-md-12 col-sm-12">
          <span className="icon flaticon-search-1"></span>
          <input
            type="text"
            name="jobTitle"
            placeholder="Job title, keywords, or company"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
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
            Find Jobs
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchForm3;
