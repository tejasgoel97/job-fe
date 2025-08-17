import { useState } from 'react';
import { currencyOptions } from '@/utils/constants/Options';

const SalaryRangeSliderZustand = ({ value = { min: 0, max: 100000, currency: 'INR' }, onChange }) => {
  const [range, setRange] = useState(value);

  const handleChange = (type) => (e) => {
    const newRange = { ...range, [type]: parseInt(e.target.value) };
    setRange(newRange);
    onChange(newRange);
  };

  const handleCurrencyChange = (e) => {
    const newRange = { ...range, currency: e.target.value };
    setRange(newRange);
    onChange(newRange);
  };

  const selectedCurrency = currencyOptions.find(curr => curr.value === range.currency);

  return (
    <div className="salary-range-slider">
      <div className="currency-selector mb-3">
        <label className="form-label">Currency</label>
        <select 
          className="form-select" 
          value={range.currency} 
          onChange={handleCurrencyChange}
        >
          {currencyOptions.map(currency => (
            <option key={currency.value} value={currency.value}>
              {currency.label}
            </option>
          ))}
        </select>
      </div>
      <div className="range-slider">
        <div className="input-wrap">
          <label>Min Salary ({selectedCurrency.symbol}):</label>
          <input
            type="number"
            value={range.min}
            onChange={handleChange('min')}
            min="0"
            max={range.max}
            className="form-control"
          />
        </div>
        <div className="input-wrap mt-3">
          <label>Max Salary ({selectedCurrency.symbol}):</label>
          <input
            type="number"
            value={range.max}
            onChange={handleChange('max')}
            min={range.min}
            className="form-control"
          />
        </div>
      </div>

      <style jsx="true">{`
        .salary-range-slider {
          padding: 15px;
        }
        .input-wrap {
          margin-bottom: 10px;
        }
        .input-wrap label {
          display: block;
          margin-bottom: 5px;
          font-size: 14px;
        }
        .currency-selector {
          margin-bottom: 15px;
        }
      `}</style>
    </div>
  );
};

export default SalaryRangeSliderZustand;
