import { PRODUCT } from "constants/API_URL";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TableSection from "sections/AppPageSections/CommonComponents/TableSection";
import appFetch from "utils/appFetch";
import lodash from "lodash";
import {
	Box,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	Typography,
} from "@mui/material";
import SectionLoader from "components/Common/LoadingIndicators/SectionLoader";
import MuiBaseDataGrid from "components/Common/Tables/MuiBaseDataGrid";

const mapState = ({ user }) => ({ currentUser: user.currentUser });
export default function ItemsTable({ itemsData }) {
	const [isLoading, setIsLoading] = useState(false);
	const { currentUser } = useSelector(mapState);
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const [tableData, setTableData] = useState([]);
	const handleFetchItemsData = () => {
		const URL = PRODUCT.MERCHANT.FETCH_ITEM_LEVEL_INVENTORY;
		const data = {
			items: itemsData,
			user_id: currentUser.merchant_id,
		};
		setIsLoading(true);
		appFetch(URL, data).then((json) => {
			setIsLoading(false);
			console.log({ tableData: json });
			setTableData(json.result);
		});
	};
	useEffect(() => {
		handleFetchItemsData();
	}, []);
	const formatTableData =
		Array.isArray(tableData) &&
		tableData.map((item) => {
			const {
				item_desc,
				item_title,
				master_item_id,
				total_qty,
				warehouse,
			} = item;
			const getWarehouseList =
				Array.isArray(warehouse) &&
				warehouse.map((it) => {
					const { qty, wh_name } = it;
					return { wh_name, qty };
				});
			const groupBy = lodash.groupBy(getWarehouseList, "wh_name");
			const mapGroupBy = Object.values(groupBy)
				.map((item) => {
					const it = item.map((i) => {
						return { [i.wh_name]: i.qty };
					});

					return it;
				})
				.flat();
			return {
				"Item Title": item_title,
				"Total Qty": total_qty,
				mapGroupBy,
			};
		});
	const data = formatTableData;
	const getHeaderData =
		Array.isArray(data) &&
		data.length > 0 &&
		data
			.map((item) => {
				const { mapGroupBy } = item;
				const mappedGroups = mapGroupBy.map((i) => {
					const obj = Object.keys(i).map((ob) => ob);
					return obj;
				});
				return mappedGroups;
			})
			.flat();

	const flatHeaderData = Array.isArray(getHeaderData) && getHeaderData.flat();
	const getUniq = lodash.uniq(flatHeaderData);
	// const getColumnTitles =
	// 	Object.keys(getHeaderData[0]) &&
	// 	Object.keys(getHeaderData[0]).map((item) => item);
	console.log({ getUniq, flatHeaderData });
	const valData = data.map((item) => {
		const cellVal = getUniq.map((it) => {
			const cell = item.mapGroupBy.map((i) => {
				return i[it];
			});
			return cell;
		});
		return cellVal;
	});
	console.log({
		formatTableData,
		getHeaderData,
		flatHeaderData,
		getUniq,
		valData,
	});

	return (
		<>
			<Box sx={{ minWidth: "600px" }}>
				<Typography
					sx={{
						fontSize: "18px",
						fontWeight: "700",
						mb: "12px",
						ml: "5px",
					}}
				>
					Items
				</Typography>
				<MuiBaseDataGrid
					data={formatTableData}
					rowIdkey={"Item Title"}
					// columnDefData={columns}
					containerStyles={{
						height: "450px",
					}}
					checkboxSelection={false}
					loading={isLoading}
				/>
			</Box>
		</>
	);
	// return (
	// 	<div>
	// 		<>
	// 			{isLoading && <SectionLoader />}
	// 			{!isLoading && (
	// 				<>
	// 					<Typography
	// 						sx={{
	// 							fontSize: "18px",
	// 							fontWeight: "700",
	// 							mb: "12px",
	// 							ml: "5px",
	// 						}}
	// 					>
	// 						Items
	// 					</Typography>
	// 					<TableContainer>
	// 						<Table
	// 							sx={{
	// 								textAlign: "center",
	// 								borderTop: "1px solid #E0E0E0",
	// 							}}
	// 						>
	// 							<TableHead>
	// 								<TableRow
	// 									sx={{
	// 										backgroundColor: "#f5f5f5",
	// 									}}
	// 								>
	// 									<TableCell
	// 										sx={{
	// 											minWidth: "200",
	// 											fontWeight: 700,
	// 											textAlign: "left",
	// 										}}
	// 									>
	// 										Item Title
	// 									</TableCell>

	// 									{getUniq.map((item, index) => (
	// 										<TableCell
	// 											key={index}
	// 											sx={{
	// 												minWidth: "200",
	// 												fontWeight: 700,
	// 												textAlign: "left",
	// 											}}
	// 										>
	// 											{item}
	// 										</TableCell>
	// 									))}
	// 									<TableCell
	// 										sx={{
	// 											minWidth: "200",
	// 											fontWeight: 700,
	// 											textAlign: "left",
	// 										}}
	// 									>
	// 										Total
	// 									</TableCell>
	// 								</TableRow>
	// 							</TableHead>
	// 							<TableBody>
	// 								{/* Map the data list to get rows */}
	// 								{data
	// 									.slice(
	// 										page * rowsPerPage,
	// 										page * rowsPerPage + rowsPerPage,
	// 									)

	// 									.map((item, index) => {
	// 										return (
	// 											<TableRow key={index}>
	// 												{/* Add the item title cell */}
	// 												<TableCell
	// 													sx={{
	// 														fontWeight: 600,
	// 														textAlign: "left",
	// 													}}
	// 												>
	// 													{item["Item Title"]}
	// 												</TableCell>
	// 												{/* get cells based on row headers */}
	// 												{getUniq.map((it, id) => {
	// 													// get cell values
	// 													const getCell =
	// 														item.mapGroupBy.map(
	// 															(uniq) => {
	// 																if (
	// 																	uniq[it]
	// 																)
	// 																	return uniq[
	// 																		it
	// 																	];
	// 																// return "-";
	// 															},
	// 														);
	// 													// console.log({ getCell });
	// 													if (getCell)
	// 														return (
	// 															<TableCell
	// 																key={id}
	// 																sx={{
	// 																	fontWeight: 600,
	// 																	textAlign:
	// 																		"left",
	// 																}}
	// 															>
	// 																{getCell ||
	// 																	"-"}
	// 															</TableCell>
	// 														);
	// 												})}
	// 												<TableCell
	// 													sx={{
	// 														fontWeight: 600,
	// 														textAlign: "left",
	// 													}}
	// 												>
	// 													{item["Total Qty"]}
	// 												</TableCell>
	// 											</TableRow>
	// 										);
	// 									})}
	// 							</TableBody>
	// 						</Table>
	// 					</TableContainer>
	// 					{/* <TablePagination
	// 			rowsPerPageOptions={[5, 10, 25, 100]}
	// 			component="div"
	// 			count={data.length}
	// 			rowsPerPage={rowsPerPage}
	// 			page={page}
	// 			onPageChange={handleChangePage}
	// 			onRowsPerPageChange={handleChangeRowsPerPage}
	// 		/> */}
	// 				</>
	// 			)}
	// 		</>
	// 	</div>
	// );
}
/**
 * [
    {
        "item_desc": "",
        "item_title": "Default Title",
        "master_item_id": "44320351355162",
        "total_qty": 4407,
        "warehouse": [
            {
                "qty": 1000,
                "wh_id": "77204914458",
                "wh_name": "International Warehouse 1"
            },
            {
                "qty": 1007,
                "wh_id": "75970904346",
                "wh_name": "Delhi Cantonment"
            },
            {
                "qty": 2000,
                "wh_id": "77204750618",
                "wh_name": "Warehouse 2"
            },
            {
                "qty": 200,
                "wh_id": "77204816154",
                "wh_name": "Warehouse 3"
            },
            {
                "qty": 200,
                "wh_id": "77204848922",
                "wh_name": "warehouse 4"
            }
        ]
    },
   
]
 */
let d = [
	{
		Item: "M/Black",
		"Warehouse 1": 100,
		"Warehouse 2": 200,
		"Warehouse 3": 300,
		"Warehouse 4": 500,
		Total: "1100",
	},
	{
		Item: "",
		"": "",
		"Warehouse 2": "",
		"Warehouse 3": "",
		"Warehouse 4": "Total",
		Total: "5500",
	},
];
