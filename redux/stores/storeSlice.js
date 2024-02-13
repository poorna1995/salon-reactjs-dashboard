import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	connectedStores: [],
};

export const storeSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setConnectedStores(state, action) {
			state.connectedStores = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setConnectedStores } = storeSlice.actions;

export default storeSlice.reducer;
