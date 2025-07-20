
import RelatedJobs from "@/components/employer-single-pages/related-jobs/RelatedJobs";
import PrivateMessageBox from "@/components/employer-single-pages/shared-components/PrivateMessageBox";
import {useParams } from "react-router-dom";

import MetaComponent from "@/components/common/MetaComponent";
import { useEffect, useState } from "react";
import axiosInstance from "@/utils/api/axiosInstance";
import CompanyInfo from "@/components/SingleJob/CompanyInfo"; // Re-using this component as it was updated to be dynamic
import SocialLinks from "@/components/SingleJob/SocialTwo"; // Re-using this component and renaming for clarity
import ExpertiseList from "@/components/SingleJob/Expertise"; // Assuming you want to display expertise
import SocialTwo from "@/components/SingleJob/SocialTwo";

const metadata = {
  title:
    "Company Profile || Unicron Apps - Job Board ReactJs Template",
  description: "Unicron Apps - Job Portal",
};

const CompanySingle1 = ({companyId}) => {
  let id = companyId;
  if(!companyId)  id  = useParams().id

  const [company, setCompany] = useState(null); // Initialize as null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompany = async () => {
      if (!id) {
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const response = await axiosInstance.get(`/company/get-by-id/${id}`);
        if (response.data && response.data.success) {
          setCompany(response.data.company); // Assuming API returns { success: true, company: { ... } }
        } else {
          setError("Company not found or an error occurred.");
        }
      } catch (err) {
        console.error("Failed to fetch company:", err);
        setError("Failed to load company details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [id]);

  if (loading) {
    return (
      <section className="job-detail-section">
        <div className="auto-container">
          <div className="text-center py-5">Loading company details...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="job-detail-section">
        <div className="auto-container">
          <div className="text-center py-5 text-danger">{error}</div>
        </div>
      </section>
    );
  }

  if (!company) {
    return (
      <section className="job-detail-section">
        <div className="auto-container">
          <div className="text-center py-5">Company not found.</div>
        </div>
      </section>
    );
  }

  const companyLocation = `${company.contactData?.addressLine1 || ""}${company.contactData?.addressLine2 ? `, ${company.contactData.addressLine2}` : ""}, ${company.contactData?.city || ""}, ${company.contactData?.state || ""}, ${company.contactData?.pinCode || ""}, ${company.contactData?.country || ""}`;
  const companyWebsite = company.infoData?.website;

  return (
    <>
    <MetaComponent meta={metadata} />
      {/* <!-- Header Span --> */}
      {/* <span className="header-span"></span> */}

      {/* End MobileMenu */}

      {/* <!company Detail Section --> */}
      <section className="job-detail-section">
        {/* <!-- Upper Box --> */}
        <div className="upper-box">
          <div className="auto-container">
            <div className="job-block-seven">
              <div className="inner-box">
                <div className="content">
                  <span className="company-logo d-flex align-items-center justify-content-center">
                    <img
                      src={company.infoData?.logo || "https://media.istockphoto.com/id/1386750813/vector/metallurgy-liquid-steel-and-metallurgical-ladle-iron-molten-metal-pouring-in-gear-heavy.jpg?s=612x612&w=0&k=20&c=wTcNcwbW0WB4NvopZJdfy13e94nT16D57UjbTappFkY="} // Fallback for logo
                      alt={`${company.infoData?.companyName} logo`}
                    />
                  </span>
                  <h4>{company?.infoData.companyName}</h4>

                  <ul className="job-info">
                    <li>
                      <span className="icon flaticon-map-locator"></span>
                      {companyLocation}
                    </li>
                    {/* compnay info */}
                    {company.infoData?.typeOfCasting && company.infoData.typeOfCasting.length > 0 && (
                      <li>
                        <span className="icon flaticon-briefcase"></span>
                        Type of Casting: {company.infoData.typeOfCasting.join(", ")}
                      </li>
                    )}
                    {/* location info */}
                    {company.infoData?.contactNumber && (
                      <li>
                        <span className="icon flaticon-telephone-1"></span>
                        {company.infoData.contactNumber}
                      </li>
                    )}
                    {/* time info */}
                    {company.infoData?.email && (
                      <li>
                        <span className="icon flaticon-mail"></span>
                        {company.infoData.email}
                      </li>
                    )}
                    {/* salary info */}
                  </ul>
                  {/* End .job-info */}

                  <ul className="job-other-info">
                    {company.infoData?.manufacturingCapacity && (
                      <li className="time">Manufacturing Capacity: {company.infoData.manufacturingCapacity}</li>
                    )}
                    {company.infoData?.yearOfEstablishment && (
                      <li className="time">Established: {company.infoData.yearOfEstablishment}</li>
                    )}
                    {company.infoData?.gstNo && (
                      <li className="time">GST No: {company.infoData.gstNo}</li>
                    )}
                    {company.infoData?.factoryLicenseNo && (
                      <li className="time">Factory License No: {company.infoData.factoryLicenseNo}</li>
                    )}
                    {company.infoData?.isoCertifications && (
                      <li className="time">ISO Certifications: {company.infoData.isoCertifications}</li>
                    )}
                  </ul>
                  {/* End .job-other-info */}
                </div>
                {/* End .content */}
              </div>
            </div>
            {/* <!company Block --> */}
          </div>
        </div>
        {/* <!-- Upper Box --> */}

        {/* <!company-detail-outer--> */}
        <div className="job-detail-outer">
          <div className="auto-container">
            <div className="row">
              <div className="content-column col-lg-8 col-md-12 col-sm-12">
                {/* About the Company */}
                {company.infoData?.aboutCompany && (
                  <div className="job-detail-outer">
                    <div className="auto-container">
                      <div className="row">
                        <div className="content-column col-lg-12 col-md-12 col-sm-12">
                          <div className="job-detail">
                            <h4>About Company</h4>
                            <p>{company.infoData.aboutCompany}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Other Details */}
                {company.infoData?.otherDetails && (
                  <div className="job-detail-outer">
                    <div className="job-detail">
                      <h4>Other Details</h4>
                      <p>{company.infoData.otherDetails}</p>
                    </div>
                  </div>
                )}

                {/* Expertise */}
                <ExpertiseList expertise={company.expertise} />


              </div>
              {/* End .content-column */}

              <div className="sidebar-column col-lg-4 col-md-12 col-sm-12 my-5">
                <aside className="sidebar">
                  <div className="sidebar-widget company-widget">
                    <div className="widget-content">
                      <div className="company-title">
                        <div className="company-logo d-flex align-items-center justify-content-center">
                          <img
                            src={company.infoData?.logo || "https://media.istockphoto.com/id/1386750813/vector/metallurgy-liquid-steel-and-metallurgical-ladle-iron-molten-metal-pouring-in-gear-heavy.jpg?s=612x612&w=0&k=20&c=wTcNcwbW0WB4NvopZJdfy13e94nT16D57UjbTappFkY="}
                            alt={`${company.infoData?.companyName} logo`}
                          />
                        </div>
                        <h5 className="company-name">{company.infoData?.companyName}</h5>
                        {/* Assuming there's a route for company profile */}
                        {/* <Link to={`/company/${company._id}`} className="profile-link">
                          View company profile
                        </Link> */}
                      </div>
                      {/* End company title */}

                      <CompanyInfo companyDetails={company} />

                      {companyWebsite && (
                        <div className="btn-box">
                          <a
                            href={companyWebsite.startsWith("http") ? companyWebsite : `https://${companyWebsite}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="theme-btn btn-style-three"
                          >
                            {companyWebsite}
                          </a>
                        </div>
                      )}
                      {/* btn-box */}
                    </div>
                  </div>
                  {/* End company-widget */}

                  {/* <div className="sidebar-widget">
                    {company.contactData?.googleMapLink && (
                      <>
                        <h4 className="widget-title">Company Location on Map</h4>
                        <div className="widget-content">
                          <div style={{ height: "300px", width: "100%" }}>
                            <iframe
                              src={company.contactData.googleMapLink}
                              width="100%"
                              height="300"
                              style={{ border: 0 }}
                              allowFullScreen=""
                              loading="lazy"
                              referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                          </div>
                        </div>
                      </>
                    )}
                  </div> */}
                  {/* End sidebar-widget */}
                {/* <!-- Related Jobs --> */}
                <div className="related-jobs container pt-10 my-10">
                  <div className="title-box">
                    <h3 className="my-5">Related Jobs</h3> {/* Changed from "3 Others jobs available" */}
                    <div className="text">
                      Find other jobs from {company.infoData?.companyName}.
                    </div>
                  </div>
                  {/* End .title-box */}

                  <RelatedJobs />
                  {/* End RelatedJobs */}
                </div>
                  {/* Social Network */}
                  <div className="other-options">
                <div className="social-share">
                  <h5>Share this job</h5>
                  <SocialTwo />
                </div>
              </div>

                  {/* Private Message Box - Keep as is if it's a generic message box */}
                  
                </aside>
                {/* End .sidebar */}
              </div>
              {/* End .sidebar-column */}
            </div>
          </div>
        </div>
        {/* <!company-detail-outer--> */}
      </section>
      {/* <!-- End Job Detail Section --> */}

    </>
  );
};

export default CompanySingle1
