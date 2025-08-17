import { create } from 'zustand'

const useFilterStore = create((set) => ({
  filters: {
    jobType: [],
    datePosted: '',
    experienceLevel: {
      from: '',
      to: ''
    },
    salaryRange: {
      min: 0,
      max: 100000,
      currency: 'INR'
    },
    tags: [],
    sortBy: 'latest' // possible values: 'latest', 'oldest', 'salary_high_to_low', 'salary_low_to_high'
  },
  setJobType: (jobType) => set((state) => {
    const newState = { ...state, filters: { ...state.filters, jobType } };
    console.log('Current filters:', newState.filters);
    return newState;
  }),
  setDatePosted: (datePosted) => set((state) => {
    const newState = { ...state, filters: { ...state.filters, datePosted } };
    console.log('Current filters:', newState.filters);
    return newState;
  }),
  setExperienceLevel: (from, to) => set((state) => {
    const newState = { 
      ...state, 
      filters: { 
        ...state.filters, 
        experienceLevel: { from, to } 
      } 
    };
    console.log('Current filters:', newState.filters);
    return newState;
  }),
  setSortBy: (sortBy) => set((state) => {
    const newState = { ...state, filters: { ...state.filters, sortBy } };
    console.log('Current filters:', newState.filters);
    return newState;
  }),
  setSalaryRange: (salaryRange) => set((state) => {
    const newState = { ...state, filters: { ...state.filters, salaryRange } };
    console.log('Current filters:', newState.filters);
    return newState;
  }),
  setTags: (tags) => set((state) => {
    const newState = { ...state, filters: { ...state.filters, tags } };
    console.log('Current filters:', newState.filters);
    return newState;
  }),
  resetFilters: () => set({
    filters: {
      jobType: [],
      datePosted: '',
      experienceLevel: [],
      salaryRange: {
        min: 0,
        max: 100000
      },
      tags: []
    }
  })
}))

export default useFilterStore;
