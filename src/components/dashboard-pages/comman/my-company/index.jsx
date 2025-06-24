import BreadCrumb from "../../BreadCrumb";
import SocialNetworkBox from "./components/SocialNetworkBox";
import ContactInfoBox from "./components/ContactInfoBox";
import CopyrightFooter from "../../CopyrightFooter";
import MenuToggler from "../../MenuToggler";
import MyContractorCompany_2 from "./components/MyContractorCompany_2";
import DashboardContractorHeader from "../../../header/DashboardContractorHeader";
import DashboardContractorSidebar from "@/components/header/DashboardContractorSidebar";
import useCompanyInfoForm from "../../employers-dashboard/company-profile/useCompanyInfoForm";
import { useEffect, useState } from "react";
import FormInfoBox from "./components/FormInfoBox";
import axiosInstance from "@/utils/api/axiosInstance";
import { info } from "sass";
import DashboardEmployerSidebar from "@/components/header/DashboardEmployerSidebar";
import DashboardHeader from "@/components/header/DashboardHeader";

const dummyCompanies = [
  {
    companyId: "comp1",
    companyName: "MetalCast Pvt Ltd",
    address: "Plot 12, Industrial Area, Pune",
    aboutCompany: "Leading manufacturer of sand castings.",
    gstNo: "gstInput",
    factoryLicenseNo: "LIC12345",
    contactPerson: "Rajeev Sharma",
    contactNumber: "9876543210",
    email: "contact@metalcast.com",
    otherDetails: "",
    typeOfCasting: [],
    manufacturingCapacity: 150,
    yearOfEstablishment: 1998,
    isoCertifications: "ISO 9001:2015",
    keyProducts: "Cast Iron Manifolds, Pump Bodies",
    website: "https://metalcast.com",
  },
  {
    companyId: "comp2",
    companyName: "Precision Foundries",
    address: "Sector 22, Faridabad",
    aboutCompany: "Expertise in die casting for automotive.",
    gstNo: "gstInput",
    factoryLicenseNo: "LIC7890",
    contactPerson: "Meera Nair",
    contactNumber: "9822334455",
    email: "info@precisionfoundries.com",
    otherDetails: "",
    typeOfCasting: [],
    manufacturingCapacity: 200,
    yearOfEstablishment: 2005,
    isoCertifications: "ISO 14001",
    keyProducts: "Aluminum Auto Parts, Engine Blocks",
    website: "https://precisionfoundries.com",
  },
];

