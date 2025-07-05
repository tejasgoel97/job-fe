import CompanyInfo from "@/components/SingleJob/CompanyInfo";
import ExpertiseList from "@/components/SingleJob/Expertise";
import JobDetailsDescriptions from "@/components/SingleJob/JobDetailsDescriptions";
import JobSkills from "@/components/SingleJob/JobSkills";
import SocialTwo from "@/components/SingleJob/SocialTwo";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useAuthStore from "@/utils/authStoreZusland";
import axiosInstance from "../../utils/api/axiosInstance";
import SendProposalModalContent from "./SendProposalModalContent"; // Assumed new component
import ContractOverView from "./ContractOverView"; // Assumed new component
import ContractTypes from "./ContractTypes";

const ContractSingleView = () => {
  const { id } = useParams();
  const [contract, setContract] = useState({
    "address": {
        "country": "USA",
        "city": "Mumbai",
        "fullAddress": "h No 2123"
    },
    "facilities": {
        "canteen": true,
        "accommodation": true,
        "transportation": true,
        "ppes": false,
        "dress": true,
        "medicalInsurance": true,
        "others": [
            "Workspace"
        ]
    },
    "_id": "685c2ac65b97cb4802bf399e",
    "title": "Worker for the Site Near Rohtak",
    "description": "This is the Detais of the Site That I should mention you to ",
    "experience": "2",
    "contractType": "Full Time",
    "email": "test2@test.com",
    "createdBy": "685bcfd624e884d90a6da8f5",
    "companyId": "685bd842ee742c29e4ac570d",
    "createdAt": "2025-06-25T16:58:46.286Z",
    "updatedAt": "2025-06-25T16:58:46.286Z",
    "__v": 0
});
  const [company, setCompany] = useState({});
  const [loading, setLoading] = useState(true);
  const [hasProposed, setHasProposed] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const { user } = useAuthStore();
  console.log(contract)
  useEffect(() => {
    const fetchContract = async () => {
      if (!id) {
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        // Assumes an endpoint to fetch a single contract
        const response = await axiosInstance.get(
          `/contracts/get-contract/${id}`
        );

        if (response.data) {
          if (response.data.contract) {
            setContract(response.data.contract);
          } else {
            setContract(response.data);
          }
          if (response.data.company) {
            setCompany(response.data.company);
          } else if (
            response.data.contract &&
            response.data.contract.company
          ) {
            setCompany(response.data.contract.company);
          }
        }
      } catch (error) {
        console.error("Failed to fetch contract:", error);
        setContract(null);
      } finally {
        setLoading(false);
      }
    };

    fetchContract();
  }, [id]);

  useEffect(() => {
    const checkProposalStatus = async () => {
      if (!user || !id) {
        setCheckingStatus(false);
        return;
      }
      try {
        setCheckingStatus(true);
        // Assumes an endpoint to check if user has sent a proposal
        const response = await axiosInstance.get(
          `/contract-application/check-applied/${id}`
        );
        if (response.data.success) {
          setHasProposed(response.data.applied);
        }
      } catch (error) {
        console.error("Failed to check proposal status:", error);
        setHasProposed(false);
      } finally {
        setCheckingStatus(false);
      }
    };

    if (user) {
      checkProposalStatus();
    }
  }, [id, user]);

  const handleProposalSuccess = () => {
    setHasProposed(true);
  };

  if (loading) {
    return (
      <section className="job-detail-section">
        <div className="auto-container text-center py-5">Loading...</div>
      </section>
    );
  }

  if (!contract) {
    return (
      <section className="job-detail-section">
        <div className="auto-container text-center py-5">
          Contract not found.
        </div>
      </section>
    );
  }
  const handleShare = async () => {
    const shareData = {
      title: document.title,
      text: "Check this out!",
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        console.log("Shared successfully");
      } catch (err) {
        console.error("Share failed:", err);
      }
    } else {
      // Fallback for unsupported devices
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      } catch (err) {
        alert("Could not copy the link");
      }
    }
  };
  return (
    <section className="job-detail-section">
      <div className="upper-box">
        <div className="auto-container pt-4">
          <div className="job-block-seven pt-4">
            <div className="inner-box">
              <div className="content">
                <span className="company-logo d-flex align-items-center justify-content-center">
                  <img
                    src={
                      contract.companyDetails?.infoData?.logo ||
                      "https://img.freepik.com/free-vector/abstract-company-logo_53876-120501.jpg?semt=ais_items_boosted&w=740"
                    }
                    alt="logo"
                  />
                </span>
                <h4>{contract?.title}</h4>

                <ul className="job-info">
                  <li>
                    <span className="icon flaticon-briefcase"></span>
                    Type: {contract.contractType}
                  </li>
                  <li>
                    <span className="icon flaticon-map-locator"></span>
                    Location:{" "}
                     {contract.address?.city && contract.address?.country
                      ? `${contract.address.city}, ${contract.address.country}`
                      : "N/A"}

                  </li>
                  <li>
                    <span className="icon flaticon-clock-3"></span>
                    Duration: {contract.duration}
                  </li>
                  <li>
                    <span className="icon flaticon-money"></span>
                    Budget: ${contract.budget} ({contract.rateType})
                  </li>
                </ul>

                <ul className="job-other-info">
                  <li className={`part-time`}>
                   Experience:{" "}
                    {contract.experience ? `${contract.experience} years` : "N/A"}
                  </li>
                </ul>
              </div>

              <div className="btn-box">
                {!user ? (
                  <Link to="/login" className="theme-btn btn-style-one">
                    Login to Send Proposal
                  </Link>
                ) : !user.role.includes("contractor") ? (
                  <button className="theme-btn btn-style-one" disabled>
                    Login as Contractor
                  </button>
                ) : checkingStatus ? (
                  <button className="theme-btn btn-style-one" disabled>
                    Checking Status...
                  </button>
                ) : hasProposed ? (
                  <button className="theme-btn btn-style-one" disabled>
                    Proposal Sent
                  </button>
                ) : (
                  <a
                    href="#"
                    className="theme-btn btn-style-one"
                    data-bs-toggle="modal"
                    data-bs-target="#sendProposalModal"
                  >
                    Send Proposal
                  </a>
                )}
                <button className="bookmark-btn" onClick={handleShare}>
                  <i className="flaticon-share"></i>
                </button>
              </div>

              <div
                className="modal fade"
                id="sendProposalModal"
                tabIndex="-1"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                  <div className="apply-modal-content modal-content">
                    <div className="text-center">
                      <h3 className="title">Send Proposal</h3>
                      <button
                        type="button"
                        className="closed-modal"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <SendProposalModalContent
                      contractId={id}
                      onProposalSuccess={handleProposalSuccess}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="job-detail-outer">
        <div className="auto-container">
          <div className="row">
            <div className="content-column col-lg-8 col-md-12 col-sm-12">
              <ContractTypes jobTypes={contract.contractTypes} />
              <JobDetailsDescriptions description={contract.description} />

              <div className="other-options">
                <div className="social-share">
                  <h5>Share this contract</h5>
                  <SocialTwo />
                </div>
              </div>
            </div>

            <div className="sidebar-column col-lg-4 col-md-12 col-sm-12">
              <aside className="sidebar">
                <div className="sidebar-widget">
                  <h4 className="widget-title">Contract Overview</h4>
                  <ContractOverView contract={contract} />

                  <h4 className="widget-title">Required Skills</h4>
                  <div className="widget-content">
                    <JobSkills skills={contract.skills || []} />
                  </div>
                </div>

                <div className="sidebar-widget company-widget">
                  <div className="widget-content">
                    <div className="company-title">
                      <div className="company-logo">
                        <img src={company.logo} alt="company logo" />
                      </div>
                      <h5 className="company-name">
                        {contract?.companyDetails?.infoData?.companyName ||
                          "N/A"}
                      </h5>
                      <Link
                        to={`/company/${contract?.companyDetails?._id}`}
                        className="profile-link"
                      >
                        View company profile
                      </Link>
                    </div>

                    <CompanyInfo companyDetails={contract.companyDetails} />

                    <div className="btn-box">
                      <a
                        href={company?.link || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="theme-btn btn-style-three"
                      >
                        {company?.link ? "Visit Website" : "No Website"}
                      </a>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContractSingleView;