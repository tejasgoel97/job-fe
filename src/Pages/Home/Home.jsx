import React from "react";

import Home from "@/components/home/index";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Home-4 || Unicron Apps - Job Portal",
  description: "Unicron Apps - Job Portal",
};

const HomePage4 = () => {
  return (
    <>
    <MetaComponent meta={metadata} />
      <Home />
    </>
  );
};

export default HomePage4;
