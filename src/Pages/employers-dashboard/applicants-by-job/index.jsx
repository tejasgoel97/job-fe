import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // <-- very important
import PostJob from "@/components/dashboard-pages/employers-dashboard/post-jobs/index";
import PostJob3 from "@/components/dashboard-pages/employers-dashboard/post-jobs/index3";
// import PostJob from "@/components/dashboard-pages/employers-dashboard/post-jobs";
import MetaComponent from "@/components/common/MetaComponent";
import axiosInstance from "@/utils/api/axiosInstance";
import AllApplicantsEmploeesPage from "../all-applicants";

const metadata = {
  title: "Post Jobs || Superio - Job Board ReactJs Template",
  description: "Superio - Job Board ReactJs Template",
};

const ApplicantsByJob = () => {
  const { jobId } = useParams();

  return (
    <>
      <MetaComponent meta={metadata} />
    
        <div style={{marginTop: "100px", display: "flex", justifyContent: "center"}}>
        
        <AllApplicantsEmploeesPage type={"job"} id={jobId} />
        {/* <PostJob3 jobId={jobId} initialData={initialData} mode="edit" /> */}
        
        </div>
      
    </>
  );
};

export default ApplicantsByJob;
