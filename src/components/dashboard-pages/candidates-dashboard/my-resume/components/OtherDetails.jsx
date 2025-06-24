import Select from "react-select";
  const languageOptions = [
    { value: "English", label: "English" },
    { value: "Hindi", label: "Hindi" },
    { value: "Spanish", label: "Spanish" },
    { value: "German", label: "German" },
    { value: "French", label: "French" },
    { value: "Marathi", label: "Marathi" },
  ];


const OtherDetails = (props) =>{

    const { age, setAge, totalExperienceYears, setTotalExperienceYears, totalExperienceMonths, setTotalExperienceMonths, currentSalary, setCurrentSalary, expectedSalary, setExpectedSalary, languages, setLanguages } = props

    return <>
            {/* <!-- Input --> */}
        <div className="form-group col-lg-4 col-md-12">
          <label>Age</label>
          <input
            type="number"
            name="age"
            placeholder="e.g. 25"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-4 col-md-12">
          <label>Total Experience (Years)</label>
          <input
            type="number"
            name="experienceYears"
            placeholder="e.g. 5"
            value={totalExperienceYears}
            onChange={(e) => setTotalExperienceYears(e.target.value)}
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-4 col-md-12">
          <label>Total Experience (Months)</label>
          <input
            type="number"
            name="experienceMonths"
            placeholder="e.g. 6"
            value={totalExperienceMonths}
            onChange={(e) => setTotalExperienceMonths(e.target.value)}
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-4 col-md-12">
          <label>Current Salary (per annum, in Rs)</label>
          <input
            type="number"
            name="currentSalary"
            placeholder="e.g. 1200000"
            value={currentSalary}
            onChange={(e) => setCurrentSalary(e.target.value)}
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-4 col-md-12">
          <label>Expected Salary (per annum, in Rs)</label>
          <input
            type="number"
            name="expectedSalary"
            placeholder="e.g. 1500000"
            value={expectedSalary}
            onChange={(e) => setExpectedSalary(e.target.value)}
          />
        </div>

        {/* <!-- Input --> */}
        <div className="form-group col-lg-4 col-md-12">
          <label>Languages Known</label>
          <Select
            isMulti
            value={languages}
            onChange={setLanguages}
            name="languages"
            options={languageOptions}
            className="basic-multi-select"
            classNamePrefix="select"
          />
        </div>
    </>
}


export default OtherDetails;