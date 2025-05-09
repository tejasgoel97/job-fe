import { useState } from "react";

const indianStates = [
  "Maharashtra",
  "Karnataka",
  "Tamil Nadu",
  "Delhi",
  "Gujarat",
  "West Bengal",
  "Rajasthan",
  "Uttar Pradesh",
  "Telangana",
  "Punjab",
];

const indianCities = [
  "Mumbai",
  "Delhi",
  "Bengaluru",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Ahmedabad",
  "Pune",
  "Jaipur",
  "Lucknow",
];

const ContactInfoBox = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Contact Info Saved!");
    // You can call your API here (axios.post)
  };

  return (
    <form className="default-form" onSubmit={handleSubmit}>
      <div className="row">
        {/* Address Line 1 */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Address Line 1</label>
          <input
            type="text"
            name="addressLine1"
            value={formData.addressLine1}
            onChange={handleChange}
            placeholder="Plot number, street name"
          />
        </div>

        {/* Address Line 2 */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Address Line 2</label>
          <input
            type="text"
            name="addressLine2"
            value={formData.addressLine2}
            onChange={handleChange}
            placeholder="Apartment, suite, etc."
          />
        </div>

        {/* Country */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Country</label>
          <select
            className="chosen-single form-select"
            name="country"
            value={formData.country}
            disabled
          >
            <option value="India">India</option>
          </select>
        </div>

        {/* State */}
        <div className="form-group col-lg-6 col-md-12">
          <label>State</label>
          <select
            className="chosen-single form-select"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          >
            <option value="">Select State</option>
            {indianStates.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        {/* City */}
        <div className="form-group col-lg-6 col-md-12">
          <label>City</label>
          <select
            className="chosen-single form-select"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
          >
            <option value="">Select City</option>
            {indianCities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* Pin Code */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Pin Code</label>
          <input
            type="text"
            name="pinCode"
            value={formData.pinCode}
            onChange={handleChange}
            placeholder="Enter Pin Code"
            required
          />
        </div>

        {/* Complete Address */}

        {/* Google Map Link */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Google Map Link</label>
          <input
            type="text"
            name="googleMapLink"
            value={formData.googleMapLink}
            onChange={handleChange}
            placeholder="Paste Google Maps URL"
          />
        </div>

        {/* Save Button */}
        <div className="form-group col-lg-12 col-md-12">
          <button type="submit" className="theme-btn btn-style-one">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default ContactInfoBox;
