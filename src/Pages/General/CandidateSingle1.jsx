import candidates from "@/data/candidates";
import GalleryBox from "@/components/candidates-single-pages/shared-components/GalleryBox";
import Social from "@/components/candidates-single-pages/social/Social";
import JobSkills from "@/components/candidates-single-pages/shared-components/JobSkills";
import { useParams, Link } from "react-router-dom";
import MetaComponent from "@/components/common/MetaComponent";
import { useEffect, useState } from "react";
import axiosInstance from "@/utils/api/axiosInstance";
import { useHourlyPageView } from "@/utils/api/trackPageView";

const metadata = {
  title: "Candidate Single Dynamic V3 || Unicron Apps - Job Portal",
  description: "Unicron Apps - Job Portal",
};

const CandidateSingle1 = ({ candidateId }) => {
  let params = useParams();
  const id = candidateId ? candidateId : params.id;
  const trackingNeeded = candidateId ? false : true;
  useHourlyPageView(trackingNeeded ? "candidate" : "", id);

  const candidate = candidates.find((item) => item.id == id) || candidates[0];
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchResumeData = async () => {
        setLoading(true);
        setError(null);
        try {
          const response = await axiosInstance.get(`/resume/${id}`);
          setResumeData(response.data.resume);
        } catch (e) {
          setError(e.message);
        } finally {
          setLoading(false);
        }
      };
      fetchResumeData();
    }
  }, [id]);

  // Helper to safely display currencies
  function formatCurrency(amount, currency) {
    if (!amount) return "N/A";
    return currency ? `${amount} ${currency}` : amount;
  }

  // Helper for experience dates
  function expYearMonth(exp) {
    if (exp.fromMonth && exp.fromYear) {
      return `${exp.fromMonth}/${exp.fromYear} - ${exp.toMonth || "--"}/${
        exp.toYear || "--"
      }`;
    } else if (exp.fromYear) {
      return `${exp.fromYear} - ${exp.toYear || "--"}`;
    }
    return "N/A";
  }

  // Helper for education block key
  function eduKey(edu, i) {
    return edu._id || edu.id || i;
  }

  // Helper for experience block key
  function expKey(exp, i) {
    return exp._id || exp.id || i;
  }

  // Helper for social links (ensure URLs have protocol)
  function fixURL(url) {
    if (!url) return "";
    return url.startsWith("http") ? url : "https://" + url;
  }

  if (!candidate) {
    return (
      <>
        <MetaComponent meta={metadata} />
        <section
          className="error-section"
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="auto-container text-center">
            <h2>404 - Candidate Not Found</h2>
            <p>We can't find the candidate you're looking for.</p>
            <Link to="/candidates-list-v1" className="theme-btn btn-style-one">
              Browse All Candidates
            </Link>
          </div>
        </section>
      </>
    );
  }

  if (loading) {
    return (
      <>
        <MetaComponent meta={metadata} />
        <div
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h3>Loading...</h3>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <MetaComponent meta={metadata} />
        <div
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "red",
          }}
        >
          <h3>Error loading data: {error}</h3>
        </div>
      </>
    );
  }

  const r = resumeData || {};

  return (
    <>
      <MetaComponent meta={metadata} />
      <span className="header-span"></span>
      <section className="candidate-detail-section style-three">
        <div className="upper-box">
          <div className="auto-container">
            <div className="candidate-block-six">
              <div className="inner-box">
                <figure className="image">
                  <img
                    src={
                      r.profileImageURL || "https://img.freepik.com/vector-premium/icono-avatar0002_750950-43.jpg?w=2000"
                    }
                    alt="profile avatar"
                  />
                </figure>
                <h4 className="name">
                  {`${r.firstName || ""} ${r.lastName || ""}`.trim() ||
                    "No Name"}
                </h4>
                <span className="designation">
                  {r.currentDesignation || "N/A"}
                </span>
                <div className="content">
                  <ul className="post-tags">
                    {r.skills?.map((skill, i) => (
                      <li key={i}>{skill}</li>
                    ))}
                  </ul>
                  <ul className="candidate-info">
                    <li>
                      <span className="icon flaticon-map-locator"></span>
                      {r.contactInfo?.city || "N/A"},{" "}
                      {r.contactInfo?.country || ""}
                    </li>
                    <li>
                      <span className="icon flaticon-mail"></span>
                      {r.contactInfo?.email || "N/A"}
                    </li>
                    <li>
                      <span className="icon flaticon-clock"></span>
                      Member Since,{" "}
                      {r.createdAt
                        ? new Date(r.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                          })
                        : "N/A"}
                    </li>
                  </ul>
                  <div className="btn-box">
                    {r.cvFileURL && (
                      <a
                        className="theme-btn btn-style-one"
                        href={r.cvFileURL}
                        download
                      >
                        Download CV
                      </a>
                    )}
                    <button className="bookmark-btn">
                      <i className="flaticon-bookmark"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="candidate-detail-outer">
          <div className="auto-container">
            <div className="row">
              {/* Sidebar */}
              <div className="sidebar-column col-lg-4 col-md-12 col-sm-12">
                <aside className="sidebar">
                  <div className="sidebar-widget">
                    <div className="widget-content">
                      <ul className="job-overview">
                        <li>
                          <i className="icon icon-calendar"></i>
                          <h5>Experience:</h5>
                          <span>
                            {r.totalExperienceYears
                              ? `${r.totalExperienceYears} years`
                              : r.totalExperienceMonths
                              ? `${r.totalExperienceMonths} months`
                              : "N/A"}
                          </span>
                        </li>
                        <li>
                          <i className="icon icon-expiry"></i>
                          <h5>Age:</h5>
                          <span>{r.age ? `${r.age} Years` : "N/A"}</span>
                        </li>
                        <li>
                          <i className="icon icon-rate"></i>
                          <h5>Current Salary:</h5>
                          <span>
                            {formatCurrency(
                              r.currentSalary,
                              r.currentSalaryCurrency
                            )}
                          </span>
                        </li>
                        <li>
                          <i className="icon icon-salary"></i>
                          <h5>Expected Salary:</h5>
                          <span>
                            {formatCurrency(
                              r.expectedSalary,
                              r.expectedSalaryCurrency
                            )}
                          </span>
                        </li>
                        <li>
                          <i className="icon icon-language"></i>
                          <h5>Language:</h5>
                          <span>
                            {r.languages?.length
                              ? r.languages.join(", ")
                              : "N/A"}
                          </span>
                        </li>
                        <li>
                          <i className="icon icon-degree"></i>
                          <h5>Education Level:</h5>
                          <span>{r.education?.[0]?.degree || "N/A"}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="sidebar-widget social-media-widget">
                    <h4 className="widget-title">Social media</h4>
                    <div className="widget-content">
                      <div className="social-links">
                        <Social
                          socialNetworks={{
                            facebook: fixURL(r.socialNetworks?.facebook),
                            twitter: fixURL(
                              r.socialNetworks?.twitter || r.socialNetworks?.x
                            ),
                            linkedin: fixURL(r.socialNetworks?.linkedin),
                            instagram: fixURL(r.socialNetworks?.instagram),
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="sidebar-widget">
                    <h4 className="widget-title">Professional Skills</h4>
                    <div className="widget-content">
                      <ul className="job-skills">
                        <JobSkills skills={r.skills} />
                      </ul>
                    </div>
                  </div>
                </aside>
              </div>

              {/* Main content */}
              <div className="content-column col-lg-8 col-md-12 col-sm-12">
                <div className="job-detail">
                  <h4>About Candidate</h4>
                  <p>{r.description || "No description available."}</p>

                  {/* Expertise Section */}
                  {r.expertise?.length > 0 && (
                    <div className="mt-5">
                      <h4>Areas of Expertise</h4>
                      {r.expertise.map((expertItem, index) => (
                        <div
                          key={index}
                          className="resume-outer p-4 mb-4"
                          style={{
                            border: "1px solid #e5e7eb",
                            borderRadius: "8px",
                          }}
                        >
                          <h5 className="mb-3">{expertItem.category}</h5>
                          <div className="row">
                            <div className="col-md-6">
                              <h6>Subcategories</h6>
                              <ul className="list-style-three">
                                {expertItem.subcategories?.map((sub, i) => (
                                  <li key={i}>{sub}</li>
                                ))}
                              </ul>
                            </div>
                            <div className="col-md-6">
                              <h6>Processes</h6>
                              <ul className="list-style-three">
                                {expertItem.processes?.map((proc, i) => (
                                  <li key={i}>{proc}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Portfolio */}
                  <div className="portfolio-outer mt-5">
                    <h4>Portfolio</h4>
                    <div className="row">
                      <GalleryBox />
                    </div>
                  </div>

                  {/* Education */}
                  {r.education?.length > 0 && (
                    <div className="resume-outer mt-5">
                      <div className="upper-title">
                        <h4>Education</h4>
                      </div>
                      {r.education.map((edu, i) => (
                        <div className="resume-block" key={eduKey(edu, i)}>
                          <div className="inner">
                            <span className="name">
                              {edu.institution?.charAt(0)}
                            </span>
                            <div className="title-box">
                              <div className="info-box">
                                <h3 className="fs-5">{edu.degree || "N/A"} - <span className="font-bold text-capitalize fw-light fs-6">{edu.degreeType}</span> </h3>
                                <span>{edu.institution || "N/A"}</span>
                                {edu.region && (
                                  <div>
                                    <strong>Region:</strong> {edu.region} {edu.country}
                                  </div>
                                )}

                              </div>
                              <div className="edit-box">
                                <span className="year">{`${
                                  edu.fromYear || "--"
                                }-${edu.toYear || "--"}`}</span>
                              </div>
                            </div>
                            <div className="text">{edu.description || ""}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Work & Experience */}
                  {r.experiences?.length > 0 && (
                    <div className="resume-outer theme-blue mt-5">
                      <div className="upper-title">
                        <h4>Work & Experience</h4>
                      </div>
                      {r.experiences.map((exp, i) => (
                        <div className="resume-block" key={expKey(exp, i)}>
                          <div className="inner">
                            <span className="name">
                              {exp.company?.charAt(0) || "?"}
                            </span>
                            <div className="title-box">
                              <div className="info-box">
                                <h3>{exp.title || "N/A"}</h3>
                                <span>{exp.company || "N/A"}</span>
                                 {exp.region && (
                                  <div>
                                    <strong>Region:</strong> {exp.region} {exp.country}
                                  </div>
                                )}

                              </div>
                              <div className="edit-box">
                                <span className="year">
                                  {expYearMonth(exp)}
                                </span>
                              </div>
                            </div>
                            {/* Achievements and responsibilities */}
                            {exp.achievements?.length > 0 && (
                              <div>
                                <strong>Achievements:</strong>
                                <ul>
                                  {exp.achievements.map((a, j) => (
                                    <li key={j}>{a}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            {exp.responsibilities?.length > 0 && (
                              <div>
                                <strong>Responsibilities:</strong>
                                <ul>
                                  {exp.responsibilities.map((r, j) => (
                                    <li key={j}>{r}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Awards */}
                  {r.awards?.length > 0 && (
                    <div className="resume-outer theme-yellow mt-5">
                      <div className="upper-title">
                        <h4>Awards</h4>
                      </div>
                      {r.awards.map((award, i) => (
                        <div className="resume-block" key={award._id || i}>
                          <div className="inner">
                            <span className="name">
                              {award.title?.charAt(0) || "?"}
                            </span>
                            <div className="title-box">
                              <div className="info-box">
                                <h3>{award.title || "N/A"}</h3>
                              </div>
                              <div className="edit-box">
                                <span className="year">
                                  {award.year || "N/A"}
                                </span>
                              </div>
                            </div>
                            <div className="text">
                              {award.description || ""}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {/* end main content */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CandidateSingle1;
