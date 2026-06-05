import { createSlice } from "@reduxjs/toolkit";

const articlesSlice = createSlice({
  name: "articlesSlice",
  initialState: {
    params: {
      PageNumber: 1,
      RowsOfPage: 12,
      SortingCol: "insertDate",
      SortType: "desc",
      Query: null,
      NewsCategoryId: null,
    },
    filters: {
      selectedTechnology: null,
      isTechnologiesModalOpen: false,
      searchValue: null,
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

export default articlesSlice;
