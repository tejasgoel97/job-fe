import ManageContracts from "@/components/dashboard-pages/employers-dashboard/manage-contracts";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Manage Contracts || Unicron Apps - Job Portal",
  description: "Unicron Apps - Job Portal",
};

const ManageContractsEmploeeDBPage = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <ManageContracts />
    </>
  );
};

export default ManageContractsEmploeeDBPage;