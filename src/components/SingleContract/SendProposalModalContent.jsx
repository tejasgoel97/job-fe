import { useState } from "react";
import axiosInstance from "../../utils/api/axiosInstance";
import { toast } from "react-toastify";

const SendProposalModalContent = ({ contractId, onProposalSuccess }) => {
  const [coverLetter, setCoverLetter] = useState("");
  const [proposedRate, setProposedRate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await axiosInstance.post(`/contract-application`, {
        contractId,
        applyingMessageByContractor:coverLetter,
        proposedRateByContractor:proposedRate,
      });

      if (response.data.success) {
        toast.success("Proposal sent successfully!");
        onProposalSuccess();
        document.querySelector("#sendProposalModal .closed-modal").click();
      } else {
        toast.error(response.data.message || "Failed to send proposal.");
      }
    } catch (error) {
      console.error("Error sending proposal:", error);
      if(error?.response?.data?.msg){
        return toast.error(error.response.data.msg);
      }
      toast.error(error.response?.data?.message || "An error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="default-form" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12 form-group">
          <label>Proposed Rate ($/hr or Fixed)</label>
          <input
            type="text"
            name="proposed_rate"
            placeholder="e.g., 50 or 5000"
            required
            value={proposedRate}
            onChange={(e) => setProposedRate(e.target.value)}
          />
        </div>

        <div className="col-lg-12 col-md-12 col-sm-12 form-group">
          <label>Cover Letter</label>
          <textarea
            className="darma"
            name="cover_letter"
            placeholder="Write a compelling cover letter..."
            required
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
          ></textarea>
        </div>

        <div className="col-lg-12 col-md-12 col-sm-12 form-group">
          <button className="theme-btn btn-style-one" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Send Proposal"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default SendProposalModalContent;