import PostJob from "@/components/dashboard-pages/employers-dashboard/post-jobs";

import MetaComponent from "@/components/common/MetaComponent";
import useCompanyInfoForm from "@/components/dashboard-pages/employers-dashboard/company-profile/useCompanyInfoForm";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const metadata = {
  title: "Post Jobs || Unicron Apps - Job Portal",
  description: "Unicron Apps - Job Portal",
};


const PostJobsEmploeeDBPage = () => {
    const {compnayVerifiedToUser, loadingCompanyInfo, companyId} = useCompanyInfoForm()
      const navigate = useNavigate();


  useEffect(() => {
    if(!companyId && loadingCompanyInfo === false){
       toast.error("Please link a company to your account", {
        position: "top-right",
        autoClose: 4000,
      });
      navigate("/employers-dashboard/company-profile")
    }

    else if (loadingCompanyInfo === false && !compnayVerifiedToUser) {
      toast.error("Please fill company verification first", {
        position: "top-right",
        autoClose: 4000,
      });
      navigate("/employers-dashboard/company-profile");
    }
  }, [loadingCompanyInfo, compnayVerifiedToUser, navigate]);

  return (
    <>
      <MetaComponent meta={metadata} />
      <PostJob compnayVerifiedToUser={compnayVerifiedToUser} />
    </>
  );
};

export default PostJobsEmploeeDBPage;
