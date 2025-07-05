
import candidates from "@/data/candidates";

import GalleryBox from "@/components/candidates-single-pages/shared-components/GalleryBox";
import Social from "@/components/candidates-single-pages/social/Social";
import JobSkills from "@/components/candidates-single-pages/shared-components/JobSkills";
import {useParams } from "react-router-dom";

import MetaComponent from "@/components/common/MetaComponent";
import { useEffect, useState } from "react";
import axiosInstance from "@/utils/api/axiosInstance";

const metadata = {
  title:
    "Candidate Single Dyanmic V3 || Unicron Apps - Job Portal",
  description: "Unicron Apps - Job Portal",
};

const CandidateSingle1 = () => {
  let params = useParams();
  const id = params.id;
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

          let data = response.data
          // Simulating API call with the provided sample response
          // await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
          const sampleApiResponse = {
            "contactInfo": { "phoneNumber": "asdasdasd", "email": "asdasdasd@gmail.com", "country": "Chaina", "city": "Chaina", "completeAddress": "asdasdasdasdasdasasdasd", "googleMapLink": "asdasdasdasd" },
            "socialNetworks": { "facebook": "https://www.facebook.com/Invision", "twitter": "https://twitter.com/envato", "linkedin": "https://www.linkedin.com/company/envato/", "googlePlus": "https://plus.google.com/+Envato" },
            "_id": "68566e6487250cf0f29dd241", "userId": "67d3ddb10858a9eeabb3529d", "__v": 0, "awards": [], "createdAt": "2025-06-21T08:33:40.230Z",
            "education": [ { "degree": "Master Degree", "institution": "Cambridge University", "fromYear": "2012", "toYear": "2014", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus.", "_id": "68567554f12e632fc54b3350" } ],
            "experiences": [ { "title": "Product Designer", "company": "Google Inc.", "fromYear": "2014", "toYear": "2018", "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a ipsum tellus. Interdum et malesuada fames ac ante ipsum primis in faucibus.", "_id": "68567554f12e632fc54b334f" } ],
            "skills": [ "App Design", "Illustrator", "HTML", "CSS", "Photoshop" ],
            "updatedAt": "2025-06-21T09:20:38.799Z",
            "description": "Hello my name is Nicole Wells and web developer from Portland. In pharetra orci dignissim, blandit mi semper, ultricies diam. Suspendisse malesuada suscipit nunc non volutpat. Sed porta nulla id orci laoreet tempor non consequat enim. Sed vitae aliquam velit. Aliquam ante erat, blandit at pretium et, accumsan ac est. Integer vehicula rhoncus molestie. Morbi ornare ipsum sed sem condimentum, et pulvinar tortor luctus. Suspendisse condimentum lorem ut elementum aliquam. Mauris nec erat ut libero vulputate pulvinar. Aliquam ante erat, blandit at pretium et, accumsan ac est. Integer vehicula rhoncus molestie. Morbi ornare ipsum sed sem condimentum, et pulvinar tortor luctus. Suspendisse condimentum lorem ut elementum aliquam. Mauris nec erat ut libero vulputate pulvinar.",
            "name": "Darlene Robertson",
            "portfolioFile": null, "age": "28", "currentSalary": "11", "currentlyWorking": false, "expectedSalary": "26",
            "languages": [ "English", "German", "Spanish" ],
            "totalExperienceMonths": "", "totalExperienceYears": "2"
          };
          setResumeData(data.resume || sampleApiResponse);
        } catch (e) {
          setError(e.message);
        } finally {
          setLoading(false);
        }
      };      fetchResumeData();
    }
  }, [id]);

    console.log(resumeData)


