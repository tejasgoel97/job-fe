import { useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "@/utils/api/axiosInstance";
import { toast } from "react-toastify";

const ApplyJobModalContent = ({ jobId, onApplySuccess }) => {
  const [messageText, setMessageText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleApplyJob = async (e) => {
    e.preventDefault();
    if (!messageText.trim()) {
      toast.error("Please provide a message.");
      return;
    }
    setIsSubmitting(true);

    try {
      const response = await axiosInstance.post("/job-application/apply", {
        jobId,
        applyingMessageByCandidate: messageText,
      });
      if (response.data.success) {
        toast.success("Applied successfully!");
        onApplySuccess(); // Notify parent component

        // Close the modal
        const modalElement = document.getElementById("applyJobModal");
        if (modalElement) {
          const modalInstance =
            window.bootstrap.Modal.getInstance(modalElement);
          modalInstance?.hide();
        }
      } else {
        toast.error(response.data.message || "Failed to apply.");
      }
    } catch (error) {
      console.error("Application submission error:", error);
      toast.error(
        error.response?.data?.message || "An error occurred while applying."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="default-form job-apply-form" onSubmit={handleApplyJob}>
      <div className="row">
        {/* <div className="col-lg-12 col-md-12 col-sm-12 form-group">
          <div className="uploading-outer apply-cv-outer">
            <div className="uploadButton">
              <input
                className="uploadButton-input"
                type="file"
                name="attachments[]"
                accept="image/*, application/pdf"
                id="upload"
                multiple=""
                required
              />
              <label
                className="uploadButton-button ripple-effect"
                htmlFor="upload"
              >
                Upload CV (doc, docx, pdf)
              </label>
            </div>
          </div>
        </div> */}
        {/* End .col */}

        <div className="col-lg-12 col-md-12 col-sm-12 form-group">
          <textarea
            className="darma"
            name="message"
            placeholder="Message"
            required
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
          ></textarea>
        </div>
        {/* End .col */}

        <div className="col-lg-12 col-md-12 col-sm-12 form-group">
          <div className="input-group checkboxes square">
            <input type="checkbox" name="remember-me" id="rememberMe" />
            <label htmlFor="rememberMe" className="remember">
              <span className="custom-checkbox"></span> You accept our{" "}
              <span data-bs-dismiss="modal">
                <Link to="/terms">Terms and Conditions and Privacy Policy</Link>
              </span>
            </label>
          </div>
        </div>
        {/* End .col */}

        <div className="col-lg-12 col-md-12 col-sm-12 form-group">
          <button
            className="theme-btn btn-style-one w-100"
            type="submit"
            name="submit-form"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Apply Job"}{" "}
          </button>
        </div>
        {/* End .col */}
      </div>
    </form>
  );
};

export default ApplyJobModalContent;
