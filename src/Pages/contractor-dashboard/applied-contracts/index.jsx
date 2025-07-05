
import AppliedContracts from "@/components/dashboard-pages/contractor-dashboard/applied-contracts";
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Applied Jobs || Unicron Apps - Job Portal",
  description: "Unicron Apps - Job Portal",
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
