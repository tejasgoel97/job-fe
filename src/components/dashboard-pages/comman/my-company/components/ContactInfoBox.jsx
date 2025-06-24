const ContactInfoBox = ({ contactData, setContactData, errors = {} }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="default-form">
      <div className="row">
        {/* Country */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Country</label>
          <input
            type="text"
            name="country"
            value={contactData?.country || ""}
            onChange={handleChange}
            placeholder="e.g. India"
            required
          />
          {errors.country && (
            <div style={{ color: "red", marginTop: "5px" }}>
              {errors.country}
            </div>
          )}
        </div>

        {/* State */}
        <div className="form-group col-lg-6 col-md-12">
          <label>State</label>
          <input
            type="text"
            name="state"
            value={contactData?.state || ""}
            onChange={handleChange}
            placeholder="e.g. Maharashtra"
            required
          />
          {errors.state && (
            <div style={{ color: "red", marginTop: "5px" }}>{errors.state}</div>
          )}
        </div>

        {/* City */}
        <div className="form-group col-lg-6 col-md-12">
          <label>City</label>
          <input
            type="text"
            name="city"
            value={contactData?.city || ""}
            onChange={handleChange}
            placeholder="e.g. Mumbai"
            required
          />
          {errors.city && (
            <div style={{ color: "red", marginTop: "5px" }}>{errors.city}</div>
          )}
        </div>

        {/* Pin Code */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Pin Code</label>
          <input
            type="text"
            name="pinCode"
            value={contactData?.pinCode || ""}
            onChange={handleChange}
            placeholder="e.g. 400001"
            required
          />
          {errors.pinCode && (
            <div style={{ color: "red", marginTop: "5px" }}>
              {errors.pinCode}
            </div>
          )}
        </div>

        {/* Address Line 1 */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Address Line 1</label>
          <input
            type="text"
            name="addressLine1"
            value={contactData?.addressLine1 || ""}
            onChange={handleChange}
            placeholder="House No., Street Name"
            required
          />
          {errors.addressLine1 && (
            <div style={{ color: "red", marginTop: "5px" }}>
              {errors.addressLine1}
            </div>
          )}
        </div>

        {/* Address Line 2 */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Address Line 2 (Optional)</label>
          <input
            type="text"
            name="addressLine2"
            value={contactData?.addressLine2 || ""}
            onChange={handleChange}
            placeholder="Apartment, suite, etc."
          />
        </div>

        {/* Google Map Link */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Google Map Link (Optional)</label>
          <input
            type="text"
            name="googleMapLink"
            value={contactData?.googleMapLink || ""}
            onChange={handleChange}
            placeholder="Paste Google Map URL"
          />
          {errors.googleMapLink && (
            <div style={{ color: "red", marginTop: "5px" }}>
              {errors.googleMapLink}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactInfoBox;
