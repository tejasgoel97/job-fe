import BreadCrumb from "../../BreadCrumb";
import MyProfile from "./components/my-profile";
import SocialNetworkBox from "./components/SocialNetworkBox";
import ContactInfoBox from "./components/ContactInfoBox";
import CopyrightFooter from "../../CopyrightFooter";
import MenuToggler from "../../MenuToggler";
import DashboardEmployerSidebar from "@/components/header/DashboardEmployerSidebar";
import { useState } from "react";
import useCompanyInfoForm from "./useCompanyInfoForm";

const index = () => {
  const {
    infoData,
    setInfoData,
    contactData,
    setContactData,
    socialData,
    setSocialData,
    isExistingCompany,
    errors,
    handleSubmit,
  } = useCompanyInfoForm();
  console.log({ socialData });
  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit();
  };
  return (
    <div className="page-wrapper dashboard">
      <span className="header-span"></span>

      <DashboardEmployerSidebar />
      {/* <!-- End User Sidebar Menu --> */}

      {/* <!-- Dashboard --> */}
      <section className="user-dashboard">
        <div className="dashboard-outer">
          <BreadCrumb title="Company Profile!" />
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
                  <MyProfile infoData={infoData} setInfoData={setInfoData} />
                </div>
              </div>
              {/* <!-- Ls widget --> */}
              <div className="ls-widget">
                <div className="tabs-box">
                  <div className="widget-title">
                    <h4>Social Network</h4>
                  </div>
                  {/* End .widget-title */}
                  <div className="widget-content">
                    <SocialNetworkBox
                      formData={socialData}
                      setFormData={setSocialData}
                    />
                  </div>
                </div>
              </div>
              {/* <!-- Ls widget --> */}
              <div className="ls-widget">
                <div className="tabs-box">
                  <div className="widget-title">
                    <h4>Contact Information</h4>
                  </div>
                  {/* End .widget-title */}

                  <div className="widget-content">
                    <ContactInfoBox
                      formData={contactData}
                      setFormData={setContactData}
                    />
                  </div>
                </div>
              </div>{" "}
              {/* Save Button */}
              <div className="form-group col-lg-6 col-md-12">
                <button onClick={onSubmit} className="theme-btn btn-style-one">
                  {isExistingCompany
                    ? "Update Company Info"
                    : "Save Company Info"}
                </button>
              </div>
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
