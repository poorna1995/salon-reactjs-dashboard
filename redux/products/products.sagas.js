import { all, call, put, takeLatest } from "redux-saga/effects";
import { setViewLoading } from "redux/views/viewsSlice";
import { handleApiCalls, handleUpdatePublishStatus } from "./products.helpers";
import {
	fetchEditProductDataStart,
	fetchPublishableProductsStatusStart,
	setEditProductData,
	setPublishableProductsStatus,
} from "./productsSlice";

export function* fetchEditProductData({ payload: { url, data } }) {
	try {
		yield put(setViewLoading(true));

		const userData = yield handleApiCalls(url, data);
		console.log({ userData }, "inside saga action");
		yield put(setEditProductData(userData[0]));
		yield put(setViewLoading(false));
	} catch (error) {
		console.log(error);
		// yield put(setErrorMessage(error));
	}
}








export function* fetchProductPublishStatus({ payload: { url, data } }) {
	try {
		// yield put(setViewLoading(true));

		const response = yield handleUpdatePublishStatus(url, data);
		console.log({ response }, "inside saga action");
		yield put(setPublishableProductsStatus(response));
		// yield put(setViewLoading(false));
	} catch (error) {
		console.log(error, "inside saga action status");
		// yield put(setErrorMessage(error));
	}
}

export function* onFetchProductPublishStatusStart() {
	yield takeLatest(
		fetchPublishableProductsStatusStart.type,
		fetchProductPublishStatus,
	);
}

export function* onFetchEditProductDataStart() {
	yield takeLatest(fetchEditProductDataStart.type, fetchEditProductData);
}
export default function* productSagas() {
	yield all([
		call(onFetchEditProductDataStart),
		call(onFetchProductPublishStatusStart),
	]);
}
