import MetaComponent from "@/components/common/MetaComponent";
import CompanyProfile from "@/components/dashboard-pages/employers-dashboard/company-profile";

const metadata = {
  title: "Company Profile || Superio - Job Borad ReactJs Template",
  description: "Superio - Job Borad ReactJs Template",
};

const CompanyProfileEmploeeDBPage = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <CompanyProfile />
    </>
  );
};

export default CompanyProfileEmploeeDBPage;
