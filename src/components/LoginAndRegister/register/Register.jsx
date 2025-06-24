import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Form from "../Login/FormContent";
import { Link } from "react-router-dom";
import RegisterFormContent from "./FormContent";

const Register = () => {
  return (
    <div className="form-inner">
      <RegisterFormContent />
      {/* End form-group */}

      <div className="bottom-box">
        <div className="text">
          Already have an account?{" "}
          <Link
            to="#"
            className="call-modal login"
            data-bs-toggle="modal"
            data-bs-dismiss="modal"
            data-bs-target="#loginPopupModal"
          >
            LogIn
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
