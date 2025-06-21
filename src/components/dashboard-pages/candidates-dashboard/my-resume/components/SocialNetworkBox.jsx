const SocialNetworkBox = ({ data, onChange }) => {
  return (
    <form className="default-form">
      <div className="row">
        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Facebook</label>
          <input
            type="text"
            name="facebook"
            placeholder="www.facebook.com/Invision"
            value={data.facebook}
            onChange={(e) => onChange("facebook", e.target.value)}
            required
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Twitter</label>
          <input
            type="text"
            name="twitter"
            placeholder=""
            value={data.twitter}
            onChange={(e) => onChange("twitter", e.target.value)}
            required
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Linkedin</label>
          <input type="text" name="linkedin" placeholder="" value={data.linkedin} onChange={(e) => onChange("linkedin", e.target.value)} required />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Google Plus</label>
          <input type="text" name="googlePlus" placeholder="" value={data.googlePlus} onChange={(e) => onChange("googlePlus", e.target.value)} required />
        </div>
      </div>
    </form>
  );
};

export default SocialNetworkBox;
