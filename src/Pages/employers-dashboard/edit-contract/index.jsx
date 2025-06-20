import PostContract from "@/components/dashboard-pages/employers-dashboard/post-contract";
import MetaComponent from "@/components/common/MetaComponent";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuthStore from "@/utils/authStoreZusland";

const metadata = {
  title: "Edit Contract || Superio - Job Borad ReactJs Template",
  description: "Superio - Job Borad ReactJs Template",
};

const EditContractEmploeeDBPage = () => {
  const { contractId } = useParams();
  console.log(contractId)
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchContractData = async () => {
      if (!user) {
        setError("User not authenticated.");
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`http://localhost:3000/api/contracts/get-contract/${contractId}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log({data})
        setInitialData(data.contract); // Assuming the API returns { data: contractObject }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContractData();
  }, [contractId, user]);

  return (
    <>
      <MetaComponent meta={metadata} />
      {loading ? <div>Loading contract data...</div> : error ? <div>Error: {error}</div> : <PostContract contractId={contractId} mode="edit" initialData={initialData} />}
    </>
  );
};

export default EditContractEmploeeDBPage;