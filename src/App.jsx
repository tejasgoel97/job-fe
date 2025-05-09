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
import ScrollTopBehaviour from "./components/common/ScrollTopBehaviour";
// import DashboardEmploeeDBPage from "./Pages/employers-dashboard/dashboard";
import CompanyProfileEmploeeDBPage from "./Pages/employers-dashboard/company-profile";
import DashboardEmploeeDBPage from "./Pages/employers-dashboard/dashboard";
import PostJobsEmploeeDBPage from "./Pages/employers-dashboard/post-jobs";
import ManageJobsEmploeeDBPage from "./Pages/employers-dashboard/manage-jobs";
import AllApplicantsEmploeesPage from "./Pages/employers-dashboard/all-applicants";
import EditJobsEmployeeDBPage from "./Pages/employers-dashboard/edit-job";
import JobSingle1 from "./Pages/General/JobSingle1";

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
                <Route path="employers-dashboard">
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
                    path="edit-job/:jobId"
                    element={<EditJobsEmployeeDBPage />}
                  />
                  <Route
                    path="manage-jobs"
                    element={<ManageJobsEmploeeDBPage />}
                  />
                  <Route
                    path="all-applicants"
                    element={<AllApplicantsEmploeesPage />}
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
                <Route path="job/:id" element={<JobSingle1 />} />
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
