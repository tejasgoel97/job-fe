import React from "react";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css';

const AskFormContent = () => {
  return (
    <div className=" d-flex flex-column align-items-center justify-content-center py-3 bg-light">
      <div className="text-center mb-3">
        <h1 className="fs-5 fw-bold text-dark mb-1">Welcome</h1>
        <p className="fs-6 text-secondary">Log in or sign up to continue.</p>
      </div>

      <div className="row g-3 justify-content-center">
        {/* Login Card */}
        <div
          className="col-12 col-md-6 call-modal signup"
          data-bs-toggle="modal"
          data-bs-target="#loginPopupModal"
        >
          <div className=" border-0 shadow-sm p-3 bg-white rounded-3 text-center">
            <i className="fas fa-sign-in-alt fa-lg text-primary mb-2"></i>
            <h4 className="fs-6 fw-bold mb-2">Log In</h4>
            <p className="fs-6 text-muted mb-3">Access your account.</p>
            {/* <button
              className="btn btn-primary w-100 rounded-pill fs-6"
              data-bs-toggle="modal"
              data-bs-target="#askPopupModal"
            >
              Log In
            </button> */}
          </div>
        </div>

        {/* Register Card */}
        <div
          className="col-12 col-md-6 call-modal signup"
          data-bs-toggle="modal"
          data-bs-target="#registerModal"
        >
          <div className=" border-0 shadow-sm p-3 bg-white rounded-3 text-center">
            <i className="fas fa-user-plus fa-lg text-success mb-2"></i>
            <h4 className="fs-6 fw-bold mb-2">Sign Up</h4>
            <p className="fs-6 text-muted mb-3">Create a new account.</p>
            {/* <button
              className="btn btn-success w-100 rounded-pill fs-6"
              data-bs-toggle="modal"
              data-bs-target="#askPopupModal"
            >
              Sign Up
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AskFormContent;
