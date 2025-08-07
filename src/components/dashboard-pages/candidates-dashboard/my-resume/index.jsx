import { useState, useEffect } from "react";

import DashboardCandidatesSidebar from "../../../header/DashboardCandidatesSidebar";
import BreadCrumb from "../../BreadCrumb";
import CopyrightFooter from "../../CopyrightFooter";
import Resume from "./components";
import DashboardCandidatesHeader from "../../../header/DashboardCandidatesHeader";
import MenuToggler from "../../MenuToggler";
import axiosInstance from "@/utils/api/axiosInstance";
import useAuthStore from "@/utils/authStoreZusland";
import CandidateSingle1 from "@/Pages/General/CandidateSingle1";

const index = () => {
  const [initialLoading, setInitialLoading] = useState(true);
  const [resumeData, setResumeData] = useState(null);
  const [mode, setMode] = useState("view"); // "edit" | "view"
  const [hasUnsavedChanges, seHhasUnsavedChanges] = useState(false);
  const { user } = useAuthStore();
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
  console.log({ user });
  const handleModeToggle = () => {
    setMode((prev) => (prev === "edit" ? "view" : "edit"));
  };
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
          <BreadCrumb title="My Profile!" />
          {/* breadCrumb */}

          <MenuToggler />
          {/* Collapsible sidebar button */}

          <div className="row">
            <div className="col-lg-12">
              <div className="ls-widget">
                <div className="tabs-box">
                  <div className="widget-title flex items-center justify-between">
                    <h4>
                      {resumeData
                        ? mode === "edit"
                          ? "Edit"
                          : "View"
                        : "Create"}{" "}
                      Resume
                    </h4>
                    {resumeData && mode === "view" && (
                      <>
                        <button
                          className="btn btn-outline-primary"
                          type="button"
                          onClick={handleModeToggle}
                          disabled={
                            initialLoading ||
                            (mode === "edit" && hasUnsavedChanges)
                          }
                        >
                         
                            <span
                              className="ml-3 flex items-center"
                              style={{ fontWeight: 500 }}
                            >
                              <i
                                className="flaticon-pencil"
                                style={{ fontSize: 20, marginRight: 8 }}
                              />
                              Edit
                            </span>
                        </button>
                      </>
                    )}
                  </div>
                  {/* End widget-title */}

                  <div className="widget-content">
                    {initialLoading ? (
                      <div style={{ textAlign: "center", padding: "50px" }}>
                        Loading your resume details...
                      </div>
                    ) : (
                      <>
                        {mode === "edit" ? (
                          <Resume
                            initialData={resumeData}
                            user={user}
                            setHasUnsavedChanges={seHhasUnsavedChanges}
                            setMode={setMode}
                          />
                        ) : (
                          <CandidateSingle1
                            data={resumeData}
                            user={user}
                            candidateId={resumeData?._id}
                          />
                        )}
                      </>
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
