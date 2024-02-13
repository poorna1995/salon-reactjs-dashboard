/* eslint-disable react/no-unescaped-entities */
import { Box, Divider, Grid, Typography } from "@mui/material";
import AppImage from "components/Common/AppImage";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import BaseCard from "components/Common/Cards/BaseCard";
import BaseDialog from "components/Common/Dialog";
import AddIcon from "components/Common/Icons/add";
import Filter from "components/Common/Icons/filter";
import DateInput from "components/Common/Inputs/DateInput";
import FormSelectInput from "components/Common/Inputs/SelectInput";
import MuiSelectInput from "components/Common/Inputs/SelectInput/MuiSelectInput";
import TextInput from "components/Common/Inputs/TextInput";
import MuiBaseDataGrid from "components/Common/Tables/MuiBaseDataGrid";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { PURCHASE_ORDER, VENDOR, WAREHOUSE } from "constants/API_URL";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import appFetch from "utils/appFetch";
import imageList1 from "public/assets/imageList1.png";
import IconButtonWithTooltip from "components/Common/Buttons/IconButtonWithTooltip";
import DeleteIcon from "components/Common/Icons/DeleteIcon";
import AddIconPO from "components/Common/Icons/POicons/AddIconPO";
import { useRouter } from "next/router";
import POAddProductsDialog from "./POAddProductsDialog";
import {
	deleteSelectedProductForPO,
	fetchPurchaseOrderDataStart,
	setPurchaseOrderData,
	setSelectedProductsForPO,
} from "redux/purchaseOrders/purchaseOrdersSlice";
import CustomSelectComponent from "./components/CustomSelectComponent";
const newDate = new Date();
const getTimeinMiliseconds = newDate.getTime();

