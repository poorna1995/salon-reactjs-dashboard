import {
	Breadcrumbs,
	Button,
	CircularProgress,
	Divider,
	Grid,
	IconButton,
	LinearProgress,
	Tooltip,
	Typography,
} from "@mui/material";

import { Box } from "@mui/system";
import AppImage from "components/Common/AppImage";
import AppLink from "components/Common/AppLink";
import BaseCard from "components/Common/Cards/BaseCard";
import BoxIcon from "components/Common/Icons/BoxIcon";
import BulletIcon from "components/Common/Icons/BulletIcon";
import CalendarIcon from "components/Common/Icons/CalendarIcon";
import EditIcon from "components/Common/Icons/EditIcon";
import HomeIcon from "components/Common/Icons/HomeIcon";
import NavigateNextIcon from "components/Common/Icons/NavigateNextIcon";
import BulletsIcon from "components/Common/Icons/POicons/BulletsIcon";
import WarehouseIcon from "components/Common/Icons/POicons/WarehouseIcon";
import TagIcon from "components/Common/Icons/TagIcon";
import WalletIcon from "components/Common/Icons/WalletIcon";
import CustomCircularProgressWithLabel from "components/Common/Progress/CustomCircularProgressWithLabel";
import MuiBaseDataGrid from "components/Common/Tables/MuiBaseDataGrid";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { PURCHASE_ORDER } from "constants/API_URL";
import { format } from "date-fns";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import appFetch from "utils/appFetch";

const mapState = ({ user }) => ({
	currentUser: user.currentUser,
});

