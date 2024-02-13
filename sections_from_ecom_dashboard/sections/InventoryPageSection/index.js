import { Box, Pagination, Tooltip, Typography } from "@mui/material";
import { PRODUCT } from "constants/API_URL";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AppPageSections from "sections/AppPageSections";
import imageList1 from "public/assets/imageList1.png";
import TableCellAppLink from "sections/AppPageSections/CommonComponents/TableCellAppLink";
import appFetch from "utils/appFetch";
import lodash from "lodash";
import LinkButton from "components/Common/Buttons/LinkButton";
import WarehouseTableDialog from "sections/AppPageSections/CommonComponents/WarehouseTableDialog";
import WarehouseTable from "./WarehouseTable";
import ItemsTable from "./ItemsTable";
import AppLink from "components/Common/AppLink";
import AppImage from "components/Common/AppImage";
import SectionLoader from "components/Common/LoadingIndicators/SectionLoader";
import MuiBaseDataGrid from "components/Common/Tables/MuiBaseDataGrid";
const mapState = ({ user }) => ({
	currentUser: user.currentUser,
});
export default function InventoryPageSection() {
	const { currentUser } = useSelector(mapState);
	const [inventoryData, setInventoryData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [openWarehouseDialog, setOpenWarehouseDialog] = useState(false);
	const [openItemsDialog, setOpenItemsDialog] = useState(false);
	const [warehouseData, setWarehouseData] = useState([]);
	const [itemsDialogData, setItemsDialogData] = useState([]);

	const handleFetchInventoryData = () => {
		const url = PRODUCT.MERCHANT.FETCH_PRODUCT_LEVEL_INVENTORY;
		// `https://ecom.hivepath.io/api/merchant/productlevelagg`;
		//  PRODUCT.MERCHANT.FETCH_INVENTORY_PRODUCT;

		const data = {
			user_id: currentUser.merchant_id,
		};
		setIsLoading(true);
		appFetch(url, data)
			.then((json) => {
				setIsLoading(false);
				setInventoryData(json.result);
			})
			.catch((err) => console.log(err));
	};
	useEffect(() => {
		handleFetchInventoryData();
	}, []);

	const groupByMasterProductId = lodash.groupBy(
		inventoryData,
		"master_product_id",
	);
	const groupByInventoryItemId = lodash.groupBy(
		inventoryData,
		"inventory_item_id",
	);
	const getSumOfItems = Object.entries(groupByMasterProductId).map(
		([key, value]) => {
			const getItemSum = lodash.sumBy(value, "available");
			return {
				"Master Product Id": key,
				"Total Qty available": getItemSum,
			};
		},
	);
	console.log({
		groupByMasterProductId,
		groupByInventoryItemId,
		getSumOfItems,
	});

	const handleOpenWarehouseDialog = (data) => {
		setOpenWarehouseDialog(true);
		setWarehouseData(data);
	};
	const handleCloseWarehouseDialog = () => {
		setOpenWarehouseDialog(false);
		setWarehouseData([]);
	};
	const handleOpenItemsDialog = (data) => {
		setOpenItemsDialog(true);
		setItemsDialogData(data);
	};
	const handleCloseItemsDialog = () => {
		setOpenItemsDialog(false);
		setItemsDialogData([]);
	};

	const formattedInventoryData =
		Array.isArray(inventoryData) &&
		inventoryData.length > 0 &&
		inventoryData.map((item) => {
			const {
				display_image,
				master_product_id,

				product_title,
				warehouse_count,
				items,
				total_qty,
				warehouse,
				items_count,
			} = item;

			return {
				...item,
				Product: display_image,
				// "Master Item Id": master_item_id,
				// "Master Product Id": (
				// 	<TableCellAppLink
				// 		href={`/app/products/${master_product_id}`}
				// 	>
				// 		{master_product_id}
				// 	</TableCellAppLink>
				// ),
				"Master Product Id": master_product_id,
				// Image: <AppImage src={display_image} height="60" width="60" />,
				"Product Title":
					// <Typography sx={{ fontSize: "14px"}}>
					// 	<TableCellAppLink
					// 		href={`/app/products/${master_product_id}`}
					// 	>
					// 		{product_title}
					// 	</TableCellAppLink>
					// </Typography>
					product_title,

				// "Item Title": item_title,
				// Status: status,
				// "Unit Retail Price": unit_retail_price,

				"Total QTY available": total_qty,
				// channel_id,
				// "Inventory Item Id": inventory_item_id,
				// "Warehouse name": wh_name,
				"# Warehouses": (
					<LinkButton
						fullwidth
						sx={{ minWidth: "120px" }}
						onClick={() => handleOpenWarehouseDialog(warehouse)}
					>
						{warehouse_count} Warehouses
					</LinkButton>
				),
				"# Items": (
					<LinkButton onClick={() => handleOpenItemsDialog(items)}>
						{items_count} Items
					</LinkButton>
				),
			};
		});
	function getStr1(str) {
		return str.length > 40 ? str.slice(0, 60) + ".." : str;
	}
	const inventoryTableColumnData = [
		{
			field: "Product Title",
			// headerName: <span style={{
			// 	marginLeft: "64px",
			// }}>Product</span>,
			headerName: "Product",
			// headerClassName:'productHeaderMargin',
			renderCell: (params) => (
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						cursor: "pointer",
					}}
					// onClick={() =>
					// 	router.push(
					// 		`/app/products/${params.row.master_product_id}?tab=overview`,
					// 	)
					// }
				>
					<AppImage
						// sx prop to fit app image to a definite size
						sx={{ objectFit: "cover", borderRadius: "5px" }}
						width="45"
						height="45"
						src={params.row.display_image || imageList1}
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
									{/* {params.row["Product Title"]} */}
								</span>
							</Tooltip>
						</>
						{/* {params.row["Product Title"]} */}
					</Typography>
				</Box>
			),
			minWidth: 400,
			flex: 1,
			// headerAlign: "center",
			valueGetter: ({ value }) => value,
			sortable: false,
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
				// <AppLink sx={{ fontWeight: "500", marginLeft: "16px" }} href="">
				// 	{params.value}
				// </AppLink>
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
					{params.value}
				</Typography>
			),
			width: 220,
			align: "center",
			headerAlign: "center",
			valueGetter: ({ value }) => value,
			sortable: false,
		},
		{
			field: "Total QTY available",
			headerName: "Total QTY available",
			// renderCell: () => "Master Product Id",
			width: 220,
			headerAlign: "center",
			align: "center",
			valueGetter: (params) => params.row["Total QTY available"],
			sortable: false,
		},
		{
			field: "# Warehouses",
			headerName: "Warehouses",
			renderCell: (params) => (
				<LinkButton

				// onClick={() =>
				// 	handleOpenWarehouseDialog(params.row["# Warehouses"])
				// }
				>
					{params.row["# Warehouses"]}
				</LinkButton>
			),
			width: 220,
			headerAlign: "center",
			align: "center",
			valueGetter: (params) => params.row["# Warehouses"],
			sortable: false,
		},
		{
			field: "# Items",
			headerName: "Items",
			renderCell: (params) => <LinkButton>{params.value}</LinkButton>,
			width: 220,
			headerAlign: "center",
			align: "center",
			valueGetter: ({ value }) => value,
			sortable: false,
		},
	];

	console.log({ formattedInventoryData });
	return (
		<div>
			{isLoading && <SectionLoader />}
			{!isLoading && (
				<>
					{Array.isArray(formattedInventoryData) && (
						<>
							{/* {formattedInventoryData.length}
					{inventoryData.length} */}
							<AppPageSections
								title={"Inventory"}
								views={["list"]}
								pageView
								tableData={formattedInventoryData}
								rowIdkey={"master_product_id"}
								columnData={inventoryTableColumnData}
							/>
						</>
					)}



					<WarehouseTableDialog
						open={openWarehouseDialog}
						handleClose={() => handleCloseWarehouseDialog()}
					>
						 <WarehouseTable warehouseData={warehouseData} /> 
						{/* <MuiBaseDataGrid data={warehouseData} 
						rowIdkey={"warehouse_id"}

						/> */}
					</WarehouseTableDialog>


					<WarehouseTableDialog
						open={openItemsDialog}
						handleClose={() => handleCloseItemsDialog()}
					>
						<ItemsTable itemsData={itemsDialogData} />
					</WarehouseTableDialog>
				
				</>
			)}
		</div>
	);
}
