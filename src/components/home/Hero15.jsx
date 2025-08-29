import SearchForm3 from "./JobSearchForm3";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { InView } from "react-intersection-observer";
import "./styles.css"
import ContractorSearchForm3 from "./ContractSearchForm3";
import axiosInstance from "@/utils/api/axiosInstance";

const index = () => {

    const [expertiseData, setExpertiseData] = useState([]);
  const [mode, setMode] = useState("job"); // 'job' or 'contract'

  useEffect(() => {
    const fetchExpertise = async () => {
      try {
        const res = await axiosInstance("/expertise/get-all-expertise");
        if (!res.data?.success) throw new Error(res.data?.success);
        const fetchedExpertise = res.data.data.expertiseList || [];
        setExpertiseData(fetchedExpertise);
      } catch (error) {
        console.error("Failed to load expertise", error);
      }
    };

    fetchExpertise();
  }, []);


  return (
    <section
      className="banner-section -type-15 position-relative"
      style={{ overflow: "hidden" }}
    >
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          backgroundImage:
            "url('https://wallpaperaccess.com/full/11114926.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundColor: "rgba(0,0,0,0.55)", // darker overlay
          transform: "scale(1.1)", // avoids white edges after blur
          zIndex: 0,
        }}
      ></div>
      <div className="auto-container">
        <div className="cotnent-box">
          <div className="title-box" data-wow-delay="300" data-aos="fade-up">
            <h3 className="title-overlay text-white" >Join us & Explore Thousands of Jobs</h3>
            <div className="text text-overlay text-white">
              Find Jobs, Employment & Career Opportunities
            </div>
          </div>
          {/* End title-box */}
                      <div className="toggle-menu" data-aos-delay="500" data-aos="fade-up">
            <div className="toggle-container">
              <div
                className={`toggle-option ${mode === "job" ? "active" : ""}`}
                onClick={() => setMode("job")}
              >
                Find Job
              </div>
              <div
                className={`toggle-option  ${
                  mode === "contract" ? "active" : ""
                }`}
                onClick={() => setMode("contract")}
              >
                Find Contract
              </div>
              <div className={`slider ${mode}`}></div>
            </div>
          </div>
            {mode === "contract" && (
            <div
              className="job-search-form"
              data-aos-delay="100"
              data-aos="fade-up"
            >
              <ContractorSearchForm3
                btnStyle="btn-style-two"
                expertiseData={expertiseData}
              />
            </div>
          )}
          {mode === "job" && (
            <div
              className="job-search-form"
              data-aos-delay="100"
              data-aos="fade-up"
            >
              <SearchForm3
                btnStyle="btn-style-two"
                expertiseData={expertiseData}
              />
            </div>
          )}
          {/* <!-- Job Search Form --> */}

          <div className="fun-fact-section">
            <div className="row">
              {/* <!--Column--> */}
              <Funfact3 />
            </div>
          </div>
          {/* <!-- Fun Fact Section --> */}
        </div>
        {/* End content-box */}
      </div>
            {/* Styles */}
      <style jsx>{`
        
      `}</style>
    </section>
    // <!-- End Banner Section-->
  );
};







const Funfact3 = () => {
  const [focus, setFocus] = useState(false);

  const counterUpContent = [
    {
      id: 1,
      startCount: "0",
      endCount: "97216",
      meta: "Jobs",
      animationDelay: "700",
    },
    {
      id: 2,
      startCount: "0",
      endCount: "4782",
      meta: "Members",
      animationDelay: "800",
    },
    {
      id: 3,
      startCount: "0",
      endCount: "5322",
      meta: "Resume",
      animationDelay: "900",
    },
    {
      id: 4,
      startCount: "0",
      endCount: "6329",
      meta: "Company",
      animationDelay: "1000",
    },
  ];

  return (
    <>
      {counterUpContent.map((val) => (
        <div
          className="counter-column col-lg-auto col-md-6 col-sm-6"
          data-aos="fade-up"
          data-aos-delay={val.animationDelay}
          key={val.id}
        >
          <div className="count-box">
            <span className="count-text">
              <CountUp
                start={focus ? val.startCount : null}
                end={val.endCount}
                duration={2}
              >
                {({ countUpRef }) => (
                  <InView
                    as="span"
                    onChange={(isVisible) => {
                      if (isVisible) {
                        setFocus(true);
                      }
                    }}
                  >
                    <span ref={countUpRef} />
                  </InView>
                )}
              </CountUp>
            </span>
          </div>
          <h4 className="counter-title">{val.meta}</h4>
        </div>
      ))}
    </>
  );
};


export default index;
