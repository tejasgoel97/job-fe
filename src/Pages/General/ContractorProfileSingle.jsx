import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "@/utils/api/axiosInstance";

// UI Components
import MetaComponent from "@/components/common/MetaComponent";
// import RelatedJobs from "@/components/employer-single-pages/related-jobs/RelatedJobs";
// import PrivateMessageBox from "@/components/employer-single-pages/shared-components/PrivateMessageBox";
// import ApplyJobModalContent from "@/components/employer-single-pages/shared-components/ApplyJobModalContent";
import JobDetailsDescriptions from "@/components/employer-single-pages/shared-components/JobDetailsDescriptions";
// import JobOverView from "@/components/employer-single-pages/shared-components/JobOverView";
// import JobSkills from "@/components/employer-single-pages/shared-components/JobSkills";
// import CompanyInfo from "@/components/SingleJob/CompanyInfo";
// import ExpertiseList from "@/components/SingleJob/Expertise";
import SocialTwo from "@/components/SingleJob/SocialTwo";
import InfoDataPoints from "@/components/dashboard-pages/SingleContractorProfile/InfoDataPoints";

const metadata = {
  title: "Company Profile || Unicron Apps - Job Board ReactJs Template",
  description: "Unicron Apps - Job Board ReactJs Template",
};

const ContractorSingle1 = () => {
  const { id } = useParams();
  const [contractor, setContractor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Placeholder user state - replace with context or real auth state
  const user = null;
  const hasApplied = false;
  const checkingStatus = false;

  useEffect(() => {
    const fetchCompany = async () => {
      if (!id) {
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const response = await axiosInstance.get(`/contractor-profile/${id}`);
        if (response.data && response.data.success) {
          setContractor(response.data.contractorProfile);
        } else {
          setError("Contractor not found or an error occurred.");
        }
      } catch (err) {
        console.error("Failed to fetch contractor:", err);
        setError("Failed to load contractor details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [id]);

  const handleApplicationSuccess = () => {
    // Placeholder for handling apply success
    console.log("Application submitted successfully.");
  };

  if (loading) {
    return (
      <section className="job-detail-section">
        <div className="auto-container text-center py-5">
          Loading contractor details...
        </div>
      </section>
    );
  }

  if (error || !contractor) {
    return (
      <section className="job-detail-section">
        <div className="auto-container text-center py-5 text-danger">
          {error || "Contractor not found."}
        </div>
      </section>
    );
  }
  console.log(contractor.strengths)
  return (
    <section className="job-detail-section">
      <MetaComponent meta={metadata} />

      <div className="upper-box">
        <div className="auto-container pt-4">
          <div className="job-block-seven pt-4">
            <div className="inner-box">
              <div className="content">
                <span className="company-logo d-flex align-items-center justify-content-center">
                  <img
                    src={
                      contractor.companyDetails?.infoData?.logo ||
                      "https://img.freepik.com/free-vector/abstract-company-logo_53876-120501.jpg"
                    }
                    alt="logo"
                  />
                </span>
                <h4>{contractor.name}</h4>

                <ul className="job-info">
                  <li>
                    <span className="icon flaticon-map-locator"></span>
                    Location:{" "}
                    {`${contractor.contactInfo?.city}, ${contractor.contactInfo?.state}`}
                  </li>
                  <li>
                    <span className="icon flaticon-clock-3"></span>
                    Experience: {contractor.experience || "N/A"}
                  </li>
                  <li>
                    <span className="icon flaticon-money"></span>
                    Salary: {contractor.fromSalary || "N/A"} -{" "}
                    {contractor.toSalary || "N/A"}
                  </li>
                </ul>

                <ul className="job-other-info">
                  <li className="part-time">
                    Job Type: {contractor.jobType || "N/A"}
                  </li>
                </ul>
              </div>


            </div>
          </div>
        </div>
      </div>

      <div className="job-detail-outer">
        <div className="auto-container">
          <div className="row">
            {/* Content Column */}
            <div className="content-column col-lg-8 col-md-12 col-sm-12">
              {/* <ExpertiseList expertise={contractor.expertise} /> */}
              {/* <JobDetailsDescriptions description={contractor.description} /> */}

              <InfoDataPoints header={"Strengths"} points={contractor?.strengths || []}/>
                            <InfoDataPoints header={"Weaknesses"} points={contractor?.weaknesses || []}/>
                            <InfoDataPoints header={"Safety Conditions"} points={contractor?.safetyConditions || []}/>
    {contractor?.lastCompanies?.length > 0 && <div
                      className={`resume-outer `}

                    >
                      <div className="upper-title">
                        <h4>{"Last Companies"}</h4>
                      </div>
                      {contractor.lastCompanies.map((edu) => (
                        <div className="resume-block" key={edu._id}>
                          <div className="inner">
                            <span className="name">{edu.companyName.charAt(0)}</span>
                            <div className="title-box">
                              <div className="info-box">
                                <h3>{edu.companyName}</h3>
                                <span>{edu.institution}</span>
                              </div>
                              <div className="edit-box">
                                  <span className="year">{edu.yearWorked}</span>
                              </div>
                            </div>
                            <div className="text">{edu.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>}
              <div className="other-options">
                <div className="social-share">
                  <h5>Share this job</h5>
                  <SocialTwo />
                </div>
              </div>
            </div>

            {/* Sidebar Column */}
            <div className="sidebar-column col-lg-4 col-md-12 col-sm-12">
              <aside className="sidebar">
                <div className="sidebar-widget">
                  <h4 className="widget-title">Job Overview</h4>
                  {/* <JobOverView job={contractor} /> */}

                  <h4 className="widget-title">Job Skills</h4>
                  <div className="widget-content">
                    {/* <JobSkills /> */}
                  </div>
                </div>

                <div className="sidebar-widget company-widget">
                  <div className="widget-content">
                    <ul className="company-info">
                      <li>
                        Address:{" "}
                        <span>
                          {contractor.contactInfo?.addressLine1},{" "}
                          {contractor.contactInfo?.addressLine2}
                        </span>
                      </li>
                      <li>
                        Job City: <span>{contractor.contactInfo?.city}</span>
                      </li>
                      <li>
                        State, Country:{" "}
                        <span>
                          {contractor.contactInfo?.state},{" "}
                          {contractor.contactInfo?.country}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="sidebar-widget company-widget">
                  <div className="widget-content">
                    <div className="company-title">
                      <div className="company-logo">
                        <img
                          src={
                            contractor.companyDetails?.infoData?.logo ||
                            "https://img.freepik.com/free-vector/abstract-company-logo_53876-120501.jpg"
                          }
                          alt="resource"
                        />
                      </div>
                      <h5 className="company-name">
                        {contractor.companyDetails?.infoData?.companyName ||
                          "N/A"}
                      </h5>
                      <Link
                        to={`/company/${contractor.companyDetails?._id}`}
                        className="profile-link"
                      >
                        View company profile
                      </Link>
                    </div>

                    {/* <CompanyInfo
                      companyDetails={contractor.companyDetails}
                    /> */}

                    {contractor.companyDetails?.infoData?.website && (
                      <div className="btn-box">
                        <a
                          href={contractor.companyDetails.infoData.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="theme-btn btn-style-three"
                        >
                          Visit Website
                        </a>
                      </div>
                    )}
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

export default ContractorSingle1;
