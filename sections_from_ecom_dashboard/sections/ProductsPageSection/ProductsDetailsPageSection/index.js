import {
	Box,
	Breadcrumbs,
	Grid,
	IconButton,
	Paper,
	Typography,
} from "@mui/material";
import AppImage from "components/Common/AppImage";
import React, { useEffect, useState } from "react";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import { useRouter } from "next/router";
import BasicTabs from "components/Common/Tabs/BasicTabs";
import MuiBaseTable from "components/Common/Tables/MuiBaseTable";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
// images
import productImage from "public/assets/t-shirt.png";
import { CHANNEL, PRODUCT } from "constants/API_URL";
import { useSelector } from "react-redux";
import appFetch from "utils/appFetch";
import { useQuery } from "@tanstack/react-query";
import SectionLoader from "components/Common/LoadingIndicators/SectionLoader";
import BaseCard from "components/Common/Cards/BaseCard";
import AppDetailsPageSection from "sections/AppPageSections/AppDetailsPageSection";
import lodash from "lodash";
import ItemsTable from "sections/InventoryPageSection/ItemsTable";
import RenderHTML from "components/Common/Typography/RenderHTML";
import AppLink from "components/Common/AppLink";
import RouterTabs from "components/Common/Tabs/RouterTabs";
import ImageSlider from "components/Common/ImageSlider";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import EmptyState from "components/Common/EmptyState";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import ViewLiveIcon from "components/Common/Icons/ViewLiveIcon";
import EditIcon from "components/Common/Icons/EditIcon";