export default function PurchaseOrderDetailsPageSection() {
	const router = useRouter();
	const { currentUser } = useSelector(mapState);
	const { purchaseOrderId } = router.query;
	const [data, setData] = useState({});



	const handleFetchProducts = () => {
		// setIsLoading(true);
		const url = PURCHASE_ORDER.FETCH_PURCHASE_ORDER;
		const data = {
			po_id: purchaseOrderId,
			user_id: currentUser.merchant_id,
		};
		appFetch(url, data)
			.then((json) => {
				// setIsLoading(false);
				if (json.status === "success") {
					setData(json.result[0]);
				}
				console.log({ products: json });
			})
			.catch((err) => console.error(err));
	};
	useEffect(() => {
		if (purchaseOrderId) {
			handleFetchProducts();
		}
	}, [purchaseOrderId]);





	
	console.log({ purchaseOrderId });

	//  To Do: I have to add the data for columns and row

	const tableData = [
		{
			id: 1,
			// productName: "Long Sleeve Blouse Crop Top",
			sku: "SKU321800906",
			qtyOrdered: 800,
			unitPrice: "$ 500",
			total: "$ 5500",
			received: 5,
			action: "",
		},

		{
			id: 2,
			// productName: "Long Sleeve Blouse Crop Top",
			sku: "SKU321800906",
			qtyOrdered: 800,
			unitPrice: "$ 500",
			total: "$ 5500",
			// received: 5,
			action: "",
		},
		{
			id: 3,
			// productName: "Long Sleeve Blouse Crop Top",
			sku: "SKU321800906",
			qtyOrdered: 800,
			unitPrice: "$ 500",
			total: "$ 5500",
			// received: 5,
			action: "",
		},
		{
			id: 4,
			// productName: "Long Sleeve Blouse Crop Top",
			sku: "SKU321800906",
			qtyOrdered: 800,
			unitPrice: "$ 500",
			total: "$ 5500",
			// received: 5,
			action: "",
		},
		{
			id: 5,
			// productName: "Long Sleeve Blouse Crop Top",
			sku: "SKU321800906",
			qtyOrdered: 800,
			unitPrice: "$ 500",
			total: "$ 5500",
			// received: 5,
			action: "",
		},
		{
			id: 6,
			// productName: "Long Sleeve Blouse Crop Top",
			sku: "SKU321800906",
			qtyOrdered: 800,
			unitPrice: "$ 500",
			total: "$ 5500",
			// received: 5,
			action: "",
		},
		{
			id: 7,
			// productName: "Long Sleeve Blouse Crop Top",
			sku: "SKU321800906",
			qtyOrdered: 800,
			unitPrice: "$ 500",
			total: "$ 5500",
			// received: 5,
			action: "",
		},
		{
			id: 8,
			// productName: "Long Sleeve Blouse Crop Top",
			sku: "SKU321800906",
			qtyOrdered: 800,
			unitPrice: "$ 500",
			total: "$ 5500",
			// received: 5,
			action: "",
		},
		{
			id: 9,
			// productName: "Long Sleeve Blouse Crop Top",
			sku: "SKU321800906",
			qtyOrdered: 800,
			unitPrice: "$ 500",
			total: "$ 5500",
			// received: 5,
			action: "",
		},
		{
			id: 10,
			// productName: "Long Sleeve Blouse Crop Top",
			sku: "SKU321800906",
			qtyOrdered: 800,
			unitPrice: "$ 500",
			total: "$ 5500",
			// received: 5,
			action: "",
		},
	];

	console.log({ data });

	const productsData =
		Array.isArray(data.products) &&
		data.products.map((item, index) => {
			return {
				...item,
				index: index + 1,
			};
		});

	const columnsData = [
		// {
		//   field: "sno",
		//   headerName: "S. No.",
		//   renderCell: (params) => (
		//     // <>
		//     //   <Typography>{id+1}</Typography>
		//     // </>

		//     // <>{id+1}</>
		//     // columnsData.tableData.id + 1,
		//     <span>{params.rowData + 1}</span>
		//   ),
		// },

		{
			// To add a serial number in the table
			field: "po_line_id",
			headerName: "PO Line Id",
			flex: 1,
			width: 150,
			// renderCell: (params) => <>1</>,
		},

		{
			field: "product_title",
			headerName: "Product Name",
			renderCell: (params) => (
				<Box sx={{ display: "flex", alignItems: "center" }}>
					<AppImage
						// sx prop to fit app image to a definite size
						sx={{ objectFit: "cover", borderRadius: "5px" }}
						width="45"
						height="45"
						src={params.row.display_image || imageList1}
					/>
					<Typography sx={{ ml: 2 }}>
						{params.row.product_title}
					</Typography>
				</Box>
			),
			// renderCell: (params) => (
			//   <>
			//     <Typography>Long Sleeve Blouse Crop Top</Typography>
			//   </>
			// ),
			flex: 1,
			width: 100,
		},
		{ field: "sku", headerName: "SKU", flex: 0.5 },
		{
			field: "qty_ordered",
			headerName: "Qty Ordered",
			width: 200,
			// maxWidth: 200,
		},
		{ field: "unit_cost", headerName: "Unit Price" },
		{ field: "total_cost", headerName: "Total" },
		{
			field: "received_qty",
			headerName: "Received",
			// renderCell: () => (
			//   // <LinearProgress variant="determinate" value={50} color="primary" />
			//   <LinearProgress variant="solid" />
			// ),

			renderCell: (params) => (
				<Box sx={{ width: "100%" }}>
					<LinearProgress
						variant="determinate"
						color="success"
						value={params.value}
					/>
				</Box>
			),
			width: 200,
		},
		{ field: "action", headerName: "Action" },
	];
	const createdAtDate = data && data.created_at && new Date(data.created_at);
	const formattedCreatedAtDate =
		createdAtDate && format(createdAtDate, "MMMM dd, yyyy");

	return (
		<>
			{/* breadcrumbs for PurchaseOrder page */}

			<Box>
				<Breadcrumbs
					sx={{
						fontSize: "12px",
						padding: "20px",
					}}
					separator={<NavigateNextIcon fontSize="small" />}
					aria-label="breadcrumb"
				>
					<HomeIcon />
					{/* <NavigateNextIcon /> */}
					<AppLink
						href="/app/purchase-orders"
						sx={{ color: "#1570EF", fontWeight: 400 }}
					>
						Purchase Orders List
					</AppLink>
					{/* <NavigateNextIcon /> */}
					<Typography
						sx={{ fontSize: "12px" }}
						// underline="hover"
						color="grey.400"
						fontWeight="400"
						// href="/material-ui/react-breadcrumbs/"
						// aria-current="page"
					>
						{data.po_id}
					</Typography>
				</Breadcrumbs>
			</Box>

			<Divider />

			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					p: 2,
				}}
			>
				<Box sx={{ display: "flex", alignItem: "center" }}>
					<SectionTitleText
						sx={{
							fontWeight: "600",
							fontSize: "20px",
							color: "#1570EF",
						}}
					>
						Purchase Order # {data.po_id}
					</SectionTitleText>

					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							ml: 2,
						}}
					>
						<BulletsIcon sx={{}} />
						<Typography
							sx={{
								mx: 0.5,
								my: 0.75,
								fontWeight: 600,
								fontSize: 12,
								color: "warning.main",
							}}
						>
							Partially Recieved
						</Typography>
					</Box>
				</Box>
				<Box sx={{ display: "flex", alignItems: "center" }}>
					<Typography
						sx={{
							fontWeight: 400,
							fontSize: 14,
							color: "grey.700",
							mr: 1,
						}}
					>
						Date Created:{" "}
					</Typography>
					<Typography fontSize="14px" fontWeight={600}>
						{formattedCreatedAtDate}
					</Typography>

					<Box sx={{ ml: 1 }}>
						<Button
							startIcon={<EditIcon />}
							onClick={() =>
								router.push(
									`/app/purchase-orders/${purchaseOrderId}/edit`,
								)
							}
						>
							Edit Purchase Order
						</Button>
					</Box>
				</Box>
			</Box>

			<Divider variant="middle" />

			<Grid container spacing={2} p={2}>
				<Grid item md={3} sm={6} xs={12}>
					<BaseCard
						sx={{
							display: "flex",
							padding: "16px",
							backgroundColor: (theme) => theme.palette.grey[100],
						}}
					>
						<Box
							sx={{
								padding: "16px",
								marginRight: "8px",
								backgroundColor: "#FFFFFF",
								maxHeight: "60px",
								borderRadius: "11px",
							}}
						>
							<WarehouseIcon
								sx={{ width: "24px", height: "24px" }}
							/>
						</Box>
						<Box
							sx={{
								display: "inline-block",
								alignItems: "center",
							}}
						>
							<DescriptionText
								sx={{
									fontWeight: "400",
									fontSize: "18px",
								}}
							>
								Location
							</DescriptionText>

							<Typography
								sx={{
									padding: "4px",
									fontWeight: "800",
									fontSize: "22px",
								}}
							>
								{data &&
									data?.warehouse &&
									data?.warehouse?.wh_name &&
									data?.warehouse?.wh_name}
							</Typography>
						</Box>
					</BaseCard>
				</Grid>

				<Grid item md={3} sm={6} xs={12}>
					<BaseCard
						sx={{
							display: "flex",
							padding: "16px",
							backgroundColor: (theme) => theme.palette.grey[100],
						}}
					>
						<Box
							sx={{
								padding: "16px",
								marginRight: "8px",
								backgroundColor: "#FFFFFF",
								maxHeight: "60px",
								borderRadius: "11px",
							}}
						>
							<CalendarIcon
								sx={{ width: "24px", height: "24px" }}
							/>
						</Box>
						<Box
							sx={{
								display: "inline-block",
								alignItems: "center",
							}}
						>
							<DescriptionText
								sx={{
									fontWeight: "400",
									fontSize: "18px",
								}}
							>
								Expected Date
							</DescriptionText>

							<Typography
								sx={{
									padding: "4px",
									fontWeight: "800",
									fontSize: "22px",
								}}
							>
								{data.promise_date}
							</Typography>
						</Box>
					</BaseCard>
				</Grid>

				<Grid item md={3} sm={6} xs={12}>
					<BaseCard
						sx={{
							display: "flex",
							padding: "16px",
							backgroundColor: (theme) => theme.palette.grey[100],
						}}
					>
						<Box
							sx={{
								padding: "16px",
								marginRight: "8px",
								backgroundColor: "#FFFFFF",
								maxHeight: "60px",
								borderRadius: "11px",
							}}
						>
							<WalletIcon
								sx={{ width: "24px", height: "24px" }}
							/>
						</Box>
						<Box
							sx={{
								display: "inline-block",
								alignItems: "center",
							}}
						>
							<DescriptionText
								sx={{
									fontWeight: "400",
									fontSize: "18px",
								}}
							>
								Order Total
							</DescriptionText>

							<Typography
								sx={{
									padding: "4px",
									fontWeight: "800",
									fontSize: "22px",
								}}
							>
								{/* {data.currency || data.total_amount} */}
								{data.total_amount}
							</Typography>
						</Box>
					</BaseCard>
				</Grid>

				<Grid item md={3} sm={6} xs={12}>
					<BaseCard
						sx={{
							display: "flex",
							padding: "16px",
							backgroundColor: (theme) => theme.palette.grey[100],
						}}
					>
						<Box
							sx={{
								padding: "16px",
								marginRight: "8px",
								backgroundColor: "#FFFFFF",
								maxHeight: "60px",
								borderRadius: "11px",
							}}
						>
							<TagIcon sx={{ width: "24px", height: "24px" }} />
						</Box>
						<Box
							sx={{
								display: "inline-block",
								alignItems: "center",
							}}
						>
							<DescriptionText
								sx={{
									fontWeight: "400",
									fontSize: "18px",
								}}
							>
								Product Ordered
							</DescriptionText>

							<Typography
								sx={{
									padding: "4px",
									fontWeight: "800",
									fontSize: "22px",
								}}
							>
								{Array.isArray(data.products) &&
									data.products.length}
							</Typography>
						</Box>
					</BaseCard>
				</Grid>
			</Grid>

			<Divider variant="middle" />

			<Box pt={4}>
				<MuiBaseDataGrid
					rowIdkey={"item_id"}
					getRowId={(row) => row.item_id ?? row.master_item_id}
					data={productsData}
					columns={columnsData}
					checkboxSelection={false}
				/>
			</Box>
		</>
	);
}
