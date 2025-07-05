import MetaComponent from "@/components/common/MetaComponent";
import DashboadHome from "@/components/dashboard-pages/employers-dashboard/dashboard";

const metadata = {
  title: "Employeers Dashboard || Unicron Apps - Job Portal",
  description: "Unicron Apps - Job Portal",
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
