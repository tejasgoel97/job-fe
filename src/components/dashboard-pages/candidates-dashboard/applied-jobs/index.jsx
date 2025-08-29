import MobileMenu from "../../../header/MobileMenu";
import DashboardCandidatesHeader from "../../../header/DashboardCandidatesHeader";
import DashboardCandidatesSidebar from "../../../header/DashboardCandidatesSidebar";
import BreadCrumb from "../../BreadCrumb";
import CopyrightFooter from "../../CopyrightFooter";
import JobListingsTable from "./components/JobListingsTable";
import MenuToggler from "../../MenuToggler";
import { useEffect, useState } from "react";
import axiosInstance from "@/utils/api/axiosInstance";

const index = () => {
    const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        setLoading(true);
        const { data } = await axiosInstance.get(
          "/job-application/my-applications"
        );
        if (data.success) {
          setApplications(data.applications);
        } else {
          setError("Failed to fetch applications.");
        }
      } catch (err) {
        console.error("Error fetching applied jobs:", err);
        setError(
          err.response?.data?.message ||
            "An error occurred while fetching your applications."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAppliedJobs();
  }, []);
  console.log(applications)
  return (
    <div className="page-wrapper dashboard">
      <span className="header-span"></span>
      {/* <!-- Header Span for hight --> */}

      {/* End Login Popup Modal */}

      <DashboardCandidatesHeader />
      {/* End Header */}

      <MobileMenu />
      {/* End MobileMenu */}

      <DashboardCandidatesSidebar />
      {/* <!-- End Candidates Sidebar Menu --> */}

      {/* <!-- Dashboard --> */}
      <section className="user-dashboard">
        <div className="dashboard-outer">
          <BreadCrumb title="Applied jobs!" />
          {/* breadCrumb */}

          <MenuToggler />
          {/* Collapsible sidebar button */}
          <div className="row">
            <div className="col-lg-12">
              {/* <!-- Ls widget --> */}
              <div className="ls-widget">
                <JobListingsTable applications={applications}/>
              </div>
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
