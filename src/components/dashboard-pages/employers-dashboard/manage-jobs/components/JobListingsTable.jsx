import useAuthStore from "@/utils/authStoreZusland";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const JobListingsTable = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeFilter, setTimeFilter] = useState("Last 6 Months");
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const fetchJobs = async () => {
    if (!user) {
      setError("Please login to view your job listings");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/jobs/my-jobs", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      if (response.ok) {
        setJobs(result.data);
      } else {
        setError(result.message || "Failed to fetch jobs");
      }
    } catch (err) {
      setError("An error occurred while fetching jobs");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [user, timeFilter]); // Refetch when user or time filter changes

  const handleTimeFilterChange = (e) => {
    setTimeFilter(e.target.value);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  console.log(jobs);
  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4>My Job Listings</h4>
        <div className="chosen-outer">
          <select
            className="chosen-single form-select"
            value={timeFilter}
            onChange={handleTimeFilterChange}
          >
            <option value="Last 6 Months">Last 6 Months</option>
            <option value="Last 12 Months">Last 12 Months</option>
            <option value="Last 16 Months">Last 16 Months</option>
            <option value="Last 24 Months">Last 24 Months</option>
            <option value="Last 5 Years">Last 5 Years</option>
          </select>
        </div>
      </div>

      <div className="widget-content">
        <div className="table-outer">
          <table className="default-table manage-job-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Applications</th>
                <th>Created & Expired</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {jobs.length === 0 ? (
                <tr>
                  <td colSpan="5">No jobs found</td>
                </tr>
              ) : (
                jobs.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <div className="job-block">
                        <div className="inner-box">
                          <div className="content">
                            <span className="company-logo">
                              <img
                                src={item.logo || "/default-logo.png"} // Add a default logo if needed
                                alt="logo"
                              />
                            </span>
                            <h4>
                              <Link to={`/job/${item._id}`}>
                                {item.title}
                              </Link>
                            </h4>
                            <ul className="job-info">
                              <li>
                                <span className="icon flaticon-briefcase"></span>
                                {item.department}
                              </li>
                              <li>
                                <span className="icon flaticon-map-locator"></span>
                                {item.city}, {item.country}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="applied">
                      <a href="#">0 Applied</a>{" "}
                      {/* Update with actual applications count if available */}
                    </td>
                    <td>
                      {formatDate(item.createdAt)} <br />
                      {item.deadline ? formatDate(item.deadline) : "N/A"}
                    </td>
                    <td className="status">
                      {new Date(item.deadline) > new Date()
                        ? "Active"
                        : "Expired"}
                    </td>
                    <td>
                      <div className="option-box">
                        <ul className="option-list">
                          <li>
                            <button>
                              <span className="la la-eye"></span>
                            </button>
                          </li>
                          <li>
                            <button
                              data-text="Edit Job"
                              onClick={() =>
                                navigate(
                                  `/employers-dashboard/edit-job/${item._id}`
                                )
                              }
                            >
                              <span className="la la-pencil"></span>
                            </button>
                          </li>
                          <li>
                            <button data-text="Delete Job">
                              <span className="la la-trash"></span>
                            </button>
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

export default JobListingsTable;
