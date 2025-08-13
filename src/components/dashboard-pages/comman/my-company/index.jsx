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
import { toast } from "react-toastify";
import CompanySingle1 from "@/Pages/General/CompanySingle1";

const index = ({ role = "employer" }) => {
  const {
    infoData,
    setInfoData,
    contactData,
    setContactData,
    socialData,
    setSocialData,
        companyLogo,
    setCompanyLogo,
    companyPhotos,
    setCompanyPhotos,
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
const [isEditing, setIsEditing] = useState(false);

  {
    /*
    if initital  we ask the customer to add the GST
    if choose - we show the options fot the user to choose the GST
    if status - the user has submitted the company but pending approval
    if form - eiter user asked to create one or update
  */
  }
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
        toast.error(res?.data?.message ||res?.data?.error || "Something went wrong");
      }
    } catch (err) {
      console.error("Error fetching companies", err);
        toast.error("Offline or Something went wrong");
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
      {role === "contractor" && (
        <>
          <DashboardContractorHeader />

          <DashboardContractorSidebar />
        </>
      )}

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
            companyLogo={companyLogo}
            setCompanyLogo={setCompanyLogo}
            companyPhotos={companyPhotos}
            setCompanyPhotos={setCompanyPhotos}
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
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            linkUserToCompany={linkUserToCompany}
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
      companyLogo,
    setCompanyLogo,
    companyPhotos,
    setCompanyPhotos,
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
  isEditing, setIsEditing
, linkUserToCompany
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
        <label className="mb-2">Select your Company</label>
        <div className="d-flex flex-wrap gap-3">
          {companyList.map((company) => {
            const isActive = selectedCompany === company.companyId;
            return (
              <div
                key={company.companyId}
                onClick={() => setSelectedCompany(company.companyId)}
                className={`card p-3 text-center cursor-pointer shadow-sm ${
                  isActive ? "border-primary border-3" : ""
                }`}
                style={{
                  width: "300px",
                  cursor: "pointer",
                  marginBottom: "10px",
                  height: "150px",
                }}
              >
                {/* <FaBuilding size={32} className="text-primary mb-2" /> */}
                <strong>{company.infoData.companyName}</strong>
                <small className="text-muted d-block">
                  {company.contactData.city}, {company.contactData.state}
                </small>
              </div>
            );
          })}
        </div>
      </div>

      <button
        onClick={() => handleConfirmCompany(selectedCompany)}
        className="theme-btn btn-style-one mt-3"
        disabled={!selectedCompany || linkingLoading}
      >
        {linkingLoading ? "Submitting..." : "Submit for Verification"}
      </button>
    </div>
      )}
      {mode === "form" && !isEditing && (
  <div className="text-right">
    <button
      className="btn btn-outline-primary"
      type="button"
      onClick={()=> setIsEditing((prev) => !prev)}
      disabled={linkingLoading}
    >
      <span className="ml-3 flex items-center" style={{ fontWeight: 500 }}>
        <i
          className="flaticon-pencil"
          style={{ fontSize: 20, marginRight: 8 }}
        />
        Edit
      </span>
    </button>
  </div>
)}
{mode === "form" && (
  <>
    {!isEditing ? (
      <>
        <CompanySingle1
            companyId={companyId}

        />
        <div className="mt-3">
          <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
            Edit Company
          </button>
        </div>
      </>
    ) : (
              <form onSubmit={onSubmit}>
          <div className="row">
            <div className="col-lg-12">
              <div className="ls-widget">
                <div className="tabs-box">
                  <div className="widget-title">
                    <h4>
                      {companyId ? "Update" : "Create New"} Company Profile
                    </h4>
                  </div>
                  <MyContractorCompany_2
                    infoData={infoData}
                    setInfoData={setInfoData}
                    selectedExpertise={selectedExpertise}
                    setSelectedExpertise={setSelectedExpertise}
                    initialExpertise={initialExpertise}
                    companyPhotos={companyPhotos}
                    setCompanyPhotos={setCompanyPhotos}
                    companyLogo={companyLogo}
                    setCompanyLogo={setCompanyLogo}
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
          {Object.keys(errors).length > 0 && (
            <div className="alert alert-danger mt-3" role="alert">
              <ul className="mb-0">
                {Object.entries(errors).map(([field, message]) => (
                  <li key={field}>{message}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="row">
            <div className="form-group col-lg-12 col-md-12">
              <button type="submit" className="theme-btn btn-style-one">
                Save Changes
              </button>
            </div>
          </div>
        </form>
    )}
  </>
)}


      {mode === "status" && (
       <div className="alert alert-info mt-3">
  {!compnayVerifiedToUser && (
    <>
      <span>⏳ Your request to join this company is pending verification.</span>
      <div className="mt-2"><strong>Company Name:</strong> {infoData.companyName}</div>
      <div><strong>GST Number:</strong> {infoData.gstNo}</div>
      <div className="mt-2">
        Please reach out to existing verified members of this company to approve your request.
      </div>
      <button
        onClick={() => linkUserToCompany(companyId)}
        className="theme-btn btn-style-one mt-3"
      >
        Send Verification Request Again
      </button>
    </>
  )}
</div>

      )}
    </div>
  );
};

export default index;
