import AppLink from "components/Common/AppLink";
import CustomCircularProgress from "components/Common/Progress/CustomCircularProgress";
import CustomCircularProgressWithLabel from "components/Common/Progress/CustomCircularProgressWithLabel";
import MuiBaseDataGrid from "components/Common/Tables/MuiBaseDataGrid";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { PRODUCT } from "constants/API_URL";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import appFetch from "utils/appFetch";

const mapState = ({ productsData, user }) => ({
	productsData,
	currentUser: user.currentUser,
});

export default function JobsPageSections() {
	const { productsData, currentUser } = useSelector(mapState);
	const taskID = productsData.publishTaskID;
	const [tableData, setTableData] = useState([]);

	const handleFetchTaskList = () => {
		const URL = PRODUCT.FETCH_LIST_OF_TASKS;
		const data = {
			user_id: currentUser.merchant_id,
		};
		appFetch(URL, data).then((json) => {
			if (json.status === "success") {
				console.log(json);
				setTableData(json.result);
			}
		});
	};

	/**
	 * {
    "created_at": "2023-03-07T11:39:00.891682",
    
    "task_id": "2ae9f9f2-cfc3-4378-af34-80afbd1eaa83",
    "task_percentage": 62.5,
    "task_status": "progress",
    "task_type": "bulk_publish",
    "updated_at": "2023-03-07T11:39:42.383576",
    "user_id": "138944605333795140"
}
	 */
	useEffect(() => {
		handleFetchTaskList();
	}, []);

	console.log({ tableData });
	const formattedTableData =
		Array.isArray(tableData) &&
		tableData.map((item) => {
			const { updated_at } = item;
			const date = (updated_at && new Date(updated_at)) || "";
			const formattedDate =
				(updated_at && date && format(date, "dd/MM/yyyy HH:mm:ss")) ||
				"";
			return {
				...item,
				last_update: formattedDate,
			};
		});
	const columns = [
		{
			field: "task_id",
			headerName: "Job ID",
			flex: 1,
			renderCell: (params) => (
				<AppLink href={`/app/jobs/${params.value}`}>
					{params.value}
				</AppLink>
			),
		},
		{
			field: "task_type",
			headerName: "Job Type",
			flex: 1,
		},
		{
			field: "task_status",
			headerName: "Status",
			flex: 1,
		},
		{
			field: "task_percentage",
			headerName: "Percentage",
			flex: 1,
			renderCell: (params) => (
				<CustomCircularProgressWithLabel progress={params.value} />
			),
		},
		{
			field: "last_update",
			headerName: "Last Updated",
			flex: 1,
			// renderCell: (params) => (
			// 	<CustomCircularProgressWithLabel progress={params.value} />
			// ),
		},
	];
	return (
		<div>
			<SectionTitleText
				sx={{
					fontWeight: 700,
					fontSize: "28px",
					lineHeight: "34px",
					my: 2,
				}}
			>
				Jobs List
			</SectionTitleText>
			<MuiBaseDataGrid
				data={formattedTableData}
				columnDefData={columns}
				rowIdkey="task_id"
				checkboxSelection={false}
			/>
		</div>
	);
}
