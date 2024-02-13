import { Box } from "@mui/material";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import RouterTabs from "components/Common/Tabs/RouterTabs";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { PRODUCT } from "constants/API_URL";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEditProductDataStart } from "redux/products/productsSlice";
import NewProductOnboardingProductDetailsSection from "sections/OnboardingSections/NewProductOnboardingSections/NewProductOnboardingProductDetailsSection";
import NewProductOnboardingProductMediaSection from "sections/OnboardingSections/NewProductOnboardingSections/NewProductOnboardingProductMediaSection";
import NewProductOnboardingVariantLevelInventorySection from "sections/OnboardingSections/NewProductOnboardingSections/NewProductOnboardingVariantLevelInventorySection";
import NewProductOnboardingVariantsInfoSection from "sections/OnboardingSections/NewProductOnboardingSections/NewProductOnboardingVariantsInfoSection";
import appFetch from "utils/appFetch";

const mapState = ({ user, productsData }) => ({
	currentUser: user.currentUser,
	productsData,
});
export default function NewEditProductDetailsSection() {
	const router = useRouter();
	const { productId } = router.query;
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
				<Box sx={{ paddingBottom: "64px" }}>
					<NewProductOnboardingProductMediaSection
						keyForReduxStateData={"editProductData"}
						hideContinueNavigation
					/>
				</Box>
			),
			route: `product-media`,
		},
		{
			label: "Variants",
			component: (
				<Box sx={{ paddingBottom: "64px" }}>
					<NewProductOnboardingVariantsInfoSection
						keyForReduxStateData={"editProductData"}
						hideContinueNavigation
					/>
				</Box>
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
	const handleClickSaveButton = () => {
		// console.log("save button clicked");
		const URL = PRODUCT.MERCHANT.UPDATE_PRODUCT;
		const data = {
			user_id: currentUser.merchant_id,
			...editProductData,
		};
		appFetch(URL, data)
			.then((res) => {
				if (res.status === "success") {
					handleFetchProductData();
				}
			})
			.catch((err) => console.log(err));
	};
	return (
		<div>
			<Box
				sx={{
					mt: 2,
					ml: 2,
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				<SectionTitleText
					sx={{
						fontWeight: 700,
						fontSize: "28px",
						lineHeight: "34px",
					}}
				>
					Edit Product details
				</SectionTitleText>
				{/* <PrimaryButton onClick={() => handleClickSaveButton()}>
					Save
				</PrimaryButton> */}
			</Box>
			<RouterTabs
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
