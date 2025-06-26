import MetaComponent from "@/components/common/MetaComponent";
import ContractSingleView from "@/components/SingleContract/ContractSingleView";

const metadata = {
  title: "Contract Details || Superio - Job Borad ReactJs Template",
  description: "Superio - Job Borad ReactJs Template",
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