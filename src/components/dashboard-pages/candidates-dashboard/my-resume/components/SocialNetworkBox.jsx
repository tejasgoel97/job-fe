const SocialNetworkBox = ({ data, onChange }) => {
  return (
    <form className="default-form">
      <div className="row">
        {/* Facebook */}
        <div className="form-group  col-md-12">
          <label>Facebook</label>
          <input
            type="text"
            name="facebook"
            placeholder="www.facebook.com/yourprofile"
            value={data.facebook}
            onChange={(e) => onChange("facebook", e.target.value)}
            required
          />
        </div>

        {/* X (Twitter) */}
        <div className="form-group  col-md-12">
          <label>X (Twitter)</label>
          <input
            type="text"
            name="x"
            placeholder="www.x.com/yourhandle"
            value={data.x}
            onChange={(e) => onChange("x", e.target.value)}
            required
          />
        </div>

        {/* Linkedin */}
        <div className="form-group  col-md-12">
          <label>LinkedIn</label>
          <input
            type="text"
            name="linkedin"
            placeholder="www.linkedin.com/in/yourprofile"
            value={data.linkedin}
            onChange={(e) => onChange("linkedin", e.target.value)}
            required
          />
        </div>

        {/* Instagram */}
        <div className="form-group  col-md-12">
          <label>Instagram</label>
          <input
            type="text"
            name="instagram"
            placeholder="www.instagram.com/yourhandle"
            value={data.instagram}
            onChange={(e) => onChange("instagram", e.target.value)}
            required
          />
        </div>
      </div>
    </form>
  );
};

export default SocialNetworkBox;
