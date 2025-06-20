import FormInfoBox from "./FormInfoBox";
import LogoUpload from "./LogoUpload";

const index = ({infoData, setInfoData}) => {
  return (
    <div className="widget-content">
      <LogoUpload />
      {/* End logo and cover photo components */}

      <FormInfoBox formData={infoData} setFormData={setInfoData} />
      {/* compnay info box */}
    </div>
  );
};

export default index;
