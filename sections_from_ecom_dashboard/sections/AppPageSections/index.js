import {
	Box,
	Button,
	Chip,
	Container,
	Grid,
	Icon,
	IconButton,
	Stack,
	ToggleButton,
	ToggleButtonGroup,
	Typography,
} from "@mui/material";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import BaseCard from "components/Common/Cards/BaseCard";
import MuiBaseTable from "components/Common/Tables/MuiBaseTable";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProductPageView } from "redux/views/viewsSlice";
import ViewListIcon from "@mui/icons-material/ViewList";
import GridViewIcon from "@mui/icons-material/GridView";
import { Add } from "public/assets/add.png";
import productImage from "public/assets/t-shirt.png";
import FilterDrawer from "components/Common/Drawer/FilterDrawer";
import { CHANNEL, MERCHANT, PRODUCT } from "constants/API_URL";
import RefreshIcon from "@mui/icons-material/Refresh";
import appFetch from "utils/appFetch";
import { format } from "date-fns";
import ProductsPageTable from "sections/ProductsPageSection/ProductsPageTable";
import ProductGridItemCard from "sections/ProductsPageSection/ProductGridItemCard";
import Filter from "components/Common/Icons/filter";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import SectionLoader from "components/Common/LoadingIndicators/SectionLoader";
import TableSection from "./CommonComponents/TableSection";
import MuiBaseDataGrid from "components/Common/Tables/MuiBaseDataGrid";
import FiltersComponent from "./CommonComponents/FiltersComponent";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import AddIcon from "components/Common/Icons/add";
import ListIcon from "components/Common/Icons/list";
import GridIcon from "components/Common/Icons/grid";
import FilterCloseIcon from "components/Common/Icons/FilterCloseIcon";
import RightDrawer from "components/Common/Drawer/RightDrawer";
import { MdClose } from "react-icons/md";
import MapIcon from "components/Common/Icons/MapIcon";

const mapState = ({ views, user }) => ({
	pageView: views.productPageView,
	currentUser: user.currentUser,
});

