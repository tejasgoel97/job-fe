import CompanyExpertiseSelector from "./CompanyExpertiseSelector";
import FormInfoBox from "./FormInfoBox";
import LogoUpload from "./LogoUpload";

const index = ({ infoData, setInfoData, errors,  initialExpertise=[], selectedExpertise=[], setSelectedExpertise }) => {
    console.log("isSignInWithEmailLink",{initialExpertise})
  
  return (
    <div className="widget-content">
      <LogoUpload />
      {/* End logo and cover photo components */}

      <FormInfoBox formData={infoData} setFormData={setInfoData} errors={errors} />
      {/* compnay info box */}
      <CompanyExpertiseSelector initialExpertise={initialExpertise} selectedExpertise={selectedExpertise} setSelectedExpertise={setSelectedExpertise}/>
    </div>
  );
};

export default index;