const index = ({ role = "employer" }) => {
  const {
    infoData,
    setInfoData,
    contactData,
    setContactData,
    socialData,
    setSocialData,
    selectedExpertise,
    setSelectedExpertise,
    initialExpertise,
    setInitialExpertise,
    companyId,
    compnayVerifiedToUser,
    errors,
    handleSubmit,
    linkUserToCompany,
    linkingLoading,
  } = useCompanyInfoForm();

  const [gstInput, setGstInput] = useState("");
  const [mode, setMode] = useState("initial"); // initial | choose | form | status
  const [companyList, setCompanyList] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);

  {
    /*
    if initital  we ask the customer to add the GST
    if choose - we show the options fot the user to choose the GST
    if status - the user has submitted the company but pending approval
    if form - eiter user asked to create one or update
  */
  }
  console.log({ mode });
  useEffect(() => {
    console.log(companyId, compnayVerifiedToUser);
    if (!companyId) {
      setMode("initial");
    } else if (companyId && compnayVerifiedToUser === false) {
      setMode("status");
    } else if (companyId && compnayVerifiedToUser === true) {
      setMode("form");
    }
  }, [companyId, compnayVerifiedToUser]);

  const handleGstSubmit = async () => {
    try {
      const res = await axiosInstance.get(
        `/company/search-by-gst?gstNo=${gstInput}`
      );
      if (res.data && res.data.success) {
        setCompanyList([res.data.company]);
        setMode("choose");
      } else {
        alert("No companies found with this GST.");
      }
    } catch (err) {
      console.error("Error fetching companies", err);
      alert("Something went wrong.");
    }
  };

  const handleCompanySelect = (company) => {
    setInfoData({
      ...company,
      compnayVerifiedToUser: "pending",
    });
  };
  const handleConfirmCompany = async () => {
    if (!selectedCompany) return alert("Please select a company.");

    const selectedData = companyList.find(
      (c) => c.companyId === selectedCompany
    );
    if (!selectedData) return alert("Selected company not found.");
    linkUserToCompany(selectedData.companyId);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit();
  };
  console.log("infoData", infoData);
  return (
    <div className="page-wrapper dashboard">
      <span className="header-span"></span>
      {/* <!-- Header Span for hight --> */}

      {/* End Login Popup Modal */}
      {role === "employer" && (
        <>
        <DashboardHeader />

          <DashboardEmployerSidebar />

        </>
      )}
      {role === "contractor" && <>
      <DashboardContractorHeader />
  

      <DashboardContractorSidebar /></>}

      {/* <!-- End Candidates Sidebar Menu --> */}

      {/* <!-- Dashboard --> */}
      <section className="user-dashboard">
        <div className="dashboard-outer">
          <BreadCrumb title="My Company!" />
          {/* breadCrumb */}

          <MenuToggler />
          {/* Collapsible sidebar button */}

          <ContentRenderer
            mode={mode}
            setMode={setMode}
            onSubmit={onSubmit}
            handleGstSubmit={handleGstSubmit}
            handleCompanySelect={handleCompanySelect}
            errors={errors}
            infoData={infoData}
            setInfoData={setInfoData}
            contactData={contactData}
            setContactData={setContactData}
            socialData={socialData}
            setSocialData={setSocialData}
            selectedExpertise={selectedExpertise}
            setSelectedExpertise={setSelectedExpertise}
            initialExpertise={initialExpertise}
            setInitialExpertise={setInitialExpertise}
            companyId={companyId}
            gstInput={gstInput}
            setGstInput={setGstInput}
            companyList={companyList}
            setCompanyList={setCompanyList}
            selectedCompany={selectedCompany}
            setSelectedCompany={setSelectedCompany}
            handleConfirmCompany={handleConfirmCompany}
            linkingLoading={linkingLoading}
            compnayVerifiedToUser={compnayVerifiedToUser}
          />
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

const ContentRenderer = ({
  mode,
  setMode,
  onSubmit,
  handleGstSubmit,
  handleCompanySelect,
  companyList,
  errors,
  infoData,
  setInfoData,
  contactData,
  setContactData,
  socialData,
  setSocialData,
  initialExpertise,
  selectedExpertise,
  setSelectedExpertise,
  companyId,
  gstInput,
  setGstInput,
  setCompanyList,
  selectedCompany,
  setSelectedCompany,
  handleConfirmCompany,
  linkingLoading,
  compnayVerifiedToUser,
}) => {
  return (
    <div className="widget-content">
      {(mode === "initial" || mode === "choose") && (
        <div className="form-group col-lg-6 col-md-12">
          <label>Enter GST Number</label>
          <input
            type="text"
            className="form-control"
            value={gstInput}
            onChange={(e) => setGstInput(e.target.value)}
            placeholder="Enter GST Number"
          />
          <div className="row mt-2">
            <div className="col-auto">
              <button onClick={handleGstSubmit} className="btn btn-primary">
                Search
              </button>
            </div>
            <div className="col-auto">
              <button
                onClick={() => setMode("form")}
                className="btn btn-success"
              >
                Create New
              </button>
            </div>
          </div>
        </div>
      )}

      {mode === "choose" && (
        <div className="col-lg-12">
          <div className="form-group">
            <label>Select your Company</label>
            <select
              className="form-control"
              value={selectedCompany || ""}
              onChange={(e) => setSelectedCompany(e.target.value)}
            >
              <option value="">-- Select Company --</option>
              {companyList.map((company) => (
                <option key={company.companyId} value={company.companyId}>
                  {company.infoData.companyName} -{" "}
                  {company.contactData.addressLine1}, {company.contactData.city}
                  , {company.contactData.state}, {company.contactData.pinCode}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleConfirmCompany}
            className="theme-btn btn-style-one mt-2"
            disabled={!selectedCompany || linkingLoading}
          >
            {linkingLoading ? "Sumbitting" : "Submit for Verification"}
          </button>
        </div>
      )}
      {mode === "form" && (
        <form onSubmit={onSubmit}>
          <div className="row">
            <div className="col-lg-12">
              <div className="ls-widget">
                <div className="tabs-box">
                  <div className="widget-title">
                    <h4>{companyId ? "Update" : "Create"} Company Profile</h4>
                  </div>
                  <MyContractorCompany_2
                    infoData={infoData}
                    setInfoData={setInfoData}
                    selectedExpertise={selectedExpertise}
                    setSelectedExpertise={setSelectedExpertise}
                    initialExpertise={initialExpertise}
                    errors={errors}
                  />
                </div>
              </div>
              {/* <!-- Ls widget --> */}

              {/* <div className="ls-widget"> */}
              {/* <div className="tabs-box"> */}
              {/* <div className="widget-title">
                    <h4>Social Network</h4>
                  </div> */}
              {/* End widget-title */}

              <div className="widget-content">
                <SocialNetworkBox
                  socialData={socialData}
                  setSocialData={setSocialData}
                  errors={errors}
                />
                {/* </div> */}
                {/* </div> */}
              </div>
              {/* <!-- Ls widget --> */}

              <div className="ls-widget">
                <div className="tabs-box">
                  <div className="widget-title">
                    <h4>Contact Information</h4>
                  </div>
                  {/* End widget-title */}
                  <div className="widget-content">
                    <ContactInfoBox
                      contactData={contactData}
                      setContactData={setContactData}
                      errors={errors}
                    />
                  </div>
                </div>
              </div>
              {/* <!-- Ls widget --> */}
            </div>
          </div>
          <div className="row">
            <div className="form-group col-lg-12 col-md-12">
              <button type="submit" className="theme-btn btn-style-one">
                Save Changes
              </button>
            </div>
          </div>
        </form>
      )}

      {mode === "status" && (
        <div className="alert alert-info mt-3">
          {!compnayVerifiedToUser && (
            <>
              <span>✅ Your company is submitted for verification.</span>
              <div>Company Name: {infoData.companyName}</div>
              <div>GST Number: {infoData.gstNo}</div>
              <div>Contact Person: {infoData.contactPerson}</div>
              <div>Contact Number: {infoData.contactNumber}</div>
              <div>
                Address: {contactData.addressLine1}, {contactData.city},{" "}
                {contactData.state}, {contactData.pinCode}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default index;
