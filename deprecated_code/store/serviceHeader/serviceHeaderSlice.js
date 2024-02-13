import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  company_name: "",
  location: "",
  opening_days: "",
  opening_time: "",
};

export const serviceHeader = createSlice({
  name: "serviceHeader",
  initialState,
  reducers: {
    updateServiceHeader: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
    resetServiceHeader: (state, action) => {
      return initialState;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateServiceHeader, resetServiceHeader } =
  serviceHeader.actions;

export default serviceHeader.reducer;
