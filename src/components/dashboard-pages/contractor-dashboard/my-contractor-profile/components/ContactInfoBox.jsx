import React, { useState } from "react";

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
];

const ContactInfoBox = ({ formData, setFormData }) => {

  const handleChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <form className="default-form">
      <div className="row">
        <div className="form-group col-lg-12 col-md-12">
          <label>Phone Number</label>
          <input
            type="text"
            placeholder="Enter 10 digit phone number"
            value={formData.phoneNumber}
            onChange={(e) => handleChange("phoneNumber", e.target.value)}
            required
          />
        </div>

        <div className="form-group col-lg-12 col-md-12">
          <label>Email</label>
          <input
            type="email"
            placeholder="Your contact email address"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            required
          />
        </div>

        <div className="form-group col-lg-12 col-md-12">
          <label>Address Line 1</label>
          <input
            type="text"
            value={formData.addressLine1}
            onChange={(e) => handleChange("addressLine1", e.target.value)}
            required
          />
        </div>

        <div className="form-group col-lg-12 col-md-12">
          <label>Address Line 2 (Optional)</label>
          <input
            type="text"
            value={formData.addressLine2}
            onChange={(e) => handleChange("addressLine2", e.target.value)}
          />
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>City</label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => handleChange("city", e.target.value)}
            required
          />
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>State</label>
          <select
            className="chosen-single form-select"
            value={formData.state}
            onChange={(e) => handleChange("state", e.target.value)}
            required
          >
            <option value="">Select a state</option>
            {indianStates.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Country</label>
          <select
            className="chosen-single form-select"
            value={formData.country}
            onChange={(e) => handleChange("country", e.target.value)}
            required
          >
            <option>India</option>
            <option>Australia</option>
            <option>Pakistan</option>
            <option>China</option>
            <option>Japan</option>
          </select>
        </div>

        <div className="form-group col-lg-6 col-md-12">
          <label>Google Map Link</label>
          <input
            type="text"
            value={formData.googleMapLink}
            onChange={(e) => handleChange("googleMapLink", e.target.value)}
            required
          />
        </div>
      </div>
    </form>
  );
};

export default ContactInfoBox;
