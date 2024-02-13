import { Box, Button, DialogActions } from "@mui/material";
import AppImage from "components/Common/AppImage";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import BaseDialog from "components/Common/Dialog";
import TextInput from "components/Common/Inputs/TextInput";
import MuiBaseDataGrid from "components/Common/Tables/MuiBaseDataGrid";
import RenderTextInput from "components/Common/Tables/RenderComponents/RenderTextInput";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { INVENTORY, PRODUCT, WAREHOUSE } from "constants/API_URL";
import { countBy, sumBy } from "lodash";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCreateProductData } from "redux/products/productsSlice";
import appFetch from "utils/appFetch";
import ProductOnboardingInventoryInfoSection from "../ProductOnboardingSection/components/ProductOnboardingInventoryInfoSection";
import InventoryAvailableItem from "../ProductOnboardingSection/InventoryAvailableItem";
import NewProductOnboardingWarhouseListDialog from "./components/NewProductOnboardingWarhouseListDialog";
import SaveProductDialog from "./components/SaveProductDialog";
import NewProductOnboardingBottomNavButtons from "./NewProductOnboardingBottomNavButtons";

const mapState = ({ user, productsData }) => ({
	productsData,
	currentUser: user.currentUser,
});
export default function NewProductOnboardingVariantLevelInventorySection({
	keyForReduxStateData,
	hideContinueNavigation,
}) {
	const { productsData, currentUser } = useSelector(mapState);
	const router = useRouter();
	const dispatch = useDispatch();
	const productsDataFromState = productsData[keyForReduxStateData];
	const items = productsDataFromState.items;

	const pageId = router.query.pageId ?? router.query.productId;
	const [warehouseList, setWarehouseList] = useState([]);
	const [productWarehouseInventory, setProductWarehouseInventory] = useState(
		[],
	);
	const [selectedInventory, setSelectedInventory] = useState([]);
	const [hasInventory, setHasInventory] = useState(false);

	const [openSaveDialog, setOpenSaveDialog] = useState(false);
	const handleCloseSaveDialog = () => {
		setOpenSaveDialog(false);
	};
	const handleOpenSaveDialog = () => {
		setOpenSaveDialog(true);
	};

	// useEffect(() => {
	// 	handleFetchWarehouse();
	// }, []);

	const handleFetchWarehouse = () => {
		const URL = WAREHOUSE.SEARCH_WAREHOUSE;

		const data = {
			user_id: currentUser.merchant_id,
			search_value: "",
		};

		appFetch(URL, data)
			.then((json) => {
				setWarehouseList(json.result);
			})
			.catch((err) => console.log(err));
	};

	const handleWarehouseInventoryChange = (field) => {
		return (e) => {
			const { value } = e.target;
			setProductWarehouseInventory((prevState) => {
				const data = prevState.filter((item) => item.wh_id !== field);
				return [
					...data,
					{
						wh_id: field,
						available: value,
						// [field]: value,
					},
				];
			});
		};
	};

	const columnData = [
		{
			field: "item_display_image",
			headerName: "Image",
			width: 100,
			renderCell: (params) => (
				<AppImage
					src={params.value}
					width="56"
					height="56"
					sx={{
						borderRadius: "5px",
						cursor: "pointer",
						border: (theme) =>
							`1px solid ${theme.palette.grey[200]}`,
					}}

					// onClick={(e) => handleOpenDialog(e, params.row.id)}
				/>
			),
		},
		{
			field: "item_title",
			headerName: "Variant Name",
			// width: 200,
			flex: 1,
		},
		// {
		// 	field: "sku",
		// 	headerName: "Variant SKU",
		// 	// width: 200,
		// 	flex: 1,
		// renderCell: (params) => (
		// 	<TextInput
		// 		value={params.value}
		// 		containerStyles={{
		// 			width: "100%",
		// 			marginTop: "0px",
		// 		}}
		// 		inputStyles={{
		// 			paddingTop: "8px",
		// 			paddingBottom: "8px",
		// 		}}
		// 		onChange={(e) => handleChangeValue(e, "sku", params.row.id)}
		// 		onBlur={(e) => handleBlurValue(e, "sku", params.row.id)}
		// 	/>
		// ),
		// },
		// {
		// 	field: "unit_retail_price",
		// 	headerName: "Price",
		// 	width: 200,
		// 	// renderCell: (params) => (
		// 	// 	<TextInput
		// 	// 		value={params.value}
		// 	// 		containerStyles={{
		// 	// 			width: "100%",
		// 	// 			marginTop: "0px",
		// 	// 		}}
		// 	// 		inputStyles={{
		// 	// 			paddingTop: "8px",
		// 	// 			paddingBottom: "8px",
		// 	// 		}}
		// 	// 		onChange={(e) =>
		// 	// 			handleChangeValue(e, "unit_retail_price", params.row.id)
		// 	// 		}
		// 	// 		onBlur={(e) =>
		// 	// 			handleBlurValue(e, "unit_retail_price", params.row.id)
		// 	// 		}
		// 	// 	/>
		// 	// ),
		// },
		// {
		// 	field: "unit_cost_price",
		// 	headerName: "Cost Price",
		// 	width: 200,
		// 	// renderCell: (params) => (
		// 	// 	<RenderTextInput
		// 	// 		params={params}
		// 	// 		onChange={(e) =>
		// 	// 			handleChangeValue(e, "unit_cost_price", params.row.id)
		// 	// 		}
		// 	// 		onBlur={(e) =>
		// 	// 			handleBlurValue(e, "unit_cost_price", params.row.id)
		// 	// 		}
		// 	// 	/>
		// 	// ),
		// },
		{
			field: "inventory",
			headerName: "Inventory",
			renderCell: (params) => <>{params.row.total}</>,
			// width: 200,
			flex: 1,
			headerAlign: "center",
			align: "center",
		},
		{
			field: "action",
			headerName: "Action",
			renderCell: (params) => (
				<Button
					sx={{
						textTransform: "capitalize",
					}}
					onClick={(e) =>
						handleOpenDialog(
							e,
							params.row.id,
							params.row.hasInventory,
							params.row.inventory,
						)
					}
				>
					{params.row.hasInventory
						? "Update Inventory"
						: "Add Inventory"}
				</Button>
			),
			headerAlign: "center",
			align: "center",
			flex: 1,
		},

		// {
		// 	field: "action",
		// 	headerName: "Action",
		// 	renderCell: (params) => (
		// 		<IconButton>
		// 			<MoreOptionsIcon />
		// 		</IconButton>
		// 	),
		// },
	];
	const [tableItems, setTableItems] = useState(items ?? []);

	const [openDialog, setOpenDialog] = useState(false);
	const [selectedItemId, setSelectedItemId] = useState(null);

	const handleOpenDialog = (e, id, hasInventory, inventory) => {
		e.preventDefault();
		setOpenDialog(true);
		setSelectedItemId(id);
		setHasInventory(hasInventory);
		setSelectedInventory(inventory);
	};
	const handleCloseDialog = () => {
		setOpenDialog(false);
		setProductWarehouseInventory([]);
		setSelectedItemId(null);
	};
	useEffect(() => {
		setTableItems(items);
	}, [items]);

	const getTableItemsWithInventory = (tableItems) => {
		const getSum =
			Array.isArray(tableItems) &&
			tableItems.map((item) => {
				const sum = sumBy(item.inventory, "available") ?? 0;
				const count = item.inventory.length ?? 0;
				return {
					...item,
					total:
						sum &&
						count &&
						`${sum} available at ${count} locations`,
					hasInventory: sum > 0,
				};
			});
		return getSum;
	};
	const tableList = getTableItemsWithInventory(tableItems);
	console.log({
		tableList,
	});

	const mergeTwoArrays = (arr1 = [], arr2 = []) => {
		const result =
			Array.isArray(arr1) &&
			arr1.map((item) => {
				const data =
					Array.isArray(arr2) &&
					arr2.find((item2) => item2.wh_id === item.wh_id);
				return {
					...item,
					...data,
				};
			});
		return result ?? [];
	};

	const mergedWarehouseList = mergeTwoArrays(
		warehouseList,
		productWarehouseInventory,
	);

	const handleClickDoneButton = (e) => {
		const url = INVENTORY.ADD_INVENTORY;
		const data = {
			user_id: currentUser.merchant_id,
			master_product_id: pageId,
			master_item_id: selectedItemId,

			inventory: productWarehouseInventory,
		};
		appFetch(url, data)
			.then((json) => {
				if (json.status === "success") {
					handleCloseDialog();
					setProductWarehouseInventory([]);
					handleFetchProductData();
				}
			})
			.catch((error) => {
				console.log("error", error);
			});
		console.log("data", data);
	};

	const handleFetchProductData = async () => {
		const url = PRODUCT.MERCHANT.FETCH_PRODUCT_MASTER;
		const data = {
			user_id: currentUser.merchant_id,
			master_product_id: pageId,
		};
		const json = await appFetch(url, data);
		if (json.status === "success") {
			dispatch(updateCreateProductData(json.result[0]));
			setTableItems(json.result[0].items);
			// dispatch(setCreateProductSelectedOptions(selectedOptions));
			// console.log({ json });
		}
	};

	useEffect(() => {
		handleFetchProductData();
	}, []);
	const handleClickContinueButton = () => {
		const URL = PRODUCT.MERCHANT.UPDATE_PRODUCT;
		const data = {
			user_id: currentUser.merchant_id,
			...productsDataFromState,
		};
		appFetch(URL, data)
			.then((json) => {
				if (json.status === "success") {
					// handleNextPage();

					handleOpenSaveDialog();

					// router.push(`/app/products`);
				}
			})
			.catch((error) => {
				console.log("error", error);
			});
	};
	const maxHeight =
		typeof window !== "undefined" ? window.innerHeight - 320 : 0;

	return (
		<div>
			{!hideContinueNavigation && (
				<NewProductOnboardingBottomNavButtons
					maxWidthPage={"800px"}
					saveButtonClick={() => handleClickContinueButton()}
				/>
			)}
			{!hideContinueNavigation && (
				<Box
					sx={{
						maxWidth: "800px",
						margin: "auto",
						mt: 2,
					}}
				>
					<SectionTitleText
						sx={{
							pb: 2,
							borderBottom: (theme) =>
								`1px solid ${theme.palette.grey[200]}`,

							mb: 2,
							fontSize: "18px",
							fontWeight: "600",
						}}
					>
						Inventory
					</SectionTitleText>
				</Box>
			)}
			<Box
				sx={{
					maxWidth: "800px",
					margin: hideContinueNavigation ? 0 : "auto",
				}}
			>
				{Array.isArray(tableList) && tableList?.length > 0 && (
					<MuiBaseDataGrid
						containerStyles={{
							height: maxHeight,
							// maxHeight: maxHeight,
						}}
						data={tableList}
						columnDefData={columnData}
						rowIdkey={"master_item_id"}
						checkboxSelection={false}
					/>
				)}
			</Box>
			{/* {hideContinueNavigation && (
				<Box
					sx={{
						position: "fixed",
						bottom: "0px",
					}}
				>
					<NewProductOnboardingBottomNavButtons
						// disableSaveButton={disableButton}
						saveButtonClick={() => handleAddProduct()}
						saveButtonTitle={"Update Product"}
						hideTitle
					/>
				</Box>
			)} */}

			<NewProductOnboardingWarhouseListDialog
				handleCloseDialog={handleCloseDialog}
				// handleClickDoneButton={handleClickDoneButton}
				handleFetchProductData={handleFetchProductData}
				open={openDialog}
				pageId={pageId}
				selectedItemId={selectedItemId}
				selectedInventory={selectedInventory}
				hasInventory={hasInventory}
			/>
			<SaveProductDialog
				open={openSaveDialog}
				handleGoToHomeButtonClick={() => router.push("/app/products")}
				handleClose={handleCloseSaveDialog}
				handlePublishNowButtonClick={() =>
					router.push(`/app/products/publish/${pageId}/select-store`)
				}
			/>
		</div>
	);
}
