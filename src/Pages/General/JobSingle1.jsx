import ApplyJobModalContent from "@/components/SingleJob/ApplyJobModalContent";
import CompanyInfo from "@/components/SingleJob/CompanyInfo";
import ExpertiseList from "@/components/SingleJob/Expertise";
import JobDetailsDescriptions from "@/components/SingleJob/JobDetailsDescriptions";
import JobOverView from "@/components/SingleJob/JobOverView";
import JobSkills from "@/components/SingleJob/JobSkills";
import SocialTwo from "@/components/SingleJob/SocialTwo";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/api/axiosInstance"; // Import axiosInstance
import { Link, useParams } from "react-router-dom";
import useAuthStore from "@/utils/authStoreZusland";

const JobSingle1 = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const [company, setCompany] = useState({});
  const [loading, setLoading] = useState(true);
  const [hasApplied, setHasApplied] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const { user } = useAuthStore();
  useEffect(() => {
    const fetchJob = async () => {
      if (!id) {
        setLoading(false);
        return;
      }
      setLoading(true); // Ensure loading is true at the start of fetch
      try {
        const response = await axiosInstance.get(`/jobs/get-job/${id}`);


        if (response.data) {
          if (response.data.job) {
            setJob(response.data.job);
          } else {
            // Fallback if job data is at the root and company might be nested or also at root
            setJob(response.data);
          }
          if (response.data.company) {
            setCompany(response.data.company);
          } else if (response.data.job && response.data.job.company) {
            // If company is nested inside the job object from response.data.job
            setCompany(response.data.job.company);
          }
        }
      } catch (error) {
        console.error("Failed to fetch job:", error);
        // Optionally, set an error state here to inform the user
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);
    useEffect(() => {
    const checkApplicationStatus = async () => {
      if (!user || !id) {
        setCheckingStatus(false);
        return;
      }
      try {
        setCheckingStatus(true);
        const response = await axiosInstance.get(
          `/job-application/check-applied/${id}`
        );
        if (response.data.success) {
          setHasApplied(response.data.applied);
        }
      } catch (error) {
        console.error("Failed to check application status:", error);
        setHasApplied(false);
      } finally {
        setCheckingStatus(false);
      }
    };

    checkApplicationStatus();
  }, [id, user]);

  const handleApplicationSuccess = () => {
    setHasApplied(true);
  };

  if (loading) {
    return (
      <section className="job-detail-section">
        <div className="auto-container text-center py-5">Loading...</div>
      </section>
    );
  }

  if (!job) {
    return (
      <section className="job-detail-section">
        <div className="auto-container text-center py-5">Job not found.</div>
      </section>
    );
  }

  console.log(job)
  return (
    <section className="job-detail-section">
      <div className="upper-box">
        <div className="auto-container">
          <div className="job-block-seven">
            <div className="inner-box">
              <div className="content">
                <span className="company-logo d-flex align-items-center justify-content-center">
                  <img src={job.companyDetails?.infoData?.logo || "/images/resource/company-logo/default.png"} alt="logo" />
                </span>
                <h4>{job?.title}</h4>

                <ul className="job-info">
                  <li>
                    <span className="icon flaticon-briefcase"></span>
                    Department: {job.department}
                  </li>
                  <li>
                    <span className="icon flaticon-map-locator"></span>
                    Location: {`${job.city}, ${job.country}`}
                  </li>
                  <li>
                    <span className="icon flaticon-clock-3"></span>
                    Experience: {job.experience}
                  </li>
                  <li>
                    <span className="icon flaticon-money"></span>
                    Salary: {job.fromSalary} - {job.toSalary}
                  </li>
                  {/* salary info */}
                </ul>
                {/* End .job-info */}

                <ul className="job-other-info">
                  <li className={`part-time`}>Job Type: {job.jobType}</li>
                </ul>
                {/* End .job-other-info */}
                
              </div>
              {/* End .content */}

              <div className="btn-box">
                {!user ? (
                  <Link to="/login" className="theme-btn btn-style-one">
                    Login to Apply
                  </Link>
                ) : checkingStatus ? (
                  <button className="theme-btn btn-style-one" disabled>
                    Checking Status...
                  </button>
                ) : hasApplied ? (
                  <button className="theme-btn btn-style-one" disabled>
                    Already Applied
                  </button>
                ) : (
                  <a
                    href="#"
                    className="theme-btn btn-style-one"
                    data-bs-toggle="modal"
                    data-bs-target="#applyJobModal"
                  >
                    Apply For Job
                  </a>
                )}
                <button className="bookmark-btn">
                  <i className="flaticon-bookmark"></i>
                </button>
              </div>
              {/* End apply for job btn */}

              {/* <!-- Modal --> */}
              <div
                className="modal fade"
                id="applyJobModal"
                tabIndex="-1"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                  <div className="apply-modal-content modal-content">
                    <div className="text-center">
                      <h3 className="title">Apply for this job</h3>
                      <button
                        type="button"
                        className="closed-modal"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    {/* End modal-header */}

                    <ApplyJobModalContent
                      jobId={id}
                      onApplySuccess={handleApplicationSuccess}
                    />                    {/* End PrivateMessageBox */}
                  </div>
                  {/* End .send-private-message-wrapper */}
                </div>
              </div>
              {/* End .modal */}
            </div>
          </div>
          {/* <!-- Job Block --> */}
        </div>
      </div>
      {/* <!-- Upper Box --> */}

      <div className="job-detail-outer">
        <div className="auto-container">
          <div className="row">
            <div className="content-column col-lg-8 col-md-12 col-sm-12">
              <ExpertiseList expertise={job.expertise} />
              {/* End jobdetails content */}
              <JobDetailsDescriptions description={job.description} />
              {/* End jobdetails content */}

              <div className="other-options">
                <div className="social-share">
                  <h5>Share this job</h5>
                  <SocialTwo />
                </div>
              </div>
              {/* <!-- Other Options --> */}

              {/* <!-- Related Jobs --> */}
            </div>
            {/* End .content-column */}

            <div className="sidebar-column col-lg-4 col-md-12 col-sm-12">
              <aside className="sidebar">
                <div className="sidebar-widget">
                  {/* <!-- Job Overview --> */}
                  <h4 className="widget-title">Job Overview</h4>
                  <JobOverView job={job} />

                  <h4 className="widget-title">Job Skills</h4>
                  <div className="widget-content">
                    <JobSkills />
                  </div>
                  {/* <!-- Job Skills --> */}
                </div>
                {/* End .sidebar-widget */}
                <div className="sidebar-widget company-widget">
                  <div className="widget-content">
                    {/* End company title */}

                    <ul className="company-info">
                      <li>
                        Address Line: <span>{job.address}</span>
                      </li>
                      <li>
                        Job City: <span>{job.city}</span>
                      </li>
                      <li>
                        Job State, Country: <span>{job.state}, {job.country}</span>
                      </li>
                    </ul>

                    {/* End btn-box */}
                  </div>
                </div>
                <div className="sidebar-widget company-widget">
                  <div className="widget-content">
                    <div className="company-title">
                      <div className="company-logo">
                        <img src={company.logo} alt="resource" />
                      </div>
                      <h5 className="company-name">{job?.companyDetails?.infoData?.companyName || "null"}</h5>
                      <Link to={`/company/${job?.companyDetails?._id}`} className="profile-link">
                        View company profile
                      </Link>
                    </div>
                    {/* End company title */}

                    <CompanyInfo companyDetails={job.companyDetails}/>

                    <div className="btn-box">
                      <a
                        href="#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="theme-btn btn-style-three"
                      >
                        {company?.link}
                      </a>
                    </div>
                    {/* End btn-box */}
                  </div>
                </div>
                {/* End .company-widget */}
              </aside>
              {/* End .sidebar */}
            </div>
            {/* End .sidebar-column */}
          </div>
        </div>
      </div>
      {/* <!-- job-detail-outer--> */}
    </section>
  );
};

export default JobSingle1;
