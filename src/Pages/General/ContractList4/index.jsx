import FilterSidebar from "./FilterSidebar";
import FilterJobBox from "./FilterJobBox";
import Breadcrumb from "@/components/common/Breadcrumb";
import CallToActions from "@/components/job-listing-page/CallToActions";
import SearchForm3 from "./SearchForm3";
// import CallToAction from "../../call-to-action/CallToAction";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import axiosInstance from "@/utils/api/axiosInstance";
const index = () => {
   const location = useLocation();
  const navigate = useNavigate();

  // Get initial query params
  const queryParams = new URLSearchParams(location.search);
  const initialSearchText = queryParams.get("jobtitle") || "";
  const initialLocation = queryParams.get("location") || "";
  const intialExpertise = queryParams.get("expertise") || "";

  // Local state for form inputs and job results

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch jobs when query params change
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/contracts/search-contracts", {
          params: {
            searchText: initialSearchText,
            locationText: initialLocation,
            expertise: intialExpertise,
          },
        });
        setJobs(response.data.contracts);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [location.search]);

  // Handle form submit and update URL

  return (
    <>
      {/* <!-- Header Span --> */}
      <span className="header-span"></span>
      {/* End MobileMenu */}
      <Breadcrumb title="Find Contracts" meta="Contracts" />
      <div className="job-search-form container py-10" data-aos-delay="700" data-aos="fade-up">
        <SearchForm3 btnStyle="btn-style-two" expertiseData={[]} intitialSearchText={initialSearchText} initialLocation={initialLocation} intialExpertise={intialExpertise} />
      </div>
      {/* <!--End Breadcrumb Start--> */}
      <section className="ls-section">
        <div className="auto-container">
          <div className="row mb-5">
            <div
              className="offcanvas offcanvas-start"
              tabIndex="-1"
              id="filter-sidebar"
              aria-labelledby="offcanvasLabel"
            >
              <div className="filters-column hide-left">
                <FilterSidebar />
              </div>
            </div>
            {/* <!-- End Filters Column --> */}
              
            <div className="content-column col-lg-12">
              <FilterJobBox jobs={jobs} loading={loading} />
            </div>
            {/* <!-- End Content Column --> */}
          </div>
          {/* End row */}

          <CallToActions />
          {/* End calltoAction */}
        </div>
        {/* End container */}
      </section>
      {/* <!--End Listing Page Section --> */}
    </>
  );
};

export default index;
