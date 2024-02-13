import {
	Box,
	Grid,
	IconButton,
	Stack,
	Tooltip,
	Typography,
} from "@mui/material";
import AppImage from "components/Common/AppImage";
import BaseCard from "components/Common/Cards/BaseCard";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import React from "react";
import placeholderImage from "public/assets/t-shirt.png";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import AppLink from "components/Common/AppLink";
import MuiBaseDataGrid from "components/Common/Tables/MuiBaseDataGrid";
import { CHANNEL, PRODUCT } from "constants/API_URL";
import { format } from "date-fns";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedPublishableProducts } from "redux/products/productsSlice";
import TableCellAppLink from "sections/AppPageSections/CommonComponents/TableCellAppLink";
import appFetch from "utils/appFetch";
import BottomDrawer from "components/Common/Drawer/BottomDrawer";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import { MdClose } from "react-icons/md";
import EditProductComponent from "../components/EditProductComponent";
import ProductsDetailsPageSection from "sections/ProductsPageSection/ProductsDetailsPageSection";
import PublishPageNavBar from "../components/PublishPageNavBar";
import PublishPageDrawerHeader from "../components/PublishPageDrawerHeader";
import PublishPageCard from "../components/PublishPageCard";
import NewEditProductComponent from "../components/NewEditProductComponent";

const mapState = ({ views, user, productsData }) => ({
	pageView: views.productPageView,
	currentUser: user.currentUser,
	selectedProducts: productsData?.selectedProducts,
});

