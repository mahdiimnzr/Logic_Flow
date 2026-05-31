import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    resetPass: {
      gmail: "",
    },
  },
  reducers: {
    updateResetPass: (state, action) => {
      state.resetPass.gmail = action.payload;
    },
  },
});

export default authSlice;
