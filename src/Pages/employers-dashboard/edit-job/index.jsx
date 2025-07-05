import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // <-- very important
import PostJob from "@/components/dashboard-pages/employers-dashboard/post-jobs/index";
import PostJob3 from "@/components/dashboard-pages/employers-dashboard/post-jobs/index3";
// import PostJob from "@/components/dashboard-pages/employers-dashboard/post-jobs";
import MetaComponent from "@/components/common/MetaComponent";
import axiosInstance from "@/utils/api/axiosInstance";

const metadata = {
  title: "Post Jobs || Unicron Apps - Job Board ReactJs Template",
  description: "Unicron Apps - Job Board ReactJs Template",
};

const EditJobsEmployeeDBPage = () => {
  const { jobId } = useParams(); // ⬅️ get jobId from the URL
  const [initialData, setInitialData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      if (!jobId) {
        setLoading(false);
        return;
      }
      setLoading(true); // Ensure loading is true at the start of fetch
      try {
        const response = await axiosInstance.get(`/jobs/get-job/${jobId}`);
        // Assuming the API returns an object with 'job' and 'company' properties
        // e.g., response.data = { job: { ...details... }, company: { ...details... } }
        // Adjust based on your actual API response structure.

        if (response.data) {
          if (response.data.job) {
            setInitialData(response.data.job);
          } else {
            // Fallback if job data is at the root and company might be nested or also at root
            setInitialData(response.data);
          }
        }
      } catch (error) {
        console.error("Failed to fetch job:", error);
        // Optionally, set an error state here to inform the user
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  if (loading) {
    return <div>Loading...</div>; // Optional: You can show spinner here
  }

  return (
    <>
      <MetaComponent meta={metadata} />
      {initialData && (
        <div style={{marginTop: "100px", display: "flex", justifyContent: "center"}}>
        
        <PostJob jobId={jobId} initialData={initialData} mode="edit" />
        {/* <PostJob3 jobId={jobId} initialData={initialData} mode="edit" /> */}
        
        </div>
      )}
    </>
  );
};

export default EditJobsEmployeeDBPage;