export default function AppPageSections({
	tableData = [],
	gridData = [],
	views = [],
	handleChangeView,
	pageView,
	component: Component,
	loading,
	title = "",
	rowIdkey,
	columnData = [],
	hideFilters,
	hasStepOnboarding,
}) {
	const router = useRouter();
	const appPageType = router.query.appPageType;
	const time = new Date();
	const newPageId = time.getTime();
	const url = title.replace(" ", "-").toLowerCase();

	const handleClickAddButton = () => {
		if (hasStepOnboarding) {
			return router.push(
				`/onboarding/${url}/${newPageId}?step=general-info&id=0`,
			);
		}
		return router.push(`/onboarding/${url}/${newPageId}`);

		// router.push(`/onboarding/${url}/${newPageId}?step=general-info&id=0`);
	};

	const [showFilters, setShowFilters] = useState(false);

	const toggleOptions = [
		{
			value: "list",
			icon: ListIcon,
		},
		{
			value: "grid",
			icon: GridIcon,
		},
		{
			value: "map",
			icon: MapIcon,
		},
	];
	const showOptions = views.map((item) => {
		const filteredItem = toggleOptions.filter((it) => it.value === item)[0];
		return {
			...filteredItem,
		};
	});
	const handleShowFilters = () => {
		setShowFilters(!showFilters);
	};
	// console.log({ showOptions });

	return (
		<Box>
			<Grid container sx={{ maxWidth: "100%" }}>
				{/* {showFilters && (
					<Grid
						item
						md={2}
						sx={{
							borderRight: "1px solid rgba(0,0,0,0.1)",
							paddingRight: "8px",
							position: "sticky",
							// top: "68px",
						}}
					>
						<FilterDrawer />
					</Grid>
				)} */}
				<Grid item md={12}>
					<Box>
						<Box sx={{
							position:"sticky",
							top:"64.5px",
							zIndex:"100",
							backgroundColor:"#fff",
							// borderBottom:"1px solid rgba(0,0,0,0.1)",


						}}>
							<Box
								sx={{
									flex: 1,
									display: "flex",
									padding: "8px",
									mb: "8px",
									// marginTop: "16px",
									aliginItems: "center",
								}}
							>
								<SectionTitleText
									sx={{
										textTransform: "capitalize",
										fontSize: "28px",

										fontWeight: "700",
										color: "#313D4E",
										display: "flex",
										aliginItems: "center",

										// flexDirection: "row",
										lineHeight: "40px",
										lineHeight: "40px",
									}}
								>
									{title} List{" "}
									<Typography
										sx={{
											marginTop: "3px",
											fontSize: "16px",
											fontWeight: "700",
											color: "#475467",
											lineHeight: "40px",
											ml: "12px",
										}}
									>
										({tableData.length} Products)
									</Typography>
									{/* <RefreshIcon
										sx={{
											width: "16px",
											height: "16px",
											color: "#313D4E",
											marginLeft: "12px",
											marginTop: "8px",
										}}
									/> */}
									{/* <Typography
										sx={{
											fontWeight: "500",
											fontSize: "12px",
											color: "#313D4E",
											marginLeft: "2px",
											marginTop: "8px",
										}}
									>
										{/* Updated 1 min ago 
									</Typography> */}
								</SectionTitleText>
								<div style={{ flex: 1, width: "100%" }} />

								{/* {Array.isArray(views) && views.length > 1 && (
									<ToggleButtonGroup
										sx={{
											width: "94px",
											height: "36px",
											marginRight: "80px",
										}}
										value={pageView}
										exclusive
										onChange={(e, value) =>
											handleChangeView(value)
										}
										aria-label="text alignment"
									>
										{showOptions.map((i) => {
											return (
												<ToggleButton
													key={i.value}
													value={i.value}
													aria-label={i.value}
												>
													<i.icon />
													<Typography
														sx={{
															marginLeft: "4px",
														}}
													>
														{i.value}
													</Typography>
												</ToggleButton>
											);
										})}
									</ToggleButtonGroup>
								)} */}

								{Array.isArray(views) && views.length > 1 && (
									<Box
										sx={{
											borderRadius: "5px",
											border: "1px solid #E4E7EC",
											p: 0.5,
										}}
									>
										{showOptions.map((it, id) => {
											return (
												<Button
													key={id}
													// variant={
													// 	pageView === it.value
													// 		? "contained"
													// 		: "outlined"
													// }
													startIcon={<it.icon />}
													onClick={() =>
														handleChangeView(
															it.value,
														)
													}
													sx={
														pageView === it.value
															? {
																	height: "32px",
																	px: "12px",
																	color: (
																		theme,
																	) =>
																		theme
																			.palette
																			.grey[800],
																	background:
																		"#F2F4F7",
																	textTransform:
																		"capitalize",
																	"& svg": {
																		fill: (
																			theme,
																		) =>
																			theme
																				.palette
																				.grey[800],
																	},
															  }
															: {
																	height: "32px",
																	px: "12px",
																	color: (
																		theme,
																	) =>
																		theme
																			.palette
																			.grey[800],
																	// opacity:
																	// 	"0.7",
																	textTransform:
																		"capitalize",
															  }
													}
												>
													{/* <it.icon /> */}
													{it.value}
												</Button>
											);
										})}
									</Box>
								)}

								{!hideFilters && (
									<OutlinedButton
										onClick={() => handleShowFilters()}
										sx={{
											marginLeft: "16px",
											paddingX: "16px",
											height: "42px",
											background: (theme) =>
												showFilters &&
												theme.palette.grey[100],
										}}
										startIcon={
											showFilters ? (
												<FilterCloseIcon />
											) : (
												<Filter />
											)
										}
									>
										{/* {showFilters ? "Hide" : "Show"} */}{" "}
										Filter
									</OutlinedButton>
								)}
								<PrimaryButton
									sx={{
										marginLeft: "16px",
										paddingX: "10px",
										height: "42px",
									}}
									onClick={() => handleClickAddButton()}
								>
									<AddIcon />
									<Typography sx={{ marginLeft: "8px" }}>
										Add {title}
									</Typography>
								</PrimaryButton>
							</Box>
						</Box>
						<Box>
							{showFilters && (
								<RightDrawer
									openDrawer={showFilters}
									handleClose={() => handleShowFilters()}
								>
									{/* <FiltersComponent /> */}
									<FilterDrawer />
								</RightDrawer>
							)}
						</Box>

						{views.length === 1 && (
							<>
								{Array.isArray(tableData) &&
									tableData.length > 0 && (
										<>
											{/* <TableSection data={tableData} /> */}
											<MuiBaseDataGrid
												data={tableData}
												rowIdkey={rowIdkey}
												columnDefData={columnData}
												loading={loading}
												checkboxSelection={false}
											/>
										</>
									)}
							</>
						)}
						{views.length > 1 && (
							<>
								{
									Array.isArray(tableData) && (
										// tableData.length > 0 ?
										<Box
											sx={{
												paddingTop: "8px",
												px: "8px",
											}}
										>
											{pageView === "list" && (
												<>
													{" "}
													<MuiBaseDataGrid
														data={tableData}
														rowIdkey={rowIdkey}
														columnDefData={
															columnData
														}
														loading={loading}
														checkboxSelection={
															false
														}
													/>
													{/* <TableSection
                          data={tableData}
                          // url={`/app/${appPageType}`}
                          // itemKey={"Master Product Id"}
                        /> */}
												</>
											)}
											{pageView === "map" && (
												<>
													<Component />
												</>
											)}
											{pageView === "grid" && (
												<>
													<Grid container spacing={2}>
														{gridData.map(
															(item, index) => (
																<Grid
																	item
																	md={3}
																	sm={6}
																	xs={12}
																	key={index}
																>
																	<ProductGridItemCard
																		item={
																			item
																		}
																	/>
																</Grid>
															),
														)}
													</Grid>
												</>
											)}
										</Box>
									)
									// :
									// (
									// 	<>
									// 		{loading ? (
									// 			<SectionLoader />
									// 		) : (
									// 			<h1>No results found</h1>
									// 		)}
									// 	</>
									// )}
								}
							</>
						)}
					</Box>
				</Grid>
			</Grid>
		</Box>
	);
}
