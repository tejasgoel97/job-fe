import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "@/utils/api/axiosInstance";
import { toast } from "react-toastify";

const WidgetContentBox = ({ jobId }) => {
  const [applications, setApplications] = useState([]);
  const [jobTitle, setJobTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      setError(null);
      let apiUrl = "/job-application/received-applications";
      if (jobId) {
        apiUrl = `/job-application/received-applications-for-job/${jobId}`;
      }
      try {
        const response = await axiosInstance.get(apiUrl);
        if (response.data && response.data.success) {
          setJobTitle(response.data.jobTitle || "");
          setApplications(response.data.applications || []);
        }
      } catch (err) {
        console.error("Error fetching applications:", err);
        setError("Failed to load applications.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [jobId]);

  if (loading) return <p>Loading applications...</p>;
  if (error) return <p className="text-danger">{error}</p>;
  if (applications.length === 0) return <p>No applications found.</p>;

  // Counts
  const total = applications.length;
  const newA = applications.filter(a => a.currentStatus === "applied").length;
  const approved = applications.filter(a => a.currentStatus === "approved").length;
  const hold = applications.filter(a => a.currentStatus === "hold").length;
  const rejected = applications.filter(a => a.currentStatus === "rejected").length;

  const handleStatusChange = async (applicationId, status) => {
    try {
      const res = await axiosInstance.patch(
        `/job-application/update-status/${applicationId}`,
        { status, notesByEmployer: "" }
      );
      if (res.status === 200 && res.data.success) {
        toast.success("Status updated successfully");
        // update UI without reloading
        setApplications(prev =>
          prev.map(app =>
            app._id === applicationId ? { ...app, currentStatus: status } : app
          )
        );
      }
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  // Reusable card
  const renderApplications = apps => (
    <div className="row">
      {apps.map(application => (
        <div
          className="candidate-block-three col-lg-6 col-md-12 col-sm-12"
          key={application._id}
        >
          <div className="inner-box">
            <div className="content">
              <figure className="image">
                <img
                  src={
                    application.candidateResumeId.profileImageURL ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOH2aZnIHWjMQj2lQUOWIL2f4Hljgab0ecZQ&s"
                  }
                  alt="candidates"
                />
              </figure>
              <div className="d-flex justify-content-between align-items-start">
                <h4 className="name">
                  <Link to={`/candidate/${application.candidateResumeId._id}`}>
                    {application.candidateId.firstName}{" "}
                    {application.candidateId.lastName}
                  </Link>
                </h4>
                <span className="badge bg-secondary text-uppercase">
                  {application.currentStatus}
                </span>
              </div>

              <ul className="candidate-info">
                <li className="designation">
                  {application.candidateResumeId.currentDesignation}
                </li>
                <li>
                  <span className="icon flaticon-map-locator"></span>{" "}
                  {application.candidateResumeId.contactInfo.country}
                </li>
                <li>
                  <span className="icon flaticon-money"></span> Rs.
                  {application.candidateResumeId.currentSalary ||
                    "Not Available"}
                </li>
              </ul>

              <ul className="post-tags">
                <li>
                  Applied:{" "}
                  {new Date(application.createdAt).toLocaleString()}
                </li>
              </ul>
            </div>

            <div className="option-box">
              <ul className="option-list">
                <li>
                  <button data-text="View Application">
                    <span className="la la-eye"></span>
                  </button>
                </li>
                {application.currentStatus !== "approved" && (
                  <li>
                    <button
                      data-text="Approve Application"
                      onClick={() =>
                        handleStatusChange(application._id, "approved")
                      }
                    >
                      <span className="la la-check"></span>
                    </button>
                  </li>
                )}
                {application.currentStatus !== "rejected" && (
                  <li>
                    <button
                      data-text="Reject Application"
                      onClick={() =>
                        handleStatusChange(application._id, "rejected")
                      }
                    >
                      <span className="la la-times-circle"></span>
                    </button>
                  </li>
                )}
                {application.currentStatus !== "hold" && (
                  <li>
                    <button
                      data-text="Hold Application"
                      onClick={() =>
                        handleStatusChange(application._id, "hold")
                      }
                    >
                      <span className="la la-pause-circle"></span>
                    </button>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="widget-content">
      <div className="tabs-box">
        <Tabs>
          <div className="aplicants-upper-bar">
            <h5 className="py-2">
              All Applications For Job Title:{" "}
              <span className="text-primary fw-bold">
                {jobTitle || ""}
              </span>
            </h5>
            <TabList className="aplicantion-status tab-buttons clearfix">
              <Tab>Total: {total}</Tab>
              <Tab style={{color:"green"}}>New: {newA}</Tab>
              <Tab style={{color:"green"}}>Approved: {approved}</Tab>
              <Tab style={{color:"#ffc40c"}}>Hold: {hold}</Tab>
              <Tab style={{color:"red"}}>Rejected: {rejected}</Tab>
            </TabList>
          </div>

          <div className="tabs-content">
            <TabPanel>{renderApplications(applications)}</TabPanel>
            <TabPanel>
              {renderApplications(
                applications.filter(a => a.currentStatus === "applied")
              )}
            </TabPanel>
            <TabPanel>
              {renderApplications(
                applications.filter(a => a.currentStatus === "approved")
              )}
            </TabPanel>
            <TabPanel>
              {renderApplications(
                applications.filter(a => a.currentStatus === "hold")
              )}
            </TabPanel>
            <TabPanel>
              {renderApplications(
                applications.filter(a => a.currentStatus === "rejected")
              )}
            </TabPanel>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default WidgetContentBox;
