import { useState } from "react";
import CompanyExpertiseSelector from "./CompanyExpertiseSelector";
import FormInfoBox from "./FormInfoBox";
import LogoUpload from "./LogoUpload";
import ImagesUploadSection from "./ImagesUploadSection";

const index = ({ infoData, setInfoData,    companyLogo,
    setCompanyLogo,
    companyPhotos,
    setCompanyPhotos, errors,  initialExpertise=[], selectedExpertise=[], setSelectedExpertise }) => {

  return (
    <div className="widget-content">
      <LogoUpload companyLogo={companyLogo} setCompanyLogo={setCompanyLogo} />
      {/* End logo and cover photo components */}
      <ImagesUploadSection companyPhotos={companyPhotos} setCompanyPhotos={setCompanyPhotos} />
      <FormInfoBox formData={infoData} setFormData={setInfoData} errors={errors} />
      {/* compnay info box */}
      <CompanyExpertiseSelector initialExpertise={initialExpertise} selectedExpertise={selectedExpertise} setSelectedExpertise={setSelectedExpertise}/>
    </div>
  );
};

export default index;
