import DashboardEmployerSidebar from "../../../header/DashboardEmployerSidebar";
import BreadCrumb from "../../BreadCrumb";
import CopyrightFooter from "../../CopyrightFooter";
import PostContractSteps from "./components/PostContractSteps";
import PostContractBoxForm from "./components/PostContractBoxForm";
import MenuToggler from "../../MenuToggler";

const index = ({ contractId, mode, initialData }) => {
  console.log({ contractId, mode, initialData })
  return (
    <div className="page-wrapper dashboard">
      <span className="header-span"></span>
      {/* <!-- Header Span for hight --> */}

      <DashboardEmployerSidebar />
      {/* <!-- End User Sidebar Menu --> */}

      {/* <!-- Dashboard --> */}
      <section className="user-dashboard">
        <div className="dashboard-outer">
          <BreadCrumb title={mode === "edit" ? "Edit Contract" : "Post a New Contract!"} />
          {/* breadCrumb */}

          <MenuToggler />
          {/* Collapsible sidebar button */}

          <div className="row">
            <div className="col-lg-12">
              {/* <!-- Ls widget --> */}
              <div className="ls-widget">
                <div className="tabs-box">
                  <div className="widget-title">
                    <h4>Post Contract</h4>
                  </div>

                  <div className="widget-content">
                    <PostContractSteps />
                    {/* End contract steps form */}
                    <PostContractBoxForm
                      initialData={initialData}
                      mode={mode}
                      contractId={contractId}
                    />
                    {/* End post box form */}
                  </div>
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