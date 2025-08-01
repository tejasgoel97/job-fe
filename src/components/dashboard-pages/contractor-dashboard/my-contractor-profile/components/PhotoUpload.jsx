import React, { useRef, useState } from "react";
import axios from "axios";
import axiosInstance from "@/utils/api/axiosInstance";
const MB = 1024 * 1024;

const ImagesUploadBox = ({ photos = [], setPhotos }) => {
  const [errors, setErrors] = useState("");
  const [pendingFiles, setPendingFiles] = useState([]); // [ {previewUrl, progress, file} ]
  const inputRef = useRef();

  // ---- Axios Upload with Progress ----
  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files || []);
    let allValid = true;
    for (let file of files) {
      if (!file.type.startsWith("image/")) {
        setErrors("Only image files allowed.");
        allValid = false;
        continue;
      }
      if (file.size > 2 * MB) {
        setErrors("Max file size is 2 MB.");
        allValid = false;
        continue;
      }
      setErrors("");

      const previewUrl = URL.createObjectURL(file);
      // Add to pendingFiles for instant preview and progress bar
      setPendingFiles(prev => [
        ...prev,
        { previewUrl, progress: 1, file }
      ]);

      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await axiosInstance.post("/upload", formData, {
          onUploadProgress: function (progressEvent) {
            const percent = progressEvent.total
              ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
              : 100;
            setPendingFiles(pf =>
              pf.map(item =>
                item.file === file ? { ...item, progress: percent } : item
              )
            );
          }
        });
        // After upload, add to parent state and remove from pendingFiles
        setPhotos(current => [
          ...current,
          { url: res.data.url, description: "" }
        ]);
      } catch (err) {
        setErrors("Upload failed.");
      }
      setPendingFiles(pf =>
        pf.filter(item => item.file !== file)
      );
      if (inputRef.current) inputRef.current.value = "";
      URL.revokeObjectURL(previewUrl);
    }
    if (!allValid) {
      setTimeout(() => setErrors(""), 2000);
    }
  };

  // ---- Description update ----
  const handleDescriptionChange = (idx, desc) => {
    const arr = [...photos];
    arr[idx] = { ...arr[idx], description: desc };
    setPhotos(arr);
  };

  // ---- Remove photo ----
  const handleRemove = (idx, isUploading = false) => {
    if (isUploading) {
      setPendingFiles(prev => prev.filter((_, i) => i !== idx));
    } else {
      const arr = [...photos];
      arr.splice(idx, 1);
      setPhotos(arr);
    }
  };

  return (
    <div className="mb-3">
      <label><b>Upload Photos</b></label>
      <div className="d-flex flex-wrap align-items-start gap-2 mt-2">
        {/* Uploaded Images */}
        {photos.map((item, idx) => (
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
              onClick={() => handleRemove(idx)}
              title="Remove"
            >×</button>
            <img
              src={item.url}
              alt={"Photo " + (idx + 1)}
              style={{ width: 100, height: 70, objectFit: "cover", borderRadius: 4, marginBottom: 6, marginTop: 6 }}
            />
            <input
              type="text"
              placeholder="Description (optional)"
              value={item.description || ""}
              className="form-control form-control-sm mt-1"
              onChange={e => handleDescriptionChange(idx, e.target.value)}
              style={{ fontSize: 12 }}
            />
          </div>
        ))}

        {/* Uploading Images */}
        {pendingFiles.map((item, idx) => (
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
              <button
                type="button"
                className="btn btn-sm btn-link mt-1"
                style={{ color: "#b33" }}
                onClick={() => handleRemove(idx, true)}
                tabIndex={-1}
              >Cancel</button>
            </div>
          </div>
        ))}

        {/* Upload area (always at end) */}
        <div
          className="file-edit-box d-flex flex-column justify-content-center align-items-center"
          style={{
            width: 130, minHeight: 135, cursor: "pointer", border: "2px dashed #cfd8dc", background: "#fafcff"
          }}
          onClick={() => inputRef.current.click()}
        >
          <input
            type="file"
            accept="image/*"
            multiple
            ref={inputRef}
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          <span className="icon flaticon-upload" style={{ fontSize: 38, color: "#a0a4af" }} />
          <span className="small mt-1" style={{ color: "#777" }}>Upload</span>
        </div>
      </div>
      {/* Error below */}
      {errors && <div className="text-danger small mt-2">{errors}</div>}
    </div>
  );
};

export default ImagesUploadBox;
