import { init } from "aos";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchForm3 = ({ expertiseData, intialSearchText, initialLocation, intialExpertise }) => {
  const [selectedExpertise, setSelectedExpertise] = useState(intialExpertise);
  const [searchText, setSearchText] = useState(intialSearchText);
  const [location, setLocation] = useState(initialLocation);
  const navigate = useNavigate();

  const categories = expertiseData.map((exp) => exp.name);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // You can build query params or state here
    const query = new URLSearchParams({
      searchText: searchText,
      location,
      expertise: selectedExpertise,
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
            name="searchText"
            placeholder="Title, keywords, or company"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
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
            Find Contract
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchForm3;
