import Select from "react-select";

const countryOptions = [
  { value: "India", label: "India" },
  { value: "United States", label: "United States" },
  { value: "United Kingdom", label: "United Kingdom" },
  { value: "Australia", label: "Australia" },
  { value: "Canada", label: "Canada" },
  { value: "Germany", label: "Germany" },
  { value: "France", label: "France" },
  { value: "Italy", label: "Italy" },
  { value: "Spain", label: "Spain" },
  { value: "China", label: "China" },
  { value: "Japan", label: "Japan" },
  { value: "Russia", label: "Russia" },
  { value: "Brazil", label: "Brazil" },
  { value: "South Africa", label: "South Africa" },
  { value: "Singapore", label: "Singapore" },
  { value: "Malaysia", label: "Malaysia" },
  { value: "Pakistan", label: "Pakistan" },
  { value: "Bangladesh", label: "Bangladesh" },
  { value: "Nepal", label: "Nepal" },
  { value: "Sri Lanka", label: "Sri Lanka" },
  { value: "Indonesia", label: "Indonesia" },
  { value: "Philippines", label: "Philippines" },
  { value: "Turkey", label: "Turkey" },
  { value: "Saudi Arabia", label: "Saudi Arabia" },
  { value: "United Arab Emirates", label: "United Arab Emirates" },
  { value: "Netherlands", label: "Netherlands" },
  { value: "Sweden", label: "Sweden" },
  { value: "Norway", label: "Norway" },
  { value: "Switzerland", label: "Switzerland" },
  { value: "Denmark", label: "Denmark" },
  { value: "Mexico", label: "Mexico" },
  { value: "Argentina", label: "Argentina" },
  { value: "Chile", label: "Chile" },
  { value: "Egypt", label: "Egypt" },
  { value: "Nigeria", label: "Nigeria" },
  { value: "South Korea", label: "South Korea" },
  { value: "Thailand", label: "Thailand" },
  { value: "Poland", label: "Poland" },
  { value: "Greece", label: "Greece" },
  { value: "Other", label: "Other" },
];

const ContactInfoBox = ({ data, onChange }) => {
  return (
    <form className="default-form" autoComplete="off">
      <div className="row">
        <div className="form-group col-lg-12 col-md-12">
          <label>Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            pattern="[0-9]*"
            maxLength={15}
            placeholder="Enter phone number"
            value={data.phoneNumber}
            onChange={(e) => {
              // Only allow digits
              const val = e.target.value.replace(/\D/g, "");
              onChange("phoneNumber", val);
            }}
            required
            autoComplete="off"
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
            autoComplete="off"
          />
        </div>

        <div className="form-group col-lg-12 col-md-12">
          <label>Address Line 1</label>
          <input
            type="text"
            name="addressLine1"
            placeholder=""
            value={data.addressLine1}
            onChange={(e) => onChange("addressLine1", e.target.value)}
            required
            autoComplete="off"
          />
        </div>
        <div className="form-group col-lg-12 col-md-12">
          <label>Address Line 2 (Optional)</label>
          <input
            type="text"
            name="addressLine2"
            placeholder="Optional"
            value={data.addressLine2}
            onChange={(e) => onChange("addressLine2", e.target.value)}
            autoComplete="off"
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
            autoComplete="off"
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>State</label>
          <input
            type="text"
            name="state"
            placeholder=""
            value={data.state}
            onChange={(e) => onChange("state", e.target.value)}
            required
            autoComplete="off"
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Country</label>
          <Select
            classNamePrefix="select"
            options={countryOptions}
            isSearchable
            value={countryOptions.find((c) => c.label === data.country) || null}
            onChange={(option) => onChange("country", option ? option.label : "")}
            placeholder="Select country"
            name="country"
            required
          />
        </div>
        <div className="form-group col-lg-6 col-md-12">
          <label>Pin Code / Zip Code</label>
          <input
            type="text"
            name="pinCode"
            pattern="[0-9]*"
            maxLength={10}
            placeholder="Enter pin/zip code"
            value={data.pinCode}
            onChange={(e) => {
              // Only allow numbers
              const val = e.target.value.replace(/\D/g, "");
              onChange("pinCode", val);
            }}
            required
            autoComplete="off"
          />
        </div>
      </div>
    </form>
  );
};

export default ContactInfoBox;
