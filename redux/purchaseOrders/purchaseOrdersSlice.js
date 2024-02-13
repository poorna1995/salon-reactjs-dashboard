import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	selectedProducts: [],
	purchaseOrderData: { selectedProducts: [] },
};

export const purchaseOrdersSlice = createSlice({
	name: "purchaseOrders",
	initialState,
	reducers: {
		setSelectedProductsForPO(state, action) {
			state.purchaseOrderData.selectedProducts = [...action.payload];
		},
		deleteSelectedProductForPO(state, action) {
			state.purchaseOrderData.selectedProducts =
				state.purchaseOrderData.selectedProducts.filter(
					(product) => product.master_item_id !== action.payload,
				);
		},
		setPurchaseOrderData(state, action) {
			const selectedProducts =
				(state.purchaseOrderData?.selectedProducts &&
					state.purchaseOrderData?.selectedProducts) ??
				[];
			const selectedProductsFromPayload =
				(action.payload?.products &&
					action.payload?.products.map((item, index) => ({
						...item,
						id: item.item_id,
					}))) ??
				[];

			state.purchaseOrderData = {
				...action.payload,
				selectedProducts:
					selectedProductsFromPayload ?? selectedProducts,
			};
		},
		updatePurchaseOrderData(state, action) {
			state.purchaseOrderData = {
				...state.purchaseOrderData,
				...action.payload,
			};
		},

		// saga actions
		fetchPurchaseOrderDataStart(state, action) {},
	},
});

// Action creators are generated for each case reducer function
export const {
	setSelectedProductsForPO,
	deleteSelectedProductForPO,
	updatePurchaseOrderData,
	setPurchaseOrderData,
	fetchPurchaseOrderDataStart,
} = purchaseOrdersSlice.actions;

export default purchaseOrdersSlice.reducer;
