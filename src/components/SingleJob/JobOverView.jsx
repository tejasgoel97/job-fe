const JobOverView = ({ job }) => {
  const createdAt = job.createdAt;
  const createdAtDate = new Date(createdAt);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Kolkata", // IST timezone
  };
  const formattedCreatedAt = createdAtDate.toLocaleDateString("en-IN", options);

  // format this for better view making the time in IST

  return (
    <div className="widget-content">
      <ul className="job-overview">
        <li>
          <i className="icon icon-calendar"></i>
          <h5>Date Posted:</h5>
          <span>{formattedCreatedAt}</span>
        </li>
        <li>
          <i className="icon icon-expiry"></i>
          <h5>Expiration date:</h5>
          <span>{job.deadline || "N/A"}</span>
        </li>
        <li>
          <i className="icon icon-location"></i>
          <h5>Location:</h5>
          <span>
            {job.address}, {job.city}, {job.country}
          </span>
        </li>
        <li>
          <i className="icon icon-user-2"></i>
          <h5>Job Title:</h5>
          <span>{job.title}</span>
        </li>
        <li>
          <i className="icon icon-rate"></i>
          <h5>Job Department</h5>
          <span>{job.department}</span>
        </li>
        <li>
          <i className="icon icon-clock"></i>
          <h5>Job Type</h5>
          <span>{job.jobType}</span>
        </li>

        <li>
          <i className="icon icon-salary"></i>
          <h5>Salary:</h5>
          <span>$35k - $45k</span>
        </li>
      </ul>
    </div>
  );
};

export default JobOverView;