export default function BulkProductPublishReviewProductsPageSection({
	handleClickContinueButton,
	handleClickBackButton,
	pageLabel,
}) {
	const router = useRouter();
	const { pageView, currentUser, selectedProducts } = useSelector(mapState);
	const dispatch = useDispatch();
	const productId = router.query.productId;
	const drawerOpen = router.query.drawerOpen;
	const edit = router.query.edit;

	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState([]);
	const [channels, setChannels] = useState([]);
	console.log({ selectedProducts });
	const handleFetchProducts = () => {
		setIsLoading(true);
		const url = PRODUCT.MERCHANT.FETCH_PRODUCT_MASTER;
		const data = {
			user_id: currentUser.merchant_id,
		};
		appFetch(url, data)
			.then((json) => {
				setIsLoading(false);
				if (json.status === "success") {
					setData(json.result);
				}
				console.log({ products: json });
			})
			.catch((err) => console.error(err));
	};
	useEffect(() => {
		handleFetchProducts();
	}, []);
	const handleFetchChannels = () => {
		const URL = CHANNEL.FETCH_CHANNEL;
		fetch(URL)
			.then((res) => res.json())
			.then((json) => {
				setChannels(json.result);
			});
	};
	useEffect(() => {
		handleFetchChannels();
	}, []);

	// console.log({ channels });

	// filter data by selected products using master_item_id
	const filteredData =
		Array.isArray(data) &&
		data.filter((item) => {
			const { master_product_id } = item;
			if (selectedProducts.includes(master_product_id)) return item;
			return;
		});
	console.log({ filteredData });

	/**
         * {
    "barcode": "",
    "category": "",
    "channel_id": 3,
    "collection": "",
    "collection_name": "",
    "display_image": "",
    "images": [],
    "inventory_item_id": null,
    "item_desc": "<p></p>\n",
    "item_title": "New Product Title",
    "live_date": "2023-02-07T07:43:59.162741",
    "master_item_id": "138950486391628670",
    "master_product_id": "1675754602332",
    "product_desc": "<p></p>\n",
    "product_title": "New Product Title",
    "sku": "",
    "status": "draft",
    "tag": [],
    "type": "",
    "unit_cost_price": 0,
    "unit_retail_price": 0,
    "user_id": "138944605333795140",
    "weight": 0,
    "weight_unit": "kg"
}
         */
	const [openDrawer, setOpenDrawer] = React.useState(drawerOpen);
	const handleOpenDrawer = (master_product_id) => {
		setOpenDrawer(true);
		router.push(
			`/app/products/publish/bulk?step=review-products&productId=${master_product_id}&drawerOpen=true`,
		);
	};
	const handleCloseDrawer = () => {
		setOpenDrawer(false);
		router.push(`/app/products/publish/bulk?step=review-products`);
	};
	const handleEditButtonClick = () => {
		setOpenDrawer(true);
		router.push(
			`/app/products/publish/bulk?step=review-products&productId=${productId}&drawerOpen=true&edit=true`,
		);
	};
	const getProductDetails =
		(Array.isArray(filteredData) &&
			filteredData.length > 0 &&
			filteredData.filter((item) => {
				const { master_product_id } = item;
				if (productId === master_product_id) return item;
				return;
			})[0]) ||
		{};

	return (
		<Box sx={{ px: "8px" }}>
			<PublishPageNavBar
				handleClickContinueButton={handleClickContinueButton}
				handleClickBackButton={handleClickBackButton}
				pageLabel={pageLabel}
			/>
			{/* <PublishPageCard
				
			> */}
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
				}}
			>
				<SectionTitleText sx={{ mb: 1 }}>
					Review products
				</SectionTitleText>
				<PrimaryButton
					// disabled
					onClick={() => handleClickContinueButton()}
					// sx={{ mt: 2 }}
				>
					Continue
				</PrimaryButton>
			</Box>

			<DescriptionText
				sx={{
					// marginLeft: "10px",
					fontSize: "18px",
					fontWeight: "500",
					color: (theme) => theme.palette.grey[700],
					// paddingBottom: "32px",
					pb: 2,
				}}
			>
				Please review the products which you want to publish to your
				Shopify Store
			</DescriptionText>

			<Grid container spacing={2}>
				{filteredData.map((item, index) => {
					const {
						master_item_id,
						master_product_id,
						product_title,
						item_title,
						status,
						unit_retail_price,
						display_image,
					} = item;
					function getStr1(str, length) {
						return str.length > 40 ? str.slice(0, 35) + ".." : str;
					}
					return (
						<Grid item xs={12} md={3} key={index}>
							<BaseCard
								sx={{
									// marginLeft: "10px",
									padding: "16px",
									textAlign: "center",
									minHeight: "380px",
									// width: "250px",
									// height: "420px",
									border: "1px solid #E5E5E5",
								}}
							>
								<AppImage
									src={display_image}
									width="280"
									height="240"
								/>
								<Stack sx={{ textAlign: "left" }}>
									<DescriptionText
										sx={{
											color: "#313D4E",
											fontWeight: "600",
											paddingTop: "7px",
											marginLeft: "10px",
											fontSize: "14px",
										}}
									>
										<>
											<Tooltip
												title={
													product_title || item_title
												}
											>
												<span>
													{getStr1(product_title)}
												</span>
											</Tooltip>
										</>
										{/* {product_title || item_title} */}
									</DescriptionText>
									<DescriptionText
										sx={{
											display: "flex",
											flexDirection: "row",
											color: "#313D4E",
											fontWeight: "700",
											paddingTop: "7px",
											marginLeft: "10px",
											fontSize: "14px",
										}}
									>
										Unit Price:
										<DescriptionText
											sx={{
												color: "#313D4E",
												fontWeight: "500",
												// paddingTop: "1px",
												marginLeft: "10px",
												fontSize: "14px",
											}}
										>
											$ {unit_retail_price}
										</DescriptionText>
									</DescriptionText>
								</Stack>
								<OutlinedButton
									sx={{
										marginTop: "15px",
										width: "200px",
										fontSize: "16px",
										color: "#313D4E",
									}}
									onClick={() =>
										handleOpenDrawer(master_product_id)
									}
								>
									Review product
								</OutlinedButton>
							</BaseCard>
						</Grid>
					);
				})}
			</Grid>

			{/* <PrimaryButton
					onClick={() => handleClickContinueButton()}
					sx={{ mt: 2 }}
				>
					Continue
				</PrimaryButton> */}
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
							productTitle={getProductDetails?.product_title}
							handleCloseDrawer={handleCloseDrawer}
							handleEditButtonClick={handleEditButtonClick}
						/>
					) : (
						<>
							<PublishPageDrawerHeader
								edit={edit}
								handleCloseDrawer={handleCloseDrawer}
								handleEditButtonClick={handleEditButtonClick}
								productTitle={getProductDetails?.product_title}
							/>

							<ProductsDetailsPageSection isUsedOnReviewPage />
						</>
					)}
				</Box>
			</BottomDrawer>
			{/* </PublishPageCard> */}
		</Box>
	);
}
