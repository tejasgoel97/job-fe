
const ContactInfoBox = ({ data, onChange }) => {
  return (
    <form className="default-form">
      <div className="row">
        <div className="form-group col-lg-12 col-md-12">
          <label>Phone Number</label>
          <input
            type="text"
            name="Phone Number"
            placeholder="Enter 10 digit phone number"
            value={data.phoneNumber}
            onChange={(e) => onChange("phoneNumber", e.target.value)}
            required
          />
        </div>
        <div className="form-group col-lg-12 col-md-12">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Your contact email address"
            value={data.email}
            onChange={(e) => onChange("email", e.target.value)}
            required
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Address Line 1</label>
          <input
            type="text"
            name="name"
            placeholder=""
            value={data.addressLine1}
            onChange={(e) => onChange("addressLine1", e.target.value)}
            required
          />
        </div>
        <div className="form-group col-lg-12 col-md-12">
          <label>Address Line 2 (Optional)</label>
          <input
            type="text"
            name="name"
            placeholder="Optional"
            value={data.addressLine2}
            onChange={(e) => onChange("addressLine2", e.target.value)}
            required
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>City</label>
          <input
            type="text"
            name="city"
            placeholder=""
            value={data.city}
            onChange={(e) => onChange("city", e.target.value)}
            required
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>State</label>
          <select
            className="chosen-single form-select"
            required
            value={data.city}
            onChange={(e) => onChange("city", e.target.value)}
          >
            <option>Haryana</option>
            <option>Delhi</option>
            <option>Uttar Pradesh</option>
            <option>Telangana</option>
            <option>Punjab</option>
          </select>
        </div>
        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Country</label>
          <select
            className="chosen-single form-select"
            required
            value={data.country}
            onChange={(e) => onChange("country", e.target.value)}
          >
            <option>Australia</option>
            <option>Pakistan</option>
            <option>Chaina</option>
            <option>Japan</option>
            <option>India</option>
          </select>
        </div>

        {/* <!-- Input --> */}

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Google Map Link</label>
          <input
            type="text"
            name="name"
            placeholder=""
            value={data.googleMapLink}
            onChange={(e) => onChange("googleMapLink", e.target.value)}
            required
          />
        </div>
      </div>
    </form>
  );
};

export default ContactInfoBox;
