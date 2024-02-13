import { Box, Button, Chip, Tooltip, Typography } from "@mui/material";
import AppImage from "components/Common/AppImage";
import AppLink from "components/Common/AppLink";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import MuiBaseDataGrid from "components/Common/Tables/MuiBaseDataGrid";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { CHANNEL, PRODUCT } from "constants/API_URL";
import { format } from "date-fns";
import CircleIcon from "@mui/icons-material/Circle";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppPageSections from "sections/AppPageSections";
import TableCellAppLink from "sections/AppPageSections/CommonComponents/TableCellAppLink";
import appFetch from "utils/appFetch";
import images1 from "public/assets/images1.png";
import StatusChip from "components/Common/Chip/StatusChip";
const mapState = ({ views, user }) => ({
	pageView: views.productPageView,
	currentUser: user.currentUser,
});
export default function ProductPublishPageSection() {
	const router = useRouter();
	const { pageView, currentUser } = useSelector(mapState);
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState([]);
	const [channels, setChannels] = useState([]);

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

	const filteredData =
		Array.isArray(data) && data.filter((item) => item.status === "draft");

	// console.log({ channels });
	const formattedTableData =
		Array.isArray(filteredData) &&
		filteredData.map((item) => {
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
				(live_date &&
					newLiveDate &&
					format(newLiveDate, "dd/MM/yyyy, hh:mm a")) ||
				"";
			// console.log({ getChannelName });
			return {
				...item,
				Product: display_image,
				"Master Item Id": master_item_id,
				"Master Product Id": master_product_id && (
					<TableCellAppLink
						href={`/app/products/${master_product_id}`}
					>
						{" "}
						{master_product_id}
					</TableCellAppLink>
				),
				"Product Title": product_title,
				"Item Title": item_title,
				Status: status,
				"Channel Name":
					Array.isArray(getChannelName) &&
					getChannelName.length > 0 &&
					getChannelName[0].channel_name,
				"Live Date": formattedLiveDate,
				"Unit Retail Price": `$ ${unit_retail_price}`,
			};
		});
	function getStr1(str) {
		return str.length > 40 ? str.slice(0, 70) + ".." : str;
	}
	const capitalizeFirstLetter = (string) => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	};
	const ProductTableColumnData = [
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
				<AppLink sx={{ fontWeight: "500", marginLeft: "16px" }} href="">
					{params.value}
				</AppLink>
			),
			width: 220,
			valueGetter: ({ value }) => value,
			//  headerAlign: "center",
			// align:"center"
		},
		{
			field: "Product",
			headerName: "Product",
			renderCell: (params) => (
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						marginLeft: "10px",
					}}
				>
					<AppImage
						// sx prop to fit app image to a definite size
						sx={{ objectFit: "cover", borderRadius: "5px" }}
						width="45"
						height="45"
						src={params.value || images1}
					/>
					<Typography
						sx={{
							marginLeft: "12px",
							fontWeight: "500",
							fontSize: "14px",
							color: "#313D4E",
						}}
					>
						{/* {getStr1(params.row["Product Title"])} */}
						{/* {params.row["Product Title"]} */}
						<>
							<Tooltip title={params.row["Product Title"]}>
								<span>
									{getStr1(params.row["Product Title"])}
								</span>
							</Tooltip>
						</>
					</Typography>
				</Box>
			),
			minWidth: 480,

			flex: 1,
			// headerAlign: "center",
			valueGetter: ({ value }) => value,
		},
		// {
		// 	field: "Master Item Id",
		// 	headerName: "Master Item Id",
		// 	// renderCell: (params) => <AppLink href="">{params.value}</AppLink>,
		// 	width: 150,
		// 	valueGetter: ({ value }) => value,
		// },
		// {
		// 	field: "Master Product Id",
		// 	headerName: "Master Product Id",
		// 	renderCell: (params) => <AppLink href="">{params.value}</AppLink>,
		// 	width: 200,
		// 	headerAlign: "center",
		// 	valueGetter: ({ value }) => value,
		// 	align:"center"
		// },
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
		// 	width: 100,
		// 	valueGetter: ({ value }) => value,
		// },
		{
			field: "Status",
			headerName: "Status",
			// renderCell: (params) => <LinkButton>{params.value}</LinkButton>,

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
			headerAlign: "center",
			valueGetter: ({ value }) => value,
			align: "center",
		},
		{
			field: "Unit Retail Price",
			headerName: "Unit Retail Price",
			// renderCell: (params) => <LinkButton>{params.value}</LinkButton>,
			width: 140,
			// headerAlign: "center",
			valueGetter: ({ value }) => value,
			// align:"center"
		},
		{
			headerName: "Publish",
			renderCell: (params) => (
				<OutlinedButton
					sx={{
						height: "30px",
						width: "100px",
						// // backgroundColor: "#EEEFFB",
						// color: "#5860D7",
						// "&:hover": {
						// 	background: "#EEEFFB",
						// },
					}}
					onClick={() =>
						router.push(
							`/app/products/publish/${params.value}/select-store`,
						)
					}
					// sx={{
					// 	textTransform: "capitalize",
					// }}
				>
					Publish
				</OutlinedButton>
			),
			valueGetter: (params) => params.id,
			headerAlign: "center",
			width: 250,
			align: "center",
		},
	];

	return (
		<Box>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					// paddingBottom: "16px",
					paddingY: "8px",
				}}
			>
				<SectionTitleText
					sx={{
						fontSize: "28px",
						lineHeight: "32px",
						// paddingBottom: "16px",
						// padding:"8px"
						"& span": {
							fontSize: "14px",
							fontWeight: "500",
						},
					}}
				>
					Publish Products{" "}
					<span>({formattedTableData.length} products)</span>
				</SectionTitleText>
				<PrimaryButton
					onClick={() =>
						router.push(
							"/app/products/publish/bulk?step=select-store",
						)
					}
				>
					Publish bulk
				</PrimaryButton>
			</Box>
			<div >
			<MuiBaseDataGrid 
				rowIdkey={"master_product_id"}
				columnDefData={ProductTableColumnData}
				data={formattedTableData}
				checkboxSelection={false}
			/>
			</div>
			
		</Box>
	);
}
