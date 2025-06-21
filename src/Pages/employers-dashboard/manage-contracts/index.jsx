import ManageContracts from "@/components/dashboard-pages/employers-dashboard/manage-contracts";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Manage Contracts || Superio - Job Borad ReactJs Template",
  description: "Superio - Job Borad ReactJs Template",
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