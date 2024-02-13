import { Box, Typography } from "@mui/material";
import { PRODUCT } from "constants/API_URL";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TableSection from "sections/AppPageSections/CommonComponents/TableSection";
import appFetch from "utils/appFetch";

import SectionLoader from "components/Common/LoadingIndicators/SectionLoader";
import MuiBaseDataGrid from "components/Common/Tables/MuiBaseDataGrid";
const mapState = ({ user }) => ({
	currentUser: user.currentUser,
});
export default function WarehouseTable({ warehouseData }) {
	const [isLoading, setIsLoading] = useState(false);
	const { currentUser } = useSelector(mapState);
	const [warehouseInventoryData, setWarehouseInventoryData] = useState([]);
	const handleFetchWarehouseData = () => {
		const url = PRODUCT.MERCHANT.FETCH_WAREHOUSE_LEVEL_INVENTORY;
		const data = {
			warehouse: warehouseData,
			user_id: currentUser.merchant_id,
		};
		setIsLoading(true);
		appFetch(url, data)
			.then((json) => {
				setIsLoading(false);
				setWarehouseInventoryData(json.result);
			})
			.catch((err) => console.error(err));
	};
	useEffect(() => {
		handleFetchWarehouseData();
	}, []);
	console.log({ warehouseInventoryData });
	const formattedTableData =
		Array.isArray(warehouseInventoryData) &&
		warehouseInventoryData.map((item) => {
			const { items_count, total_qty, wh_id, wh_name } = item;
			return {
				Warehouse: wh_name || "",
				"Total qty": total_qty,
				"# Items": `${items_count} items`,
			};
		});

	const columns = [
		{
			field: "Warehouse",
			headerName: "Warehouse",
			width: 260,
			sortable: false,
		},
		{
			field: "Total qty",
			headerName: "Total qty",
			width: 180,
			sortable: false,
		},
		{
			field: "# Items",
			headerName: "# Items",
			width: 160,
			sortable: false,
		},
	];

	return (
		<>
			{/* {isLoading && <SectionLoader />} */}
			{
				// !isLoading
				<>
					<Box sx={{ minWidth: "600px", maxWidth: "600px" }}>
						{" "}
						<Typography
							sx={{
								fontSize: "18px",
								fontWeight: "700",
								mb: "12px",
							}}
						>
							Warehouse
						</Typography>
						{/* {Array.isArray(formattedTableData) &&
							formattedTableData.length > 0 && ( */}
						<MuiBaseDataGrid
							sx={{ borderBottom: "none" }}
							data={formattedTableData}
							rowIdkey={"Warehouse"}
							columnDefData={columns}
							containerStyles={{
								height: "450px",
								"& .MuiDataGrid-columnHeader": {
									backgroundColor: "#F9FAFB",
								},
								"& .MuiDataGrid-columnHeaderTitle": {
									fontWeight: "700",

									// fontSize:"16px"
								},

								"& .MuiDataGrid-cell": {
									fontSize: "14px",
									fontWeight: "500",
									
								},
							}}
							checkboxSelection={false}
							loading={isLoading}
							// hideFooter={true}
						/>
						{/* )} */}
					</Box>
				</>
			}
		</>
	);
}

const d = [
	{
		warehouse: "warehouse 1",
		"Total quantity": 1000,
		"#Items": "3 Items",
	},
	{
		warehouse: "warehouse 1",
		"Total quantity": 1000,
		"#Items": "3 Items",
	},
	{
		warehouse: "warehouse 1",
		"Total quantity": 1000,
		"#Items": "3 Items",
	},
];
