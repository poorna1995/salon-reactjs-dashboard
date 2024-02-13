import {
	Box,
	LinearProgress,
	Pagination,
	PaginationItem,
	Typography,
} from "@mui/material";
import {
	DataGrid,
	useGridApiContext,
	useGridSelector,
	gridPageCountSelector,
	gridPageSelector,
} from "@mui/x-data-grid";
import React from "react";
import lodash from "lodash";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

let columnTYPE = {
	id: "",
	fieldName: "",
	headerName: "",
	renderCell: () => "item",
};

function CustomPagination({ count, ...props }) {
	const apiRef = useGridApiContext();
	const page = useGridSelector(apiRef, gridPageSelector);
	const pageCount = useGridSelector(apiRef, gridPageCountSelector);
	// console.log({
	// 	page,
	// 	pageCount,
	// 	apiRef,
	// 	gridPageSelector,
	// 	gridPageCountSelector,
	// 	// pageRows: apiRef.current.get,
	// });
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "space-between",
				width: "100%",
				alignItems: "center",
				flex: 1,
			}}
		>
			{/* {count > 15 && (
				<Typography
					sx={{
						ml: "24px",
						color: "#667085",
						fontWeight: "500",
						fontSize: "14px",
						lineHeight: "20px",
					}}
				>
					Showing 15 products of {count}
				</Typography>
			)}{" "} */}
			<div style={{ flex: 1 }} />
			{
				<Box>
					{/* <Pagination
						sx={{
							justifySelf: "flex-end",
						}}
						color="primary"
						count={pageCount}
						page={page + 1}
						onChange={(event, value) =>
							apiRef.current.setPage(value - 1)
						}
					/>  */}
					<Pagination
						count={pageCount}
						variant="outlined"
						shape="rounded"
						onChange={(event, value) =>
							apiRef.current.setPage(value - 1)
						}
						renderItem={(item) => (
							<PaginationItem
								slots={{
									previous: MdArrowBack,
									next: MdArrowForward,
								}}
								{...item}
							/>
						)}
					/>
				</Box>
			}
		</div>
	);
}
export default function MuiBaseDataGrid({
	data = [],
	rowIdkey,
	columnDefData = [],
	containerStyles = {},
	...props
}) {
	const getColumns =
		Array.isArray(columnDefData) &&
		columnDefData.length > 0 &&
		columnDefData;
	const columnData =
		Array.isArray(data) &&
		data
			.map((item) => {
				const getKeys = Object.keys(item).map((it) => it);
				return getKeys;
			})
			.flat();
	const uniqHeadings = lodash.uniq(columnData);
	const headingsWithLabel = uniqHeadings.map((item) => {
		return {
			field: item,
			headerName: item,
			width: 200,
		};
	});

	const rowData =
		Array.isArray(data) &&
		data.map((item) => {
			return {
				...item,
				id: item[rowIdkey],
			};
		});
	// console.log({ uniqHeadings });
	const maxHeight = typeof window !== "undefined" && window.innerHeight - 160;

	let colData = getColumns.length > 0 ? getColumns : headingsWithLabel;
	let newColData =
		Array.isArray(colData) &&
		colData.map((item) => {
			return {
				...item,
				// headerClassName: "dataGridHeaderRow",
				// headerAlign: 'center',
			};
		});
	return (
		<Box
			sx={{
				height: maxHeight,
				width: "100%",
				backgroundColor: "white",

				"& .MuiDataGrid-root": {
					borderRight: "none",
					borderLeft: "none",
					borderTop: "none",
				},
				...containerStyles,
			}}
		>
			<DataGrid
				rowHeight={65}
				components={{
					LoadingOverlay: LinearProgress,
					Pagination: (props) => {
						return (
							<CustomPagination
								count={rowData.length}
								{...props}
							/>
						);
					},
				}}
				sx={{
					"& .MuiDataGrid-columnHeaderTitle": {
						fontWeight: "700",

						// fontSize:"16px"
					},

					"& .MuiDataGrid-columnHeader": {
						backgroundColor: "#F9FAFB",
					},

					// "& .MuiDataGrid-cell:not(.MuiBox-root css-70qvj9)": {
					// 	justifyContent: "center",
					// },
				}}
				rows={rowData}
				columns={newColData}
				autoPageSize
				// pageSize={15}
				// rowsPerPageOptions={[5, 15, 25]}
				checkboxSelection
				disableSelectionOnClick
				
				experimentalFeatures={{ newEditingApi: true }}
				// hideFooter={rowData.length < 6}
				{...props}

			/>
		</Box>
	);
}
