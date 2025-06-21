import { useState, useEffect } from "react";


import DashboardCandidatesSidebar from "../../../header/DashboardCandidatesSidebar";
import BreadCrumb from "../../BreadCrumb";
import CopyrightFooter from "../../CopyrightFooter";
import Resume from "./components";
import DashboardCandidatesHeader from "../../../header/DashboardCandidatesHeader";
import MenuToggler from "../../MenuToggler";
import axiosInstance from "@/utils/api/axiosInstance";

const index = () => {
    const [initialLoading, setInitialLoading] = useState(true);
  const [resumeData, setResumeData] = useState(null);

  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        const { data } = await axiosInstance.get("/resume/me");
        if (data && data.resume) {
          setResumeData(data.resume);
        } else {
          setResumeData(null); // No resume found for a new user
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // This is an expected case for a new user, no resume exists.
          setResumeData(null);
        } else {
          console.error("Error fetching resume data:", error);
          // Optionally, show an error message to the user
          alert("There was an error loading your resume data.");
        }
      } finally {
        setInitialLoading(false);
      }
    };

    fetchResumeData();
  }, []); // Empty dependency array ensures this runs only once on component mount

  return (
    <div className="page-wrapper dashboard">
      <span className="header-span"></span>
      {/* <!-- Header Span for hight --> */}

      <DashboardCandidatesHeader />
      {/* End Header */}

      <DashboardCandidatesSidebar />
      {/* <!-- End Candidates Sidebar Menu --> */}

      {/* <!-- Dashboard --> */}
      <section className="user-dashboard">
        <div className="dashboard-outer">
          <BreadCrumb title="My Resume!" />
          {/* breadCrumb */}

          <MenuToggler />
          {/* Collapsible sidebar button */}

          <div className="row">
            <div className="col-lg-12">
              <div className="ls-widget">
                <div className="tabs-box">
                  <div className="widget-title">
                    <h4>My Profile</h4>
                  </div>
                  {/* End widget-title */}

                  <div className="widget-content">
                    {initialLoading ? (
                      <div style={{ textAlign: "center", padding: "50px" }}>
                        Loading your resume details...
                      </div>
                    ) : (
                      <Resume initialData={resumeData} />
                    )}
                  </div>
                  {/* End widget-content */}
                </div>
              </div>
              {/* End ls-widget */}
            </div>
          </div>
          {/* End .row */}
        </div>
        {/* End dashboard-outer */}
      </section>
      {/* <!-- End Dashboard --> */}

      <CopyrightFooter />
      {/* <!-- End Copyright --> */}
    </div>
    // End page-wrapper
  );
};

export default index;
