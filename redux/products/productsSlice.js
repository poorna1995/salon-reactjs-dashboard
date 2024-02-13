import { createSlice } from "@reduxjs/toolkit";
import { uniqBy } from "lodash";
const initialState = {
	newProductData: {
		productOptions: [],
	},
	newProductImages: [],
	selectedProducts: [],
	editProductData: {
		images: [],
	},
	publishProductData: {
		selectedStore: null,
		selectedProducts: [],
	},
	selectedStore: {},
	publishableProductsStatus: undefined,
	publishTaskID: null,
	publishTaskProducts: [],
	createProductData: {
		images: [],
	},
};

export const productsSlice = createSlice({
	name: "products",
	initialState,
	reducers: {
		setNewProductData(state, action) {
			state.newProductData = action.payload;
		},

		updateNewProductData(state, action) {
			state.newProductData = {
				...state.newProductData,
				...action.payload,
			};
		},
		addNewProductImages(state, action) {
			const keyForReduxStateData = action.payload.keyForReduxStateData;
			const image = action.payload.image;
			const images = state[keyForReduxStateData].images ?? [];
			state[keyForReduxStateData].images = [...images, image];
		},
		removeAllProductImages(state, action) {
			state.newProductImages = [];
		},
		deleteNewproductImage(state, action) {
			const keyForReduxStateData = action.payload.keyForReduxStateData;
			const image = action.payload.image;
			state[keyForReduxStateData].images = state[
				keyForReduxStateData
			].images.filter((item) => item !== image);

			// state.newProductImages = state.newProductImages.filter(
			// 	(item) => item !== action.payload,
			// );
		},
		setSelectedPublishableProducts(state, action) {
			state.selectedProducts = [...action.payload];
		},

		setEditProductImages(state, action) {
			state.editProductData.images = [
				...state.editProductData.images,
				action.payload,
			];
		},
		deleteEditProductImage(state, action) {
			state.editProductData.images = state.editProductData.images.filter(
				(item) => item !== action.payload,
			);
		},
		setSelectedPublishableStore(state, action) {
			state.selectedStore = action.payload;
		},

		setCreateProductData(state, action) {
			state.createProductData = action.payload;
		},
		updateCreateProductData(state, action) {
			state.createProductData = {
				...state.createProductData,
				...action.payload,
			};
		},

		setCreateProductSelectedOptions(state, action) {
			state.createProductData.selectedOptions = action.payload;
		},

		setNewProductOptions(state, action) {
			// state.newProductData.productOptions = [
			// 	...state.newProductData.productOptions,
			// 	...action.payload,
			// ];
			const data = state.newProductData.productOptions.filter(
				(item) => item.name !== action.payload.name,
			);
			state.newProductData.productOptions = [...data, action.payload];
		},

		removeAllNewProductOptions(state, action) {
			state.newProductData.productOptions = [];
		},
		setPublishTaskID(state, action) {
			state.publishTaskID = action.payload;
		},
		setPublishTaskProducts(state, action) {
			state.publishTaskProducts = action.payload;
		},
		// saga action
		fetchEditProductDataStart() {},
		setEditProductData(state, action) {
			state.editProductData = action.payload;
		},
		fetchPublishableProductsStatusStart() {},
		setPublishStatus(state, action) {
			state.publishableProductsStatus = action.payload;
		},
		setPublishableProductsStatus(state, action) {
			state.publishableProductsStatus = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	setNewProductData,
	updateNewProductData,
	addNewProductImages,
	removeAllProductImages,
	deleteNewproductImage,
	setSelectedPublishableProducts,
	setEditProductImages,
	deleteEditProductImage,
	setSelectedPublishableStore,
	setNewProductOptions,
	removeAllNewProductOptions,
	setPublishTaskID,
	setPublishTaskProducts,
	setCreateProductData,
	updateCreateProductData,
	setCreateProductSelectedOptions,
	// saga actions
	setEditProductData,
	fetchEditProductDataStart,
	fetchPublishableProductsStatusStart,
	setPublishableProductsStatus,
	setPublishStatus,
} = productsSlice.actions;

export default productsSlice.reducer;