const mapState = ({ user, purchaseOrdersData }) => ({
	currentUser: user.currentUser,
	purchaseOrdersData: purchaseOrdersData.purchaseOrderData,
});
export default function PurchaseOrderOnboardingSection({ pageTitle }) {
	const router = useRouter();
	const pageId = router.query.pageId ?? router.query.purchaseOrderId;
	const { currentUser, purchaseOrdersData } = useSelector(mapState);
	const [openDialog, setOpenDialog] = useState(false);
	const selectedProducts =
		// (Array.isArray(purchaseOrdersData?.products) &&
		// 	purchaseOrdersData?.products) ||
		Array.isArray(purchaseOrdersData?.selectedProducts) &&
		purchaseOrdersData.selectedProducts;
	const purchaseOrdersDataFromState = purchaseOrdersData;

	const mapSelectedProductsForPO =
		Array.isArray(selectedProducts) &&
		selectedProducts?.map((item) => {
			return {
				master_item_id: item.master_item_id,
				master_product_id: item.master_product_id,
				qty_ordered: item.qty_ordered,
				unit_cost: item.unit_cost,
				total_cost: item.total_cost,
				currency_id: item?.currency_id,
			};
		});

	const [addProductinTable, setAddProductinTable] = useState([]);
	const [vendorsList, setVendorsList] = useState([]);
	const [warehouseList, setWarehouseList] = useState([]);
	const [deleteProductID, setDeleteProductID] = useState([]);
	const [tableItems, setTableItems] = useState(selectedProducts ?? []);
	const [totalQTY, setTotalQTY] = useState(0);
	const [totalAmount, setTotalAmount] = useState(0);
	// const pageIdFromState = purchaseOrdersData?.pageId;
	useEffect(() => {
		setTableItems(selectedProducts);
	}, [selectedProducts]);

	// useEffect(() => {
	// 	if (pageIdFromState !== pageId) {
	// 		dispatch(setPurchaseOrderData({ pageId }));
	// 	}
	// }, [pageId]);

	const handleFetchVendors = () => {
		const URL = VENDOR.FETCH_VENDOR;
		const data = {
			user_id: currentUser.merchant_id,
		};
		appFetch(URL, data)
			.then((json) => {
				console.log({ vendors: json });
				setVendorsList(json.result);
			})
			.catch((err) => console.log(err));
	};
	const handleFetchWarehouseList = () => {
		const URL = WAREHOUSE.FETCH_WAREHOUSE;
		const data = {
			user_id: currentUser.merchant_id,
		};
		appFetch(URL, data)
			.then((json) => {
				console.log({ warehouseList: json });
				setWarehouseList(json.result);
			})
			.catch((err) => console.log(err));
	};
	useEffect(() => {
		handleFetchVendors();
		handleFetchWarehouseList();
	}, []);

	// console.log({ selectedVendor, selectedWarehouse });

	const vendorOptions =
		Array.isArray(vendorsList) &&
		vendorsList.map((vendor) => ({
			label: vendor.company_name,

			value: vendor.vendor_id,
			...vendor,
		}));
	const warehouseOptions =
		Array.isArray(warehouseList) &&
		warehouseList.map((warehouse) => {
			return {
				label: warehouse.wh_name,
				value: warehouse.wh_id,
				warehouseInfo: (
					<span>
						<br />
						{warehouse.address1}
						<br />
						{warehouse.state} :{warehouse.zipcode}
					</span>
				),
				...warehouse,
			};
		});

	// get vendor name from vendor id
	const vendorName =
		vendorOptions.find(
			(vendor) => vendor.value === purchaseOrdersDataFromState.vendor_id,
		) ?? {};
	const warehouseName =
		warehouseOptions.find(
			(warehouse) =>
				warehouse.value === purchaseOrdersDataFromState.wh_id,
		) ?? {};

	let getOptionLabel = (option) =>
		`${option.label} - ${option.address1 || ""} ${option.address2 || ""} ${
			option.city || ""
		} ${option.state || ""} ${option.country || ""} ${
			option.zipcode || ""
		}`;

	const [selectedVendor, setSelectedVendor] = useState(
		{
			label: vendorName && getOptionLabel(vendorName),
			// vendorName &&
			// `${vendorName?.label} - ${vendorName?.address1} ${vendorName?.address2} ${vendorName?.city} ${vendorName?.state} ${vendorName?.country} ${vendorName?.zipcode}`,
			value: purchaseOrdersDataFromState.vendor_id,
		} ?? "",
	);
	const [selectedWarehouse, setSelectedWarehouse] = useState(
		{
			label: warehouseName && getOptionLabel(warehouseName),
			value: purchaseOrdersDataFromState.wh_id,
		} ?? "",
	);

	console.log({ vendorName });

	useEffect(() => {
		if (warehouseOptions.length > 0 && vendorOptions.length > 0) {
			setSelectedVendor({
				label: vendorName && getOptionLabel(vendorName),
				value: purchaseOrdersDataFromState.vendor_id,
			});
			setSelectedWarehouse({
				label: warehouseName && getOptionLabel(warehouseName),
				value: purchaseOrdersDataFromState.warehouse_id,
			});
		}
	}, [
		purchaseOrdersDataFromState.vendor_id,
		purchaseOrdersDataFromState.warehouse_id,
		purchaseOrdersDataFromState,
		// warehouseOptions,
		// vendorOptions,
	]);

	// .map((warehouse) => {
	// 	warehouse.label = (
	// 		<div
	// 			style={{
	// 				fontWeight: "700",
	// 				lineHeight: "28px",
	// 			}}
	// 		>
	// 			{warehouse.label}
	// 		</div>
	// 	);
	// 	return warehouse;
	// });
	// 	{
	// 	label: (
	// 		<Box
	// 			sx={{
	// 				display: "flex",
	// 				flexDirection: "column",
	// 				cursor: "pointer",
	// 			}}
	// 		>
	// 			<Typography
	// 				sx={{
	// 					fontWeight: "700",
	// 					lineHeight: "28px",
	// 				}}
	// 			>
	// 				{warehouse.wh_name}
	// 			</Typography>
	// 			<Typography>{warehouse.address_1}</Typography>
	// 			<Typography>
	// 				{warehouse.city} {warehouse.zipcode}
	// 				{warehouse.country}
	// 			</Typography>
	// 		</Box>
	// 	),
	// 	value: warehouse.wh_id,
	// }

	const handleDeleteDialogOpen = () => {
		setOpenDialog(true);
	};
	const handleDialogClose = () => {
		setOpenDialog(false);
		setAddProductinTable([]);
	};

	const dispatch = useDispatch();
	const handleDeleteProductfromRow = (id) => {
		dispatch(deleteSelectedProductForPO(id));

		// const updatedItems = tableItems.filter((item) => {
		// 	return item.master_product_id !== id;
		// });
		// setTableItems(updatedItems);

		// let temp = 0;
		// let tempAmount = 0;
		// updatedItems.map((item) => {
		// 	temp += parseInt(item.order_qty);
		// 	tempAmount += parseInt(item.price);
		// });

		// setTotalQTY(temp);
		// setTotalAmount(tempAmount);
	};

	const handleChangeValues = (e, id, key) => {
		const updatedItems = tableItems.map((item) => {
			if (item.master_item_id === id || item.item_id === id) {
				return {
					...item,
					[key]: e.target.value,
					total_cost_price:
						e.target.value *
						(item.unit_cost_price ?? item.unit_cost),
				};
			}

			return item;
		});

		setTableItems(updatedItems);

		// let temp = 0;
		// let tempAmount = 0;
		// console.log("updatedtableItem--", updatedItems);
		// updatedItems.map((item) => {
		// 	if (item.order_qty) {
		// 		temp += parseInt(item.order_qty);
		// 	} else {
		// 		temp += 0;
		// 	}
		// 	// temp += parseInt(item.order_qty);
		// 	// console.log("temp--", temp);

		// 	// tempAmount += parseInt(item.price);
		// 	if (item.order_qty && item.unit_retail_price) {
		// 		tempAmount +=
		// 			parseInt(item.order_qty) * parseInt(item.unit_retail_price);
		// 	} else {
		// 		tempAmount += 0;
		// 	}
		// 	// console.log("tempAmount--", tempAmount);
		// });
		// setTotalQTY(temp);
		// setTotalAmount(tempAmount);
	};
	console.log({ tableItems });
	// const handleSaveAndContinue = () => {
	// 	dispatch(setSelectedProductsForPO(tableItems));
	// 	// setTableItems(tableItems);
	// 	// router.push(
	// 	// 	`/onboarding/purchase-orders/${pageId}?step=preview&id=1`,
	// 	// )
	// };

	// {
	// 	"master_item_id": "138983368743585800",
	// 	"master_product_id": "1679043935594",
	// 	"qty_ordered": 50,
	// 	"unit_cost": 200,
	// 	"total_cost": 10000,
	// 	"currency_id": 12
	// },

	const productsDataForAPI =
		Array.isArray(tableItems) &&
		tableItems.map((item) => {
			return {
				master_item_id: item.master_item_id ?? item.item_id,
				master_product_id: item.master_product_id ?? item.product_id,
				qty_ordered: item.order_qty ?? 0,
				unit_cost: item.unit_cost_price ?? item.unit_cost,
				total_cost: item.total_cost_price ?? item.total_cost,
				currency_id: item?.currency_id ?? 0,
			};
		});

	const handleCreatePurchaseOrder = () => {
		const URL = PURCHASE_ORDER.CREATE;
		const data = {
			user_id: currentUser.merchant_id,
			vendor_id: selectedVendor?.value,
			warehouse_id: selectedWarehouse.value,
			cancel_date: "",
			promise_date: "",
			status: "draft",
			products: productsDataForAPI,
		};

		appFetch(URL, data)
			.then((json) => {
				if (json.status === "success") {
					router.push(
						`/onboarding/purchase-orders/${pageId}?step=preview&id=1`,
					);
				}
				console.log({ json });
			})
			.catch((error) => {
				console.log({ error });
			});
	};

	const columnData = [
		{
			field: "product",
			headerName: "Product",
			renderCell: (params) => (
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						cursor: "pointer",
					}}
				>
					<AppImage
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
							// color: (theme) => theme.palette.primary.main,
						}}
					>
						{params.row.product_title}
					</Typography>
				</Box>
			),
			flex: 1,
			// width: 390,
		},
		{
			field: "product_sku",
			headerName: "SKU",
			renderCell: (params) => <Typography>{params.value}</Typography>,
			width: 150,
		},
		// {
		// 	field: "in stock",
		// 	headerName: "In Stock",
		// 	renderCell: (params) => <Typography>{params.value}</Typography>,
		// 	width: 110,
		// 	headerAlign: "center",
		// 	align: "center",
		// },
		{
			field: "moq",
			headerName: "MOQ",
			renderCell: (params) => <Typography>{params.value}</Typography>,
			width: 90,
			headerAlign: "center",
			align: "center",
		},
		{
			field: "order_qty",
			headerName: "Order Qty",
			renderCell: (params) => (
				<TextInput
					sx={{
						"& .MuiOutlinedInput-input": {
							padding: "10px 12px",
						},

						"& .MuiOutlinedInput-notchedOutline": {
							border: "1px solid #E5E5E5",
						},
					}}
					containerStyles={{
						marginTop: "0px",
					}}
					value={params.value ?? params.row.qty_ordered}
					onChange={(e) =>
						handleChangeValues(
							e,
							params.row.master_item_id,
							"order_qty",
						)
					}
				/>
			),
			headerAlign: "center",
			width: 180,
		},
		{
			field: "unit_cost_price",
			headerName: "Cost",
			renderCell: (params) => (
				// <TextInput
				// 	// title="SKU (Stock Keeping Unit)"
				// 	// value={sku}
				// 	// onChange={(e) => setSKU(e.target.value)}
				// 	// type="number"
				// 	sx={{
				// 		"& .MuiOutlinedInput-input": {
				// 			padding: "10px 12px",
				// 		},

				// 		"& .MuiOutlinedInput-notchedOutline": {
				// 			border: "1px solid #E5E5E5",
				// 		},
				// 	}}
				// 	containerStyles={{
				// 		marginTop: "0px",
				// 	}}
				// 	value={params.value}
				// 	onChange={(e) =>
				// 		handleChangeValues(e, params.row.id, "price")
				// 	}
				// />
				<Typography>
					{params.row.symbol} {params.value ?? params.row.unit_cost}
				</Typography>
			),
			headerAlign: "center",
			align: "center",
			width: 180,
		},
		{
			field: "total_cost",
			headerName: "Total",
			renderCell: (params) => (
				<Typography>
					{params.row.symbol}{" "}
					{params.row.total_cost_price ?? params.row.total_cost}
					{/* {params.row.order_qty && params.row.unit_cost_price
						? `$ ${
								params.row.order_qty *
								params.row.unit_cost_price
						  }`
						: `$ 0`} */}
				</Typography>
			),
			// width: 90,
			flex: 1,
		},
		{
			field: "Action",
			headerName: "Action",
			renderCell: (params) => (
				<IconButtonWithTooltip
					icon={<DeleteIcon />}
					title={"Delete"}
					onClick={() => handleDeleteProductfromRow(params.row.id)}
				/>
			),

			width: 100,
		},
	];

	const addProductcolumnData = [
		{
			field: "product",
			headerName: "Product",
			renderCell: (params) => (
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						cursor: "pointer",
					}}
				>
					<AppImage
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
							// color: (theme) => theme.palette.primary.main,
						}}
					>
						{params.row.product_title}
					</Typography>
				</Box>
			),

			// width: 300,
			flex: 1,
		},
		{
			field: "sku",
			headerName: "SKU",
			renderCell: (params) => <Typography>{params.value}</Typography>,

			width: 150,
		},
		// {
		// 	field: "in stock",
		// 	headerName: "In Stock",
		// 	renderCell: (params) => <Typography>422</Typography>,
		// 	width: 110,
		// 	headerAlign: "center",
		// 	align: "center",
		// },
		{
			field: "moq",
			headerName: "MOQ",
			// renderCell: (params) => <Typography>100</Typography>,
			width: 90,
			headerAlign: "center",
			align: "center",
		},
		{
			field: "unit_cost_price",
			headerName: "Cost",
			// renderCell: (params) => <Typography>$ 50</Typography>,
			width: 90,
			headerAlign: "center",
			align: "center",
		},
	];
	const customStyles = {
		control: (styles) => ({
			...styles,
			paddingTop: "6px",
			paddingBottom: "7px",
			borderRadius: "5px",
			// fontFamily: "Mulish, sans-serif",
			// "& :hover": {
			// 	borderColor: "black",
			// },
		}),
		menu: (provided) => ({
			...provided,
			zIndex: 99999,
			// fontFamily: "Mulish, sans-serif",
		}),
		indicatorSeparator: (styles) => ({
			...styles,
			display: "none",
		}),
		option: (styles) => ({
			...styles,
			fontWeight: 600,
			fontSize: "14px",
		}),
	};

	const PO_DATA = {
		user_id: currentUser.merchant_id,
		po_id: pageId,
		vendor_id: selectedVendor?.value,
		wh_id: selectedWarehouse?.value,
		products: productsDataForAPI,
		status: "draft",
		cancel_date: "",
		promise_date: "",
	};

	const handleClickSaveAsDraftButton = () => {
		const URL = PURCHASE_ORDER.UPDATE_PURCHASE_ORDER;
		let po_line_id = purchaseOrdersDataFromState.po_line_id;
		const data = {
			// user_id: currentUser.merchant_id,
			...PO_DATA,
			po_line_id: po_line_id,
		};

		if (!po_line_id) {
			return handleCreatePO();
		}

		console.log({ data }, "handleClickSaveAsDraftButton");
		appFetch(URL, data).then((json) => {
			if (json.status === "success") {
				handleFetchPOData();
			}
			console.log(json);
		});
	};
	const handleFetchPOData = () => {
		const URL = PURCHASE_ORDER.FETCH_PURCHASE_ORDER;
		const data = {
			user_id: currentUser.merchant_id,
			po_id: pageId,
		};
		dispatch(fetchPurchaseOrderDataStart({ url: URL, data }));
	};
	useEffect(() => {
		handleFetchPOData();
	}, []);
	const handleCreatePO = () => {
		const URL = PURCHASE_ORDER.CREATE_PURCHASE_ORDER;
		const data = {
			...PO_DATA,
		};
		appFetch(URL, data).then((json) => {
			console.log({ json }, "handleCreatePO");
			handleFetchPOData();
		});
	};
	const handleVendorSelect = (e) => {
		setSelectedVendor(e);
		// handleCreatePO(e);
	};
	return (
		<>
			<Box sx={{ paddingX: "16px", mt: "16px" }}>
				<Box
					sx={{
						position: "sticky",
						top: "64.5px",
						zIndex: "100",
						backgroundColor: "white",
						borderBottom: "1px solid #E5E5E5",
					}}
				>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							mt: "16px",
						}}
					>
						<Box sx={{ display: "flex", alignItems: "center" }}>
							<SectionTitleText sx={{ mr: "16px" }}>
								{pageTitle ?? `New Purchase Order`}
							</SectionTitleText>
							<Typography
								sx={{ color: "#DC6803", fontWeight: "600" }}
							>
								({pageId})
							</Typography>
						</Box>
						<Box>
							<PrimaryButton
								// imp_route
								// onClick={() => handleSaveAndContinue()}
								// onClick={() => handleCreatePurchaseOrder()}
								sx={{
									mr: 2,
								}}
								onClick={() => handleClickSaveAsDraftButton()}
								disabled={!selectedVendor?.value}
							>
								Save as Draft
							</PrimaryButton>

							<PrimaryButton
								disabled
								// imp_route
								// onClick={() => handleSaveAndContinue()}
								onClick={() => handleCreatePurchaseOrder()}
							>
								Save and Continue
							</PrimaryButton>
						</Box>
					</Box>
					<Grid
						columnSpacing={4}
						container
						sx={{
							display: "flex",
							alignItems: "flex-start",
							justifyContent: "space-between",
							mb: "16px",
						}}
					>
						<Grid item xs={4}>
							<FormSelectInput
								title={"Vendor"}
								label="Vendor"
								name="vendor"
								options={vendorOptions}
								value={selectedVendor}
								onChange={handleVendorSelect}
								styles={customStyles}
								getOptionLabel={getOptionLabel}
							/>
						</Grid>
						<Grid item xs={4}>
							<FormSelectInput
								title={"Destination Warehouse"}
								options={warehouseOptions}
								value={selectedWarehouse}
								onChange={(e) => setSelectedWarehouse(e)}
								styles={customStyles}
								getOptionLabel={(option) =>
									`${option.label} - ${
										option.address1 || ""
									} ${option.address2 || ""} ${
										option.city || ""
									} ${option.state || ""} ${
										option.country || ""
									} ${option.zipcode || ""}`
								}
							/>
						</Grid>
						<Grid item xs={4}>
							<DateInput
								label="Expected Date"
								name="deliveryDate"
							/>
						</Grid>
					</Grid>
				</Box>
				<MuiBaseDataGrid
					columns={columnData}
					data={tableItems}
					rowIdkey={`master_item_id` ?? "item_id"}
					getRowId={(row) => row.master_item_id ?? row.item_id}
					checkboxSelection={false}
					// hideFooter={true}
					containerStyles={{
						height: "320px",
						marginTop: "20px",
					}}
				/>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						mt: "20px",
					}}
				>
					<OutlinedButton
						startIcon={<AddIconPO />}
						onClick={handleDeleteDialogOpen}
						disabled={!selectedVendor?.value}
					>
						Add Products to Purchase Order
					</OutlinedButton>
				</Box>

				<Grid
					// columnSpacing={2}
					container
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					<Grid item xs={6}>
						<TextInput
							title="Customer Notes"
							placeholder="Will be displayed on purchase order"
							multiline
							minRows={3}
						/>
					</Grid>
					<Grid item xs={4}>
						<Box sx={{ display: "flex", mt: "30px", mb: "10px" }}>
							{/* <Grid item xs={2}> */}
							<Typography sx={{ marginRight: "45px" }}>
								SubTotal
							</Typography>
							<Typography>{totalAmount}</Typography>
						</Box>
						<Box sx={{ display: "flex", mb: "10px" }}>
							<Typography sx={{ marginRight: "45px" }}>
								Total Qty
							</Typography>

							<Typography>{totalQTY}</Typography>
						</Box>
						<Box sx={{ display: "flex", mb: "10px" }}>
							<Typography>Tax %</Typography>
							<TextInput
								sx={{
									"& .MuiOutlinedInput-input": {
										padding: "10px 12px",
									},

									"& .MuiOutlinedInput-notchedOutline": {
										border: "1px solid #E5E5E5",
									},
								}}
								containerStyles={{
									marginTop: "0px",
									width: "100px",
									marginLeft: "70px",
								}}
							/>
						</Box>
						<Divider sx={{ marginRight: "60px" }} />
						<Box sx={{ display: "flex", mt: "30px" }}>
							<SectionTitleText
								sx={{ marginRight: "45px", mt: "-18px" }}
							>
								Total
							</SectionTitleText>
							<SectionTitleText sx={{ mt: "-18px" }}>
								{/* {totalAmount*totalQTY} */}
								{totalAmount}
							</SectionTitleText>
						</Box>
					</Grid>
					{/* </Grid> */}

					{/* </Box> */}
				</Grid>
			</Box>
			<POAddProductsDialog
				openDialog={openDialog}
				handleDialogClose={handleDialogClose}
				addProductcolumnData={addProductcolumnData}
				selectedVendorID={selectedVendor?.value}
			/>
		</>
	);
}
