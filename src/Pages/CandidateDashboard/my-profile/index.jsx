
import MyProfile from "@/components/dashboard-pages/candidates-dashboard/my-profile";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "My Profile || Unicron Apps - Job Portal",
  description: "Unicron Apps - Job Portal",
};

const MyProfilePage = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <MyProfile />
    </>
  );
};

export default MyProfilePage
