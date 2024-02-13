import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

export const services = createSlice({
  name: "services",
  initialState,
  reducers: {
    updateServices: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateServices } = services.actions;

export default services.reducer;