if (!candidate) {
    return (
      <>
        <MetaComponent meta={metadata} />
        <section className="error-section" style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="auto-container text-center">
            <h2>404 - Candidate Not Found</h2>
            <p>We can't find the candidate you're looking for.</p>
            <Link to="/candidates-list-v1" className="theme-btn btn-style-one">Browse All Candidates</Link>
          </div>
        </section>
      </>
    );
  }

  if (loading) {
    return (
      <>
        <MetaComponent meta={metadata} />
        <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <h3>Loading...</h3>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <MetaComponent meta={metadata} />
        <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'red' }}>
          <h3>Error loading data: {error}</h3>
        </div>
      </>
    );
  }

  return (
    <>
    <MetaComponent meta={metadata} />
      {/* <!-- Header Span --> */}
      <span className="header-span"></span>


      {/* End Login Popup Modal */}

      {/* <DefaulHeader /> */}
      {/* <!--End Main Header --> */}

      {/* End MobileMenu */}

      {/* <!-- Job Detail Section --> */}
      <section className="candidate-detail-section style-three">
        <div className="upper-box">
          <div className="auto-container">
            <div className="candidate-block-six">
              <div className="inner-box">
                <figure className="image">
                  <img
                   
                    src={candidate?.avatar}
                    alt="avatar"
                  />
                </figure>
                <h4 className="name">{resumeData?.name}</h4>
                <span className="designation">{resumeData?.designation || "Web Developer"}</span>

                <div className="content">
                  <ul className="post-tags">
                    {resumeData?.skills?.map((val, i) => (
                      <li key={i}>{val}</li>
                    ))}
                  </ul>
                  {/* End post-tags */}

                  <ul className="candidate-info">
                    <li>
                      <span className="icon flaticon-map-locator"></span>
                      {resumeData?.contactInfo?.city}, {resumeData?.contactInfo?.country}
                    </li>
                    <li>
                      <span className="icon flaticon-money"></span> $
                      {resumeData?.hourlyRate} / hour
                    </li>
                    <li>
                      <span className="icon flaticon-clock"></span> Member
                      Since,Aug 19, 2020
                    </li>
                  </ul>
                  {/* End candidate-info */}

                  <div className="btn-box">
                    <a
                      className="theme-btn btn-style-one"
                      href="/images/sample.pdf"
                      download
                    >
                      Download CV
                    </a>
                    <button className="bookmark-btn">
                      <i className="flaticon-bookmark"></i>
                    </button>
                  </div>
                  {/* Download cv box */}
                </div>
                {/* End .content */}
              </div>
            </div>
            {/*  <!-- Candidate block Five --> */}
          </div>
        </div>
        {/* <!-- Upper Box --> */}

        <div className="candidate-detail-outer">
          <div className="auto-container">
            <div className="row">
              <div className="sidebar-column col-lg-4 col-md-12 col-sm-12">
                <aside className="sidebar">
                  <div className="sidebar-widget">
                    <div className="widget-content">
                      <ul className="job-overview">
                        <li>
                          <i className="icon icon-calendar"></i>
                          <h5>Experience:</h5>
                          <span>{resumeData?.totalExperienceYears} years</span>
                        </li>

                        <li>
                          <i className="icon icon-expiry"></i>
                          <h5>Age:</h5>
                          <span>{resumeData?.age} yr</span>
                        </li>

                        <li>
                          <i className="icon icon-rate"></i>
                          <h5>Current Salary:</h5>
                          <span>{resumeData?.currentSalary}</span>
                        </li>

                        <li>
                          <i className="icon icon-salary"></i>
                          <h5>Expected Salary:</h5>
                          <span>{resumeData?.expectedSalary}</span>
                        </li>

                        <li>
                          <i className="icon icon-user-2"></i>
                          <h5>Gender:</h5>
                          <span>{resumeData?.gender || "Male"}</span>
                        </li>

                        <li>
                          <i className="icon icon-language"></i>
                          <h5>Language:</h5>
                          <div></div>
                          <span>{resumeData?.languages?.join(", ")}</span>
                        </li>

                        <li>
                          <i className="icon icon-degree"></i>
                          <h5>Education Level:</h5>
                          <span>{resumeData?.education?.[0]?.degree}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* End .sidebar-widget conadidate overview */}

                  <div className="sidebar-widget social-media-widget">
                    <h4 className="widget-title">Social media</h4>
                    <div className="widget-content">
                      <div className="social-links">
                        <Social socialNetworks={resumeData?.socialNetworks} />
                      </div>
                    </div>
                  </div>
                  {/* End .sidebar-widget social-media-widget */}

                  <div className="sidebar-widget">
                    <h4 className="widget-title">Professional Skills</h4>
                    <div className="widget-content">
                      <ul className="job-skills">
                        <JobSkills skills={resumeData?.skills} />
                      </ul>
                    </div>
                  </div>
                  {/* End .sidebar-widget skill widget */}

                  {/* <div className="sidebar-widget contact-widget">
                    <h4 className="widget-title">Contact Us</h4>
                    <div className="widget-content">
                      <div className="default-form">
                        <Contact />
                      </div>
                    </div>
                  </div> */}
                  {/* End .sidebar-widget contact-widget */}
                </aside>
                {/* End .sidebar */}
              </div>
              {/* End .sidebar-column */}

              <div className="content-column col-lg-8 col-md-12 col-sm-12">
                <div className="job-detail">
                  <h4>Candidates About</h4>
                  <p>
                    {resumeData.description}
                  </p>


                  {/* <!-- Portfolio --> */}
                  <div className="portfolio-outer">
                    <div className="row">
                      <GalleryBox />
                    </div>
                  </div>




                   {resumeData.education?.length > 0 && <div
                      className={`resume-outer `}

                    >
                      <div className="upper-title">
                        <h4>{"Education"}</h4>
                      </div>
                      {resumeData.education.map((edu) => (
                        <div className="resume-block" key={edu.id}>
                          <div className="inner">
                            <span className="name">{edu.degree.charAt(0)}</span>
                            <div className="title-box">
                              <div className="info-box">
                                <h3>{edu.degree}</h3>
                                <span>{edu.institution}</span>
                              </div>
                              <div className="edit-box">
                                  <span className="year">{edu.fromYear} - {edu.toYear}</span>
                              </div>
                            </div>
                            <div className="text">{edu.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>}


                     {/* <!-- Resume / Work & Experience --> */}
                  {resumeData.experiences?.length > 0 && (
                    <div className="resume-outer theme-blue">
                      <div className="upper-title">
                        <h4>Work & Experience</h4>
                      </div>
                      {resumeData.experiences.map(exp => (
                        <div className="resume-block" key={exp._id}>
                          <div className="inner">
                            <span className="name">{exp.company.charAt(0)}</span>
                            <div className="title-box">
                              <div className="info-box">
                                <h3>{exp.title}</h3>
                                <span>{exp.company}</span>
                              </div>
                              <div className="edit-box">
                                <span className="year">{exp.fromYear} - {exp.toYear}</span>
                              </div>
                            </div>
                            <div className="text">{exp.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}


                  {resumeData.awards?.length > 0 && (
                    <div className="resume-outer theme-yellow">
                      <div className="upper-title">
                        <h4>Work & Experience</h4>
                      </div>
                      {resumeData.awards.map(award => (
                        <div className="resume-block" key={award._id}>
                          <div className="inner">
                            <span className="name">{award.title.charAt(0)}</span>
                            <div className="title-box">
                              <div className="info-box">
                                <h3>{award.title}</h3>
                                {/* <span>{award.company}</span> */}
                              </div>
                              <div className="edit-box">
                                <span className="year">{award.fromYear} - {award.toYear}</span>
                              </div>
                            </div>
                            <div className="text">{award.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {/* <!-- Candidate Resume End --> */}

                  {/* <div className="video-outer">
                    <h4>Intro Video</h4>
                    <AboutVideo />
                  </div> */}
                  {/* <!-- About Video Box --> */}
                </div>
              </div>
              {/* End .content-column */}
            </div>
          </div>
        </div>
        {/* <!-- job-detail-outer--> */}
      </section>
      {/* <!-- End Job Detail Section --> */}

      {/* <FooterDefault footerStyle="alternate5" /> */}
      {/* <!-- End Main Footer --> */}
    </>
  );
};

export default CandidateSingle1
