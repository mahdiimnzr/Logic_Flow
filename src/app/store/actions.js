import authSlice from "./slices/authSlice";
import coursesSlice from "./slices/coursesSlice";

export const { updateResetPass } = authSlice.actions;
export const { updateParams, updateFilters } = coursesSlice.actions;
