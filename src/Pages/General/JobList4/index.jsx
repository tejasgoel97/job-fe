
import FilterSidebar from "./FilterSidebar";
import FilterJobBox from "./FilterJobBox";
import Breadcrumb from "@/components/common/Breadcrumb";
import CallToActions from "@/components/job-listing-page/CallToActions";
// import CallToAction from "../../call-to-action/CallToAction";

const index = () => {
  return (
    <>
      {/* <!-- Header Span --> */}
      <span className="header-span"></span>

      {/* End MobileMenu */}

      <Breadcrumb title="Find Jobs" meta="Jobs" />
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
              <FilterJobBox />
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
