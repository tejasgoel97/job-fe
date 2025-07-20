import React, { useRef, useState } from "react";
import axiosInstance from "@/utils/api/axiosInstance";

// Section definitions
const sections = [
  { key: "mainGate", label: "Main Gate" },
  { key: "staffOffice", label: "Staff Office" },
  {
    key: "facilities", label: "Facilities", children: [
      { key: "canteen", label: "Canteen" },
      { key: "medical", label: "Medical" },
      { key: "transport", label: "Transport" },
    ]
  },
  { key: "machineries", label: "Machineries" },
  { key: "labourary", label: "Labourary" },
  { key: "inspection", label: "Inspection" },
  { key: "other", label: "Other" },
];

const MB = 1024 * 1024;

const ImagesUploadSection = ({ companyPhotos = {}, setCompanyPhotos }) => {
  const [errors, setErrors] = useState({});
  const [pendingFiles, setPendingFiles] = useState({}); // { [sectionKey]: [ {previewUrl, progress, file} ] }
  const inputRefs = {};
    console.log(companyPhotos)
  // ---- Axios Upload with Progress ----
  const handleImageChange = async (e, sectionKey) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setErrors(prev => ({ ...prev, [sectionKey]: "Only image files allowed." }));
      return;
    }
    if (file.size > 2 * MB) {
      setErrors(prev => ({ ...prev, [sectionKey]: "Max file size is 2 MB." }));
      return;
    }
    setErrors(prev => ({ ...prev, [sectionKey]: "" }));

    const previewUrl = URL.createObjectURL(file);

    // Add to pendingFiles for instant preview and progress bar
    setPendingFiles(prev => ({
      ...prev,
      [sectionKey]: [
        ...(prev[sectionKey] || []),
        { previewUrl, progress: 1, file }
      ]
    }));

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axiosInstance.post("/upload", formData, {
        onUploadProgress: function (progressEvent) {
          const percent = progressEvent.total
            ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
            : 100;
          setPendingFiles(pf => ({
            ...pf,
            [sectionKey]: pf[sectionKey].map(item =>
              item.file === file ? { ...item, progress: percent } : item
            )
          }));
        }
      });
      // After upload, add to parent state and remove from pendingFiles
      setCompanyPhotos(current => ({
        ...current,
        [sectionKey]: [
          ...(current[sectionKey] || []),
          { url: res.data.url, description: "" }
        ]
      }));
    } catch (err) {
      setErrors(prev => ({ ...prev, [sectionKey]: "Upload failed." }));
    }
    setPendingFiles(pf => ({
      ...pf,
      [sectionKey]: (pf[sectionKey] || []).filter(item => item.file !== file)
    }));
    if (inputRefs[sectionKey]) inputRefs[sectionKey].value = "";
    URL.revokeObjectURL(previewUrl);
  };

  // ---- Description update ----
  const handleDescriptionChange = (sectionKey, idx, desc) => {
    const updated = { ...companyPhotos };
    const arr = [...(companyPhotos[sectionKey] || [])];
    arr[idx] = { ...arr[idx], description: desc };
    updated[sectionKey] = arr;
    setCompanyPhotos(updated);
  };

  // ---- Remove photo ----
  const handleRemove = (sectionKey, idx, isUploading = false) => {
    if (isUploading) {
      setPendingFiles(prev => ({
        ...prev,
        [sectionKey]: (prev[sectionKey] || []).filter((_, i) => i !== idx)
      }));
    } else {
      const arr = [...(companyPhotos[sectionKey] || [])];
      arr.splice(idx, 1);
      const updated = { ...companyPhotos, [sectionKey]: arr };
      setCompanyPhotos(updated);
    }
  };

  // ---- Render dropzone & photos for a section ----
  const renderDropzoneRow = (section, isChild = false) => {
    const images = companyPhotos[section.key] || [];
    const uploadingImages = pendingFiles[section.key] || [];
    return (
      <div className={isChild ? "col-lg-4 col-md-6 mb-3" : "col-12 mb-3"} key={section.key}>
        <div className="mb-2"><strong>{section.label}</strong></div>
        <div className="d-flex flex-wrap align-items-start gap-2">
          {/* Uploaded Images */}
          {images.map((item, idx) => (
            <div
              key={idx}
              className="file-edit-box"
              style={{
                width: 130, minHeight: 135, position: "relative", background: "#f9f9fa", border: "1.5px solid #e2e3e6"
              }}
            >
              <button
                type="button"
                className="btn btn-sm btn-danger"
                style={{
                  position: "absolute", top: 5, right: 5, padding: "1px 7px", fontSize: 15, zIndex: 10, borderRadius: 8, lineHeight: 1
                }}
                onClick={() => handleRemove(section.key, idx)}
                title="Remove"
              >×</button>
              <img
                src={item.url}
                alt={section.label + " " + (idx + 1)}
                style={{ width: 100, height: 70, objectFit: "cover", borderRadius: 4, marginBottom: 6, marginTop: 6 }}
              />
              <input
                type="text"
                placeholder="Description (optional)"
                value={item.description || ""}
                className="form-control form-control-sm mt-1"
                onChange={e => handleDescriptionChange(section.key, idx, e.target.value)}
                style={{ fontSize: 12 }}
              />
            </div>
          ))}

          {/* Uploading Images */}
          {uploadingImages.map((item, idx) => (
            <div
              key={idx}
              className="file-edit-box position-relative"
              style={{
                width: 130, minHeight: 135, border: "2px solid #21b573",
                boxShadow: "0 0 0 2px #bff2d3", background: "#eefcf4",
                opacity: 0.8, pointerEvents: "none"
              }}
            >
              <img
                src={item.previewUrl}
                alt="Uploading"
                style={{ width: 100, height: 70, objectFit: "cover", borderRadius: 4, marginBottom: 6, marginTop: 6, filter: "grayscale(50%)" }}
              />
              {/* Overlay progress bar and text */}
              <div
                className="position-absolute d-flex flex-column justify-content-center align-items-center"
                style={{
                  left: 0, right: 0, top: 0, bottom: 0,
                  background: "rgba(255,255,255,0.6)",
                  borderRadius: 8, zIndex: 15
                }}
              >
                <span className="fw-bold mb-1" style={{ color: "#2a8c5d", fontSize: 14 }}>Uploading…</span>
                <div className="progress" style={{ width: 80, height: 8, background: "#e7ecea" }}>
                  <div className="progress-bar" style={{
                    width: `${item.progress || 1}%`, background: "#21b573"
                  }} />
                </div>
                <span className="small mt-1 text-muted">{item.progress || 1}%</span>
              </div>
            </div>
          ))}

          {/* Upload area (always at end) */}
          <div
            className="file-edit-box d-flex flex-column justify-content-center align-items-center"
            style={{
              width: 130, minHeight: 135, cursor: "pointer", border: "2px dashed #cfd8dc", background: "#fafcff"
            }}
            onClick={() => inputRefs[section.key].click()}
          >
            <input
              type="file"
              accept="image/*"
              ref={el => (inputRefs[section.key] = el)}
              style={{ display: "none" }}
              onChange={e => handleImageChange(e, section.key)}
            />
            <span className="icon flaticon-upload" style={{ fontSize: 38, color: "#a0a4af" }} />
            <span className="small mt-1" style={{ color: "#777" }}>Upload</span>
          </div>
        </div>
        {/* Error below */}
        {errors[section.key] && <div className="text-danger small">{errors[section.key]}</div>}
      </div>
    );
  };

  return (
    <div>
      <h5 className="mb-3">Add photos for the following sections:</h5>
      <div className="row">
        {sections.map(section =>
          section.children ? (
            <div className="col-12 mb-3" key={section.key}>
              <div className="mb-2"><strong>{section.label}</strong></div>
              <div className="row">
                {section.children.map(child => renderDropzoneRow(child, true))}
              </div>
            </div>
          ) : renderDropzoneRow(section)
        )}
      </div>
    </div>
  );
};

export default ImagesUploadSection;
