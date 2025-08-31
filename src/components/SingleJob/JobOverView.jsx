import PropTypes from 'prop-types';

const JobOverView = ({ job }) => {
  const {
    createdAt,
    deadline,
    address,
    city,
    country,
    title,
    department,
    jobType,
    fromSalary,
    toSalary,
    salaryCurrency = "INR",
    ageFrom,
    ageTo,
    expFrom,
    expTo
  } = job;

  const formatSalaryRange = () => {
    if (!fromSalary && !toSalary) return "Not Specified";
    if (!toSalary) return `${salaryCurrency} ${fromSalary}+`;
    if (!fromSalary) return `Up to ${salaryCurrency} ${toSalary}`;
    return `${salaryCurrency} ${fromSalary} - ${toSalary}`;
  };

  const formatRange = (from, to) => {
    if (!from && !to) return "Not Specified";
    if (!to) return `${from}+`;
    if (!from) return `Up to ${to}`;
    return `${from} - ${to}`;
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Kolkata",
    };
    return date.toLocaleDateString("en-IN", options);
  };

  return (
    <div className="widget-content">
      <ul className="job-overview">
        <li>
          <i className="icon icon-calendar"></i>
          <h5>Date Posted:</h5>
          <span>{formatDateTime(createdAt) || "Not Specified"}</span>
        </li>

        <li>
          <i className="icon icon-expiry"></i>
          <h5>Expiration date:</h5>
          <span>{formatDateTime(deadline) || "Not Specified"}</span>
        </li>

        <li>
          <i className="icon icon-location"></i>
          <h5>Location:</h5>
          <span>
            {[address, city, country].filter(Boolean).join(", ") || "Not Specified"}
          </span>
        </li>

        {/* <li>
          <i className="icon icon-user-2"></i>
          <h5>Job Title:</h5>
          <span>{title || "Not Specified"}</span>
        </li> */}

        <li>
          <i className="icon icon-rate"></i>
          <h5>Job Department:</h5>
          <span>{department || "Not Specified"}</span>
        </li>

        <li>
          <i className="icon icon-clock"></i>
          <h5>Job Type:</h5>
          <span>{jobType || "Not Specified"}</span>
        </li>

        <li>
          <i className="icon icon-salary"></i>
          <h5>Salary:</h5>
          <span>{formatSalaryRange()}</span>
        </li>

        {(ageFrom || ageTo) && (
          <li>
            <i className="icon icon-user-2"></i>
            <h5>Age Range:</h5>
            <span>{formatRange(ageFrom, ageTo)} years</span>
          </li>
        )}

        {(expFrom || expTo) && (
          <li>
            <i className="icon icon-degree"></i>
            <h5>Experience Required:</h5>
            <span>{formatRange(expFrom, expTo)} years</span>
          </li>
        )}
      </ul>
    </div>
  );
};

// Prop Types validation
JobOverView.propTypes = {
  job: PropTypes.shape({
    createdAt: PropTypes.string.isRequired,
    deadline: PropTypes.string,
    address: PropTypes.string,
    city: PropTypes.string,
    country: PropTypes.string,
    title: PropTypes.string,
    department: PropTypes.string,
    jobType: PropTypes.string,
    fromSalary: PropTypes.number,
    toSalary: PropTypes.number,
    salaryCurrency: PropTypes.string,
    ageFrom: PropTypes.number,
    ageTo: PropTypes.number,
    expFrom: PropTypes.number,
    expTo: PropTypes.number
  }).isRequired
};

export default JobOverView;
