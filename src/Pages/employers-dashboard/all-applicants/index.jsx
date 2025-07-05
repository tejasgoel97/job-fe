
import AllApplicants from "@/components/dashboard-pages/employers-dashboard/all-applicants";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "All Applicants || Unicron Apps - Job Portal",
  description: "Unicron Apps - Job Portal",
};

const AllApplicantsEmploeesPage = ({type, id}) => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <AllApplicants type={type} id={id}/>
    </>
  );
};

export default AllApplicantsEmploeesPage
