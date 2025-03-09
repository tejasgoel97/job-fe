
import EmployersList from "@/components/employers-listing-pages/employers-list-v3";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Employers List V3 || Superio - Job Borad ReactJs Template",
  description: "Superio - Job Borad ReactJs Template",
};

const EmployerListPage3 = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <EmployersList />
    </>
  );
};

export default EmployerListPage3
