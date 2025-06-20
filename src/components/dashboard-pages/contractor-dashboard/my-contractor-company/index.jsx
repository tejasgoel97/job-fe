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

  const [gstInput, setGstInput] = useState("");
  const [mode, setMode] = useState("initial"); // initial | choose | form | status
  const [companyList, setCompanyList] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);

  useEffect(() => {
    if (infoData && infoData.companyName) {
      setMode("form");
    } else if (infoData && infoData.verifiedCompanyToUser) {
      setMode("status");
    }
  }, [infoData]);

  const handleGstSubmit = async () => {
    try {
      // const res = await axios.get(`/api/company/by-gst?gst=${gstInput}`);
      const res = {data: dummyCompanies}
      if (res.data && res.data.length > 0) {
        setCompanyList(res.data);
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
      verifiedCompanyToUser: "pending",
    });
  };
  const handleConfirmCompany = () => {
    if (!selectedCompany) return alert("Please select a company.");

    const selectedData = companyList.find((c) => c.companyId === selectedCompany);
    if (!selectedData) return alert("Selected company not found.");

    setInfoData({
      ...selectedData,
      verifiedCompanyToUser: "pending",
    });
    setMode("status");
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


          <ContentRenderer
            mode={mode}
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
            isExistingCompany={isExistingCompany}
            gstInput={gstInput}
            setGstInput={setGstInput}
            companyList={companyList}
            setCompanyList={setCompanyList}
            selectedCompany={selectedCompany}
            setSelectedCompany={setSelectedCompany}
            handleConfirmCompany={handleConfirmCompany}
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
  onSubmit,
  handleGstSubmit,
  handleCompanySelect,
  companyList,
  errors,
  infoData,
  setInfoData,
  gstInput,
  setGstInput,
  setCompanyList,
  selectedCompany,
  setSelectedCompany,
  handleConfirmCompany
}) => {
  return (
    <div className="widget-content">
      {(mode === "initial" || mode ==="choose") && (
        <div className="form-group col-lg-6 col-md-12">
          <label>Enter GST Number</label>
          <input
            type="text"
            className="form-control"
            value={gstInput}
            onChange={(e) => setGstInput(e.target.value)}
            placeholder="Enter GST Number"
          />
          <button
            onClick={handleGstSubmit}
            className="theme-btn btn-style-one mt-2"
          >
            Submit
          </button>
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
                  {company.companyName} - {company.address}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleConfirmCompany}
            className="theme-btn btn-style-one mt-2"
          >
            Submit for Verification
          </button>
        </div>
      )}
      {mode === "form" && (
                  <div className="row">
            <div className="col-lg-12">
              <div className="ls-widget">
                <div className="tabs-box">
                  <div className="widget-title">
                    <h4>My Contractor Profile</h4>
                  </div>
                  <MyContractorCompany_2
                    infoData={infoData}
                    setInfoData={setInfoData}
                  />
                </div>
              </div>
              {/* <!-- Ls widget --> */}

              <div className="ls-widget">
                <div className="tabs-box">
                  <div className="widget-title">
                    <h4>Social Network</h4>
                  </div>
                  {/* End widget-title */}

                  <div className="widget-content">
                    <SocialNetworkBox />
                  </div>
                </div>
              </div>
              {/* <!-- Ls widget --> */}

              <div className="ls-widget">
                <div className="tabs-box">
                  <div className="widget-title">
                    <h4>Contact Information</h4>
                  </div>
                  {/* End widget-title */}
                  <div className="widget-content">
                    <ContactInfoBox />
                  </div>
                </div>
              </div>
              {/* <!-- Ls widget --> */}
            </div>
          </div>
      )}

      {mode === "status" && (
        <div className="alert alert-info mt-3">
          {infoData.verifiedCompanyToUser === "pending" && (
            <span>✅ Your company is submitted for verification.</span>
          )}
          {infoData.verifiedCompanyToUser === "rejected" && (
            <span>❌ Your company verification was rejected.</span>
          )}
          {infoData.verifiedCompanyToUser === "verified" && (
            <span>🎉 Your company is verified!</span>
          )}
        </div>
      )}
    </div>
  );
};

export default index;
