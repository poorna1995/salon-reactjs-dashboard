import {
	Box,
	Breadcrumbs,
	Chip,
	CircularProgress,
	Divider,
	Tooltip,
	Typography,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import AppImage from "components/Common/AppImage";
import AppLink from "components/Common/AppLink";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import BulletIcon from "components/Common/Icons/BulletIcon";
import CustomCircularProgress from "components/Common/Progress/CustomCircularProgress";
import MuiBaseDataGrid from "components/Common/Tables/MuiBaseDataGrid";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { PRODUCT } from "constants/API_URL";
import useInterval from "customHooks/useInterval";
import { orderBy } from "lodash";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPublishStatus } from "redux/products/productsSlice";
import appFetch from "utils/appFetch";

const mapState = ({ productsData, user }) => ({
	productsData,
	currentUser: user.currentUser,
});
export default function JobDetailsPageSection() {
	const { productsData, currentUser } = useSelector(mapState);
	const taskID = productsData.publishTaskID;
	const publishTaskProducts = productsData.publishTaskProducts;
	const publishStatus = productsData.publishableProductsStatus;

	const router = useRouter();
	const jobId = router.query.jobId;
	const {
		data: publishProducts,
		isLoading: isProductsLoading,
		refetch: refetchStatus,
	} = useQuery({
		queryKey: ["publishProducts", jobId],
		queryFn: () =>
			appFetch(PRODUCT.FETCH_PUBLISH_PRODUCT_STATUS, {
				task_id: jobId,
			}).then((res) => res),
	});
	const isCompleted =
		publishProducts &&
		publishProducts?.result &&
		publishProducts?.result.task_percentage === 100;
	const publishProductsResult = publishProducts?.result?.result;

	console.log({ publishProducts });
	const masterProductIds =
		(Array.isArray(publishProductsResult) &&
			publishProductsResult.map((item) => item.master_product_id)) ||
		[];

	// const { data: productsList, isLoading: isListLoading } = useQuery({
	// 	queryKey: ["productsList", masterProductIds],
	// 	queryFn: () =>
	// 		appFetch(PRODUCT.MERCHANT.FETCH_PRODUCT_MASTER, {
	// 			user_id: currentUser.merchant_id,
	// 			// master_product_id: masterProductIds,
	// 		}).then((res) => res.result),
	// });

	// filter productsList by master_product_id of publishProducts
	// const filteredProductsList =
	// 	Array.isArray(productsList) &&
	// 	productsList.filter((item) =>
	// 		masterProductIds.includes(item.master_product_id),
	// 	);
	// merge publishProducts and filteredProductsList
	// const mergedProductsList =
	// console.log({ filteredProductsList, publishProducts });
	const mergeTwoArrays = (a1 = [], a2 = [], key) =>
		Array.isArray(a1) &&
		a1.map((itm) => ({
			...a2.find((item) => item[key] === itm[key] && item),
			...itm,
		}));
	const mapCompleted =
		(Array.isArray(publishProductsResult) &&
			publishProductsResult.map((item) => {
				if (item.percentage === 100)
					return {
						...item,
						isCompleted: true,
					};
				return item;
			})) ||
		[];
	// const mergedArray = mergeTwoArrays(
	// 	filteredProductsList,
	// 	mapCompleted,
	// 	"master_product_id",
	// );
	const dispatch = useDispatch();
	// const handleFetchPublishStatus = () => {
	// 	const URL = PRODUCT.FETCH_PUBLISH_PRODUCT_STATUS;
	// 	const data = {
	// 		task_id: jobId,
	// 	};

	// 	// dispatch(fetchPublishableProductsStatusStart({ url: URL, data }));
	// 	if (!isCompleted) {
	// 		appFetch(URL, data).then((res) => {
	// 			console.log({ res });
	// 			dispatch(setPublishStatus(res));
	// 		});
	// 	}
	// };
	// const handleFetchPublishProducts = () => {
	// 	const URL = PRODUCT.FETCH_PUBLISH_PRODUCT_STATUS;
	// 	const data = {
	// 		task_id: jobId,
	// 	};

	// 	// dispatch(fetchPublishableProductsStatusStart({ url: URL, data }));
	// 	// if (!isCompleted) {
	// 	appFetch(URL, data)
	// 		.then((res) => {
	// 			console.log({ res });
	// 			setPublishProducts(res.result);
	// 		})
	// 		.catch((err) => console.log({ err }));
	// 	// }
	// };
	// const handleFetchProductDetails = () => {
	// 	const URL = PRODUCT.MERCHANT.FETCH_REVIEW_PRODUCT_DETAILS;
	// 	const data = {
	// 		user_id: currentUser.merchant_id,
	// 		master_product_id: masterProductIds,
	// 	};
	// 	appFetch(URL, data)
	// 		.then((res) => {
	// 			console.log({ reviewProducts: res });
	// 			// setPublishProducts(res);
	// 		})
	// 		.catch((err) => console.log({ err }));
	// };

	// React.useEffect(() => {
	// handleFetchPublishProducts();
	// if (!isCompleted) {
	// handleFetchPublishStatus();
	// }
	// }, [taskID]);
	useInterval(
		!isCompleted
			? refetchStatus
			: () => {
					return;
			  },
		1500,
	);
	// useInterval(refetchStatus, 1500);
	const orderedList = orderBy(
		mapCompleted,
		["isCompleted", "percentage", "live_date"],
		["asc", "desc", "desc"],
	);
	// console.log({ publishTaskProducts, mergedArray, orderedList });

	function getStr1(str = "") {
		if (str) return str.length > 40 ? str.slice(0, 40) + ".." : str;
	}
	const columns = [
		{
			field: "product_title",
			headerName: "Product",
			flex: 1,
			renderCell: (params) => (
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						cursor: "pointer",
					}}
					onClick={() =>
						router.push(
							`/app/products/${params.row.master_product_id}?tab=overview`,
						)
					}
				>
					<AppImage
						// sx prop to fit app image to a definite size
						sx={{ objectFit: "cover", borderRadius: "5px" }}
						width="45"
						height="45"
						src={params.row.display_image}
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
							<Tooltip title={params.value}>
								<span>{getStr1(params.value) ?? ""}</span>
							</Tooltip>
						</>
						{/* {params.row["Product Title"]} */}
					</Typography>
				</Box>
			),
		},
		{
			field: "message",
			headerName: "Status",
			flex: 0.3,
		},
		{
			field: "percentage",
			headerName: "Progress",
			renderCell: (params) => (
				<CustomCircularProgress progress={params.value} />
			),
			flex: 0.3,
			align: "center",
			headerAlign: "center",
		},
		// {
		// 	field: "channel_id",
		// 	headerName: "Link",
		// 	renderCell: (params) => (
		// 		<OutlinedButton>View on Shopify</OutlinedButton>
		// 	),
		// 	flex: 0.3,
		// 	headerAlign: "center",
		// 	align: "center",
		// },
	];

	return (
		<Box>
			<Box
				sx={{
					my: 2,
				}}
			>
				<Breadcrumbs
					sx={{
						fontSize: "12px",
						// padding: "20px",
					}}
					aria-label="breadcrumb"
				>
					<AppLink href="/app/jobs" sx={{ color: "#5860D7" }}>
						Jobs
					</AppLink>

					<Typography
						sx={{ fontSize: "12px" }}
						// underline="hover"
						fontWeight="600"
						// href="/material-ui/react-breadcrumbs/"
						// aria-current="page"
					>
						{jobId}
					</Typography>
				</Breadcrumbs>
			</Box>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					mt: 2,
					borderBottom: (theme) =>
						`1px solid ${theme.palette.grey[300]}`,
					pb: 2,
				}}
			>
				<SectionTitleText
					sx={{
						display: "flex",
						fontSize: "18px",
						lineHeight: "22px",
						alignItems: "center ",
						"& svg circle": {
							color: "#F79009",
							fill: "#F79009",
						},
						"& svg": {
							mr: 1,
						},
					}}
				>
					<span>Job ID - {jobId}</span>
					<span
						style={{
							color: "#F79009",
							fontSize: "12px",
							fontWeight: 600,
							lineHeight: "15px",
							display: "flex",
							alignItems: "center",
							marginLeft: "16px",
						}}
					>
						<BulletIcon />
						{isCompleted ? "Finished" : "In Progress"}
					</span>
				</SectionTitleText>
				<Chip label={"Estimate Time : 4min 30 sec"} />
			</Box>
			<SectionTitleText
				sx={{
					my: "16px",
					fontSize: "18px",
					fontWeight: 600,
					lineHeight: "22px",
				}}
			>
				Publishing Products
			</SectionTitleText>
			<MuiBaseDataGrid
				data={orderedList}
				rowIdkey="master_product_id"
				columnDefData={columns}
				checkboxSelection={false}
				loading={isProductsLoading
					//  || isListLoading
					}
			/>{" "}
		</Box>
	);
}
