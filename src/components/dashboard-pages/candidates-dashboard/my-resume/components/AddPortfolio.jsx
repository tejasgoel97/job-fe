import { useRef, useState } from "react";
import axiosInstance from "@/utils/api/axiosInstance";

const MB = 1024 * 1024;

const AddPortfolio = ({
  profileImageURL,
  setProfileImageURL,
  cvFileURL,
  setCvFileURL,
}) => {
  const [profileError, setProfileError] = useState("");
  const [profilePreview, setProfilePreview] = useState(profileImageURL || "");
  const [profileFile, setProfileFile] = useState(null);
  const [profileUploadStatus, setProfileUploadStatus] = useState("");

  const [cvError, setCvError] = useState("");
  const [cvFileName, setCvFileName] = useState(
    cvFileURL ? getFileName(cvFileURL) : ""
  );
  const [cvPreview, setCvPreview] = useState(
    cvFileURL && isImage(cvFileURL) ? cvFileURL : ""
  );
  const [cvFile, setCvFile] = useState(null);
  const [cvUploadStatus, setCvUploadStatus] = useState("");

  const profileInputRef = useRef(null);
  const cvInputRef = useRef(null);

  function getFileName(url = "") {
    try {
      return decodeURIComponent(url.split("/").pop());
    } catch {
      return url;
    }
  }
  function isImage(filename = "") {
    return /\.(png|jpe?g)$/i.test(filename);
  }
  function isPDF(filename = "") {
    return /\.pdf$/i.test(filename);
  }
  function isWord(filename = "") {
    return /\.(docx?|DOCX?)$/i.test(filename);
  }

  // -------- Profile Image --------
  const handleProfileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const validTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      setProfileError("Only PNG or JPEG images are allowed.");
      return;
    }
    if (file.size > 1.5 * MB) {
      setProfileError("Max file size is 1.5 MB.");
      return;
    }
    setProfileError("");
    const url = URL.createObjectURL(file);
    setProfilePreview(url);
    setProfileFile(file);
    setProfileUploadStatus("");
  };

  const handleProfileRemove = () => {
    setProfilePreview("");
    setProfileFile(null);
    setProfileError("");
    setProfileUploadStatus("");
    setProfileImageURL(null);
    if (profileInputRef.current) profileInputRef.current.value = "";
  };

  const handleProfileUpload = async () => {
    if (!profileFile) return;
    setProfileUploadStatus("Uploading...");
    try {
      const formData = new FormData();
      formData.append("file", profileFile);
      formData.append("source", "profileImage");
      const res = await axiosInstance.post("/upload", formData);
      setProfileUploadStatus("Uploaded!");
      setProfileImageURL(res.data.url);
      setProfileFile(null);
    } catch (e) {
      setProfileUploadStatus("Upload failed.");
      setProfileError("Upload failed.");
    }
  };

  // -------- CV File --------
  const handleCVChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/png",
      "image/jpeg",
      "image/jpg",
    ];
    if (!validTypes.includes(file.type)) {
      setCvError("Allowed: PDF, Word (.doc/.docx), PNG, JPEG files only.");
      return;
    }
    if (file.size > 1.5 * MB) {
      setCvError("Max file size is 1.5 MB.");
      return;
    }
    setCvError("");
    setCvFileName(file.name);
    setCvFile(file);
    setCvUploadStatus("");
    if (file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setCvPreview(url);
    } else {
      setCvPreview("");
    }
  };

  const handleCVRemove = () => {
    setCvPreview("");
    setCvFileName("");
    setCvFile(null);
    setCvError("");
    setCvUploadStatus("");
    setCvFileURL(null);
    if (cvInputRef.current) cvInputRef.current.value = "";
  };

  const handleCVUpload = async () => {
    if (!cvFile) return;
    setCvUploadStatus("Uploading...");
    try {
      const formData = new FormData();
      formData.append("file", cvFile);
      formData.append("source", "cvFile");
      const res = await axiosInstance.post("/upload", formData);
      setCvUploadStatus("Uploaded!");
      setCvFileURL(res.data.url);
      setCvFile(null);
    } catch (e) {
      setCvUploadStatus("Upload failed.");
      setCvError("Upload failed.");
    }
  };

  // -------- CV Icon --------
  const renderCVIcon = () => {
    if (cvPreview) {
      return (
        <img
          src={cvPreview}
          alt="CV Preview"
          style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 8, border: "1px solid #eee" }}
        />
      );
    }
    return (
      <span className="icon flaticon-document" style={{ fontSize: 48, color: "#888" }} />
    );
  };

  // ----------- RENDER ----------
  return (
    <div className="uploading-resume">
      {/* Profile Image Upload */}
      <div className="uploadButton" style={{ width: "50%" }}>
        {profilePreview ? (
          <div
            className="cv-uploadButton"
            style={{
              height: 200,
              width: "100%",
              border: "2px dashed #ced4e1",
              borderRadius: 5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <span className="title" style={{ marginBottom: 12 }}>Profile Image</span>
            <img
              src={profilePreview}
              alt="Profile"
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                border: "1px solid #eee",
                objectFit: "cover",
                marginBottom: 20,
              }}
            />
            <div className="edit-btns mt-2" style={{ display: "flex", gap: 8 }}>
              <button type="button" onClick={handleProfileRemove} title="Delete">
                ❌
              </button>
              <button
                type="button"
                onClick={() => profileInputRef.current.click()}
                title="Edit"
              >
                <span className="icon flaticon-edit"></span>
              </button>
              {profileFile && (
                <button
                  type="button"
                  onClick={handleProfileUpload}
                  className="theme-btn btn-sm"
                  style={{ background: "#21b573", color: "#fff", marginLeft: 6 }}
                  title="Upload"
                >
                  Upload
                </button>
              )}
            </div>
            <div className="upload-status text-xs" style={{ marginTop: 6 }}>{profileUploadStatus}</div>
            <input
              className="uploadButton-input"
              type="file"
              accept="image/png, image/jpeg"
              ref={profileInputRef}
              onChange={handleProfileChange}
              style={{ display: "none" }}
            />
          </div>
        ) : (
          <div
            className="cv-uploadButton"
            onClick={() => profileInputRef.current.click()}
            style={{ height: 200, width: "100%", cursor: "pointer" }}
          >
            <input
              className="uploadButton-input"
              type="file"
              accept="image/png, image/jpeg"
              ref={profileInputRef}
              onChange={handleProfileChange}
              style={{ display: "none" }}
            />
            <span className="title">Profile Image</span>
            <span className="text">PNG or JPEG. Max 1.5 MB.</span>
            <span className="theme-btn">Upload Profile Image</span>
          </div>
        )}
        {profileError && (
          <div className="text-danger small mt-1">{profileError}</div>
        )}
      </div>

      {/* CV/Resume Upload */}
      <div className="uploadButton" style={{ width: "50%" }}>
        {cvFileURL || cvPreview || cvFileName ? (
          <div
            className="cv-uploadButton"
            style={{
              height: 200,
              width: "100%",
              border: "2px dashed #ced4e1",
              borderRadius: 5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <span className="title" style={{ marginBottom: 12 }}>CV / Resume</span>
            {renderCVIcon()}
            <div className="edit-btns mt-2" style={{ display: "flex", gap: 8 }}>
              <button type="button" onClick={handleCVRemove} title="Delete">
                ❌
              </button>
              <button type="button" onClick={() => cvInputRef.current.click()} title="Edit">
                <span className="icon flaticon-edit"></span>
              </button>
              {cvFile && (
                <button
                  type="button"
                  onClick={handleCVUpload}
                  className="theme-btn btn-sm"
                  style={{ background: "#21b573", color: "#fff", marginLeft: 6 }}
                  title="Upload"
                >
                  Upload
                </button>
              )}
            </div>
            <span className="small" style={{ marginTop: 8 }}>
              {cvFileName}
            </span>
            {cvFileURL && !cvPreview && (
              <a
                href={cvFileURL}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: 12, textDecoration: "underline" }}
              >
                View / Download
              </a>
            )}
            <div className="upload-status text-xs" style={{ marginTop: 6 }}>{cvUploadStatus}</div>
            <input
              className="uploadButton-input"
              type="file"
              accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, image/png, image/jpeg"
              ref={cvInputRef}
              onChange={handleCVChange}
              style={{ display: "none" }}
            />
          </div>
        ) : (
          <div
            className="cv-uploadButton"
            onClick={() => cvInputRef.current.click()}
            style={{ height: 200, width: "100%", cursor: "pointer" }}
          >
            <input
              className="uploadButton-input"
              type="file"
              accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, image/png, image/jpeg"
              ref={cvInputRef}
              onChange={handleCVChange}
              style={{ display: "none" }}
            />
            <span className="title">CV / Resume</span>
            <span className="text">PDF, Word, PNG, JPEG. Max 1.5 MB.</span>
            <span className="theme-btn">Upload CV</span>
          </div>
        )}
        {cvError && <div className="text-danger small mt-1">{cvError}</div>}
      </div>
    </div>
  );
};

export default AddPortfolio;
