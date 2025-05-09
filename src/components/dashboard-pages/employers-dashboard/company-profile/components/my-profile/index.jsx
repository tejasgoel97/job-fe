import FormInfoBox from "./FormInfoBox";
import LogoCoverUploader from "./LogoCoverUploader";

const index = ({ infoData, setInfoData }) => {
  return (
    <div className="widget-content">
      <LogoCoverUploader />
      {/* End logo and cover photo components */}

      <FormInfoBox formData={infoData} setFormData={setInfoData} />
      {/* compnay info box */}
    </div>
  );
};

export default index;
