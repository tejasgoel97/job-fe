import { currencyOptions } from "@/utils/constants/Options";
import { useEffect } from "react";
import Select from "react-select";


// const currencyOptions = [
//   { value: "INR", label: "INR (₹)", symbol: "₹", rateToINR: 1 },
//   { value: "USD", label: "USD ($)", symbol: "$", rateToINR: 83 },
//   { value: "EUR", label: "Euro (€)", symbol: "€", rateToINR: 90 },
//   { value: "GBP", label: "Pound (£)", symbol: "£", rateToINR: 105 },
//   { value: "AED", label: "Dirham (د.إ)", symbol: "د.إ", rateToINR: 22.6 },
// ];

const SalaryRanges = ({
  fromSalary,
  toSalary,
  salaryCurrency,
  setFromSalary,
  setToSalary,
  setSalaryCurrency,
  fromSalaryINR,
  toSalaryINR,
  setFromSalaryINR,
  setToSalaryINR,
}) => {
  const selectedCurrency =
    currencyOptions.find((c) => c.value === salaryCurrency) || currencyOptions[0];

  const showFromConverted = salaryCurrency !== "INR" && fromSalary;
  const showToConverted = salaryCurrency !== "INR" && toSalary;

  const fromINR = fromSalary
    ? Number(fromSalary) * selectedCurrency.rateToINR
    : 0;

  const toINR = toSalary
    ? Number(toSalary) * selectedCurrency.rateToINR
    : 0;

  useEffect(() => {
    setFromSalaryINR(fromINR);
  }, [fromSalary, salaryCurrency]);

  useEffect(() => {
    setToSalaryINR(toINR);
  }, [toSalary, salaryCurrency]);

  return (
    <>
      {/* Shared Currency Selector */}
      <div className="form-group col-lg-12 col-md-12">
        <label>Salary Currency</label>
        <Select
          value={currencyOptions.find((opt) => opt.value === salaryCurrency)}
          onChange={(opt) => setSalaryCurrency(opt.value)}
          options={currencyOptions}
          classNamePrefix="select"
          styles={{ container: (base) => ({ ...base, maxWidth: 200 }) }}
        />
      </div>

      {/* From Salary */}
      <div className="form-group col-lg-6 col-md-12">
        <label>From Salary (per annum)</label>
        <input
          type="number"
          name="fromSalary"
          min="0"
          placeholder="Amount"
          value={fromSalary}
          onChange={(e) => setFromSalary(e.target.value)}
          className="form-control"
        />
        {showFromConverted && (
          <div className="mt-1 text-xs text-muted">
            ≈ ₹ {fromINR.toLocaleString("en-IN")} per annum
          </div>
        )}
      </div>

      {/* To Salary */}
      <div className="form-group col-lg-6 col-md-12">
        <label>To (per annum)</label>
        <input
          type="number"
          name="toSalary"
          min="0"
          placeholder="Amount"
          value={toSalary}
          onChange={(e) => setToSalary(e.target.value)}
          className="form-control"
        />
        {showToConverted && (
          <div className="mt-1 text-xs text-muted">
            ≈ ₹ {toINR.toLocaleString("en-IN")} per annum
          </div>
        )}
      </div>
    </>
  );
};

export default SalaryRanges;
