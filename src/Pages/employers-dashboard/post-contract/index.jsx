import PostContract from "@/components/dashboard-pages/employers-dashboard/post-contract";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Post Contract || Unicron Apps - Job Portal",
  description: "Unicron Apps - Job Portal",
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