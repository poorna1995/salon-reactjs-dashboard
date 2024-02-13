import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import cart from "./cart/cartSlice";
import serviceHeaderSlice from "./serviceHeader/serviceHeaderSlice";
import companySlice from "./compnay-info/companySlice";
import servicesSlice from "./services/servicesSlice";
import calendarSlice from "./calendar/calendarSlice";
import userSlice from "./user/userSlice";

export const store = configureStore({
  reducer: {
    cart: cart,
    serviceHeader: serviceHeaderSlice,
    companyInfo: companySlice,
    services: servicesSlice,
    calendar: calendarSlice,
    user: userSlice,
  },
  middleware: [logger],
});