const mapState = ({ user }) => ({
	currentUser: user.currentUser,
});
export default function ProductsDetailsPageSection({ isUsedOnReviewPage }) {
	const router = useRouter();
	const { currentUser } = useSelector(mapState);
	const productId = router.query.productId;

	const [data, setData] = useState({});
	const [itemsData, setItemsData] = useState([]);
	const [inventoryData, setInventoryData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [channels, setChannels] = useState([]);
	useEffect(() => {
		if (productId) handleFetchProductDetails();
	}, [productId]);

	const handleFetchProductDetails = () => {
		const URL = PRODUCT.MERCHANT.FETCH_PRODUCT_MASTER;
		const data = {
			user_id: currentUser.merchant_id,
			master_product_id: productId,
		};
		setIsLoading(true);
		appFetch(URL, data)
			.then((json) => {
				setIsLoading(false);
				if (json.status === "success") {
					setData(json.result[0]);
					setItemsData(json.result[0].items);
				}
			})
			.catch((error) => console.log(error));
	};

	console.log({ data });
	/**
	 * {
    "barcode": "",
    "channel_id": 1,
    "display_image": "https://cdn.shopify.com/s/files/1/0703/4234/4986/products/hmgoepprod_6.webp?v=1674642278",
    "images": [
        "https://cdn.shopify.com/s/files/1/0703/4234/4986/products/hmgoepprod_6.webp?v=1674642278",
        "https://cdn.shopify.com/s/files/1/0703/4234/4986/products/hmgoepprod_6_501a718c-34c8-45f9-a79e-b03749c548c8.webp?v=1674642286",
        "https://cdn.shopify.com/s/files/1/0703/4234/4986/products/hmgoepprod_ab2295a0-333d-45ef-8bd5-91fb9f537a22.webp?v=1674642286"
    ],
    "item_desc": "",
    "item_title": "Default Title",
    "live_date": "2023-01-09T05:27:26-05:00",
    "master_item_id": "44320351355162",
    "master_product_id": "8071078904090",
    "product_desc": "",
    "product_title": "90s Baggy High Jeans",
    "status": "active",
    "unit_retail_price": "2500.00",
    "user_id": "138940023846722390"
}
	 */
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

	const getChannels = channels.filter((it) => {
		if (data && it.channel_id === data.channel_id) return it.channel_name;
		return;
	});

	const getChannelsData = getChannels.map((item) => {
		const { channel_id, channel_name } = item;
		return {
			"Channel Id": channel_id,
			"Channel Name": channel_name,
		};
	});
	console.log({ getChannelsData });

	const channelsData = getChannelsData;

	const getItemData = lodash.groupBy(itemsData, "master_product_id");
	const itemsList =
		Array.isArray(itemsData) &&
		itemsData.map((item) => {
			const { item_title, item_desc, unit_retail_price, option_value } =
				item;
			const title = option_value.join(" / ");
			return {
				"Item title": title,
				// "Item Description": item_desc,
				"Unit Retail Price": unit_retail_price,
			};
		});
	const itemData = itemsList;

	const uniqValues = new Set(inventoryData);
	const uniqValueArray = new Array(uniqValues);
	// const groupBy
	const { data: inventories } = useQuery({
		queryKey: ["inventory", productId],
		queryFn: () =>
			appFetch(PRODUCT.MERCHANT.FETCH_INVENTORY_PRODUCT, {
				user_id: currentUser.merchant_id,
				master_product_id: productId,
			}).then((json) => json.result),
	});
	const inventoryDat =
		Array.isArray(inventories) &&
		inventories
			.map((item) => {
				const {
					// item_title,
					// // item_desc,
					// unit_retail_price,
					// available,
					// wh_name,
					option_value,
					inventory,
				} = item;
				const data = inventory.map((it) => {
					const { warehouse, available } = it;
					const title = option_value.join(" / ");

					return {
						"Item Title": title,
						Warehouse: warehouse,
						"Inventory quantiy": available,
					};
				});
				return data;
				// {

				// 	// "Item title": item_title,
				// 	// "Item Description": item_desc,
				// 	// "Unit Retail Price": unit_retail_price,
				// };
			})
			.flat();

	console.log({ itemsData, getItemData, inventoryDat });

	const OverviewCard = ({ title, children, tab }) => {
		const handleClickIconButton = () => {
			router.push(`/app/products/${productId}?tab=${tab}`);
		};
		return (
			<BaseCard
				sx={{
					boxShadow: "none",
					// width: "300px",
					height: "300px",
					border: "1px solid rgba(49, 61, 78, 0.1)",
					// overflow: "unset",
					zIndex: 0,
				}}
			>
				<Box
					sx={{
						borderBottom: "1px solid #e0e0e0",
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						padding: "8px",
						pl: "16px",
					}}
				>
					<SectionTitleText
						sx={{
							display: "flex",
							flexDirection: "row",
							// height: "40px",
							fontWeight: "700",
							fontSize: "18px",
							// paddingLeft: "15px",
							// marginTop: "15px",
						}}
					>
						{title}
					</SectionTitleText>{" "}
					<IconButton
						onClick={handleClickIconButton}
						sx={{ zIndex: 1 }}
					>
						<OpenInNewIcon
							sx={{
								color: "#5860D7",
								// width: "18px",
								// height: "18px",
								// marginLeft: "220px",
								// marginTop: "7px",
							}}
						/>
					</IconButton>
				</Box>
				<Box sx={{ overflow: "scroll" }}>{children}</Box>
			</BaseCard>
		);
	};
	const staticData = [
		{
			label: "Overview",

			component: (
				<>
					<Box
					// sx={{
					// 	display: "flex",
					// 	flexDirection: "row",
					// 	justifyContent: "space-between",
					// }}
					>
						<Grid container spacing={2}>
							<Grid item xs={12} md={4}>
								{" "}
								<OverviewCard
									title="Product Details"
									tab="product-details"
								>
									{/* <TypographyRenderHtml */}
									{/* <RenderHTML
										content={
											data.product_desc || (
												<p>
													No description added, add an
													empty state for this
												</p>
											)
										}
									/> */}
									<DescriptionText
										sx={{
											fontWeight: "500",
											fontSize: "16px",
											color: "#313D4E",
											paddingX: "15px",
											paddingTop: "10px",
										}}
									>
										<RenderHTML
											content={data.product_desc}
										/>
										{/* {data.product_desc ||
											"No description added, add an empty state for this"} */}
									</DescriptionText>
								</OverviewCard>
							</Grid>
							<Grid item xs={12} md={4}>
								<OverviewCard
									title={`Inventory`}
									tab="inventory"
								>
									{Array.isArray(inventoryDat) && (
										<MuiBaseTable newData={inventoryDat} />
									)}
								</OverviewCard>
							</Grid>
							<Grid item xs={12} md={4}>
								<OverviewCard title={`Items`} tab={"items"}>
									{Array.isArray(itemData) && (
										<MuiBaseTable
											newData={itemData}
											baseCardStyles={{
												boxShadow: "none",
												// border: "1px solid rgba(0,0,0,0.2)",
											}}
										/>
									)}
								</OverviewCard>
							</Grid>
							<Grid item xs={12} md={4}>
								<OverviewCard title={`Stores`} tab={"stores"}>
									{Array.isArray(channelsData) && (
										<MuiBaseTable
											newData={channelsData}
											baseCardStyles={{
												boxShadow: "none",

												// border: "1px solid rgba(0,0,0,0.2)",
											}}
										/>
									)}
								</OverviewCard>
							</Grid>
						</Grid>
					</Box>
				</>
			),
			route: `overview`,
		},
		{
			label: "Product Details",
			component: (
				<>
					<Grid
						container
						spacing={2}
						sx={{
							display: "flex",
							// flexDirection: "row",

							fontWeight: "500",
							fontSize: "14px",
							color: "#313D4E",
							// paddingLeft: "15px",
							// paddingTop: "10px",
						}}
					>
						{/* {data.product_desc ||
							"No description added, add an empty state for this"} */}
						<Grid item md={6}>
							<SectionTitleText
								sx={{
									fontWeight: "700",
									fontSize: "16px",
									// paddingLeft: "15px",
								}}
							>
								Product Description
							</SectionTitleText>

							{data.product_desc && (
								<RenderHTML content={data.product_desc} />
							)}
							{!data.product_desc && (
								<EmptyState text={"No description found"} />
							)}
						</Grid>

						<Grid item md={6}>
							<ImageSlider
								data={data.images}
								title={"Product Images"}
							/>
						</Grid>
					</Grid>
				</>
			),
			route: `product-details`,

			// data.product_desc ||
			// "No description added, add an empty state for this",
		},
		{
			label: "Inventory",
			component: (
				<>
					{inventoryDat.length === 0 && (
						<EmptyState text={"No inventory data found"} />
					)}
					{inventoryDat.length > 0 && (
						<MuiBaseTable newData={inventoryDat} />
					)}
				</>
			),
			route: `inventory`,
		},
		{
			label: "Items",
			component: (
				<MuiBaseTable
					newData={itemData}
					baseCardStyles={{
						boxShadow: "none",
						// border: "1px solid rgba(0,0,0,0.2)",
					}}
				/>
			),
			route: `items`,
		},

		{
			label: "Stores",
			component: (
				<MuiBaseTable
					newData={channelsData}
					baseCardStyles={{
						boxShadow: "none",
						// border: "1px solid rgba(0,0,0,0.2)",
					}}
				/>
			),
			route: `stores`,
		},
		{
			label: "Activity Log",
			component: <Typography>working on it</Typography>,
			route: `activity-log`,
		},
	];
	const [tabsData, setTabsData] = useState([]);
	// remove the first item of array and show other items as an array
	const slicedData = staticData.slice(1);
	const removeEndItem = slicedData.slice(0, slicedData.length - 1);
	const dataOnReviewPage = isUsedOnReviewPage ? removeEndItem : staticData;

	useEffect(() => {
		if (data) {
			setTabsData(dataOnReviewPage);
		}
	}, [data]);
	// const handleFetchInventoryData = () => {
	// 	const url = PRODUCT.MERCHANT.FETCH_INVENTORY_PRODUCT;
	// 	const data = {
	// 		user_id: currentUser.merchant_id,
	// 		master_product_id: productId,
	// 	};
	// 	appFetch(url, data)
	// 		.then((json) => {
	// 			setInventoryData(json.result);
	// 			console.log({ json });
	// 		})
	// 		.catch((err) => console.log(err));
	// };
	// useEffect(() => {
	// 	handleFetchInventoryData();
	// }, []);
	const productURL =
		Array.isArray(data.channels) &&
		data.channels.length > 0 &&
		data.channels[0].channel_product_link;

	const handleViewProduct = () => {
		window.open(productURL, "_blank");
	};
	return (
		<Box>
			{isLoading && <SectionLoader />}

			{!isLoading && data !== {} && (
				<>
					{/* <AppDetailsPageSection
						tabsData={tabsData}
						display_image={data.display_image}
						title={data.product_title}
						pageID={productId}
						pageType={"Product"}
						isUsedOnReviewPage={isUsedOnReviewPage}
					/> */}

					<BaseCard sx={{ overflow: "unset" }}>
						{!isLoading && (
							<>
								{!isUsedOnReviewPage && (
									<Box
										sx={{
											marginBottom: "10px",
											backgroundColor: "white",
											position: "sticky",
											top: "66px",
											zIndex: (theme) =>
												theme.zIndex.appBar,
										}}
									>
										<Breadcrumbs
											sx={{
												fontSize: "12px",
												padding: "20px",
											}}
											aria-label="breadcrumb"
										>
											<AppLink
												href="/app/products"
												sx={{ color: "#5860D7" }}
											>
												Products
											</AppLink>

											<Typography
												sx={{ fontSize: "12px" }}
												// underline="hover"
												color="#5860D7"
												fontWeight="600"
												// href="/material-ui/react-breadcrumbs/"
												// aria-current="page"
											>
												{productId}
											</Typography>
										</Breadcrumbs>

										<Box>
											<Grid
												container
												sx={{
													borderBottom:
														"2px solid rgba(0,0,0,0.1)",
													backgroundColor: "white",
													background: "white",
													zIndex: (theme) =>
														theme.zIndex.drawer +
														11000,
												}}
											>
												<Grid item md={1.6} sm={3}>
													{/* <BaseCard
										sx={{
											height: "150px",
											width: "120px",
											marginLeft: "20px",
											marginBottom: "20px",
											borderRadius: "0px",
										}}
									> */}
													<AppImage
														src={data.display_image}
														height="150"
														width="150"
														sx={{ ml: "16px" }}
														// sx={{ objectFit: "contain" }}
													/>
													{/* </BaseCard> */}
												</Grid>

												<Grid item md={7} sm={9}>
													<SectionTitleText
														sx={{
															fontWeight: "700",
															fontSize: "18px",
															// paddingLeft: "20px",
															// paddingTop: "20px",
														}}
													>
														{data.product_title}
													</SectionTitleText>
													<DescriptionText
														sx={{
															display: "flex",
															flexDirection:
																"row",

															fontWeight: "500",
															fontSize: "14px",
															color: "#313D4E",
															// paddingLeft: "20px",
															// paddingTop: "10px",
														}}
													>
														Master Product ID :{" "}
														{productId}
														<DescriptionText
															sx={{
																fontWeight:
																	"500",
																fontSize:
																	"14px",
																color: "#313D4E",
																// paddingLeft:
																// "360px",
																paddingTop:
																	"10px",
															}}
														/>
														{/* Created on : 12/12/2021 */}
														<br />
														{/* Updated on: 12/12/2021 */}
														{/* / Style : Blue */}
														{/* / Style : Blue */}
													</DescriptionText>
												</Grid>
												<Grid item md={3}>
													<PrimaryButton
														onClick={() =>
															router.push(
																`/app/products/edit/${productId}?tab=general-info`,
															)
														}
													>
														Edit Product
													</PrimaryButton>
													{productURL && (
														<OutlinedButton
															onClick={() =>
																handleViewProduct()
															}
															sx={{ ml: 1 }}
															startIcon={
																<ViewLiveIcon />
															}
														>
															View Live product
														</OutlinedButton>
													)}
												</Grid>
											</Grid>
										</Box>
									</Box>
								)}
								<Box
									sx={{
										// marginTop: "20px",
										backgroundColor: "white",
									}}
								>
									{isUsedOnReviewPage ? (
										<BasicTabs
											sx={{ fontSize: "14px" }}
											data={tabsData}
										/>
									) : (
										<RouterTabs
											tabContainerStyles={{
												position: "sticky",
												top: "278px",
												zIndex: (theme) =>
													theme.zIndex.drawer + 1100,
											}}
											sx={{ fontSize: "14px" }}
											data={tabsData}
											basePath={`/app/products/${productId}`}
										/>
									)}
								</Box>
							</>
						)}
					</BaseCard>

					{/* <Grid container>
						<Grid item md={2} sm={3}>
							<BaseCard sx={{ height: "150px", width: "150px" }}>
								<AppImage
									src={data.display_image}
									height="150"
									width="150"
								/>
							</BaseCard>
						</Grid>
						<Grid item md={9} sm={9}>
							<SectionTitleText>
								{data.product_title}
							</SectionTitleText>
							<DescriptionText>
								Master Product ID : {productId}
								{/* / Style : Bl
							</DescriptionText>
						</Grid>
					</Grid>
					<BasicTabs data={tabsData} /> */}
				</>
			)}
		</Box>
	);
}
