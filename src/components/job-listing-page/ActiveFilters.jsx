import React from 'react';
import { currencyOptions } from '@/utils/constants/Options';
import useFilterStore from '@/store/useFilterStore';

const ActiveFilters = ({ filters }) => {
  const resetFilters = useFilterStore(state => state.resetFilters);
  return (
    <div className="active-filters mb-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Active Filters:</h4>
        <button 
          onClick={resetFilters} 
          className="btn btn-sm btn-outline-danger"
          style={{ display: (filters.jobType.length || filters.datePosted || filters.experienceLevel.length || 
            filters.salaryRange.min > 0 || filters.salaryRange.max < 100000 || filters.tags.length) ? 'block' : 'none' }}
        >
          Clear All Filters
        </button>
      </div>
      <div className="d-flex flex-wrap gap-2">
        {filters.jobType.length > 0 && (
          <div className="filter-group me-4">
            <strong>Job Types:</strong>{' '}
            {filters.jobType.map(type => (
              <span key={type} className="badge bg-primary me-1">{type}</span>
            ))}
          </div>
        )}
        
        {filters.datePosted && (
          <div className="filter-group me-4">
            <strong>Posted:</strong>{' '}
            <span className="badge bg-info">{filters.datePosted}</span>
          </div>
        )}
        
        {(filters.experienceLevel.from || filters.experienceLevel.to) && (
          <div className="filter-group me-4">
            <strong>Experience:</strong>{' '}
            <span className="badge bg-success">
              {filters.experienceLevel.from || '0'} - {filters.experienceLevel.to || '8+'} years
            </span>
          </div>
        )}
        
        {(filters.salaryRange.min > 0 || filters.salaryRange.max < 100000) && (
          <div className="filter-group me-4">
            <strong>Salary:</strong>{' '}
            <span className="badge bg-warning text-dark">
              {currencyOptions.find(c => c.value === filters.salaryRange.currency)?.symbol}
              {filters.salaryRange.min.toLocaleString()} - {filters.salaryRange.max.toLocaleString()}
            </span>
          </div>
        )}
        
        {filters.tags.length > 0 && (
          <div className="filter-group">
            <strong>Tags:</strong>{' '}
            {filters.tags.map(tag => (
              <span key={tag} className="badge bg-secondary me-1">{tag}</span>
            ))}
          </div>
        )}
        
        {!filters.jobType.length && !filters.datePosted && !filters.experienceLevel.length && 
         filters.salaryRange.min === 0 && filters.salaryRange.max === 100000 && !filters.tags.length && (
          <div className="text-muted">No active filters</div>
        )}
      </div>
      
      <style jsx="true">{`
        .active-filters {
          padding: 15px;
          border-radius: 8px;
          background-color: #f8f9fa;
        }
        .filter-group {
          display: inline-flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 5px;
        }
        .badge {
          padding: 6px 12px;
          border-radius: 20px;
        }
        .btn-outline-danger {
          transition: all 0.3s ease;
        }
        .btn-outline-danger:hover {
          background-color: #dc3545;
          color: white;
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
};

export default ActiveFilters;
