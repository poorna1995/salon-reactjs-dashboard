import { IconButton, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import AppLink from "components/Common/AppLink";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import EditIcon from "components/Common/Icons/EditIcon";
import MuiBaseDataGrid from "components/Common/Tables/MuiBaseDataGrid";
import RouterTabs from "components/Common/Tabs/RouterTabs";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import CircleIcon from "@mui/icons-material/Circle";
import { PURCHASE_ORDER } from "constants/API_URL";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AppPageSections from "sections/AppPageSections";
import appFetch from "utils/appFetch";

const mapState = ({ user }) => ({
	currentUser: user.currentUser,
});
const newDate = new Date();
const getTimeinMiliseconds = newDate.getTime();
export default function PurchaseOrderPageSections() {
	const router = useRouter();
	const { currentUser } = useSelector(mapState);
	const [data, setData] = useState([]);
	const handleFetchProducts = () => {
		// setIsLoading(true);
		const url = PURCHASE_ORDER.FETCH_PURCHASE_ORDERS;
		const data = {
			user_id: currentUser.merchant_id,
		};
		appFetch(url, data)
			.then((json) => {
				// setIsLoading(false);
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

	const capitalizeFirstLetter = (string) => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	};

	// const productsData =
	//   Array.isArray(data.products) &&
	//   data.products.map((item, index) => {
	//     return {
	//       ...item,
	//       index: index + 1,
	//     };
	//   });

	const createdAtDate = data && data.created_at && new Date(data.created_at);
	const formattedCreatedAtDate =
		createdAtDate && format(createdAtDate, "MMMM dd, yyyy");

	const tableData = [
		{
			id: 1,
			poNumber: "PO-0001",
			vendor: "Levi's Factory outlet",
			products: 192,
			dateCreated: "March 22, 2023",
			expectedDate: "July 22, 2023",
			status: "Delivered",
			total: "$37,000",
		},
		{
			id: 2,
			poNumber: "PO-0001",
			vendor: "Levi's Factory outlet",
			products: 192,
			dateCreated: "March 22, 2023",
			expectedDate: "July 22, 2023",
			status: "Delivered",
			total: "$37,000",
		},
		{
			id: 3,
			poNumber: "PO-0001",
			vendor: "Levi's Factory outlet",
			products: 192,
			dateCreated: "March 22, 2023",
			expectedDate: "July 22, 2023",
			status: "Delivered",
			total: "$37,000",
		},
		{
			id: 4,
			poNumber: "PO-0001",
			vendor: "Levi's Factory outlet",
			products: 192,
			dateCreated: "March 22, 2023",
			expectedDate: "July 22, 2023",
			status: "Delivered",
			total: "$37,000",
		},
		{
			id: 5,
			poNumber: "PO-0001",
			vendor: "Levi's Factory outlet",
			products: 192,
			dateCreated: "March 22, 2023",
			expectedDate: "July 22, 2023",
			status: "Delivered",
			total: "$37,000",
		},
		{
			id: 6,
			poNumber: "PO-0001",
			vendor: "Levi's Factory outlet",
			products: 192,
			dateCreated: "March 22, 2023",
			expectedDate: "July 22, 2023",
			status: "Delivered",
			total: "$37,000",
		},
		{
			id: 7,
			poNumber: "PO-0001",
			vendor: "Levi's Factory outlet",
			products: 192,
			dateCreated: "March 22, 2023",
			expectedDate: "July 22, 2023",
			status: "Delivered",
			total: "$37,000",
		},
		{
			id: 8,
			poNumber: "PO-0001",
			vendor: "Levi's Factory outlet",
			products: 192,
			dateCreated: "March 22, 2023",
			expectedDate: "July 22, 2023",
			status: "Delivered",
			total: "$37,000",
		},
		{
			id: 9,
			poNumber: "PO-0001",
			vendor: "Levi's Factory outlet",
			products: 192,
			dateCreated: "March 22, 2023",
			expectedDate: "July 22, 2023",
			status: "Delivered",
			total: "$37,000",
		},
		{
			id: 10,
			poNumber: "PO-0001",
			vendor: "Levi's Factory outlet",
			products: 192,
			dateCreated: "March 22, 2023",
			expectedDate: "July 22, 2023",
			status: "Delivered",
			total: "$37,000",
		},
	];

	const columnsData = [
		// {
		//   field: "id",
		//   headerName: "ID",
		//   flex: 0.1,
		// },

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

		// {
		//   // To add a serial number in the table
		//   field: "S.No",
		//   headerName: "S.No",
		//   renderCell: (index) => {
		//     return <>{index + 1}</> ;
		//   },
		// },
		{
			field: "po_id",
			headerName: "PO#",
			renderCell: (params) => (
				<Box>
					<AppLink
						sx={{}}
						href={`/app/purchase-orders/${params.value}`}
					>
						{params.value}
					</AppLink>
				</Box>
			),
			minWidth: 150,
		},
		{
			field: "vendor_id",
			headerName: "Vendor",
			minWidth: 200,
			flex: 0.5,
		},
		{
			field: "product_title",
			headerName: "Products",
			minWidth: 200,
		},
		{
			field: "created_at",
			headerName: "Date Created",
			// renderCell: (params) => (
			//   <Box>
			//       {formattedCreatedAtDate}
			//   </Box>
			// ),
			minWidth: 250,
			// headerAlign: "center",
		},
		{
			field: "promise_date",
			headerName: "Expected Date",
			minWidth: 250,
			// headerAlign: "center",
		},
		{
			field: "status",
			headerName: "Status",
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
								}}
							>
								{capitalizeFirstLetter(params.value)}
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
								}}
							>
								{capitalizeFirstLetter(params.value)}
							</Typography>
						</Box>
					)}
				</div>
			),
			width: 200,
			align: "center",
			valueGetter: ({ value }) => value,
			headerAlign: "center",
		},
		{
			field: "total_amount",
			headerName: "Total",
			// renderCell: (params) => <span>$ {params.value}</span>,
			renderCell: (params) => (
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<Box>
						<Typography>$ {params.value}</Typography>
					</Box>
					<Box sx={{ ml: 10 }}>
						<Tooltip title="Edit product">
							<IconButton
								onClick={() =>
									router.push(
										`/app/purchase-orders/${params.row.po_id}/edit`,
									)
								}
							>
								<EditIcon />
							</IconButton>
						</Tooltip>
					</Box>
				</Box>
			),
			flex: 0.5,
			maxWidth: 250,
		},
	];

	const tabsData = [
		{
			label: `All `,
			component: (
				<div>
					<div
						style={{
							display: "flex",
							justifyContent: "flex-end",
							paddingBottom: "8px",
						}}
					>
						<MuiBaseDataGrid
							rowIdkey={"po_id"}
							data={data}
							columns={columnsData}
							checkboxSelection={false}
						/>
					</div>
				</div>
			),
			route: "all",
		},
		{
			label: `Active`,
			component: (
				<div>
					<div
						style={{
							display: "flex",
							justifyContent: "flex-end",
							paddingBottom: "8px",
						}}
					>
						<MuiBaseDataGrid
							rowIdkey={"po_id"}
							data={data}
							columns={columnsData}
							checkboxSelection={false}
						/>
					</div>
				</div>
			),
			route: "active",
		},
		{
			label: `Partially Received`,
			component: (
				<div>
					<div
						style={{
							display: "flex",
							justifyContent: "flex-end",
							paddingBottom: "8px",
						}}
					>
						<MuiBaseDataGrid
							rowIdkey={"po_id"}
							data={data}
							columns={columnsData}
							checkboxSelection={false}
						/>
					</div>
				</div>
			),
			route: "partially-received",
		},
		{
			label: `Received`,
			component: (
				<div>
					<div
						style={{
							display: "flex",
							justifyContent: "flex-end",
							paddingBottom: "8px",
						}}
					>
						<MuiBaseDataGrid
							rowIdkey={"po_id"}
							data={data}
							columns={columnsData}
							checkboxSelection={false}
						/>
					</div>
				</div>
			),
			route: "received",
		},
		{
			label: `Completed`,
			component: (
				<div>
					<div
						style={{
							display: "flex",
							justifyContent: "flex-end",
							paddingBottom: "8px",
						}}
					>
						<MuiBaseDataGrid
							rowIdkey={"po_id"}
							data={data}
							columns={columnsData}
							checkboxSelection={false}
						/>
					</div>
				</div>
			),
			route: "completed",
		},
		{
			label: `Archived`,
			component: (
				<div>
					<div
						style={{
							display: "flex",
							justifyContent: "flex-end",
							paddingBottom: "8px",
						}}
					>
						<MuiBaseDataGrid
							rowIdkey={"po_id"}
							data={data}
							columns={columnsData}
							checkboxSelection={false}
						/>
					</div>
				</div>
			),
			route: "archived",
		},
	];
	const handleClickCreateButton = () => {
		const URL = PURCHASE_ORDER.CREATE_PURCHASE_ORDER_ID;
		const data = {
			user_id: currentUser.merchant_id,
		};

		appFetch(URL, data)
			.then((json) => {
				if (json.status === "success") {
					router.push(
						`/onboarding/purchase-orders/${json.po_id}?step=po-details&id=0`,
					);
				}
			})
			.catch((err) => console.log(err));
	};

	return (
		<>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					pb: 2,
				}}
			>
				<SectionTitleText
					sx={{
						fontWeight: "700",
						fontSize: "28px",
					}}
				>
					Purchase Order
				</SectionTitleText>
				<PrimaryButton
					// main_route
					onClick={() => handleClickCreateButton()}
				>
					Create Purchase Order
				</PrimaryButton>
			</Box>
			<RouterTabs data={tabsData} basePath="/app/purchase-orders" />
		</>
	);
}
