import useAuthStore from "@/utils/authStoreZusland";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import JobListingMap from "./JobListingMap";

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
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/jobs/my-jobs`, {
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

      <JobListingMap jobs={jobs} />
    </div>
  );
};

export default JobListingsTable;
