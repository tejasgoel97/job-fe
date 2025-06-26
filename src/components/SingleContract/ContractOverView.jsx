
const ContractOverView = ({ contract }) => {
  if (!contract) return null;

  const postedDate = contract.createdAt
   

  return (
    <div className="widget-content">
      <ul className="job-overview">
        <li>
          <i className="icon icon-calendar"></i>
          <h5>Date Posted:</h5>
          <span>{postedDate}</span>
        </li>
        <li>
          <i className="icon icon-location"></i>
          <h5>Location:</h5>
          <span>{`${contract.address?.city || "N/A"}, ${
            contract.address?.country || "N/A"
          }`}</span>
        </li>
        <li>
          <i className="icon icon-user-2"></i>
          <h5>Experience:</h5>
          <span>{contract.experience ? `${contract.experience} years` : "N/A"}</span>
        </li>
        <li>
          <i className="icon icon-clock"></i>
          <h5>Contract Type:</h5>
          <span>{contract.contractType || "N/A"}</span>
        </li>
      </ul>
    </div>
  );
};

export default ContractOverView;