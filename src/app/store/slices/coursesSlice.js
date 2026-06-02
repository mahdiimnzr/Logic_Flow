import { createSlice } from "@reduxjs/toolkit";

const coursesSlice = createSlice({
  name: "coursesSlice",
  initialState: {
    params: {
      PageNumber: 1,
      RowsOfPage: 12,
      SortingCol: "active",
      SortType: "desc",
      Query: null,
      CostDown: null,
      CostUp: null,
      StartDate: null,
      EndDate: null,
      courseLevelId: null,
      CourseTypeId: null,
      TechCount: 1,
      ListTech: null,
      TeacherId: null,
    },
  },
  reducers: {
    updateParams: (state, action) => {
      const { key, value } = action.payload;
      const newParams = { ...state.params, [key]: value };
      state.params = newParams;
    },
  },
});

export default coursesSlice;
