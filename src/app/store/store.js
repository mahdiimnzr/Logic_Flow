import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import coursesSlice from "./slices/coursesSlice";

const store = configureStore({
  reducer: { authSlice: authSlice.reducer, coursesSlice: coursesSlice.reducer },
});

export default store;
