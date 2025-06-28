import SearchForm3 from "./JobSearchForm3";
import PopularSearch from "./PopularSearch";
import { useEffect, useState } from "react";
import axiosInstance from "@/utils/api/axiosInstance";
import ContractorSearchForm3 from "./ContractSearchForm3";

const Index = () => {
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
      className="banner-section-four"
      style={{ backgroundImage: "url(/images/background/2.png)" }}
    >
      <div className="auto-container">
        <div className="cotnent-box">
          {/* Capsule Toggle Menu */}
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

          {/* Job Search Form */}
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
        </div>

        {/* <PopularSearch expertiseData={expertiseData} /> */}
      </div>

      {/* Styles */}
      <style jsx>{`
        .toggle-container {
          display: flex;
          position: relative;
          background: #f0f0f0;
          border-radius: 999px;
          padding: ;
          width: fit-content;
          margin: 0 auto 20px;
          height: 44px; /* Fixed height for the capsule */
          overflow: hidden;
          box-shadow: 0 0 0 1px #ccc;
          width: 50%;
        }
        .toggle-option {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 20px;
          font-weight: 600;
          color: #333;
          cursor: pointer;
          z-index: 2;
          transition: color 0.3s ease;
          font-size: 14px;
          height: 100%;
        }
        .toggle-option.active {
          color: white;
        }
        .slider {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 50%;
          border-radius: 999px;
          background-color: #1967d2;
          z-index: 1;
          height: 100%;
          transition: all 0.3s ease;
        }
        .slider.job {
          left: 0;
        }
        .slider.contract {
          left: 50%;
        }
      `}</style>
    </section>
  );
};

export default Index;
