import candidatesData from "../../../../../data/candidates";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import axiosInstance from "@/utils/api/axiosInstance";
import { toast } from "react-toastify";

const WidgetContentBox = () => {
  const [applications, setApplications] = useState([
    {
      _id: "685adcc529867aba564eeb2a",
      jobId: {
        _id: "681dbff572697f8a3cf91710",
        title: "Executive",
      },
      candidateId: {
        _id: "685a4ac9724756c255d81156",
        email: "test@test.com",
      },
      candidateResumeId: {
        _id: "685adcb787250cf0f257809c",
      },
      companyId: "681dba739984a5c69804167e",
      jobCreatorEmployerId: "67d3ddb10858a9eeabb3529d",
      currentStatus: "applied",
      createdAt: "2025-06-24T17:13:41.678Z",
      updatedAt: "2025-06-24T17:13:41.678Z",
      __v: 0,
    },
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axiosInstance.get(
          "/job-application/received-applications"
        );
        setApplications(response.data.applications || []);
      } catch (err) {
        console.error("Error fetching applications:", err);
        setError("Failed to load applications.");
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);
  if (loading) return <p>Loading applications...</p>;
  if (error) return <p>Error: {error}</p>;
  if (applications.length === 0) return <p>No applications found.</p>;
  const total = applications.length;
  const newA = applications.filter(
    (application) => application.currentStatus === "applied"
  ).length;
  const approved = applications.filter(
    (application) => application.currentStatus === "approved"
  ).length;
  const rejected = applications.filter(
    (application) => application.currentStatus === "approved"
  ).length;

  const handleStatusChange = async (applicationId, status) => {
    console.log("In Hnalde Statis Cjanew")
    const res = await axiosInstance.patch(
      `/job-application/update-status/${applicationId}`,
      {
        status,
        notesByEmployer:"",
      }
    );
    if (res.status === 200 && res.data.success) {

      toast.success("Status updated successfully");

    }
  };

  return (
    <div className="widget-content">
      <div className="tabs-box">
        <Tabs>
          <div className="aplicants-upper-bar">
            <h6>All Applications</h6>

            <TabList className="aplicantion-status tab-buttons clearfix">
              <Tab className="tab-btn totals"> Total(s): {total}</Tab>
              <Tab className="tab-btn approved"> New: {newA}</Tab>
              <Tab className="tab-btn approved"> Approved: {approved}</Tab>
              <Tab className="tab-btn rejected"> Rejected(s): {rejected}</Tab>
            </TabList>
          </div>

          <div className="tabs-content">
            <TabPanel>
              <div className="row">
                {applications.map((application) => (
                  <div
                    className="candidate-block-three col-lg-6 col-md-12 col-sm-12"
                    key={application._id}
                  >
                    <div className="inner-box">
                      <div className="content">
                        <figure className="image">
                          <img
                            src={
                              application.avatar ||
                              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOH2aZnIHWjMQj2lQUOWIL2f4Hljgab0ecZQ&s"
                            }
                            alt="candidates"
                          />
                        </figure>
                        <div className="d-flex justify-content-between align-items-top">
                        <h4 className="name">
                          <Link to={`/candidate/${application.candidateResumeId._id}`}>
                            {application.candidateId.firstName}{" "}
                            {application.candidateId.lastName}
                          </Link>
                        </h4>
                        <span className="p-0.5 border rounded color-white text-uppercase">{application.currentStatus}</span>
                            </div>
                        <ul className="candidate-info">
                          <li className="designation">
                            {application.candidateResumeId.currentDesignation}
                          </li>
                          <li>
                            <span className="icon flaticon-map-locator"></span>{" "}
                            {application.candidateResumeId.contactInfo.country}
                          </li>
                          <li>
                            <span className="icon flaticon-money"></span>Rs.
                            {application.candidateResumeId.currentSalary ||
                              "Not Available"}
                          </li>
                        </ul>
                        {/* End candidate-info */}

                        <ul className="post-tags">
                          <li>
                            <a href="#">
                              Applied:{" "}
                              {new Date(application.createdAt).toLocaleString()}
                            </a>
                          </li>
                          {/* {application.tags.map((val, i) => (
                            <li key={i}>
                              <a href="#">{val}</a>
                            </li>
                          ))} */}
                        </ul>
                        {/* {application.applyingMessageByCandidate && (
                          <div>
                            Message: {application.applyingMessageByCandidate}
                          </div>
                        )} */}
                      </div>
                      {/* End content */}

                      <div className="option-box">
                        <ul className="option-list">
                          <li>
                            <button data-text="View Aplication">
                              <span className="la la-eye"></span>
                            </button>
                          </li>
                          {application.currentStatus !== "shortlisted" &&
                            <li>
                            <button data-text="Approve Aplication" onClick={() => handleStatusChange(application._id, "shortlisted")}>
                              <span className="la la-check"></span>
                            </button>
                          </li>}
                          <li>
                            <button data-text="Reject Aplication" onClick={() => handleStatusChange(application._id, "rejected")}>
                              <span className="la la-times-circle"></span>
                            </button>
                          </li>
                          {application.currentStatus !== "hold" &&
                            <li>
                            <button data-text="Hold Aplication" onClick={() => handleStatusChange(application._id, "hold")}>
                              <span className="la la-pause-circle"></span>
                            </button>
                          </li>}
                        </ul>
                      </div>
                      {/* End admin options box */}
                    </div>
                  </div>
                ))}
              </div>
            </TabPanel>
            {/* End total applicants */}

            <TabPanel>
              <div className="row">
                {applications.map((application) => (
                  <div
                    className="candidate-block-three col-lg-6 col-md-12 col-sm-12"
                    key={application.id}
                  >
                    <div className="inner-box">
                      <div className="content">
                        <figure className="image">
                          <img src={application.avatar} alt="candidates" />
                        </figure>
                        <h4 className="name">
                          <Link to={`/candidates-single-v1/${application.id}`}>
                            {application.name}
                          </Link>
                        </h4>

                        <ul className="candidate-info">
                          <li className="designation">
                            {application.designation}
                          </li>
                          <li>
                            <span className="icon flaticon-map-locator"></span>{" "}
                            {application.location}
                          </li>
                          <li>
                            <span className="icon flaticon-money"></span> $
                            {application.hourlyRate} / hour
                          </li>
                        </ul>
                        {/* End candidate-info */}

                        {/* <ul className="post-tags">
                          {application.tags.map((val, i) => (
                            <li key={i}>
                              <a href="#">{val}</a>
                            </li>
                          ))}
                        </ul> */}
                      </div>
                      {/* End content */}

                      <div className="option-box">
                        <ul className="option-list">
                          <li>
                            <button data-text="View Aplication">
                              <span className="la la-eye"></span>
                            </button>
                          </li>
                          <li>
                            <button data-text="Approve Aplication">
                              <span className="la la-check"></span>
                            </button>
                          </li>
                          <li>
                            <button data-text="Reject Aplication">
                              <span className="la la-times-circle"></span>
                            </button>
                          </li>
                          <li>
                            <button data-text="Delete Aplication">
                              <span className="la la-trash"></span>
                            </button>
                          </li>
                        </ul>
                      </div>
                      {/* End admin options box */}
                    </div>
                  </div>
                ))}
              </div>
            </TabPanel>
            {/* End approved applicants */}

            <TabPanel>
              <div className="row">
                {applications.map((application) => (
                  <div
                    className="candidate-block-three col-lg-6 col-md-12 col-sm-12"
                    key={application.id}
                  >
                    <div className="inner-box">
                      <div className="content">
                        <figure className="image">
                          <img src={application.avatar} alt="candidates" />
                        </figure>
                        <h4 className="name">
                          <Link to={`/candidates-single-v1/${application.id}`}>
                            {application.name}
                          </Link>
                        </h4>

                        <ul className="candidate-info">
                          <li className="designation">
                            {application.designation}
                          </li>
                          <li>
                            <span className="icon flaticon-map-locator"></span>{" "}
                            {application.location}
                          </li>
                          <li>
                            <span className="icon flaticon-money"></span> $
                            {application.hourlyRate} / hour
                          </li>
                        </ul>
                        {/* End candidate-info */}

                        {/* <ul className="post-tags">
                          {application.tags.map((val, i) => (
                            <li key={i}>
                              <a href="#">{val}</a>
                            </li>
                          ))}
                        </ul> */}
                      </div>
                      {/* End content */}

                      <div className="option-box">
                        <ul className="option-list">
                          <li>
                            <button data-text="View Aplication">
                              <span className="la la-eye"></span>
                            </button>
                          </li>
                          <li>
                            <button data-text="Approve Aplication">
                              <span className="la la-check"></span>
                            </button>
                          </li>
                          <li>
                            <button data-text="Reject Aplication">
                              <span className="la la-times-circle"></span>
                            </button>
                          </li>
                          <li>
                            <button data-text="Delete Aplication">
                              <span className="la la-trash"></span>
                            </button>
                          </li>
                        </ul>
                      </div>
                      {/* End admin options box */}
                    </div>
                  </div>
                ))}
              </div>
            </TabPanel>
            {/* End rejected applicants */}
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default WidgetContentBox;
