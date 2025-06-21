import Map from "../../../Map";

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
        <div className="form-group col-lg-6 col-md-12">
          <label>City</label>
          <select
            className="chosen-single form-select"
            required
            value={data.city}
            onChange={(e) => onChange("city", e.target.value)}
          >
            <option>Melbourne</option>
            <option>Pakistan</option>
            <option>Chaina</option>
            <option>Japan</option>
            <option>India</option>
          </select>
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-12 col-md-12">
          <label>Complete Address</label>
          <input
            type="text"
            name="name"
            placeholder="329 Queensberry Street, North Melbourne VIC 3051, Australia."
            value={data.completeAddress}
            onChange={(e) => onChange("completeAddress", e.target.value)}
            required
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Google Map Link</label>
          <input
            type="text"
            name="name"
            placeholder="329 Queensberry Street, North Melbourne VIC 3051, Australia."
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
