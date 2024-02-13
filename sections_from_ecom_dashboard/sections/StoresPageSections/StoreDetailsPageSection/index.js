import {
	Box,
	Breadcrumbs,
	Button,
	Divider,
	Grid,
	Tabs,
	Typography,
} from "@mui/material";
import AppImage from "components/Common/AppImage";
import AppLink from "components/Common/AppLink";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import ViewLiveIcon from "components/Common/Icons/ViewLiveIcon";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import appFetch from "utils/appFetch";
import { CHANNEL, THIRD_PARTY } from "constants/API_URL";
import { groupBy } from "lodash";
import { useSnackbar } from "notistack";
import RouterTabs from "components/Common/Tabs/RouterTabs";
import BaseCard from "components/Common/Cards/BaseCard";
import SectionLoader from "components/Common/LoadingIndicators/SectionLoader";
import BulletIcon from "components/Common/Icons/BulletIcon";
import HomeIcon from "components/Common/Icons/HomeIcon";
import NavigateNextIcon from "components/Common/Icons/NavigateNextIcon";
import EditInButtonIcon from "components/Common/Icons/EditInButtonIcon";
import SyncIcon from "components/Common/Icons/SyncIcon";
const buttonStyles = {
	textTransform: "capitalize",
	background: "#F7F7FD",
	color: "#2480EB",
};
const textStyles = {
	fontWeight: "600",
};
const mapState = ({ user }) => ({
	currentUser: user.currentUser,
});
export default function StoreDetailsPageSection() {
	const router = useRouter();
	const storeId = router.query.storeId;
	const { currentUser } = useSelector(mapState);
	const [appsData, setAppsData] = useState([]);
	const [appLineData, setAppLineData] = useState([]);
	const [connectedApps, setConnectedApps] = useState();
	const [isLoading, setIsLoading] = useState(false);

	const { enqueueSnackbar } = useSnackbar();

	const handleFetchThirdPartyApps = () => {
		const url = THIRD_PARTY.FETCH_APPS;
		fetch(url)
			.then((res) => res.json())
			.then((json) => {
				setAppsData(json.result);
			});
	};
	const handleFetchThirdPartyAppLine = () => {
		const url = THIRD_PARTY.FETCH_APPLINE;
		fetch(url)
			.then((res) => res.json())
			.then((json) => {
				setAppLineData(json.result);
			});
	};

	useEffect(() => {
		handleFetchThirdPartyApps();
		handleFetchThirdPartyAppLine();
		handleFetchConnectedApps();
	}, []);

	const handleFetchConnectedApps = () => {
		const url = CHANNEL.FETCH_CONNECTED_APPS;
		const data = {
			user_id: currentUser.merchant_id,
		};
		setIsLoading(true);
		appFetch(url, data).then((json) => {
			setIsLoading(false);
			if (json.status === "success") {
				console.log(json);
				setConnectedApps(json.result);
			}
		});
	};

	const handleConnectStore = (link) => {
		if (link) {
			window.open(link, "_blank");
		}
	};
	const tableData = [
		{
			API: <span style={textStyles}>Products</span>,
			"Sync Data": <Button sx={buttonStyles}>Sync</Button>,
		},
		{
			API: <span style={textStyles}>Vendors</span>,
			"Sync Data": <Button sx={buttonStyles}>Sync</Button>,
		},
		{
			API: <span style={textStyles}>Warehouse</span>,
			"Sync Data": <Button sx={buttonStyles}>Sync</Button>,
		},
	];

	const mapGridDataToAppsData =
		Array.isArray(appsData) &&
		appsData.map((item) => {
			const { channel_name, channel_category, channel_id } = item;
			// const getItemFromGrid = gridData.filter(
			// 	(it) => it.title === channel_name,
			// )[0];
			const getConnectedApp =
				Array.isArray(connectedApps) &&
				connectedApps.length > 0 &&
				connectedApps.filter((i) => i.channel_id === channel_id);
			const connectedStatus =
				Array.isArray(getConnectedApp) && getConnectedApp.length > 0;
			return {
				...item,
				// ...getItemFromGrid,
				connectedStatus,
				connectedApps: getConnectedApp,
			};
		});
	// console.log({ connectedApps, appLineData, mapGridDataToAppsData });

	const handleSyncButtonClick = (shop, apiName) => {
		let url;
		if (apiName === "product api") {
			url = SHOPIFY.SYNC_PRODUCT;
		} else if (apiName === "warehouse") {
			url = SHOPIFY.WAREHOUSE_SYNC;
		}
		// const url = SHOPIFY.SYNC_PRODUCT || SHOPIFY.WAREHOUSE_SYNC;
		const data = {
			user_id: currentUser.merchant_id,
			shop: shop,
		};
		appFetch(url, data)
			.then((json) => {
				if (json.status === "success") {
					enqueueSnackbar(json.message);
				}
				enqueueSnackbar(json.message, { variant: "error" });
			})
			.catch((error) => console.error(error));
	};

	const tabsData = [
		{
			label: "Scope",
			component: (
				<>
					{Array.isArray(connectedApps) &&
						connectedApps.length > 0 &&
						connectedApps.map((item, index) => {
							if (item.store_id === storeId)
								return (
									<>
										{/* <BaseCard
											key={index}
											sx={{
												marginTop: "16px",
												maxWidth: "1400px",
											}}
										> */}
										<Box>
											{/* <SectionTitleText
												sx={{ padding: "16px" }}
											>
												{item.shop}
											</SectionTitleText> */}

											<Grid
												container
												sx={{
													py: "16px",
													// borderTop:
													// 	"1px solid rgba(0,0,0,0.1)",
													backgroundColor: "#F9FAFB",
												}}
											>
												<Grid
													item
													xs={3.6}
													sx={{ pl: "46px" }}
												>
													<SectionTitleText
														sx={{
															fontSize: "16px",
														}}
													>
														{" "}
														API{" "}
													</SectionTitleText>
												</Grid>
												<Grid
													item
													xs={3.5}
													// sx={{ pl: "46px" }}
												>
													<SectionTitleText
														sx={{
															fontSize: "16px",
														}}
													>
														{" "}
														Last Updated{" "}
													</SectionTitleText>
												</Grid>
												<Grid
													item
													xs={3.5}
													// sx={{ pl: "46px" }}
												>
													<SectionTitleText
														sx={{
															fontSize: "16px",
														}}
													>
														{" "}
														Status{" "}
													</SectionTitleText>
												</Grid>

												<Grid item xs={1}>
													<SectionTitleText
														sx={{
															fontSize: "16px",
															paddingLeft: "28px",
														}}
													>
														{" "}
														Sync{" "}
													</SectionTitleText>
												</Grid>
											</Grid>

											{appLineData.map((it, id) => (
												<>
													<Grid
														container
														// rowSpacing={4}
														sx={{
															paddingBottom:
																"16px",
															paddingTop: "16px",
															borderTop:
																"1px solid rgba(0,0,0,0.1)",
														}}
													>
														<Grid
															item
															xs={3.6}
															key={id}
															sx={{ pl: "32px" }}
														>
															{
																it.fact_line_desc.split(
																	"_api",
																)[0]
															}
														</Grid>
														<Grid
															item
															xs={3.5}
															key={id}
															// sx={{ pl: "32px" }}
														>
															{/* {
																it.fact_line_desc.split(
																	"_api",
																)[0]
															} */}
														</Grid>
														<Grid
															item
															xs={3.5}
															key={id}
															// sx={{ pl: "32px" }}
														>
															{/* {
																it.fact_line_desc.split(
																	"_api",
																)[0]
															} */}
														</Grid>
														{/* <Divider/> */}
														<Grid item xs={1}>
															<OutlinedButton
																// sx={
																// 	buttonStyles
																// }
																startIcon={<SyncIcon/>}
																onClick={() =>
																	handleSyncButtonClick(
																		item.shop,
																		it.fact_line_desc.split(
																			"_api",
																		)[0],
																	)
																}
															>
																Sync
															</OutlinedButton>
														</Grid>
													</Grid>
												</>
											))}

											{/* <MuiBaseTable
							newData={tableData}
							baseCardStyles={{
								border: "none",
								borderRadius: "0px",
							}}
						/> */}
										</Box>
									</>
								);
						})}
				</>
			),
			route: "scope",
		},
		{
			label: "Activity Log",
			route: "activity-log",
		},
	];

	return (
		<div>
			{isLoading && <SectionLoader />}
			{!isLoading && (
				<>
					<Box
						sx={{
							marginBottom: "10px",
							backgroundColor: "white",
							position: "sticky",
							top: "66px",
							zIndex: (theme) => theme.zIndex.appBar,
						}}
					>
						<Breadcrumbs
							sx={{
								fontSize: "12px",
								padding: "20px",
							}}
							aria-label="breadcrumb"
							separator={<NavigateNextIcon />}
						>
							<HomeIcon/>
							<AppLink
								href="/app/stores"
								sx={{ color: "#1570EF" }}
							>
								Stores
							</AppLink>

							<Typography
								sx={{ fontSize: "12px" }}
								// underline="hover"
								color="#1570EF"
								fontWeight="600"
							>
								{storeId}
							</Typography>
						</Breadcrumbs>
						<Divider sx={{ marginX: "10px" }} />
					</Box>
					<Box>
						<Grid
							container
							sx={{
								borderBottom: "2px solid rgba(0,0,0,0.1)",
								backgroundColor: "white",
								background: "white",
								zIndex: (theme) => theme.zIndex.drawer + 11000,
							}}
						>
							{Array.isArray(connectedApps) &&
								connectedApps.length > 0 &&
								connectedApps.map((item, index) => {
									if (item.store_id === storeId)
										return (
											<>
												{/* {console.log({
                            item,
                            where: "inside connected apps",
                        })} */}
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
														src={item.logo}
														height="150"
														width="150"
														sx={{ ml: "16px" }}
													/>
													{/* </BaseCard> */}
												</Grid>
												<Grid item md={7} sm={9}>
													<SectionTitleText
														sx={{
															fontWeight: "700",
															fontSize: "18px",
															mt: "18px",
															mb: "6px",
															lineHeight: "28px",
														}}
													>
														{item.shop}
													</SectionTitleText>
													<DescriptionText
														sx={{
															display: "flex",
															flexDirection:
																"row",

															fontWeight: "600",
															fontSize: "14px",
															color: "#313D4E",
														}}
													>
														Store Id: {storeId}
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
												<Grid item sx={{ mt: "12px" }}>
													<OutlinedButton
														// onClick={() => handleViewProduct()}

														startIcon={
															<ViewLiveIcon />
														}
													>
														View Live Store
													</OutlinedButton>
													<PrimaryButton
														sx={{ ml: 2 }}
														startIcon={<EditInButtonIcon />}
													>
														Edit Store
													</PrimaryButton>
													{/* {productURL && ( */}

													{/* )} */}
												</Grid>
											</>
										);
								})}
						</Grid>
					</Box>
					<Box sx={{ marginTop: "6px" }}>
						<RouterTabs
							data={tabsData}
							basePath={`/app/stores/${storeId}/`}
						/>
					</Box>
				</>
			)}
		</div>
	);
}
