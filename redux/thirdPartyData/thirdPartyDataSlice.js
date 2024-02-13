import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	shopifyData: undefined,
};

export const thirdPartyDataSlice = createSlice({
	name: "thirdPartyData",
	initialState,
	reducers: {
		addShopifyData(state, action) {
			state.shopifyData = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { addShopifyData } = thirdPartyDataSlice.actions;

export default thirdPartyDataSlice.reducer;
