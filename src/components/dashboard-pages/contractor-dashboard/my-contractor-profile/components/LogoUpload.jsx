import { useRef, useState } from "react";
import axiosInstance from "@/utils/api/axiosInstance"; // use your instance

const MB = 1024 * 1024;

const LogoUpload = ({ companyLogo, setCompanyLogo }) => {
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(companyLogo || "");
  const [error, setError] = useState("");
  const [uploadStatus, setUploadStatus] = useState("");
  const inputRef = useRef(null);

  // Handle file select and validate
  const logImgHandler = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      setError("Only .jpg and .png files allowed.");
      return;
    }
    if (file.size > MB) {
      setError("Max file size is 1 MB.");
      return;
    }

    // Dimension validation
    const img = new window.Image();
    img.onload = () => {
      if (img.width < 330 || img.height < 300) {
        setError("Min size 330x300 px.");
        setLogoFile(null);
        setLogoPreview("");
        setCompanyLogo(null);
        return;
      }
      setError("");
      const url = URL.createObjectURL(file);
      setLogoPreview(url);
      setLogoFile(file);
      setUploadStatus("");
      // ---- AUTO UPLOAD on selection: uncomment this to auto-upload ----
      handleUpload(file);
    };
    img.onerror = () => setError("Invalid image file.");
    img.src = URL.createObjectURL(file);
  };

  // Upload to backend
  const handleUpload = async (file) => {
    if (!file) return;
    setUploadStatus("Uploading...");
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("source", "companyLogo");
      const res = await axiosInstance.post("/upload", formData);
      setUploadStatus("Uploaded!");
      setCompanyLogo(res.data.url); // Save CDN URL from backend
      setLogoPreview(res.data.url); // Preview now points to CDN url
      setLogoFile(null); // remove local file from state
    } catch (err) {
      setUploadStatus("Upload failed.");
      setError("Upload failed.");
    }
  };

  const handleRemove = () => {
    setLogoFile(null);
    setLogoPreview("");
    setCompanyLogo(null);
    setError("");
    setUploadStatus("");
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="uploading-outer">
      <div className="uploadButton">
        {logoPreview ? (
          <div
            style={{
              position: "relative",
              width: 140,
              minHeight: 160,
              background: "#fff",
              border: "1.5px solid #e2e3e6",
              borderRadius: 16,
              boxShadow: "0 2px 12px rgba(90,100,120,.09)",
              margin: "0 auto 10px",
              padding: 18,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {/* Cross button in top right */}
            <button
              type="button"
              className="btn btn-sm btn-danger"
              style={{
                position: "absolute",
                top: 4,
                right: 4,
                borderRadius: "50%",
                width: 28,
                height: 28,
                fontSize: 16,
                padding: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 2
              }}
              onClick={handleRemove}
              title="Remove"
            >×</button>
            {/* Logo preview */}
            <div
              style={{
                width: 90,
                height: 90,
                background: "#f5f7fa",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 12,
                boxShadow: "0 2px 8px rgba(80,130,200,.12)",
                border: "1.5px solid #f3f5f7",
                overflow: "hidden"
              }}
            >
              <img
                src={logoPreview}
                alt="Logo"
                style={{
                  width: 70,
                  height: 70,
                  objectFit: "contain",
                  borderRadius: "50%",
                  background: "transparent"
                }}
              />
            </div>
            {/* <div style={{ fontSize: 13, color: "#888", marginBottom: 4 }}>
              {logoFile ? logoFile.name : ""}
            </div> */}
            {/* Upload button (only if file not yet uploaded) */}
            {/* {logoFile && (
              <button
                className="theme-btn btn-sm"
                type="button"
                style={{ background: "#21b573", color: "#fff", marginTop: 4, fontSize: 14 }}
                onClick={() => handleUpload(logoFile)}
              >
                Upload
              </button>
            )} */}
            {/* Show upload status */}
            <div className="upload-status text-xs" style={{ marginTop: 4 }}>
              {uploadStatus}
            </div>
          </div>
        ) : (
          <>
            <input
              className="uploadButton-input"
              type="file"
              name="attachments[]"
              accept="image/png, image/jpeg"
              id="logo-upload"
              ref={inputRef}
              onChange={logImgHandler}
            />
            <label
              className="uploadButton-button ripple-effect"
              htmlFor="logo-upload"
            >
              {logoFile ? logoFile.name : "Browse Logo"}
            </label>
            <span className="uploadButton-file-name"></span>
          </>
        )}
      </div>
      {error && <div className="text-danger small mt-1">{error}</div>}
      <div className="text">
        Max file size is 1MB, Minimum dimension: 330x300 <br />
        Allowed: .jpg & .png
      </div>
    </div>
  );
};

export default LogoUpload;
