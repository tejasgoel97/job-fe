import { useState } from "react";
import Select from "react-select";

const languageOptions = [
  // Major Indian languages
  { value: "English", label: "English" },
  { value: "Hindi", label: "Hindi" },
  { value: "Marathi", label: "Marathi" },
  { value: "Bengali", label: "Bengali" },
  { value: "Tamil", label: "Tamil" },
  { value: "Telugu", label: "Telugu" },
  { value: "Gujarati", label: "Gujarati" },
  { value: "Kannada", label: "Kannada" },
  { value: "Punjabi", label: "Punjabi" },
  { value: "Malayalam", label: "Malayalam" },
  { value: "Odia", label: "Odia" },
  { value: "Urdu", label: "Urdu" },

  // Popular foreign languages
  { value: "Spanish", label: "Spanish" },
  { value: "French", label: "French" },
  { value: "German", label: "German" },
  { value: "Italian", label: "Italian" },
  { value: "Portuguese", label: "Portuguese" },
  { value: "Russian", label: "Russian" },
  { value: "Chinese", label: "Chinese (Mandarin)" },
  { value: "Japanese", label: "Japanese" },
  { value: "Korean", label: "Korean" },
  { value: "Arabic", label: "Arabic" },
  { value: "Turkish", label: "Turkish" },
  { value: "Dutch", label: "Dutch" },
  { value: "Greek", label: "Greek" },
  { value: "Thai", label: "Thai" },
  { value: "Vietnamese", label: "Vietnamese" },
  { value: "Hebrew", label: "Hebrew" },
  { value: "Swedish", label: "Swedish" },
  { value: "Danish", label: "Danish" },
  { value: "Norwegian", label: "Norwegian" },
  { value: "Polish", label: "Polish" },
  { value: "Ukrainian", label: "Ukrainian" },
  { value: "Persian", label: "Persian (Farsi)" },
  { value: "Malay", label: "Malay" },
  { value: "Indonesian", label: "Indonesian" },
  { value: "Filipino", label: "Filipino (Tagalog)" },
  { value: "Hungarian", label: "Hungarian" },
  { value: "Czech", label: "Czech" },
  { value: "Romanian", label: "Romanian" },
  { value: "Finnish", label: "Finnish" },
];


const currencyOptions = [
  { value: "INR", label: "INR (₹)", symbol: "₹", rateToINR: 1 },
  { value: "USD", label: "USD ($)", symbol: "$", rateToINR: 83 },
  { value: "EUR", label: "Euro (€)", symbol: "€", rateToINR: 90 },
  { value: "GBP", label: "Pound (£)", symbol: "£", rateToINR: 105 },
  { value: "AED", label: "Dirham (د.إ)", symbol: "د.إ", rateToINR: 22.6 },
];

const OtherDetails = (props) => {
  const {
    age,
    setAge,
    totalExperienceYears,
    setTotalExperienceYears,
    totalExperienceMonths,
    setTotalExperienceMonths,
    currentSalary,
    setCurrentSalary,
    expectedSalary,
    setExpectedSalary,
    languages,
    setLanguages,
    currentSalaryCurrency = currencyOptions[0].value,
    setCurrentSalaryCurrency,
    expectedSalaryCurrency = currencyOptions[0].value,
    setExpectedSalaryCurrency,
  } = props;

  // Find selected currency object
  const selectedCurrencyObj =
    currencyOptions.find((c) => c.value === currentSalaryCurrency) ||
    currencyOptions[0];

  // Conversion calculation
  const showConverted = currentSalaryCurrency !== "INR" && currentSalary;
  const salaryInINR = (
    Number(currentSalary) * selectedCurrencyObj.rateToINR
  ).toLocaleString("en-IN");

  return (
    <>
      {/* Age */}
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

      {/* Total Experience (Months) */}
      <div className="form-group col-lg-4 col-md-12">
        <label>Total Experience (Months)</label>
        <input
          type="number"
          name="experienceMonths"
          placeholder=""
          value={totalExperienceMonths}
          onChange={(e) => setTotalExperienceMonths(e.target.value)}
        />
      </div>

      {/* Current Salary with Currency */}
      {/* Current Salary with Currency */}
      <div className="form-group col-lg-4 col-md-12">
        <label>Current Salary (per annum)</label>
        <div className="row g-2 align-items-center">
          {/* Currency Selector: 1/4 width */}
          <div className="col-4">
            <Select
              value={currencyOptions.find(
                (opt) => opt.value === currentSalaryCurrency
              )}
              onChange={(opt) => setCurrentSalaryCurrency(opt.value)}
              options={currencyOptions}
              classNamePrefix="select"
              styles={{ container: (base) => ({ ...base, minWidth: 70 }) }}
            />
          </div>
          {/* Amount Input: 3/4 width */}
          <div className="col-8">
            <input
              type="number"
              name="currentSalary"
              min="0"
              placeholder="Amount"
              value={currentSalary}
              onChange={(e) => setCurrentSalary(e.target.value)}
              className="form-control"
            />
          </div>
        </div>
        {/* Show INR equivalent if not INR */}
        {showConverted && (
          <div className="mt-1 text-xs text-muted">
            ≈ ₹ {salaryInINR} per annum
          </div>
        )}
      </div>

      {/* Expected Salary */}
      <div className="form-group col-lg-4 col-md-12">
        <label>Expected Salary (per annum)</label>
        <div className="row g-2 align-items-center">
          {/* Currency Selector: 1/4 width */}
          <div className="col-4">
            <Select
              value={currencyOptions.find(
                (opt) => opt.value === expectedSalaryCurrency
              )}
              onChange={(opt) => setExpectedSalaryCurrency(opt.value)}
              options={currencyOptions}
              classNamePrefix="select"
              styles={{ container: (base) => ({ ...base, minWidth: 70 }) }}
            />
          </div>
          {/* Amount Input: 3/4 width */}
          <div className="col-8">
            <input
              type="number"
              name="expectedSalary"
              min="0"
              placeholder="Amount"
              value={expectedSalary}
              onChange={(e) => setExpectedSalary(e.target.value)}
              className="form-control"
            />
          </div>
        </div>
        {/* Show INR equivalent if not INR */}
        {expectedSalaryCurrency !== "INR" && expectedSalary && (
          <div className="mt-1 text-xs text-muted">
            ≈ ₹{" "}
            {(
              Number(expectedSalary) *
              (currencyOptions.find((c) => c.value === expectedSalaryCurrency)
                ?.rateToINR || 1)
            ).toLocaleString("en-IN")}{" "}
            per annum
          </div>
        )}
      </div>

      {/* Languages Known */}
      <div className="form-group col-lg-8 col-md-12">
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
  );
};

export default OtherDetails;
