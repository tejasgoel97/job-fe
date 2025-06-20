import { useState } from "react";
import Select from "react-select";
import axios from "axios";

const castingOptions = [
  { value: "Sand Casting", label: "Sand Casting" },
  { value: "Die Casting", label: "Die Casting" },
  { value: "Investment Casting", label: "Investment Casting" },
  { value: "Shell Molding", label: "Shell Molding" },
];

const FormInfoBox = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCastingChange = (selectedOptions) => {
    setFormData({ ...formData, typeOfCasting: selectedOptions });
  };

  return (
    <form className="default-form">
      <div className="row">
        {/* Company Name */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Company Name</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            placeholder="Enter company name"
            required
          />
        </div>

        {/* Address */}
        <div className="form-group col-lg-12 col-md-12">
          <label>About Company</label>
          <textarea
            name="aboutCompany"
            value={formData.aboutCompany}
            onChange={handleChange}
            placeholder="About the Company"
            required
          />
        </div>

        {/* GST No. */}
        <div className="form-group col-lg-6 col-md-12">
          <label>GST No.</label>
          <input
            type="text"
            name="gstNo"
            value={formData.gstNo}
            onChange={handleChange}
            placeholder="Enter GST Number"
          />
        </div>
        {/* Factory License No. */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Factory License No.</label>
          <input
            type="text"
            name="factoryLicenseNo"
            value={formData.factoryLicenseNo}
            onChange={handleChange}
            placeholder="Enter License Number"
          />
        </div>
        {/* Contact Details */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Contact Person</label>
          <input
            type="text"
            name="contactPerson"
            value={formData.contactPerson}
            onChange={handleChange}
            placeholder="Enter Contact Person Name"
            required
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Contact Phone Number</label>
          <input
            type="number"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            placeholder="Enter Contact Person Name"
            required
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter Contact email"
            required
          />
        </div>

        {/* Other Details */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Other Details</label>
          <textarea
            name="otherDetails"
            value={formData.otherDetails}
            onChange={handleChange}
            placeholder="Enter Other Details"
          />
        </div>

        {/* Type of Casting */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Type of Casting</label>
          <Select
            isMulti
            name="typeOfCasting"
            options={castingOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleCastingChange}
          />
        </div>

        {/* Manufacturing Capacity */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Manufacturing Capacity (Tons/Month)</label>
          <input
            type="number"
            name="manufacturingCapacity"
            value={formData.manufacturingCapacity}
            onChange={handleChange}
            placeholder="Enter Capacity"
          />
        </div>

        {/* Year of Establishment */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Year of Establishment</label>
          <input
            type="number"
            name="yearOfEstablishment"
            value={formData.yearOfEstablishment}
            onChange={handleChange}
            placeholder="e.g., 1995"
          />
        </div>

        {/* ISO Certifications */}
        <div className="form-group col-lg-12 col-md-12">
          <label>ISO Certification Details</label>
          <textarea
            name="isoCertifications"
            value={formData.isoCertifications}
            onChange={handleChange}
            placeholder="Enter ISO Certification details"
          />
        </div>

        {/* Key Products */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Key Products</label>
          <textarea
            name="keyProducts"
            value={formData.keyProducts}
            onChange={handleChange}
            placeholder="Enter Key Products"
          />
        </div>

        {/* Website */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Website</label>
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
            placeholder="Enter website URL"
          />
        </div>

        {/* Save Button */}
        <div className="form-group col-lg-6 col-md-12">
          <button type="submit" className="theme-btn btn-style-one">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormInfoBox;
