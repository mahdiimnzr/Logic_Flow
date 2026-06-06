import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import coursesSlice from "./slices/coursesSlice";
import articlesSlice from "./slices/articlesSlice";

const store = configureStore({
  reducer: {
    authSlice: authSlice.reducer,
    coursesSlice: coursesSlice.reducer,
    articlesSlice: articlesSlice.reducer,
  },
});

export default store;
