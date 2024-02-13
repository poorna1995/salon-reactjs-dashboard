import {
	Box,
	FormControlLabel,
	Grid,
	IconButton,
	Radio,
	RadioGroup,
	Stack,
	Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import BaseCard from "components/Common/Cards/BaseCard";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { MdArrowBack } from "react-icons/md";
import shopifyIcon from "public/assets/icons/shopify-text-icon.png";
import AppImage from "components/Common/AppImage";
import CheckboxInput from "components/Common/Inputs/Checkbox";
import ProductPublishPagePublishSection from "./ProductPublishPagePublishSection";
import ProductPublishReviewProductSection from "./ProductPublishReviewProductSection";
import BulkProductPublishSelectProductsSection from "./BulkProductPublishPageSections/BulkProductPublishSelectProductsSection";
import BulkProductPublishReviewChangesPageSection from "./BulkProductPublishPageSections/BulkProductPublishReviewChangesPageSection";
import BulkProductPublishReviewProductsPageSection from "./BulkProductPublishPageSections/BulkProductPublishReviewProductsPageSection";
import { CHANNEL } from "constants/API_URL";
import appFetch from "utils/appFetch";
import { useDispatch, useSelector } from "react-redux";
import PublishPageNavBar from "./components/PublishPageNavBar";
import PublishPageCard from "./components/PublishPageCard";
import {
	setSelectedPublishableProducts,
	setSelectedPublishableStore,
} from "redux/products/productsSlice";
import BulkPublishPagePublishSection from "./BulkProductPublishPageSections/BulkPublishPagePublishSection";
import { groupBy } from "lodash";

const mapState = ({ user }) => ({
	currentUser: user.currentUser,
});
export default function ProductPublishPageSelectStoreSection({
	handleClickBackButton,
	handleClickContinueButton,
}) {
	const router = useRouter();
	const pageType = router.query.step;
	const status = router.query.status;
	console.log({ pageType });

	const MyComponent = pageType && steps[pageType].component;
	const pageLabel = pageType && steps[pageType].label;
	// const handleClickBackButton = () => {
	// 	router.back();
	// };
	return (
		<div>
			<Box sx={{ width: "100%" }}>
				{pageType && (
					<MyComponent
						handleClickContinueButton={handleClickContinueButton}
						handleClickBackButton={handleClickBackButton}
						pageLabel={pageLabel}
					/>
				)}
			</Box>
		</div>
	);
}

const SelectStoreComponent = ({
	handleClickContinueButton,
	handleClickBackButton,
	pageLabel,
}) => {
	const { currentUser } = useSelector(mapState);
	const dispatch = useDispatch();
	const router = useRouter();
	const [selectedStore, setSelectedStore] = useState("");

	const [connectedApps, setConnectedApps] = useState([]);
	const handleFetchConnectedApps = () => {
		const url = CHANNEL.FETCH_CONNECTED_APPS;
		const data = {
			user_id: currentUser.merchant_id,
		};
		appFetch(url, data).then((json) => {
			if (json.status === "success") {
				console.log(json);
				setConnectedApps(json.result);
			}
		});
	};
	useEffect(() => {
		handleFetchConnectedApps();
	}, []);

	const handleSelectStore = (e) => {
		setSelectedStore(e.target.value);

		dispatch(setSelectedPublishableStore(e.target.value));
	};
	// const handleClickBackButton = () => {
	// 	router.back();
	// };
	useEffect(() => {
		dispatch(setSelectedPublishableProducts([]));
	}, [selectedStore]);
	const groupByChannelName = groupBy(connectedApps, "channel_name");
	console.log({ groupByChannelName });

	return (
		<div>
			<PublishPageNavBar
				handleClickContinueButton={handleClickContinueButton}
				handleClickBackButton={handleClickBackButton}
				pageLabel={pageLabel}
				disableContinueButton={!selectedStore}
			/>{" "}
			<PublishPageCard>
				<SectionTitleText>Select a store</SectionTitleText>
				<DescriptionText sx={{ marginBottom: "16px" }}>
					Please select a store where you want to publish the Product
				</DescriptionText>
				<Grid container spacing={2}>
					{Object.keys(groupByChannelName).map((key, keyIndex) => {
						return (
							<Grid item xs={4} key={keyIndex}>
								<BaseCard
									sx={{
										width: "100%",
										boxShadow: "none",
										border: "1px solid rgba(0,0,0,0.1)",
									}}
								>
									<Box
										sx={{
											padding: "16px",
											borderBottom:
												"1px solid rgba(0,0,0,0.1)",
											display: "flex",
											alignItems: "center",
										}}
									>
										{" "}
										{
											groupByChannelName[key][0]
												.channel_name === "shopify" ? (
												<AppImage
													src="/assets/ShopifyImage.png"
													width={26}
													height={26}
													alt="shopify"
												/>
											) : (
												// <ShopifyIcon/>
												<AppImage
													src="/assets/WooComImage.png"
													width={45}
													height={26}
													alt="woo commerce"
												/>
											)
											// <WooCommerceIcon/>
										}
										{/* <AppImage
											src={shopifyIcon}
											width="90"
											height="36"
										/> */}
										<Typography
											sx={{
												ml: "8px",
												fontWeight: "600",
												fontSize: "18px",
											}}
										>
											{key}
										</Typography>
									</Box>
									<Box
										sx={{
											padding: "16px",
										}}
									>
										<RadioGroup
											aria-labelledby="demo-controlled-radio-buttons-group"
											name="controlled-radio-buttons-group"
											value={selectedStore}
											onChange={handleSelectStore}
										>
											{Array.isArray(
												groupByChannelName[key],
											) &&
												groupByChannelName[key].map(
													(item, index) => {
														const { shop } = item;
														return (
															<div key={index}>
																<FormControlLabel
																	value={shop}
																	control={
																		<Radio />
																	}
																	label={shop}
																/>
															</div>
														);
													},
												)}
										</RadioGroup>
									</Box>
								</BaseCard>
							</Grid>
						);
					})}
				</Grid>
				<PrimaryButton
					disabled={!selectedStore}
					onClick={() => handleClickContinueButton()}
					sx={{ marginTop: "16px" }}
				>
					Continue
				</PrimaryButton>
			</PublishPageCard>
		</div>
	);
};

const steps = {
	"select-store": {
		label: "Select Store",
		type: "select-store",
		component: SelectStoreComponent,
	},
	"review-product": {
		label: "Review product",
		type: "review-product",
		component: ProductPublishReviewProductSection,
	},
	publish: {
		label: "Publish",
		type: "publish",
		component: ProductPublishPagePublishSection,
	},
	"select-products": {
		label: "Select Products",
		type: "select-products",
		component: BulkProductPublishSelectProductsSection,
	},
	"review-changes": {
		label: "Review Changes",
		type: "review-changes",
		component: BulkProductPublishReviewChangesPageSection,
	},
	"review-products": {
		label: "Review Products",
		type: "review-products",
		component: BulkProductPublishReviewProductsPageSection,
	},
	"publish-bulk": {
		label: "Publish",
		type: "publish-bulk",
		component: BulkPublishPagePublishSection,
	},
};
