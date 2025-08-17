import CallToActions from "@/components/job-listing-page/CallToActions";
import DatePostedZustand from "@/components/job-listing-page/DatePostedZustand";
import ExperienceLevelZustand from "@/components/job-listing-page/ExperienceLevelZustand";
import JobTypeZustand from "@/components/job-listing-page/JobTypeZustand";
import SalaryRangeSliderZustand from "@/components/job-listing-page/SalaryRangeSliderZustand";
import TagZustand from "@/components/job-listing-page/TagZustand";
import useFilterStore from "@/store/useFilterStore";

const FilterSidebar = () => {
  const { filters, setJobType, setDatePosted, setExperienceLevel, setSalaryRange, setTags } = useFilterStore();
  return (
    <div className="inner-column">
      <div className="filters-outer">
        <button
          type="button"
          className="btn-close text-reset close-filters"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
        {/* End .close filter */}

        <div className="switchbox-outer">
          <h4>Job type</h4>
          <JobTypeZustand values={filters.jobType} onChange={setJobType} />
        </div>
        {/* <!-- Switchbox Outer --> */}

        <div className="checkbox-outer">
          <h4>Date Posted</h4>
          <DatePostedZustand value={filters.datePosted} onChange={setDatePosted} />
        </div>
        {/* <!-- Checkboxes Ouer --> */}

        <div className="checkbox-outer">
          <h4>Experience Level</h4>
          <ExperienceLevelZustand 
            from={filters.experienceLevel.from} 
            to={filters.experienceLevel.to} 
            onChange={setExperienceLevel} 
          />
        </div>
        {/* <!-- Checkboxes Ouer --> */}

        <div className="filter-block">
          <h4>Salary</h4>

          <SalaryRangeSliderZustand value={filters.salaryRange} onChange={setSalaryRange} />
        </div>
        {/* <!-- Filter Block --> */}

        <div className="filter-block">
          <h4>Tags</h4>
          <TagZustand values={filters.tags} onChange={setTags} />
        </div>
        {/* <!-- Filter Block --> */}
      </div>
      {/* Filter Outer */}

      <CallToActions />
      {/* <!-- End Call To Action --> */}
    </div>
  );
};

export default FilterSidebar;
