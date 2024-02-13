/* eslint-disable react/no-unescaped-entities */
import { Box, Chip, IconButton, Tooltip, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProductPageView } from "redux/views/viewsSlice";
import imageList1 from "public/assets/imageList1.png";
import { CHANNEL, PRODUCT } from "constants/API_URL";
import CircleIcon from "@mui/icons-material/Circle";
import appFetch from "utils/appFetch";
import { format } from "date-fns";
import AppPageSections from "sections/AppPageSections";
import SectionLoader from "components/Common/LoadingIndicators/SectionLoader";
import TableCellAppLink from "sections/AppPageSections/CommonComponents/TableCellAppLink";
import AppLink from "components/Common/AppLink";
import LinkButton from "components/Common/Buttons/LinkButton";
import AppImage from "components/Common/AppImage";
// import shopifyIcon from "public/assets/icons/shopify.svg";
import Shopify from "public/assets/icons/shopify-icon.png";
import Unlisted from "public/assets/icons/unlisted.png";
import StatusChip from "components/Common/Chip/StatusChip";
import { useQuery } from "@tanstack/react-query";
import EditIcon from "components/Common/Icons/EditIcon";
import DeleteIcon from "components/Common/Icons/DeleteIcon";
import { MdContentCopy } from "react-icons/md";
import CloneIcon from "components/Common/Icons/CloneIcon";
import Popover from "@mui/material/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import CautionIcon from "components/Common/Icons/CautionIcon";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import theme from "theme";
import BaseDialog from "components/Common/Dialog";
import { orderBy, sortBy } from "lodash";
import RenderAppImage from "components/Common/Tables/RenderComponents/RenderAppImage";
import RenderImageWithText from "components/Common/Tables/RenderComponents/RenderImageWithText";
import RenderAppLink from "components/Common/Tables/RenderComponents/RenderAppLink";
import RenderStatus from "components/Common/Tables/RenderComponents/RenderStatus";
import RenderChannelAsIcon from "components/Common/Tables/RenderComponents/RenderChannelAsIcon";

const mapState = ({ views, user }) => ({
	pageView: views.productPageView,
	currentUser: user.currentUser,
});

