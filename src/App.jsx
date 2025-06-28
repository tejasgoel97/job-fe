import Aos from "aos";
import "aos/dist/aos.css";
import "./styles/index.scss";
import { useEffect } from "react";
import ScrollToTop from "./components/common/ScrollTop";
import { Provider } from "react-redux";
import { store } from "./store/store";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

if (typeof window !== "undefined") {
  import("bootstrap");
}
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainHeader from "./components/header/MainHeader";
import Home from "./Pages/Home/Home";
import ProtectedRoute from "./components/common/ProtectedRoute";

import ScrollTopBehaviour from "./components/common/ScrollTopBehaviour";
// import DashboardEmploeeDBPage from "./Pages/employers-dashboard/dashboard";
import CompanyProfileEmploeeDBPage from "./Pages/employers-dashboard/company-profile";
import DashboardEmploeeDBPage from "./Pages/employers-dashboard/dashboard";
import PostJobsEmploeeDBPage from "./Pages/employers-dashboard/post-jobs";
import ManageContractsEmploeeDBPage from "./Pages/employers-dashboard/manage-contracts";
import EditContractEmploeeDBPage from "./Pages/employers-dashboard/edit-contract";
import PostContractEmploeeDBPage from "./Pages/employers-dashboard/post-contract";
import ManageJobsEmploeeDBPage from "./Pages/employers-dashboard/manage-jobs";
import AllApplicantsEmploeesPage from "./Pages/employers-dashboard/all-applicants";
import EditJobsEmployeeDBPage from "./Pages/employers-dashboard/edit-job";
import JobSingle1 from "./Pages/General/JobSingle1";
import DashboardPage from "./Pages/CandidateDashboard/dashboard";
// import AppliedJobsPage from "./Pages/CandidateDashboard/applied-jobs";
// import ChangePasswordPage from "./Pages/CandidateDashboard/change-password";
// import JobAlertPage from "./Pages/CandidateDashboard/job-alerts";
import MyProfilePage from "./Pages/CandidateDashboard/my-profile";
import MyResumePage from "./Pages/CandidateDashboard/my-resume";
import CandidateSingle1 from "./Pages/General/CandidateSingle1";
import CompanySingle1 from "./Pages/General/CompanySingle1";
import JobList4 from "./Pages/General/JobList4";
import ContractList4 from "./Pages/General/ContractList4";

import ContractorDashboardPage from "./Pages/contractor-dashboard/dashboard";

import ContractorProfilePage from "./Pages/contractor-dashboard/contractor-profile";
import ContractorCompanyPage from "./Pages/contractor-dashboard/contractor-company";
import Logout from "./Pages/authPages/logout";
import AppliedJobsPage from "./Pages/CandidateDashboard/applied-jobs";
import AppliedContractsPage from "./Pages/contractor-dashboard/applied-contracts";
import ContractSingle1 from "./Pages/contract-single/index";
import ContractorProfile from "./Pages/General/ContractorProfileSingle";
import ApplicantsByJob from "./Pages/employers-dashboard/applicants-by-job";
import ApplicantsByContract from "./Pages/employers-dashboard/applicants-by-contract";



