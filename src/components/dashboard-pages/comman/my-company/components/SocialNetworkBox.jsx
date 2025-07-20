const SocialNetworkBox = ({ socialData, setSocialData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSocialData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="ls-widget">
      <div className="tabs-box">
        <div className="widget-title">
          <h4>Social Network</h4>
        </div>

        <div className="widget-content">
          <form className="default-form">
            <div className="row">
              {/* Facebook */}
              <div className="form-group col-lg-6 col-md-12">
                <label>Facebook</label>
                <input
                  type="text"
                  name="facebook"
                  placeholder="www.facebook.com/yourpage"
                  value={socialData.facebook || ""}
                  onChange={handleChange}
                />
              </div>

              {/* Twitter/X */}
              <div className="form-group col-lg-6 col-md-12">
                <label>X (Twitter)</label>
                <input
                  type="text"
                  name="x"
                  placeholder="www.twitter.com/yourhandle"
                  value={socialData.x || ""}
                  onChange={handleChange}
                />
              </div>

              {/* LinkedIn */}
              <div className="form-group col-lg-6 col-md-12">
                <label>LinkedIn</label>
                <input
                  type="text"
                  name="linkedin"
                  placeholder="www.linkedin.com/in/yourprofile"
                  value={socialData.linkedin || ""}
                  onChange={handleChange}
                />
              </div>

              {/* Instargram */}
              <div className="form-group col-lg-6 col-md-12">
                <label>Instargram</label>
                <input
                  type="text"
                  name="instagram"
                  placeholder="(now discontinued, optional)"
                  value={socialData.instagram || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SocialNetworkBox;
