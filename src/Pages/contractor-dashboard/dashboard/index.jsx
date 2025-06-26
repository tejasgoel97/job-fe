import MetaComponent from "@/components/common/MetaComponent";
import DashboadHome from "@/components/dashboard-pages/contractor-dashboard/dashboard";

const metadata = {
  title: "Employeers Dashboard || Superio - Job Borad ReactJs Template",
  description: "Superio - Job Borad ReactJs Template",
};

const DashboardEmploeeDBPage = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <DashboadHome />
    </>
  );
};

export default DashboardEmploeeDBPage;
