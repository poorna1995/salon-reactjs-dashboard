import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  availability: [],
  bookings: [],
  filters: [],
  selectedEvent: {},
  openDrawer: false,
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    updateCalendarData(state, action) {
      return { ...state, ...action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateCalendarData } = calendarSlice.actions;

export default calendarSlice.reducer;