export default function ProductsPageSection() {
	const router = useRouter();
	const productStatus = router.query.productStatus;
	const channelName = router.query.channelName;
	const { pageView, currentUser } = useSelector(mapState);
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState([]);
	const [channels, setChannels] = useState([]);
	const [openDialog, setOpenDialog] = useState(false);
	const [deleteProductID, setDeleteProductID] = useState("");
	const handleChangeView = (value) => {
		// pageView === "grid" ? "list" : "grid"
		dispatch(setProductPageView(value));
	};
	const handleDeleteDialogOpen = (itemId) => {
		setOpenDialog(true);
		setDeleteProductID(itemId);
	};
	const handleDeleteDialogClose = () => {
		setOpenDialog(false);
		setDeleteProductID("");
	};

	// const { data, isLoading } = useQuery({
	// 	queryKey: ["products"],
	// 	queryFn: () => {
	// 		appFetch(PRODUCT.MERCHANT.FETCH_PRODUCTS_LIST, {
	// 			user_id: currentUser.merchant_id,
	// 		}).then((json) => json.result);
	// 	},
	// });

	const handleFetchProducts = () => {
		setIsLoading(true);
		const url = PRODUCT.MERCHANT.FETCH_PRODUCTS_LIST;
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
	const sortedData = orderBy(data, "created_at", "desc");
	const filteredData =
		Array.isArray(sortedData) &&
		sortedData.filter((item) => {
			if (!productStatus) return item;
			if (item.status === productStatus) return item;
			// if (item.channel_name === channelName) return item;

			return;
		});
	const formattedTableData =
		Array.isArray(filteredData) &&
		filteredData.length > 0 &&
		filteredData.map((item) => {
			const {
				display_image,
				channel_id,
				item_title,
				master_item_id,
				master_product_id,
				product_title,
				status,
				unit_retail_price,
				created_at,
			} = item;
			const getChannelName = channels.filter((it) => {
				if (it.channel_id === channel_id) return it.channel_name;
				return;
			});
			const newLiveDate =
				(item.live_date && new Date(item.live_date)) || "";
			const formattedLiveDate =
				(item.live_date &&
					newLiveDate &&
					format(newLiveDate, "dd/MM/yyyy, hh:mm a")) ||
				"";
			const createdDate = (created_at && new Date(created_at)) || "";
			const formattedCreatedDate =
				(createdDate && format(createdDate, "dd/MM/yyyy, hh:mm a")) ||
				"";
			// console.log({ newLiveDate, master_product_id });
			return {
				...item,
				Product: display_image,
				// && (
				// 	<AppImage
				// 		src={display_image}
				// 		height="10"
				// 		width="10"
				// 		// sx={{ objectFit: "contain" }}
				// 	/>),
				// "Master Item Id": master_item_id,
				"Master Product Id": master_product_id,
				// && (
				// 	<TableCellAppLink
				// 		href={`/app/products/${master_product_id}?tab=overview`}
				// 	>
				// 		{" "}
				// 		{master_product_id}
				// 	</TableCellAppLink>
				// ),

				"Product Title": product_title,
				"Item Title": item_title,
				Status: status,
				"Channel Name":
					Array.isArray(getChannelName) &&
					getChannelName.length > 0 &&
					getChannelName[0].channel_name,
				"Created At": formattedCreatedDate || "",
				"Unit Retail Price": unit_retail_price,
			};
		});

	const gridData =
		Array.isArray(filteredData) &&
		filteredData.map((item) => {
			const { channel_id, created_at } = item;
			const getChannelName = channels.filter((it) => {
				if (it.channel_id === channel_id) return it.channel_name;
				return;
			});
			const newLiveDate =
				(item.live_date && new Date(item.live_date)) || "";
			const formattedLiveDate =
				(item.live_date &&
					newLiveDate &&
					format(newLiveDate, "dd/MM/yyyy, hh:mm a")) ||
				"";
			const createdDate = (created_at && new Date(created_at)) || "";
			const formattedCreatedDate =
				(createdDate && format(createdDate, "dd/MM/yyyy, hh:mm a")) ||
				"";

			// console.log({ getChannelName });
			return {
				...item,
				"Channel Name":
					Array.isArray(getChannelName) &&
					getChannelName.length > 0 &&
					getChannelName[0].channel_name,
				"Live Date": formattedLiveDate,
				"Created At": formattedCreatedDate || "",
			};
		});

	// function getStr(str) {
	// 	return str.slice(0, 15) + "...";
	// }

	function getStr1(str) {
		return str.length > 40 ? str.slice(0, 40) + ".." : str;
	}
	// function getWordStr(str) {
	// 	return str.split(/\s+/).slice(0, 5).join(" ") + "...";
	// }

	const capitalizeFirstLetter = (string) => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	};
	const handleDeleteProduct = (master_product_id) => {
		const URL = PRODUCT.MERCHANT.DELETE_PRODUCT;
		const data = {
			master_product_id: master_product_id,
			user_id: currentUser.merchant_id,
		};
		appFetch(URL, data).then((json) => {
			if (json.status === "success") {
				console.log({ json });
				// refetch();
				handleDeleteDialogClose();
				handleFetchProducts();
			}
		});
	};

	const ProductTableColumnData = [
		{
			field: "Product Title",
			// headerName: <span style={{
			// 	marginLeft: "64px",
			// }}>Product</span>,
			headerName: "Product",
			// headerClassName:'productHeaderMargin',
			renderCell: (params) => (
				// <Box
				// 	sx={{
				// 		display: "flex",
				// 		alignItems: "center",
				// 		cursor: "pointer",
				// 	}}
				// 	onClick={() =>
				// 		router.push(
				// 			`/app/products/${params.row.master_product_id}?tab=overview`,
				// 		)
				// 	}
				// >
				// 	<AppImage
				// 		// sx prop to fit app image to a definite size
				// 		sx={{ objectFit: "cover", borderRadius: "5px" }}
				// 		width="45"
				// 		height="45"
				// 		src={params.row.display_image || imageList1}
				// 	/>
				// 	{/* <RenderAppImage display_image={params.row.display_image} /> */}
				// 	<Typography
				// 		sx={{
				// 			// maxWidth:"250px",
				// 			marginLeft: "16px",
				// 			fontWeight: "500",
				// 			fontSize: "14px",
				// 			lineHeight: "20px",
				// 			color: (theme) => theme.palette.primary.main,
				// 			// wordBreak: "break-word",
				// 		}}
				// 	>
				// 		<>
				// 			<Tooltip title={params.row["Product Title"]}>
				// 				<span>
				// 					{getStr1(params.row["Product Title"])}
				// 				</span>
				// 			</Tooltip>
				// 		</>
				// 		{/* {params.row["Product Title"]} */}
				// 	</Typography>
				// </Box>
				<RenderImageWithText
					display_image={params.row.display_image}
					title={params.row["Product Title"]}
				/>
			),
			minWidth: 400,
			flex: 1,
			// headerAlign: "center",
			valueGetter: ({ value }) => value,
			// align: "left",
		},
		{
			field: "Master Product Id",
			headerName: (
				<span
					style={{
						marginLeft: "16px",
					}}
				>
					Master Product Id
				</span>
			),
			renderCell: (params) => (
				// <AppLink
				// 	sx={{ marginLeft: "16px" }}
				// 	href={`/app/products/${params.value}?tab=overview`}
				// >
				// 	{params.value}
				// </AppLink>
				<RenderAppLink
					href={`/app/products/${params.value}?tab=overview`}
					title={params.value}
				/>
			),
			width: 200,
			valueGetter: ({ value }) => value,
			//  headerAlign: "center",
			// align:"center"
		},

		{
			field: "Unit Retail Price",
			headerName: "Price",
			renderCell: (params) => <span>$ {params.value}</span>,
			width: 140,
			valueGetter: ({ value }) => value,
			// headerAlign: "center",
			// align:"center"
		},
		{
			field: "Channel Name",
			headerName: "Channel",
			renderCell: (params) => (
				// <div>
				// 	{params.value === "shopify" ? (
				// 		<>
				// 			<Tooltip title="Shopify">
				// 				<span>
				// 					{" "}
				// 					<AppImage
				// 						src={Shopify}
				// 						width="30"
				// 						height="30"
				// 					/>
				// 				</span>
				// 			</Tooltip>{" "}
				// 		</>
				// 	) : (
				// 		// <>{params.value === "native" && "unlisted"}</>
				// 		<>
				// 			<Tooltip title="Unlisted">
				// 				<span>
				// 					<AppImage
				// 						src={Unlisted}
				// 						width="40"
				// 						height="40"
				// 					/>
				// 				</span>
				// 			</Tooltip>
				// 		</>
				// 	)}
				// </div>
				<RenderChannelAsIcon value={params.value} />
			),
			width: 120,
			valueGetter: ({ value }) => value,
			headerAlign: "center",
			align: "center",
		},
		// {
		// 	field: "Status",
		// 	headerName: "Status",

		// 	renderCell: (params) => (
		// 		<div>
		// 			{params.value === "active" ? (
		// 				<StatusChip
		// 					label={params.value}
		// 					sx={{
		// 						// fontSize: "12px",
		// 						// fontWeight: "600",
		// 						color: "#5570F1",
		// 						backgroundColor: "rgba(228, 232, 253, 1)",
		// 						// borderRadius: "8px",
		// 						// marginTop: "-10px",
		// 						// marginRight: "-11px",
		// 						// height: "23px",
		// 						// width: "67px",
		// 					}}
		// 				/>
		// 			) : (
		// 				<StatusChip
		// 					label={params.value}
		// 					sx={{
		// 						// fontSize: "12px",
		// 						// fontWeight: "600",
		// 						color: "#DFA600",
		// 						backgroundColor: "rgba(255, 242, 226, 1)",
		// 						// borderRadius: "8px",

		// 						// height: "23px",
		// 						// width: "67px",
		// 					}}
		// 				/>
		// 			)}
		// 		</div>
		// 	),

		// 	// renderCell: (params) => <LinkButton>{params.value}</LinkButton>,
		// 	width: 180,
		// 	align: "center",
		// 	valueGetter: ({ value }) => value,
		// 	headerAlign: "center",
		// },

		{
			field: "Status",
			headerName: "Status",
			renderCell: (params) => (
				// <div>
				// 	{params.value === "active" ? (
				// 		<Box
				// 			sx={{
				// 				display: "flex",
				// 				alignItems: "center",
				// 				justifyContent: "space-between",
				// 			}}
				// 		>
				// 			<CircleIcon
				// 				sx={{
				// 					mr: "3px",
				// 					color: "#12B76A",
				// 					width: "6px",
				// 					height: "8px",
				// 				}}
				// 			/>
				// 			<Typography
				// 				sx={{
				// 					fontSize: "14px",
				// 					fontWeight: "600",
				// 					color: "#12B76A",
				// 				}}
				// 			>
				// 				{capitalizeFirstLetter(params.value)}
				// 			</Typography>
				// 		</Box>
				// 	) : (
				// 		<Box sx={{ display: "flex", alignItems: "center" }}>
				// 			<CircleIcon
				// 				sx={{
				// 					mr: "3px",
				// 					color: "#F79009",
				// 					width: "6px",
				// 					height: "8px",
				// 				}}
				// 			/>
				// 			<Typography
				// 				sx={{
				// 					fontSize: "14px",
				// 					fontWeight: "600",
				// 					color: "#F79009",
				// 				}}
				// 			>
				// 				{capitalizeFirstLetter(params.value)}
				// 			</Typography>
				// 		</Box>
				// 	)}
				// </div>
				<RenderStatus value={params.value} />
			),
			width: 150,
			align: "center",
			valueGetter: ({ value }) => value,
			headerAlign: "center",
		},

		{
			field: "Created At",
			headerName: "Created At",
			// renderCell: (params) => <LinkButton>{params.value}</LinkButton>,
			width: 200,
			flex: 0.8,
			valueGetter: ({ value }) => value,
			sortable: false,
			// headerAlign: "center",
			// align:"center"
		},
		{
			field: "master_product_id",
			headerName: "Action",
			renderCell: (params) => (
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<Tooltip title="Edit product">
						<IconButton
							sx={{}}
							onClick={() =>
								router.push(
									`/app/products/edit/${params.value}?tab=general-info`,
								)
							}
						>
							<EditIcon />
						</IconButton>
					</Tooltip>
					<Tooltip title="Copy product">
						<IconButton>
							<CloneIcon />
						</IconButton>
					</Tooltip>

					<Tooltip title="Delete product">
						{/* <IconButton
				

							
							onClick={() => handleDeleteProduct(params.value)}
							sx={{
								color: "#d92d20",
								"& svg path": {
									color: "#d92d20",
									// fill: "#d92d20",
									stroke: "#d92d20",
								},
							}}
						>
							<DeleteIcon />
						</IconButton> */}
						{/* <PopupState
							variant="popover"
							popupId="demo-popup-popover"
						> */}
						{/* {(popupState) => ( */}
						<div>
							<IconButton
								onClick={() =>
									handleDeleteDialogOpen(params.value)
								}
								// {...bindTrigger(popupState)}
								// onClick={() => handleDeleteProduct(params.value)}
								sx={{
									color: "#d92d20",
									"& svg path": {
										color: "#d92d20",
										// fill: "#d92d20",
										stroke: "#d92d20",
									},
								}}
							>
								<DeleteIcon />
							</IconButton>
						</div>
						{/* )} */}
						{/* </PopupState> */}
					</Tooltip>
				</Box>
			),
			width: 180,
			headerAlign: "center",
			align: "center",
			sortable: false,
		},
	];
	return (
		<Box
		//   sx={{ paddingBottom: "32px" }}
		>
			<AppPageSections
				hasStepOnboarding={true}
				title={`Products`}
				// showFilters
				tableData={formattedTableData}
				gridData={gridData}
				views={["list", "grid"]}
				handleChangeView={handleChangeView}
				pageView={pageView}
				loading={isLoading}
				rowIdkey={"master_product_id"}
				columnData={ProductTableColumnData}
			/>
			<BaseDialog
				hideCloseButton
				open={openDialog}
				handleClose={handleDeleteDialogClose}

				// {...bindPopover(popupState)}
				// anchorOrigin={{
				// 	vertical: "top",
				// 	horizontal: "center",
				// }}
				// transformOrigin={{
				// 	vertical: "top",
				// 	horizontal: "center",
				// }}
			>
				<Box
					sx={{
						marginY: "8px",
						marginX: "8px",
						width: "400px",
						// height: "200px",
						display: "flex",
						flexDirection: "column",

						alignItems: "center",
						borderRadius: "12px",
						"& svg": {
							mb: "16px",
						},
					}}
				>
					<CautionIcon />

					<Typography
						sx={{
							pT: "16px",
							fontSize: "22px",
							fontWeight: "600",
							lineHeight: "28px",
						}}
					>
						Delete Product
					</Typography>
					<Typography
						sx={{
							mt: "6px",
							fontSize: "14px",
							fontWeight: "500",
							lineHeight: "20px",
							textAlign: "center",
						}}
					>
						Are you sure you want to delete this Product?
						<br /> This action can't be undone
					</Typography>
					<Box
						sx={{
							// borderTop: (theme) =>
							// 	`1px solid ${theme.palette.grey[300]}`,
							display: "flex",
							mt: "12px",

							bottom: "0",
							width: "372px",
							pt: "16px",
							// pb: "24px",
						}}
					>
						<OutlinedButton
							onClick={handleDeleteDialogClose}
							fullWidth
							sx={{ height: "44px" }}
							// onClick={popupState.close}
						>
							Cancel
						</OutlinedButton>
						<PrimaryButton
							onClick={() => handleDeleteProduct(deleteProductID)}
							fullWidth
							sx={{
								ml: 1,
								height: "44px",
								backgroundColor: "#D92D20",
								"&:hover": {
									background: "#d91304",
								},
							}}
						>
							Delete Product
						</PrimaryButton>
					</Box>
				</Box>
			</BaseDialog>
		</Box>
	);
}
