
import AppliedContracts from "@/components/dashboard-pages/contractor-dashboard/applied-contracts";
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Applied Jobs || Superio - Job Borad ReactJs Template",
  description: "Superio - Job Borad ReactJs Template",
};

const AppliedJobsPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <AppliedContracts />
    </>
  );
};

export default AppliedJobsPage
