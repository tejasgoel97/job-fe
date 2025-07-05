import MetaComponent from "@/components/common/MetaComponent";
import ContractSingleView from "@/components/SingleContract/ContractSingleView";

const metadata = {
  title: "Contract Details || Unicron Apps - Job Portal",
  description: "Unicron Apps - Job Portal",
};

const ContractSinglePage = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <ContractSingleView />
    </>
  );
};

export default ContractSinglePage;