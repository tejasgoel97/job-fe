import React from 'react';
import useFilterStore from '@/store/useFilterStore';

const sortOptions = [
  { value: 'latest', label: 'Latest Jobs' },
  { value: 'oldest', label: 'Oldest Jobs' },
  { value: 'salary_high_to_low', label: 'Salary: High to Low' },
  { value: 'salary_low_to_high', label: 'Salary: Low to High' }
];

const JobSorting = () => {
  const sortBy = useFilterStore(state => state.filters.sortBy);
  const setSortBy = useFilterStore(state => state.setSortBy);

  return (
    <div className="sort-by-wrapper">
      <select 
        className="form-select" 
        value={sortBy} 
        onChange={(e) => setSortBy(e.target.value)}
      >
        {sortOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default JobSorting;
