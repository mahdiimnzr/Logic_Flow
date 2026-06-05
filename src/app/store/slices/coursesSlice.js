import { createSlice } from "@reduxjs/toolkit";

const coursesSlice = createSlice({
  name: "coursesSlice",
  initialState: {
    params: {
      PageNumber: 1,
      RowsOfPage: 12,
      SortingCol: "cost",
      SortType: "desc",
      Query: null,
      CostDown: null,
      CostUp: null,
      StartDate: null,
      EndDate: null,
      courseLevelId: null,
      CourseTypeId: null,
      TechCount: null,
      ListTech: null,
      TeacherId: null,
    },
    filters: {
      startDate: null,
      startMonth: new Date().toISOString(),
      startValue: "",
      startCalenderOpen: false,
      endDate: null,
      endMonth: new Date().toISOString(),
      endValue: "",
      endCalenderOpen: false,
      selectedLevel: null,
      isLevelsModalOpen: false,
      selectedTechnology: [],
      isTechnologiesModalOpen: false,
      priceRange: [0, 10000000],
    },
  },
  reducers: {
    updateParams: (state, action) => {
      const { key, value } = action.payload;
      state.params = { ...state.params, [key]: value };
    },
    updateFilters: (state, action) => {
      const { key, value } = action.payload;
      state.filters = { ...state.filters, [key]: value };
    },
  },
});

export default coursesSlice;
