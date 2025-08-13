import DashboardEmployerSidebar from "../../../header/DashboardEmployerSidebar";
import BreadCrumb from "../../BreadCrumb";
import CopyrightFooter from "../../CopyrightFooter";
import WidgetContentBox from "./components/WidgetContentBox";
import WidgetTopFilterBox from "./components/WidgetTopFilterBox";
import MenuToggler from "../../MenuToggler";
import WidgetContentBoxContractor from "./components/WidgetContentBoxContractor";

const index = ({type, id}) => {
  return (
    <div className="page-wrapper dashboard">
      {/* <span className="header-span"></span> */}
      {/* <!-- Header Span for hight --> */}

      <DashboardEmployerSidebar />
      {/* <!-- End User Sidebar Menu --> */}

      {/* <!-- Dashboard --> */}
      <section className="user-dashboard">
        <div className="dashboard-outer">
          {/* <BreadCrumb title="All Applicants!" /> */}
          {/* breadCrumb */}

          <MenuToggler />
          {/* Collapsible sidebar button */}

          <div className="row">
            <div className="col-lg-12">
              {/* <!-- Ls widget --> */}
              <div className="ls-widget">
                <div className="tabs-box">
                  <div className="widget-title">
                    {/* <h4>Applicant</h4> */}
                    {!id &&<WidgetTopFilterBox />}
                  </div>
                  {/* End top widget filter bar */}
                  {type === "job" && <WidgetContentBox jobId={id}/>}
                  {type === "contract" && <WidgetContentBoxContractor contractId={id}/>}
                  {/* End widget-content */}
                </div>
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
