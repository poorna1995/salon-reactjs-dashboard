import { Box, Tooltip, Typography } from "@mui/material";
import AppImage from "components/Common/AppImage";
import AppLink from "components/Common/AppLink";
import MuiBaseDataGrid from "components/Common/Tables/MuiBaseDataGrid";
import { CHANNEL, PRODUCT } from "constants/API_URL";
import { format } from "date-fns";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	setPublishTaskID,
	setSelectedPublishableProducts,
} from "redux/products/productsSlice";
import TableCellAppLink from "sections/AppPageSections/CommonComponents/TableCellAppLink";
import appFetch from "utils/appFetch";
import PublishPageCard from "../components/PublishPageCard";
import PublishPageNavBar from "../components/PublishPageNavBar";
import CircleIcon from "@mui/icons-material/Circle";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";

const mapState = ({ views, user, productsData }) => ({
	pageView: views.productPageView,
	currentUser: user.currentUser,
	selectedProducts: productsData?.selectedProducts,
});

export default function BulkProductPublishSelectProductsSection({
	handleClickContinueButton,
	handleClickBackButton,
	pageLabel,
}) {
	const router = useRouter();
	const { pageView, currentUser, selectedProducts } = useSelector(mapState);
	const dispatch = useDispatch();
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

	useEffect(() => {
		dispatch(setPublishTaskID(""));
	}, []);
	// console.log({ channels });
	const formattedTableData =
		Array.isArray(data) &&
		data
			.filter((item) => {
				if (item.status === "draft") return item;
				return;
			})
			.map((item) => {
				const {
					display_image,
					channel_id,
					item_title,
					live_date,
					master_item_id,
					master_product_id,
					product_title,
					status,
					unit_retail_price,
				} = item;
				const getChannelName = channels.filter((it) => {
					if (it.channel_id === channel_id) return it.channel_name;
					return;
				});
				const newLiveDate = (live_date && new Date(live_date)) || "";
				const formattedLiveDate =
					(newLiveDate &&
						format(newLiveDate, "dd/MM/yyyy, hh:mm a")) ||
					"";
				// console.log({ getChannelName });
				return {
					...item,
					Product: display_image,
					"Master Item Id": master_item_id,
					"Master Product Id": master_product_id,
					"Product Title": product_title,
					"Item Title": item_title,
					Status: status,
					"Channel Name":
						Array.isArray(getChannelName) &&
						getChannelName.length > 0 &&
						getChannelName[0].channel_name,
					"Live Date": formattedLiveDate,
					"Unit Retail Price": unit_retail_price,
				};
			});

	function getStr1(str) {
		return str.length > 40 ? str.slice(0, 120) + ".." : str;
	}
	const ProductTableColumnData = [
		{
			field: "Product",
			headerName: "Product",
			// renderCell: (params) => (
			// 	<Box sx={{ display: "flex", alignItems: "center" }}>
			// 		<AppImage width="50" height="65" src={params.value} />
			// 		<Typography
			// 			sx={{
			// 				marginLeft: "12px",
			// 				fontWeight: "500",
			// 				fontSize: "14px",
			// 				color: "#313D4E",
			// 			}}
			// 		>
			// 			{params.row["Product Title"]}
			// 		</Typography>
			// 	</Box>
			// ),

			renderCell: (params) => (
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						cursor: "pointer",
					}}
				>
					<AppImage
						// sx prop to fit app image to a definite size
						sx={{ objectFit: "cover", borderRadius: "5px" }}
						width="45"
						height="45"
						src={params.value}
					/>
					<Typography
						sx={{
							// maxWidth:"250px",
							marginLeft: "16px",
							fontWeight: "500",
							fontSize: "14px",
							lineHeight: "20px",
							color: (theme) => theme.palette.primary.main,
							// wordBreak: "break-word",
						}}
					>
						<>
							<Tooltip title={params.row["Product Title"]}>
								<span>
									{getStr1(params.row["Product Title"])}
								</span>
							</Tooltip>
						</>
						{/* {params.row["Product Title"]} */}
					</Typography>
				</Box>
			),
			// width: 400,
			flex: 1,
			valueGetter: ({ value }) => value,
		},
		// {
		// 	field: "Master Item Id",
		// 	headerName: "Master Item Id",
		// 	// renderCell: (params) => <AppLink href="">{params.value}</AppLink>,
		// 	width: 180,
		// 	valueGetter: ({ value }) => value,
		// },
		{
			field: "Master Product Id",
			headerName: "Master Product Id",
			// renderCell: (params) => <AppLink href="">{params.value}</AppLink>,
			width: 180,
			valueGetter: ({ value }) => value,
		},
		// {
		// 	field: "Product Title",
		// 	headerName: "Product ",
		// 	// renderCell: () => "Master Product Id",
		// 	width: 220,
		// 	valueGetter: ({ value }) => value,
		// },
		// {
		// 	field: "Item Title",
		// 	headerName: "Item Title",
		// 	// renderCell: (params) => <LinkButton>{params.value}</LinkButton>,
		// 	width: 120,
		// 	valueGetter: ({ value }) => value,
		// },
		{
			field: "Status",
			headerName: "Status",
			// renderCell: (params) => <LinkButton>{params.value}</LinkButton>,
			width: 100,
			valueGetter: ({ value }) => value,
			renderCell: (params) => (
				<div>
					{params.value === "active" ? (
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
							}}
						>
							<CircleIcon
								sx={{
									mr: "3px",
									color: "#12B76A",
									width: "6px",
									height: "8px",
								}}
							/>
							<Typography
								sx={{
									fontSize: "14px",
									fontWeight: "600",
									color: "#12B76A",
									textTransform: "capitalize",
								}}
							>
								{params.value}
							</Typography>
						</Box>
					) : (
						<Box sx={{ display: "flex", alignItems: "center" }}>
							<CircleIcon
								sx={{
									mr: "3px",
									color: "#F79009",
									width: "6px",
									height: "8px",
								}}
							/>
							<Typography
								sx={{
									fontSize: "14px",
									fontWeight: "600",
									color: "#F79009",
									textTransform: "capitalize",
								}}
							>
								{params.value}
							</Typography>
						</Box>
					)}
				</div>
			),
		},
		{
			field: "Unit Retail Price",
			headerName: "Price",
			// renderCell: (params) => <LinkButton>{params.value}</LinkButton>,
			width: 100,
			valueGetter: ({ value }) => value,
		},
	];
	const handleClickContinueButtonForSave = () => {
		const URL = PRODUCT.SAVE_REVIEW_CHANGES;
		const data = {
			user_id: currentUser.merchant_id,
			master_product_id: master_product_id,
			publish: false,
			changes: false,
		};
	};

	return (
		<Box sx={{ px: "8px" }}>
			<PublishPageNavBar
				handleClickContinueButton={handleClickContinueButton}
				handleClickBackButton={handleClickBackButton}
				pageLabel={pageLabel}
				disableContinueButton={selectedProducts.length === 0}
			/>
			{/* <PublishPageCard> */}
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					mb: "14px",
					mt: "none",
				}}
			>
				<SectionTitleText>Select Products</SectionTitleText>

				<PrimaryButton
					disabled={selectedProducts.length === 0}
					onClick={handleClickContinueButton}
				>
					Continue
				</PrimaryButton>
			</Box>
			<MuiBaseDataGrid
				rowIdkey={"master_product_id"}
				columnDefData={ProductTableColumnData}
				data={formattedTableData}
				onSelectionModelChange={(newSelectionModel) => {
					dispatch(setSelectedPublishableProducts(newSelectionModel));
					// setSelectedProducts(newSelectionModel);
				}}
				selectionModel={selectedProducts}
				disableSelectionOnClick={false}
			/>

			{/* <PrimaryButton onClick={handleClickContinueButton} sx={{ mt: 2 }}>
          Continue
        </PrimaryButton> */}
			{/* </PublishPageCard> */}
		</Box>
	);
}
