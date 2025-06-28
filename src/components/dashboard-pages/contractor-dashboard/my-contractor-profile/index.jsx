import BreadCrumb from "../../BreadCrumb";
import ContactInfoBox from "./components/ContactInfoBox";
import CopyrightFooter from "../../CopyrightFooter";
import MenuToggler from "../../MenuToggler";
import MyContractorProfile_2 from "./components/MyContractorProfile_2";
import DashboardContractorHeader from "../../../header/DashboardContractorHeader";
import DashboardContractorSidebar from "@/components/header/DashboardContractorSidebar";
import { useEffect, useState } from "react";
import useAuthStore from "@/utils/authStoreZusland";
import axiosInstance from "@/utils/api/axiosInstance";


const index = () => {
      const [initialLoading, setInitialLoading] = useState(true);
    const [contractorProfile, setContractorProfile] = useState(null);
    const {user} = useAuthStore();
  useEffect(() => {
    const fetchcontractorProfile = async () => {
      try {
        const { data } = await axiosInstance.get("/contractor-profile/me");
        if (data && data.contractorProfile) {
          setContractorProfile(data.contractorProfile);
        } else {
          setContractorProfile(null); // No resume found for a new user
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          // This is an expected case for a new user, no resume exists.
          setContractorProfile(null);
        } else {
          console.error("Error fetching contractor data:", error);
          // Optionally, show an error message to the user
          alert("There was an error loading your conreactor data.");
        }
      } finally {
        setInitialLoading(false);
      }
    };

    fetchcontractorProfile();
  }, []); // Empty dependency array ensures this runs only once on component mount
  console.log({contractorProfile})
  if(initialLoading) return (
    <div className="page-wrapper dashboard">
      <span className="header-span">
        <h1>Loading...</h1>
      </span>
      </div>)
  return (
    <div className="page-wrapper dashboard">
      <span className="header-span"></span>
      {/* <!-- Header Span for hight --> */}

      {/* End Login Popup Modal */}

      <DashboardContractorHeader />
      {/* End Header */}

      {/* End MobileMenu */}

      <DashboardContractorSidebar />
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
                  <div className="widget-title">
                    <h4>{!!contractorProfile ? "Edit" : "Create"} Contractor Profile</h4>
                  </div>
                  <MyContractorProfile_2 initialData={contractorProfile} user={user}/>
                </div>
              </div>
              {/* <!-- Ls widget --> */}

              {/* <!-- Ls widget --> */}
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
