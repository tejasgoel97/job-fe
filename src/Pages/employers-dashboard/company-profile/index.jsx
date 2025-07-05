import MetaComponent from "@/components/common/MetaComponent";
// import CompanyProfile from "@/components/dashboard-pages/employers-dashboard/company-profile";
import CompanyProfile from "@/components/dashboard-pages/comman/my-company/index"
const metadata = {
  title: "Company Profile || Unicron Apps - Job Portal",
  description: "Unicron Apps - Job Portal",
};

const CompanyProfileEmploeeDBPage = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <CompanyProfile/>
    </>
  );
};

export default CompanyProfileEmploeeDBPage;
