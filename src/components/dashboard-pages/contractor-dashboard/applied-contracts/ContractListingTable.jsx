import { Link, useNavigate } from "react-router-dom";

const ContractListingTable = ({ applications = [] }) => {
  console.log({ applications });
  const navigation = useNavigate()
  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4>My Applied Contracts</h4>

        <div className="chosen-outer">
          {/* <!--Tabs Box--> */}
          <select className="chosen-single form-select">
            <option>Last 6 Months</option>
            <option>Last 12 Months</option>
            <option>Last 16 Months</option>
            <option>Last 24 Months</option>
            <option>Last 5 year</option>
          </select>
        </div>
      </div>
      {/* End filter top bar */}

      {/* Start table widget content */}
      <div className="widget-content">
        <div className="table-outer">
          <div className="table-outer">
            <table className="default-table manage-job-table">
              <thead>
                <tr>
                  <th>Job Title</th>
                  <th>Date Applied</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((item) => {
                  const appliedAt = new Date(item.createdAt).toLocaleString(
                    "en-IN",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    }
                  );
                  const getStatusColor = (status) => {
                    switch (status) {
                      case "pending":
                        return "orange";
                      case "applied":
                        return "orange";
                      case "rejected":
                        return "red";
                      case "shortlisted":
                        return "green";
                      default:
                        return "gray";
                    }
                  };
                  return (
                    <tr key={item.id}>
                      <td>
                        {/* <!-- Job Block --> */}
                        <div className="job-block">
                          <div className="inner-box">
                            <div className="content">
                              <span className="company-logo">
                                <img
                                  src={
                                    item.logo ||
                                    "https://img.freepik.com/free-vector/abstract-company-logo_53876-120501.jpg?semt=ais_items_boosted&w=740"
                                  }
                                  alt="logo"
                                />
                              </span>
                              <h4>
                                <Link to={`/contract/${item.contractId?._id}`}>
                                  {item?.contractId?.title} ,{" "}
                                  {item?.companyId?.infoData?.companyName}
                                </Link>
                              </h4>
                              <ul className="job-info">
                                <li>
                                  <span className="icon flaticon-briefcase"></span>
                                  {item?.contractId?.contractType}
                                </li>
                                <li>
                                  <span className="icon flaticon-map-locator"></span>
                                  {item?.contractId?.address?.city}
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>{appliedAt}</td>
                      <td
                        className="status"
                        style={{ color: getStatusColor(item.currentStatus) }}
                      >
                        {item?.currentStatus}
                      </td>{" "}
                      <td>
                        <div className="option-box">
                          <ul className="option-list">
                            <li>
                              <button data-text="View Job Post" onClick={()=>navigation(`/contract/${item.contractId?._id}`)}>
                                <span className="la la-eye"></span>
                              </button>
                            </li>
                            <li>
                              <button data-text="Delete Aplication">
                                <span className="la la-trash"></span>
                              </button>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* End table widget content */}
    </div>
  );
};

export default ContractListingTable;
