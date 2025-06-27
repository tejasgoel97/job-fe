import SearchForm3 from "./SearchForm3";
import PopularSearch from "./PopularSearch";
import { useEffect, useState } from "react";
import axiosInstance from "@/utils/api/axiosInstance";

const index = () => {
      const [expertiseData, setExpertiseData] = useState([]);
    
      useEffect(() => {
        const fetchExpertise = async () => {
          try {
            const res = await axiosInstance("/expertise/get-all-expertise");
            if(!res.data?.success) throw new Error(res.data?.success)
            const fetchedExpertise = res.data.data.expertiseList || [];

            console.log(res.data.data.expertiseList)
            setExpertiseData(fetchedExpertise);
    
         
          } catch (error) {
            console.error("Failed to load expertise", error);
          }
        };
    
        fetchExpertise();
      }, []);
      console.log(expertiseData)
  return (  
    <section
      className="banner-section-four"
      style={{ backgroundImage: "url(/images/background/2.png)" }}
    >
      <div className="auto-container">
        <div className="cotnent-box">
          <div className="title-box" data-aso-delay="500" data-aos="fade-up">
            <h3>The Easiest Way to Get Your New Job</h3>
          </div>

          {/* <!-- Job Search Form --> */}
          <div
            className="job-search-form"
            data-aos-delay="700"
            data-aos="fade-up"
          >
            <SearchForm3 btnStyle="btn-style-two" expertiseData={expertiseData} />
          </div>
        </div>
        {/* <!-- Job Search Form --> */}

        {/* <!-- Popular Search --> */}
        <PopularSearch />
        {/* <!-- End Popular Search --> */}
      </div>
    </section>
  );
};

export default index;
