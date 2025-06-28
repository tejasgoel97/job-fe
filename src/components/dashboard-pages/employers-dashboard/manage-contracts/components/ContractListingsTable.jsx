import axiosInstance from "@/utils/api/axiosInstance";
import useAuthStore from "@/utils/authStoreZusland";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const ContractListingsTable = () => {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeFilter, setTimeFilter] = useState("Last 6 Months");
  const { user } = useAuthStore();
  const navigate = useNavigate();
  console.log(contracts)
  const fetchContracts = async () => {
    if (!user) {
      setError("Please login to view your contract listings");
      setLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.get("/contracts/my-contracts", {
      });

      if (response.data && response.data.success) {
        setContracts(response.data.data);
      } else {
        setError(result.message || "Failed to fetch contracts");
      }
    } catch (err) {
      setError("An error occurred while fetching contracts");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteContract = async (contractId) => {
    if (!window.confirm("Are you sure you want to delete this contract?")) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/api/contracts/delete-contract/${contractId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (response.ok) {
        alert("Contract deleted successfully!");
        fetchContracts(); // Re-fetch contracts after deletion
      } else {
        const result = await response.json();
        alert(result.message || "Failed to delete contract");
      }
    } catch (err) {
      console.error("Error deleting contract:", err);
      alert("An error occurred while deleting the contract");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContracts();
  }, [user, timeFilter]); // Refetch when user or time filter changes

  const handleTimeFilterChange = (e) => {
    setTimeFilter(e.target.value);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) return <div>Loading contracts...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="tabs-box">
      <div className="widget-title">
        <h4>My Contract Listings</h4>
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
                <th>Applicants</th>
                <th>Created</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {contracts.length === 0 ? (
                <tr>
                  <td colSpan="5">No contracts found</td>
                </tr>
              ) : (
                contracts.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <div className="job-block">
                        <div className="inner-box">
                          <div className="content">
                            <h4>
                              <Link to={`/contract/${item._id}`}>
                                {item.title}
                              </Link>
                            </h4>
                            <ul className="job-info">
                              <li>
                                <span className="icon flaticon-briefcase"></span>
                                {item.contractType}
                              </li>
                              <li>
                                <span className="icon flaticon-map-locator"></span>
                                {item.address?.city}, {item.address?.country}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="applied">
                    <Link to={`/employers-dashboard/applicants-by-contract/${item._id}`}>{item.applicationCount} Applied</Link>{" "}

                    </td>
                    <td>{formatDate(item.createdAt)}</td>
                    <td className="status">Active</td> {/* Assuming contracts are always active unless deleted */}
                    <td>
                      <div className="option-box">
                        <ul className="option-list">
                          <li>
                            <button data-text="View Contract">
                              <span className="la la-eye"></span>
                            </button>
                          </li>
                          <li>
                            <button
                              data-text="Edit Contract"
                              onClick={() => navigate(`/employers-dashboard/edit-contract/${item._id}`)}
                            >
                              <span className="la la-pencil"></span>
                            </button>
                          </li>
                          <li>
                            <button data-text="Delete Contract" onClick={() => handleDeleteContract(item._id)}>
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

export default ContractListingsTable;