import { Box } from "@mui/material";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import BaseDialog from "components/Common/Dialog";
import TextInput from "components/Common/Inputs/TextInput";
import SectionLoader from "components/Common/LoadingIndicators/SectionLoader";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import { INVENTORY, PRODUCT, WAREHOUSE } from "constants/API_URL";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { updateCreateProductData } from "redux/products/productsSlice";
import InventoryAvailableItem from "sections/OnboardingSections/ProductOnboardingSection/InventoryAvailableItem";
import appFetch from "utils/appFetch";

const mapState = ({ user, productsData }) => ({
	currentUser: user.currentUser,
	// createProductData: productsData.createProductData,
	// productsData,
});
export default function NewProductOnboardingWarhouseListDialog({
	open,
	handleCloseDialog,
	handleFetchProductData,
	pageId,
	selectedItemId,
	selectedInventory,
	hasInventory,
}) {
	const { currentUser } = useSelector(mapState);
	const [warehouseList, setWarehouseList] = useState([]);
	const [productWarehouseInventory, setProductWarehouseInventory] = useState(
		selectedInventory ?? [],
	);
	useEffect(() => {
		setProductWarehouseInventory(selectedInventory ?? []);
	}, [selectedInventory]);
	console.log({ selectedInventory });
	const [searchValue, setSearchValue] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const handleFetchWarehouse = () => {
		const URL = WAREHOUSE.SEARCH_WAREHOUSE;
		setIsLoading(true);
		const data = {
			user_id: currentUser.merchant_id,
			search_value: searchValue,
		};

		appFetch(URL, data)
			.then((json) => {
				setWarehouseList(json.result);
				setIsLoading(false);
			})
			.catch((err) => console.log(err));
	};
	useEffect(() => {
		if (open) {
			handleFetchWarehouse();
		}
		// open && handleFetchWarehouse();
	}, [open]);
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

	// const handleFetchProductData = async () => {
	// 	const url = PRODUCT.MERCHANT.FETCH_PRODUCT_MASTER;
	// 	const data = {
	// 		user_id: currentUser.merchant_id,
	// 		master_product_id: pageId,
	// 	};
	// 	const json = await appFetch(url, data);
	// 	if (json.status === "success") {
	// 		dispatch(updateCreateProductData(json.result[0]));
	// 		setTableItems(json.result[0].items);
	// 		// dispatch(setCreateProductSelectedOptions(selectedOptions));
	// 		// console.log({ json });
	// 	}
	// };
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
	console.log({ warehouseList, productWarehouseInventory });

	console.log({ mergedWarehouseList });
	return (
		<BaseDialog
			title={"Inventory"}
			open={open}
			handleClose={handleCloseDialog}
			dialogActions={
				<>
					<PrimaryButton onClick={(e) => handleClickDoneButton(e)}>
						Done
					</PrimaryButton>
				</>
			}
		>
			{/* <SectionTitleText>Inventory</SectionTitleText> */}
			<Box
				sx={{
					maxHeight: "500px",
					minWidth: "600px",
					maxWidth: "800px",
					minHeight: "500px",
					// overflowY: "scroll",
				}}
			>
				<TextInput
					placeholder="Search"
					value={searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
					onKeyUp={handleFetchWarehouse}
				/>
				{isLoading && <SectionLoader />}
				{/* {Array.isArray(mergedWarehouseList) &&
					mergedWarehouseList.length > 0 && (
						<> */}
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						marginTop: "16px",
					}}
				>
					<Box>
						<DescriptionText sx={{ color: "#313D4E" }}>
							Location
						</DescriptionText>
					</Box>
					<Box>
						<DescriptionText sx={{ color: "#313D4E" }}>
							Available
						</DescriptionText>
					</Box>
				</Box>
				{!isLoading &&
					Array.isArray(mergedWarehouseList) &&
					mergedWarehouseList.length > 0 &&
					mergedWarehouseList.map((warehouse, index) => {
						return (
							<InventoryAvailableItem
								key={warehouse.wh_id}
								wh_name={warehouse.wh_name}
								wh_id={warehouse.wh_id}
								wh_qty={warehouse.available ?? warehouse.wh_qty}
								onChange={handleWarehouseInventoryChange(
									warehouse.wh_id,
								)}
							/>
						);
					})}
				{/* </>
					)} */}
			</Box>
		</BaseDialog>
	);
}