function App() {
  useEffect(() => {
    Aos.init({
      duration: 1400,
      once: true,
    });
  }, []);

  return (
    <>
      <Provider store={store}>
        <div className="page-wrapper">
          <BrowserRouter>
            {/* <h1>Header: From APps</h1> */}
            <MainHeader />
            <Routes>
              <Route path="/">
                <Route index element={<Home />} />
                <Route path="login"  element={<Home />}/>
                <Route path="logout"  element={<Logout />}/>
                <Route path="employers-dashboard" element={<ProtectedRoute allowedRoles={["employer"]} />}>
                  <Route
                    path="dashboard"
                    element={<DashboardEmploeeDBPage />}
                  />
                  <Route
                    path="company-profile"
                    element={<CompanyProfileEmploeeDBPage />}
                  />
                  <Route path="post-jobs" element={<PostJobsEmploeeDBPage />} />
                  <Route
                    path="post-contract"
                    element={<PostContractEmploeeDBPage />}
                  />
                  <Route
                    path="edit-contract/:contractId"
                    element={<EditContractEmploeeDBPage />}
                  />
                  <Route
                    path="edit-job/:jobId"
                    element={<EditJobsEmployeeDBPage />}
                  />
                  <Route
                    path="manage-jobs"
                    element={<ManageJobsEmploeeDBPage />}
                  />
                  <Route
                    path="manage-contracts"
                    element={<ManageContractsEmploeeDBPage />}
                  />
                  <Route
                    path="all-job-applicants"
                    element={<AllApplicantsEmploeesPage type={"job"}/>}
                  />
                  <Route
                    path="all-contract-applicants"
                    element={<AllApplicantsEmploeesPage type={"contract"}/>}
                  />
                  <Route
                    path="applicants-by-job/:jobId"
                    element={<ApplicantsByJob />}
                  />
                   <Route
                    path="applicants-by-contract/:contractId"
                    element={<ApplicantsByContract />}
                  />
                  <Route
                    path="manage-jobs/:jobId"
                    element={<ApplicantsByJob />}
                  />
                   <Route
                    path="manage-contracts/:contractId"
                    element={<ManageContractsEmploeeDBPage />}
                  />
                  {/* <Route
                    path="shortlisted-resumes"
                    element={<ShortListedResumeEmploeeDBPage />}
                  />
                  <Route path="packages" element={<PackageEmploeeDBPage />} />
                  <Route path="messages" element={<MessageEmploeeDBPage />} />
                  <Route
                    path="resume-alerts"
                    element={<ResumeAlertsEmploeeDBPage />}
                  />
                  <Route
                    path="change-password"
                    element={<ChangePasswordEmploeeDBPage />}
                  /> */}
                </Route>
                <Route path="candidates-dashboard" element={<ProtectedRoute allowedRoles={["candidate"]} />}
>
                  <Route path="dashboard" element={<DashboardPage />} />
                  <Route path="applied-jobs" element={<AppliedJobsPage />} />
                  {/* <Route
                    path="change-password"
                    element={<ChangePasswordPage />}
                  /> */}
                  {/* <Route path="job-alerts" element={<JobAlertPage />} /> */}


                  {/* Will Remove This */}
                  <Route path="my-profile" element={<MyProfilePage />} /> 
                  
                  <Route path="my-resume" element={<MyResumePage />} />
                </Route>

                    {/* ROUTES FOR THE CONTRACTOR */}

                <Route path ='contractor-dashboard' element={<ProtectedRoute allowedRoles={["contractor"]} />}
>
                  <Route path="dashboard" element={<ContractorDashboardPage />} />
                  <Route path="my-profile" element={<ContractorProfilePage />} />
                  <Route path="my-company" element={<ContractorCompanyPage />} />
                  <Route path="applied-contracts" element={<AppliedContractsPage />} />
                </Route>



                <Route path="job/:id" element={<JobSingle1 />} />
                <Route path='candidate/:id' element={<CandidateSingle1 />} />
                <Route path='contractor/:id' element={<ContractorProfile />} />
                <Route path="company/:id" element={<CompanySingle1 />} />
                <Route path="contract/:id" element={<ContractSingle1 />} />
                <Route path='job-list' element = {<JobList4 />} />  
                <Route path='contract-list' element = {<ContractList4 />} />
              </Route>
            </Routes>
            <ScrollTopBehaviour />
          </BrowserRouter>

          {/* Toastify */}
          <ToastContainer
            position="bottom-right"
            autoClose={500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
          {/* <!-- Scroll To Top --> */}
          <ScrollToTop />
        </div>
      </Provider>
    </>
  );
}

export default App;
