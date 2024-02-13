import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// REDUCERS
import cart from "./cart/cartSlice";
import serviceHeaderSlice from "./serviceHeader/serviceHeaderSlice";
import companySlice from "./compnay-info/companySlice";
import servicesSlice from "./services/servicesSlice";
import calendarSlice from "./calendar/calendarSlice";
import userSlice from "./user/userSlice";

export const rootReducer = combineReducers({
  cart: cart,
  serviceHeader: serviceHeaderSlice,
  companyInfo: companySlice,
  services: servicesSlice,
  calendar: calendarSlice,
  user: userSlice,
});

const configStorage = {
  key: "root",
  storage,
  timeout: null,
  whitelist: ["user", "companyInfo"],
};

export default persistReducer(configStorage, rootReducer);
