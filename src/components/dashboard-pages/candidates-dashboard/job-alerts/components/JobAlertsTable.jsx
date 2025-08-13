import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosInstance from "@/utils/api/axiosInstance";
import { toast } from "react-toastify";

const JobAlertsTable = () => {
  const [jobAlerts, setJobAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeFilter, setTimeFilter] = useState("6"); // Default to 6 months

  useEffect(() => {
    const fetchJobAlerts = async () => {
      try {
        const response = await axiosInstance.get(
          `/alerts/job-alerts?months=${timeFilter}`
        );
        if (response.data.success) {
          setJobAlerts(response.data.alerts);
          console.log("Job Alerts:", response.data);
        }
      } catch (error) {
        console.error("Error fetching job alerts:", error);
        toast.error("Failed to fetch job alerts");
      } finally {
        setLoading(false);
      }
    };

    fetchJobAlerts();
  }, [timeFilter]);

  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4>My Applied Jobs</h4>

        <div className="chosen-outer">
          <select
            className="chosen-single form-select"
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
          >
            <option value="6">Last 6 Months</option>
            <option value="12">Last 12 Months</option>
            <option value="16">Last 16 Months</option>
            <option value="24">Last 24 Months</option>
            <option value="60">Last 5 year</option>
          </select>
        </div>
      </div>

      <div className="widget-content">
        <div className="table-outer">
          <table className="default-table manage-job-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Department</th>
                <th>Expiery</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="text-center">
                    Loading...
                  </td>
                </tr>
              ) : jobAlerts.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center">
                    No job alerts found
                  </td>
                </tr>
              ) : (
                jobAlerts.map((alert) => (
                  <tr key={alert._id}>
                    <td>
                      <div className="job-block">
                        <div className="inner-box">
                          <div className="content">
                            <h4>
                              <Link to={`/job/${alert.jobId._id}`}>
                                {alert.jobTitle}
                              </Link>
                            </h4>
                            <ul className="job-info">
                              <li>
                                <span className="icon flaticon-briefcase"></span>
                                {alert.companyName}
                              </li>
                              <li>
                                <span className="icon flaticon-map-locator"></span>
                                {alert.jobLocation}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>{alert.jobDepartment}</td>
                    <td>
                      <span
                        className={`${
                          new Date("2025-08-28T00:00:00.000Z") > new Date()
                            ? "text-success"
                            : "text-danger"
                        }`}
                      >
                        {alert.jobId.deadline &&
                          new Date(
                            "2025-08-28T00:00:00.000Z"
                          ).toLocaleDateString()}
                      </span>
                    </td>
                    <td>
                      <div className="option-box">
                        <ul className="option-list">
                          <li>
                            <Link
                              to={`/job/${alert.jobId._id}`}
                              data-text="View Application"
                            >
                              <span className="la la-eye"></span>
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default JobAlertsTable;
