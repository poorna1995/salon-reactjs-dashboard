import BasicTabs from "components/Common/Tabs/BasicTabs";
import { PRODUCT } from "constants/API_URL";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEditProductDataStart } from "redux/products/productsSlice";
import NewProductOnboardingProductDetailsSection from "sections/OnboardingSections/NewProductOnboardingSections/NewProductOnboardingProductDetailsSection";
import NewProductOnboardingProductMediaSection from "sections/OnboardingSections/NewProductOnboardingSections/NewProductOnboardingProductMediaSection";
import NewProductOnboardingVariantLevelInventorySection from "sections/OnboardingSections/NewProductOnboardingSections/NewProductOnboardingVariantLevelInventorySection";
import NewProductOnboardingVariantsInfoSection from "sections/OnboardingSections/NewProductOnboardingSections/NewProductOnboardingVariantsInfoSection";
import PublishPageDrawerHeader from "./PublishPageDrawerHeader";

const mapState = ({ user, productsData }) => ({
	currentUser: user.currentUser,
	productsData,
});
export default function NewEditProductComponent({
	productTitle,
	handleEditButtonClick,
	handleCloseDrawer,
}) {
	const router = useRouter();
	const { productId } = router.query;

	const edit = router.query.edit;
	const { currentUser, productsData } = useSelector(mapState);
	const { editProductData } = productsData;
	const dispatch = useDispatch();
	const handleFetchProductData = () => {
		const URL = PRODUCT.MERCHANT.FETCH_PRODUCT_MASTER;
		const data = {
			user_id: currentUser.merchant_id,
			master_product_id: productId,
		};
		dispatch(fetchEditProductDataStart({ url: URL, data }));
	};
	useEffect(() => {
		if (productId) {
			handleFetchProductData();
		}
		// console.log("productId", productId);
	}, [productId]);
	const staticData = [
		{
			label: "Product Details",

			component: (
				<>
					<NewProductOnboardingProductDetailsSection
						keyForReduxStateData={"editProductData"}
						hideContinueNavigation
					/>
				</>
			),
			route: `general-info`,
		},
		{
			label: "Product Media",
			component: (
				<>
					<NewProductOnboardingProductMediaSection
						keyForReduxStateData={"editProductData"}
						hideContinueNavigation
					/>
				</>
			),
			route: `product-media`,
		},
		{
			label: "Variants",
			component: (
				<>
					<NewProductOnboardingVariantsInfoSection
						keyForReduxStateData={"editProductData"}
						hideContinueNavigation
					/>
				</>
			),
			route: `options-variants`,
		},
		{
			label: "Inventory",
			component: (
				<>
					<NewProductOnboardingVariantLevelInventorySection
						keyForReduxStateData={"editProductData"}
						hideContinueNavigation
					/>
				</>
			),
			route: `inventory`,
		},
	];
	return (
		<div
			style={{
				paddingBottom: "64px",
			}}
		>
			<PublishPageDrawerHeader
				edit={edit}
				handleCloseDrawer={handleCloseDrawer}
				handleEditButtonClick={handleEditButtonClick}
				productTitle={`Edit Product Details`}
				handleSaveChanges={() => handleUpdateProduct()}
			/>

			<BasicTabs
				data={staticData}
				tabContainerStyles={{
					pl: "16px",
					position: "sticky",
					top: "64.5px",
					background: "#fff",
					py: 1,
					zIndex: (theme) => theme.zIndex.drawer + 1,
				}}
				basePath={`/app/products/edit/${productId}`}
			/>
		</div>
	);
}
