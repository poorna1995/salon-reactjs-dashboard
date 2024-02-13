import { useRouter } from "next/router";
import React from "react";
import AddNewStoreShopifyStoreSection from "./AddNewStoreShopifyStoreSection";
import AddNewStoreWooCommerceSection from "./AddNewStoreWooCommerceSection";

const selectStoreData = {
	shopify: {
		component: AddNewStoreShopifyStoreSection,
	},
	woocommerce: {
		component: AddNewStoreWooCommerceSection,
	},
};
export default function AddNewStoreAddStoreSections() {
	const router = useRouter();
	const { channel } = router.query;
	const MyComponent = channel && selectStoreData[channel].component;
	return (
		<div>
			<MyComponent />
		</div>
	);
}
