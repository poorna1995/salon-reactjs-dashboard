import { createSlice } from "@reduxjs/toolkit";
const initialState = {};

export const companySlice = createSlice({
  name: "companyInfo",
  initialState,
  reducers: {
    setCompanyInfo(state, action) {
      return { ...action.payload };
    },
    updateCompanyInfo(state, action) {
      return { ...state, ...action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCompanyInfo, updateCompanyInfo } = companySlice.actions;

export default companySlice.reducer;
