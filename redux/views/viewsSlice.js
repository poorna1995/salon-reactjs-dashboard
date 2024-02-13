import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	productPageView: "list",
	isDrawerOpen: true,
	warehousePageView: "list",
	isLoading: false,
	drawerCollapse: {
		openCollapse: false,
		collapseName: "",
	},
};

export const viewsSlice = createSlice({
	name: "views",
	initialState,
	reducers: {
		setProductPageView(state, action) {
			state.productPageView = action.payload;
		},
		setWarehousePageView(state, action) {
			state.warehousePageView = action.payload;
		},
		changeDrawerState(state, action) {
			state.isDrawerOpen = action.payload;
		},
		setViewLoading(state, action) {
			state.isLoading = action.payload;
		},
		setDrawerCollapse(state, action) {
			state.drawerCollapse = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	setProductPageView,
	changeDrawerState,
	setWarehousePageView,
	setViewLoading,
	setDrawerCollapse,
} = viewsSlice.actions;

export default viewsSlice.reducer;
