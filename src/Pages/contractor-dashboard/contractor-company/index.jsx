

import MetaComponent from "@/components/common/MetaComponent";
import MyCompanyProfile_1 from "@/components/dashboard-pages/contractor-dashboard/my-contractor-company";

const metadata = {
  title: "My Company Profile || Superio - Job Borad ReactJs Template",
  description: "Superio - Job Borad ReactJs Template",
};

const MyCompanyPage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <MyCompanyProfile_1 />
    </>
  );
};

export default MyCompanyPage
