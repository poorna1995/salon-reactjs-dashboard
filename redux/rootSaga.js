import { all, call } from "redux-saga/effects";
import productSagas from "./products/products.sagas";
import purchaseOrdersSagas from "./purchaseOrders/purchaseOrders.sagas";

export default function* rootSaga() {
	// yield all([call(userSagas)]);
	yield all([
		// call(userSagas),
		call(productSagas),
		call(purchaseOrdersSagas),
	]);
}
