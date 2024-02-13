import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
// reducers
import userSlice from "./user/userSlice";
import viewsSlice from "./views/viewsSlice";
import thirdPartyDataSlice from "./thirdPartyData/thirdPartyDataSlice";
import productsSlice from "./products/productsSlice";
import storeSlice from "./stores/storeSlice";
import purchaseOrdersSlice from "./purchaseOrders/purchaseOrdersSlice";

export const rootReducer = combineReducers({
	user: userSlice,
	views: viewsSlice,
	thirdPartyData: thirdPartyDataSlice,
	productsData: productsSlice,
	storesData: storeSlice,
	purchaseOrdersData: purchaseOrdersSlice,
});

const configStorage = {
	key: "root",
	storage,
	whitelist: ["user", "views", "productsData", "purchaseOrdersData"],
};

export default persistReducer(configStorage, rootReducer);
