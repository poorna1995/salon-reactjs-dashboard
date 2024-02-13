import { Box, Grid, Typography } from "@mui/material";
import BaseCard from "components/Common/Cards/BaseCard";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { ADDRESS, WAREHOUSE } from "constants/API_URL";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setWarehousePageView } from "redux/views/viewsSlice";
import AppPageSections from "sections/AppPageSections";
import appFetch from "utils/appFetch";
import TableCellAppLink from "sections/AppPageSections/CommonComponents/TableCellAppLink";
import MuiBaseDataGrid from "components/Common/Tables/MuiBaseDataGrid";
import AppLink from "components/Common/AppLink";
import LinkButton from "components/Common/Buttons/LinkButton";
import LocationIcon from "components/Common/Icons/LocationIcon";
import EditIcon from "components/Common/Icons/WarehouseIcon/EditIcon";
import DeleteIcon from "components/Common/Icons//WarehouseIcon/DeleteIcon";
import IconButtonWithTooltip from "components/Common/Buttons/IconButtonWithTooltip";
const mapState = ({ views, user }) => ({
	pageView: views.warehousePageView,
	currentUser: user.currentUser,
});
export default function WarehousePageSection() {
	const dispatch = useDispatch();
	const { pageView, currentUser } = useSelector(mapState);
	const [isLoading, setIsLoading] = useState(false);
	const [warehouseList, setWarehouseList] = useState("");
	const handleChangeView = (value) => {
		dispatch(setWarehousePageView(value));
	};
	const handleFetchWarehouseList = () => {
		setIsLoading(true);
		const url = WAREHOUSE.FETCH_WAREHOUSE;
		const data = {
			user_id: currentUser.merchant_id,
		};
		appFetch(url, data)
			.then((json) => {
				console.log(json);
				setIsLoading(false);
				setWarehouseList(json.result);
			})
			.catch((error) => console.error(error));
	};
	const handleFetchAddress = async (address_id) => {
		const URL = ADDRESS.FETCH;
		const data = { address_id };
		const ans = await appFetch(URL, data).then((json) => json.result);

		return ans;
	};
	useEffect(() => {
		handleFetchWarehouseList();
	}, []);

	// const getAddress =
	// 	Array.isArray(warehouseList) &&
	// 	warehouseList.map((item) => {
	// 		const { address_id } = item;
	// 		const address = handleFetchAddress(address_id);
	// 		return {
	// 			...item,
	// 			address,
	// 		};
	// 	});
	// console.log({ getAddress });

	const MapComponent = () => {
		return (
			<Grid
				container
				spacing={4}
				sx={{ position: "sticky", top: "80px" }}
			>
				<Grid item md={6} sx={{}}>
					{Array.isArray(warehouseList) &&
						warehouseList.map((item, index) => {
							return (
								<Box
									key={index}
									sx={{
										p: "16px",
										// my: "16px",
										mb: "16px",
										border: "1px solid #E4E7EC",
										borderRadius: "10px",
										display: "flex",
									}}
								>
									<Grid item xs={1}>
										<LocationIcon />
									</Grid>

									<Grid item xs={10} sx={{ ml: "16px" }}>
										<SectionTitleText
											sx={{
												fontSize: "18px",
												mt: "-6px",
											}}
										>
											{item.wh_name}
										</SectionTitleText>
										<DescriptionText>
											{item.address_id}
										</DescriptionText>
									</Grid>

									<Box
										sx={{
											display: "flex",
										}}
									>
										<IconButtonWithTooltip
											icon={<EditIcon />}
											title={"Edit"}
										/>

										<IconButtonWithTooltip
											icon={<DeleteIcon />}
											title={"Edit"}
										/>
									</Box>
								</Box>
							);
						})}
				</Grid>
				<Grid item md={6} sx={{ position: "sticky", top: "80px" }}>
					<iframe
						title="My Location Map"
						style={{ width: "100%", height: "400px" }}
						src="https://www.google.com/maps/embed/v1/place?
	&q=D+Car+Serve,Subhash+Road,Rohtak+Haryana"
						allowFullScreen
					></iframe>
				</Grid>{" "}
			</Grid>
		);
	};

	const warehouseDataList =
		Array.isArray(warehouseList) &&
		warehouseList.map((item) => {
			const {
				address_id,
				channel_id,
				end_date,
				operator_id,
				start_date,
				user_id,
				wh_id,
				wh_name,
			} = item;
			const newStartDate = new Date(start_date);
			// const formattedStartDate = format(newStartDate, "dd/MM/yyyy");
			// const newEndDate = end_date && new Date(end_date);
			// const formattedEndDate =
			// 	newEndDate && format(newEndDate, "dd/MM/yyyy");

			return {
				"Address ID": address_id,
				"Channel ID": channel_id,
				"Warehouse Name": wh_name,
				"Warehouse ID": (
					<TableCellAppLink href={`/app/warehouse/${wh_id}`}>
						{wh_id}
					</TableCellAppLink>
				),
				// "Start Date": formattedStartDate,
				// "End Date": formattedEndDate,
				"Operator Id": operator_id,
			};
		});

	const WarehouseTableColumnData = [
		{
			field: "Warehouse Name",
			headerName: "Warehouse Name",
			// renderCell: (params) => <LinkButton>{params.value}</LinkButton>,
			minWidth: 300,
			flex: 1,
			valueGetter: ({ value }) => value,
			renderCell: (params) => (
				<Typography
					sx={{
						fontWeight: "500",
						fontSize: "14px",
						lineHeight: "20px",
						color: (theme) => theme.palette.primary.main,
					}}
				>
					{params.value}
				</Typography>
			),
		},

		{
			field: "Warehouse ID",
			headerName: "Warehouse ID",
			renderCell: (params) => (
				<Typography
					sx={{
						fontWeight: "500",
						fontSize: "14px",
						lineHeight: "20px",
						color: (theme) => theme.palette.primary.main,
					}}
				>
					{params.value}
				</Typography>
			),
			minWidth: 200,
			flex: 1,
			valueGetter: ({ value }) => value,
			
		},
		{
			field: "Address ID",
			headerName: "Address ID",
			// renderCell: (params) => <AppLink href="">{params.value}</AppLink>,
			width: 250,
			valueGetter: ({ value }) => value,
		},
		{
			field: "Channel ID",
			headerName: "Channel ID",
			renderCell: (params) => (
				<Typography
					sx={{
						fontWeight: "500",
						fontSize: "14px",
						lineHeight: "20px",
						// color: (theme) => theme.palette.primary.main,
					}}
				>
					{params.value}
				</Typography>
			),
			width: 150,
			valueGetter: ({ value }) => value,
			headerAlign: "center",
			align: "center",
		},

		{
			field: "Start Date",
			headerName: "Start Date",
			// renderCell: (params) => <LinkButton>{params.value}</LinkButton>,
			width: 150,
			valueGetter: ({ value }) => value,
			headerAlign: "center",
			align: "center",
		},
		{
			field: "End Date",
			headerName: "End Date",
			// renderCell: (params) => <LinkButton>{params.value}</LinkButton>,
			width: 150,
			valueGetter: ({ value }) => value,
			headerAlign: "center",
			align: "center",
		},
		{
			field: "Operator Id",
			headerName: "Operator Id",
			// renderCell: (params) => <LinkButton>{params.value}</LinkButton>,
			width: 150,
			valueGetter: ({ value }) => value,
		},
	];
	return (
		<div>
			{/* {Array.isArray(warehouseList) && warehouseList.length > 0 && ( */}
			<AppPageSections
				hasStepOnboarding={false}
				title={"Warehouse"}
				tableData={warehouseDataList}
				pageView={pageView}
				views={["list", "map"]}
				handleChangeView={handleChangeView}
				component={MapComponent}
				loading={isLoading}
				rowIdkey={"Address ID"}
				columnData={WarehouseTableColumnData}
				hideFilters
			/>
			{/* {Array.isArray(warehouseDataList) && (
				<MuiBaseDataGrid data={warehouseDataList} rowIdkey="Address ID" />
			)} */}
			{/* )} */}
		</div>
	);
}
const rows = [
	{
		id: 1,
		warehouseId: "A0B1C024",
		name: "Delhi warehouse",
		addressId: "A0B1C019",
		operatorId: "DH3-002",
		startdate: "Nov 22, 2006",
		enddate: "Nov 22, 2006",
		address: "145 Richmond Street, Charlottetown, PE C1A 1J1",
	},
	{
		id: 2,
		warehouseId: "A0B1C024",
		name: "Delhi warehouse",
		addressId: "A0B1C019",
		operatorId: "DH3-002",
		startdate: "Nov 22, 2006",
		enddate: "Nov 22, 2006",
		address: "145 Richmond Street, Charlottetown, PE C1A 1J1",
	},
	{
		id: 3,
		warehouseId: "A0B1C024",
		name: "Delhi warehouse",
		addressId: "A0B1C019",
		operatorId: "DH3-002",
		startdate: "Nov 22, 2006",
		enddate: "Nov 22, 2006",
		address: "145 Richmond Street, Charlottetown, PE C1A 1J1",
	},
	{
		id: 4,
		warehouseId: "A0B1C024",
		name: "Delhi warehouse",
		addressId: "A0B1C019",
		operatorId: "DH3-002",
		startdate: "Nov 22, 2006",
		enddate: "Nov 22, 2006",
		address: "145 Richmond Street, Charlottetown, PE C1A 1J1",
	},
	{
		id: 5,
		warehouseId: "A0B1C024",
		name: "Delhi warehouse",
		addressId: "A0B1C019",
		operatorId: "DH3-002",
		startdate: "Nov 22, 2006",
		enddate: "Nov 22, 2006",
		address: "145 Richmond Street, Charlottetown, PE C1A 1J1",
	},
	{
		id: 6,
		warehouseId: "A0B1C024",
		name: "Delhi warehouse",
		addressId: "A0B1C019",
		operatorId: "DH3-002",
		startdate: "Nov 22, 2006",
		enddate: "Nov 22, 2006",
		address: "145 Richmond Street, Charlottetown, PE C1A 1J1",
	},
	{
		id: 7,
		warehouseId: "A0B1C024",
		name: "Delhi warehouse",
		addressId: "A0B1C019",
		operatorId: "DH3-002",
		startdate: "Nov 22, 2006",
		enddate: "Nov 22, 2006",
		address: "145 Richmond Street, Charlottetown, PE C1A 1J1",
	},
	{
		id: 8,
		warehouseId: "A0B1C024",
		name: "Delhi warehouse",
		addressId: "A0B1C019",
		operatorId: "DH3-002",
		startdate: "Nov 22, 2006",
		enddate: "Nov 22, 2006",
		address: "145 Richmond Street, Charlottetown, PE C1A 1J1",
	},
	{
		id: 9,
		warehouseId: "A0B1C024",
		name: "Delhi warehouse",
		addressId: "A0B1C019",
		operatorId: "DH3-002",
		startdate: "Nov 22, 2006",
		enddate: "Nov 22, 2006",
		address: "145 Richmond Street, Charlottetown, PE C1A 1J1",
	},
];
