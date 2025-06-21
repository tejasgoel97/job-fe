const AddPortfolio = ({ onFileSelect }) => {
  const handleFileChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      onFileSelect(event.target.files[0]);
    }
  };

  return (
    <div className="uploading-outer">
      <div className="uploadButton">
        <input
          className="uploadButton-input"
          type="file"
          name="attachments[]"
          accept="image/*, application/pdf"
          id="upload"
          onChange={handleFileChange}
        />
        <label className="uploadButton-button ripple-effect" htmlFor="upload">
          Upload CV
        </label>
        <span className="uploadButton-file-name"></span>
      </div>
    </div>
  );
};

export default AddPortfolio;
