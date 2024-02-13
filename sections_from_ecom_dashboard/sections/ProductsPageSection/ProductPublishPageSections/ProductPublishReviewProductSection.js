import { Box, IconButton, Stack } from "@mui/material";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import BaseCard from "components/Common/Cards/BaseCard";
import BottomDrawer from "components/Common/Drawer/BottomDrawer";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { PRODUCT } from "constants/API_URL";
import { useRouter } from "next/router";
import React from "react";
import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";
import appFetch from "utils/appFetch";
import ProductsDetailsPageSection from "../ProductsDetailsPageSection";
import EditProductComponent from "./components/EditProductComponent";
import NewEditProductComponent from "./components/NewEditProductComponent";
import PreviewProductComponent from "./components/PreviewProductComponent";
import PublishPageCard from "./components/PublishPageCard";
import PublishPageDrawerHeader from "./components/PublishPageDrawerHeader";
import PublishPageNavBar from "./components/PublishPageNavBar";

// mapstate user data
const mapState = ({ user }) => ({
	currentUser: user.currentUser,
});
export default function ProductPublishReviewProductSection({
	handleClickContinueButton,
	handleClickBackButton,
	pageLabel,
}) {
	// get the product id from the router
	const router = useRouter();
	const publishProductId = router.query.publishProductID;
	// use the useSelector hook to get the user data from the redux store
	const { currentUser } = useSelector(mapState);
	const productId = router.query.productId;
	const drawerOpen = router.query.drawerOpen;
	const edit = router.query.edit;
	// create a state to store the product list
	const [productList, setProductList] = React.useState([]);
	// create a state to store the product details
	const [productDetails, setProductDetails] = React.useState({});
	const [openDrawer, setOpenDrawer] = React.useState(drawerOpen);
	const handleOpenDrawer = () => {
		setOpenDrawer(true);
		router.push(
			`/app/products/publish/${publishProductId}/review-product?productId=${publishProductId}&drawerOpen=true`,
		);
	};
	const handleCloseDrawer = () => {
		setOpenDrawer(false);
		router.push(`/app/products/publish/${publishProductId}/review-product`);
	};
	const handleEditButtonClick = () => {
		setOpenDrawer(true);
		router.push(
			`/app/products/publish/${publishProductId}/review-product?productId=${publishProductId}&drawerOpen=true&edit=true`,
		);
	};
	// create a function to fetch the product details using the product id
	const handleFetchProductDetails = () => {
		// fetch the product details using appFetch
		const URL = PRODUCT.MERCHANT.FETCH_PRODUCT_MASTER;
		const data = {
			master_product_id: publishProductId,
			user_id: currentUser.merchant_id,
		};
		appFetch(URL, data)
			.then((json) => {
				if (json.status === "success") {
					// set the product details to the state
					setProductList(json.result);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};
	// call the function to fetch the product details
	React.useEffect(() => {
		handleFetchProductDetails();
	}, []);
	console.log({ productList });

	// filter the product list to get the product details using the master_item_id
	const filteredData =
		Array.isArray(productList) &&
		productList.filter((item) => {
			return item.master_product_id === publishProductId;
		});
	const getProductDetails =
		Array.isArray(filteredData) &&
		filteredData.length > 0 &&
		filteredData[0];

	console.log({ productTitle: getProductDetails.product_title });
	return (
		<div>
			<PublishPageNavBar
				handleClickContinueButton={handleClickContinueButton}
				handleClickBackButton={handleClickBackButton}
				pageLabel={pageLabel}
			/>
			<PublishPageCard>
				<SectionTitleText>Review Product</SectionTitleText>
				<DescriptionText
					sx={{ maxWidth: "750px", marginBottom: "16px" }}
				>
					Before publishing your product to the Shopify store, we need
					you to review the Product Details. We just want to know if
					anything is missing or incorrect in order to fix it before
					we share it with our customers.
				</DescriptionText>

				<PreviewProductComponent
					display_image={getProductDetails.display_image}
					product_title={getProductDetails.product_title}
					productId={publishProductId}
				/>

				{/* <Stack
					direction="row"
					sx={{ maxWidth: "400px", justifyContent: "space-between" }}
				>
					<OutlinedButton onClick={handleOpenDrawer}>
						View Product
					</OutlinedButton>
					<OutlinedButton onClick={handleEditButtonClick}>
						Edit Product
					</OutlinedButton>
				</Stack> */}
				<PrimaryButton onClick={() => handleClickContinueButton()}>
					Continue
				</PrimaryButton>
				<BottomDrawer
					openDrawer={openDrawer}
					handleClose={handleCloseDrawer}
				>
					{/* <Box
						sx={{
							padding: "16px",
							display: "flex",
							flex: 1,
							borderBottom: "1px solid rgba(0,0,0,0.1)",
							position: "sticky",
							top: 0,
							background: "white",
							zIndex: (theme) => theme.zIndex.drawer + 10000,
						}}
					>
						<SectionTitleText>
							{getProductDetails.product_title}
						</SectionTitleText>
						<div style={{ flex: 1 }} />
						{edit ? (
							<PrimaryButton onClick={handleCloseDrawer}>
								Save Changes
							</PrimaryButton>
						) : (
							<OutlinedButton onClick={handleEditButtonClick}>
								Edit Product Details
							</OutlinedButton>
						)}
						<IconButton
							onClick={handleCloseDrawer}
							sx={{ marginLeft: "16px" }}
						>
							<MdClose />
						</IconButton>
					</Box> */}
					<Box>
						{edit ? (
							<NewEditProductComponent
								handleCloseDrawer={handleCloseDrawer}
								handleEditButtonClick={handleEditButtonClick}
								edit={edit}
								productTitle={getProductDetails?.product_title}
							/>
						) : (
							<>
								<PublishPageDrawerHeader
									edit={edit}
									handleCloseDrawer={handleCloseDrawer}
									handleEditButtonClick={
										handleEditButtonClick
									}
									productTitle={
										getProductDetails.product_title
									}
								/>

								<ProductsDetailsPageSection
									isUsedOnReviewPage
								/>
							</>
						)}
					</Box>
				</BottomDrawer>
			</PublishPageCard>
		</div>
	);
}
