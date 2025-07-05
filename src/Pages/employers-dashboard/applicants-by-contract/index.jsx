import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // <-- very important
import PostJob from "@/components/dashboard-pages/employers-dashboard/post-jobs/index";
import PostJob3 from "@/components/dashboard-pages/employers-dashboard/post-jobs/index3";
// import PostJob from "@/components/dashboard-pages/employers-dashboard/post-jobs";
import MetaComponent from "@/components/common/MetaComponent";
import axiosInstance from "@/utils/api/axiosInstance";
import AllApplicantsEmploeesPage from "../all-applicants";

const metadata = {
  title: "Post Jobs || Unicron Apps - Job Board ReactJs Template",
  description: "Unicron Apps - Job Board ReactJs Template",
};

const ApplicantsByJob = () => {
  const { contractId } = useParams();

  return (
    <>
      <MetaComponent meta={metadata} />
    
        <div style={{marginTop: "100px", display: "flex", justifyContent: "center"}}>
        
        <AllApplicantsEmploeesPage type={"contract"} id={contractId} />
        {/* <PostJob3 contractId={contractId} initialData={initialData} mode="edit" /> */}
        
        </div>
      
    </>
  );
};

export default ApplicantsByJob;
