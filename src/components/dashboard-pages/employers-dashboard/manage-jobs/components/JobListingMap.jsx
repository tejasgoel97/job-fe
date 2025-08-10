import { Link, useNavigate } from "react-router-dom";

const JobListingMap = ({ jobs }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };
  const navigate = useNavigate();
  return (
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
                              src={item.logo || "https://i.pinimg.com/736x/b7/6b/43/b76b431d0ab1f268325273af5381a654.jpg"} // Add a default logo if needed
                              alt="logo"
                            />
                          </span>
                          <h4>
                            <Link to={`/job/${item._id}`}>{item.title}</Link>
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
                    <Link to={`/employers-dashboard/applicants-by-job/${item._id}`}>{item.applicationCount} Applied</Link>{" "}
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
                          <button data-text="View Job">
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
  );
};

export default JobListingMap;
