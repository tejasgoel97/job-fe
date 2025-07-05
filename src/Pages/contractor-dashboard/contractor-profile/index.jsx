

import MetaComponent from "@/components/common/MetaComponent";
import MyContractorProfile_1 from "@/components/dashboard-pages/contractor-dashboard/my-contractor-profile";

const metadata = {
  title: "My Profile || Unicron Apps - Job Portal",
  description: "Unicron Apps - Job Portal",
};

const MyProfilePage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <MyContractorProfile_1 />
    </>
  );
};

export default MyProfilePage
