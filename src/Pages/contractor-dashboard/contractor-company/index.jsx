

import MetaComponent from "@/components/common/MetaComponent";
import MyCompanyProfile_1 from "@/components/dashboard-pages/contractor-dashboard/my-contractor-company";

const metadata = {
  title: "My Company Profile ",
  description: "Foundary Jobs",
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
