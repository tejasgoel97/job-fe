import PostContract from "@/components/dashboard-pages/employers-dashboard/post-contract";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Post Contract || Superio - Job Borad ReactJs Template",
  description: "Superio - Job Borad ReactJs Template",
};

const PostContractEmploerDBPage = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <PostContract />
    </>
  );
};

export default PostContractEmploerDBPage;