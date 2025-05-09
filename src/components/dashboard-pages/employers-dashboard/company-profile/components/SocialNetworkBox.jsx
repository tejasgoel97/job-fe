import { useState } from "react";

const SocialNetworkBox = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Social links saved!");
    // You can integrate API call here if needed
  };
  return (
    <form className="default-form" onSubmit={handleSubmit}>
      <div className="row">
        {/* Facebook */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Facebook</label>
          <input
            type="text"
            name="facebook"
            value={formData.facebook}
            onChange={handleChange}
            placeholder="www.facebook.com/yourprofile"
          />
        </div>

        {/* Twitter */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Twitter</label>
          <input
            type="text"
            name="twitter"
            value={formData.twitter}
            onChange={handleChange}
            placeholder="www.twitter.com/yourprofile"
          />
        </div>

        {/* Linkedin */}
        <div className="form-group col-lg-6 col-md-12">
          <label>LinkedIn</label>
          <input
            type="text"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            placeholder="www.linkedin.com/in/yourprofile"
          />
        </div>

        {/* Instagram */}
        <div className="form-group col-lg-6 col-md-12">
          <label>Instagram</label>
          <input
            type="text"
            name="instagram"
            value={formData.instagram}
            onChange={handleChange}
            placeholder="www.instagram.com/yourprofile"
          />
        </div>
      </div>
    </form>
  );
};

export default SocialNetworkBox;
