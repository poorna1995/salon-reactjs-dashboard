import { Box, Button, Chip, IconButton, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import AppImage from "components/Common/AppImage";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import MoreOptionsIcon from "components/Common/Icons/MoreOptionsIcon";
import CheckboxInput from "components/Common/Inputs/Checkbox";
import FormSelectInput from "components/Common/Inputs/SelectInput";
import TextInput from "components/Common/Inputs/TextInput";
import MuiBaseDataGrid from "components/Common/Tables/MuiBaseDataGrid";
import RenderTextInput from "components/Common/Tables/RenderComponents/RenderTextInput";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { PRODUCT } from "constants/API_URL";
import { orderBy, sortBy, uniqBy } from "lodash";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
	updateCreateProductData,
	setCreateProductSelectedOptions,
	setCreateProductData,
	removeAllProductImages,
} from "redux/products/productsSlice";
import theme from "theme";
import appFetch from "utils/appFetch";
import ProductOnboardingVariantsInfoSection from "../ProductOnboardingSection/components/ProductOnboardingVariantsInfoSection";
import AddVariantImageDialog from "./AddVariantImageDialog";
import NewProductOnboardingBottomNavButtons from "./NewProductOnboardingBottomNavButtons";

const mapState = ({ user, productsData }) => ({
	currentUser: user.currentUser,
	// createProductData: productsData.createProductData,
	productsData,
});
export default function NewProductOnboardingVariantsInfoSection({
	keyForReduxStateData,
	hideContinueNavigation,
}) {
	const { currentUser, productsData } = useSelector(mapState);
	const router = useRouter();
	const pageId = router.query.pageId;
	const step = router.query.step;
	const { enqueueSnackbar } = useSnackbar();
	const dispatch = useDispatch();
	const USER_ID = currentUser.merchant_id;
	const createProductData = productsData[keyForReduxStateData];
	const itemsFromState = createProductData?.items;

	//  get the selected options from the itemsFromState if each item has option_name and option_value, map that to an array of objects with name and options

	// const selectedOptionsFromItems =
	// 	Array.isArray(itemsFromState) &&
	// 	itemsFromState?.map((item) => {
	// 		if (item.option_name && item.option_value) {
	// 			return {
	// 				name: item.option_name,
	// 				options: item.option_value,
	// 			};
	// 		}
	// 	});
	// console.log({ selectedOptionsFromItems });
	// how to remove space from a string
	const removeSpace = (string) => {
		return string.replace(/\s/g, "");
	};

	function convertStringArrayToObjectArray(array = []) {
		const mergeTwoArrays = (arr1 = [], arr2 = []) => {
			const result = [];
			for (let i = 0; i < arr1.length; i++) {
				result.push({
					name: arr1[i],
					options: uniqBy(
						Array.isArray(arr2) &&
							arr2.length > 0 &&
							arr2
								.map((item) => {
									if (item[i] !== undefined)
										return removeSpace(item[i]);
								})
								.filter((item) => item !== undefined),
						// .join(", "),
					),
				});
			}
			return result;
		};
		const getOptionName =
			Array.isArray(array) &&
			array.map((item) => {
				return item.option_name;
			});
		const getOptionValue =
			Array.isArray(array) &&
			array.map((item) => {
				return item.option_value;
			});
		const getUniqueOptionName = Array.isArray(getOptionName) && [
			...new Set(getOptionName.flat()),
		];
		const mergedOptions =
			Array.isArray(getUniqueOptionName) &&
			Array.isArray(getOptionValue) &&
			mergeTwoArrays(getUniqueOptionName, getOptionValue);

		return mergedOptions;
	}
	// console.log({
	// 	convertStringArrayToObjectArray:
	// 		convertStringArrayToObjectArray(itemsFromState),
	// });
	const selectedOptionsFromItems = convertStringArrayToObjectArray(
		itemsFromState,
	).map((item) => {
		return {
			name: item.name,
			options: item.options.join(","),
		};
	});

	const selectedOptionsFromState = createProductData?.selectedOptions;
	const skuFromState = createProductData?.product_sku;
	const retailPriceFromState = createProductData?.unit_retail_price;
	const costPriceFromState = createProductData?.unit_cost_price;
	const displayImageFromState = createProductData?.display_image;
	const hasDefaultSKUFromState = createProductData?.has_default_sku;
	const hasDefaultRetailPriceFromState =
		createProductData?.has_default_retail_price;
	const hasDefaultCostPriceFromState =
		createProductData?.has_default_cost_price;

	const [selectedOptions, setSelectedOptions] = useState(
		selectedOptionsFromItems ?? [],
	);
	const [hasDefaultSKU, setHasDefaultSKU] = useState(
		hasDefaultSKUFromState ?? true,
	);
	const [hasDefaultRetailPrice, setHasDefaultRetailPrice] = useState(
		hasDefaultRetailPriceFromState ?? true,
	);
	const [hasDefaultCostPrice, setHasDefaultCostPrice] = useState(
		hasDefaultCostPriceFromState ?? true,
	);
	useEffect(() => {
		setHasDefaultSKU(hasDefaultSKUFromState ?? true);
		setHasDefaultRetailPrice(hasDefaultRetailPriceFromState ?? true);
		setHasDefaultCostPrice(hasDefaultCostPriceFromState ?? true);
	}, []);

	const productOptionsValue =
		Array.isArray(selectedOptions) && selectedOptions.length > 0
			? []
			: [{ name: "", options: "" }];
	const [productOptions, setProductOptions] = useState(productOptionsValue);

	const [loading, setLoading] = useState(false);
	const resetForm = () => {
		setTitle("");
		// setDescription("");
		setUnitRetailPrice("");
		setEditorState(EditorState.createEmpty());
		dispatch(removeAllProductImages());

		setSelectedFile("");
		setShowSelectedFile(false);
		setLoading(false);
	};

	const handleAddProduct = async () => {
		const url = PRODUCT.MERCHANT.ADD_PRODUCT_ITEM;

		const data = {
			user_id: currentUser.merchant_id,
			master_product_id: createProductData.master_product_id,

			items: inventoriesToAdd,
		};
		appFetch(url, data)
			.then((json) => {
				if (json.status === "success") {
					// dispatch(updateCreateProductData(data));
					handleFetchProductData();
					// handleNextButtonClick();
				}
			})
			.catch((err) => console.log(err));
		// await addProduct(data, enqueueSnackbar);
	};
	const handleFetchProductData = async () => {
		const url = PRODUCT.MERCHANT.FETCH_PRODUCT_MASTER;
		const data = {
			user_id: USER_ID,
			master_product_id: createProductData.master_product_id,
		};
		const json = await appFetch(url, data);
		if (json.status === "success") {
			dispatch(updateCreateProductData(json.result[0]));
			setTableItems(json.result[0].items);
			// dispatch(setCreateProductSelectedOptions(selectedOptions));
			// console.log({ json });
		}
	};

	const disableButton = loading;

	const containerStyles = {
		padding: "2px",
		marginTop: "0px",
		boxShadow: "none",
		border: "none",
		borderRadius: "0",
	};
	const handleNameChange = (e, index) => {
		const values = [...productOptions];
		values[index].name = e.value;

		setProductOptions(values);
	};
	const handleValueChange = (e, index) => {
		const values = [...productOptions];
		values[index].options = e.target.value;
		setProductOptions(values);
	};
	const handleAddOptions = () => {
		const values = [...productOptions];
		values.push({ name: "", options: "" });
		setProductOptions(values);
	};
	const handleClickDoneButton = async () => {
		// write the logic to add the productOptions to selectedOptions and clear the productOptions and also save the previous state of selectedOptions to a variable
		const newSelectedOptions = [...selectedOptions, ...productOptions];

		// dispatch(setCreateProductSelectedOptions(newSelectedOptions));

		setSelectedOptions(newSelectedOptions);
		// dispatch(
		// 	updateCreateProductData({ selectedOptions: newSelectedOptions }),
		// );
		setProductOptions([]);
		handleAddProduct();

		// setSelectedOptions(productOptions);
		// setProductOptions([]);
	};
	// useEffect(() => {
	// 	if (hasDefaultSKU) handleAddProduct();
	// }, [hasDefaultSKU]);

	const handleEditButtonClick = (item) => {
		// write the logic to remove the item from selectedOptions and add to productOptions and check it does not exist in productOptions

		const newProductOptions = [...productOptions, item];
		const newSelectedOptions = selectedOptions.filter(
			(option) => option.name !== item.name,
		);
		setProductOptions(newProductOptions);
		setSelectedOptions(newSelectedOptions);
	};

	const handleDeleteButtonClick = (e, item) => {
		//write the logic to remove the item from productOptions
		const newProductOptions = productOptions.filter(
			(option) => option.name !== item.name,
		);
		setProductOptions(newProductOptions);
	};
	const getOptionsArray = (options) => {
		// removethe spaces from the options and split them by comma and do not have empty strings
		// remove any empty arrays

		// replace all spaces in empty strings not in strings with values
		// const replace

		const removedSpacesFromOptions = options.replace(/\s/g, "");

		// const optionsArray = options.split(",").filter((option) => option !== "");
		const optionsArray = removedSpacesFromOptions
			.split(",")
			.filter((option) => option !== "");

		// const optionsArray = options.split(",");
		return optionsArray;
	};

	const mergeFieldsForTable = (list = []) => {
		const mergedFields = list.reduce((acc, field) => {
			const { name, options } = field;
			const optionsArray = getOptionsArray(options);
			return {
				...acc,
				[name]: optionsArray,
			};
		}, {});
		return mergedFields;
	};

	function convertObjectArrayToStringArrays(selectedOptions = []) {
		// get values from the selectedOptions from state

		const sortedSelectedOptions = orderBy(selectedOptions, "name", "desc");

		const itemsListed = mergeFieldsForTable(sortedSelectedOptions);
		// console.log({ sortedSelectedOptions }, "inside function");

		const getValues = Object.values(itemsListed);
		const getKeys = Object.keys(itemsListed);
		const myItems =
			Array.isArray(getValues) &&
			getValues.map((item, index) => {
				const mapItem = item
					.map((i, id) => {
						return i;
					})
					.flat();
				return mapItem;
			});
		const getCombinations = (arrays) => {
			const result = [];
			const f = (prefix, arrays) => {
				for (let i = 0; i < arrays[0]?.length; i++) {
					const current = prefix.concat(arrays[0][i]);
					if (arrays?.length > 1) {
						f(current, arrays.slice(1));
					} else {
						result.push(current);
					}
				}
			};
			f([], arrays);
			return result;
		};
		const getCombo =
			Array.isArray(myItems) &&
			myItems?.length > 0 &&
			getCombinations(myItems);
		// console.log("itemsListed", {
		// 	itemsListed,
		// 	getCombo,
		// 	getKeys,
		// 	getValues,
		// 	myItems,
		// });
		// const sortedArray = getKeys.sort();
		return { option_name: getKeys, option_values: getCombo };
	}
	const selectableOptons = [...productOptions, ...selectedOptions];

	const getValuesOfOptions =
		convertObjectArrayToStringArrays(selectableOptons);
	// console.log("getValuesOfOptions", getValuesOfOptions);
	const inventoriesToAdd =
		Array.isArray(getValuesOfOptions.option_values) &&
		getValuesOfOptions.option_values.map((item, index) => {
			const joinedItem = item.join(" / ");
			const variantSKU = `${skuFromState}_${item.join("_")}`;
			// console.log({ variantSKU, item });
			// if (index === 0)
			return {
				item_title: joinedItem,
				option_name: getValuesOfOptions.option_name,
				option_value: item,
				sku: hasDefaultSKU === true ? variantSKU : "",
				item_unit_retail_price:
					hasDefaultRetailPrice === true ? retailPriceFromState : "",
				item_unit_cost_price:
					hasDefaultCostPrice === true ? costPriceFromState : "",
				display_image: displayImageFromState,

				// inventory: productWarehouseInventory,
			};
			// return {
			// 	title: joinedItem,
			// 	option_name: getValuesOfOptions.option_name,
			// 	option_value: item,
			// 	inventory: [],
			// };
		});

	const handleNextButtonClick = () => {
		router.push(`/onboarding/products/${pageId}?step=select-vendor&id=3`);
		dispatch(setCreateProductData({}));
		dispatch(removeAllProductImages());
	};

	const filterOnlySelectedOptions = (
		optionsWithLabel = [],
		selectedOptions = [],
	) => {
		// filter the options to select from if the name of item in selectedOptions is present from optionsWithLabel
		const filteredOptions = optionsWithLabel.filter(
			(item) =>
				!selectedOptions.some((option) => option.name === item.value),
		);
		return filteredOptions;
	};
	const filteredOptions = filterOnlySelectedOptions(
		optionsWithLabel,
		selectableOptons,
	);
	// console.log({
	// 	filteredOptions,
	// 	selectedOptions,
	// 	optionsWithLabel,
	// 	selectableOptons,
	// });

	// console.log({ getValuesOfOptions, inventoriesToAdd });

	//  disable the done button if the name of the item in productOptions is empty and if the values are empty for the name of the item in productOptions or if there is no productOptions selected or if there are only spaces in the item in productOptions

	const disableDoneButton =
		(Array.isArray(productOptions) &&
			productOptions.length > 0 &&
			productOptions.some((item) => item.name === "")) ||
		productOptions.some(
			(item) =>
				item.options === "" ||
				getOptionsArray(item.options).length === 0,
		) ||
		productOptions.length === 0;

	// (Array.isArray(productOptions) &&
	// 	productOptions.length > 0 &&
	// 	productOptions.some((item) => item.name === "")) ||
	// productOptions.some((item) => item.options === "") ||
	// productOptions.length === 0;

	const handleChangeValue = (e, key, value) => {
		const URL = PRODUCT.MERCHANT.UPDATE_PRODUCT_ITEM;
		const data = {
			master_product_id: pageId,
			[key]: e.target.value,
			master_item_id: value,
			user_id: currentUser.merchant_id,
		};
		// console.log({ data });
		// Update the value in the state setTableItems where the master_item_id is equal to the value
		const updatedItems = tableItems.map((item) => {
			if (item.master_item_id === value) {
				return {
					...item,
					[key]: e.target.value,
				};
			}
			return item;
		});
		setTableItems(updatedItems);
	};
	const handleBlurValue = (e, key, value) => {
		const URL = PRODUCT.MERCHANT.UPDATE_PRODUCT;
		const data = {
			master_product_id: pageId,
			// [key]: e.target.value,
			// master_item_id: value,
			user_id: currentUser.merchant_id,

			items: [
				{
					[key]: e.target.value,
					master_item_id: value,
				},
			],
		};
		appFetch(URL, data).then((json) => {
			// console.log({ json, data });
			handleFetchProductData();
		});
	};

	const [tableItems, setTableItems] = useState(itemsFromState ?? []);
	useEffect(() => {
		setTableItems(itemsFromState ?? []);
	}, [itemsFromState]);
	const [openDialog, setOpenDialog] = useState(false);
	const [selectedMasterItemId, setSelectedMasterItemId] = useState(null);
	const handleOpenDialog = (e, master_item_id) => {
		setOpenDialog(true);
		setSelectedMasterItemId(master_item_id);
	};

	const columnData = [
		{
			field: "display_image",
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
					onClick={(e) => handleOpenDialog(e, params.row.id)}
				/>
			),
		},
		{
			field: "item_title",
			headerName: "Variant Name",
			// width: 200,
			flex: 1,
		},
		{
			field: "sku",
			headerName: "Variant SKU",
			// width: 200,
			flex: 1,
			renderCell: (params) => (
				<TextInput
					value={params.value}
					containerStyles={{
						width: "100%",
						marginTop: "0px",
					}}
					inputStyles={{
						paddingTop: "8px",
						paddingBottom: "8px",
					}}
					onChange={(e) => handleChangeValue(e, "sku", params.row.id)}
					onBlur={(e) => handleBlurValue(e, "sku", params.row.id)}
				/>
			),
		},
		// {
		// 	field: "inventory",
		// 	headerName: "Inventory",
		// 	renderCell: (params) => (
		// 		<Button
		// 			sx={{
		// 				textTransform: "capitalize",
		// 			}}
		// 		>
		// 			Add inventory
		// 		</Button>
		// 	),
		// 	width: 200,
		// },
		{
			field: "unit_retail_price",
			headerName: "Price",
			width: 200,
			renderCell: (params) => (
				<RenderTextInput
					params={params}
					onChange={(e) =>
						handleChangeValue(e, "unit_retail_price", params.row.id)
					}
					onBlur={(e) =>
						handleBlurValue(e, "unit_retail_price", params.row.id)
					}
				/>
			),
		},
		{
			field: "unit_cost_price",
			headerName: "Cost Price",
			width: 200,
			renderCell: (params) => (
				<TextInput
					value={params.value}
					containerStyles={{
						width: "100%",
						marginTop: "0px",
						// height: "36px",
					}}
					inputStyles={{
						paddingTop: "8px",
						paddingBottom: "8px",
					}}
					onChange={(e) =>
						handleChangeValue(e, "unit_cost_price", params.row.id)
					}
					onBlur={(e) =>
						handleBlurValue(e, "unit_cost_price", params.row.id)
					}
				/>
			),
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

	const maxHeight =
		typeof window !== "undefined" ? window.innerHeight - 600 : 0;
	const handleSelectImageClick = (e, item) => {
		// console.log("handleSelectImageClick", item);
		const URL = PRODUCT.MERCHANT.UPDATE_PRODUCT;
		const data = {
			master_product_id: createProductData.master_product_id,
			// [key]: e.target.value,
			// master_item_id: value,
			user_id: currentUser.merchant_id,

			items: [
				{
					item_display_image: item,
					master_item_id: selectedMasterItemId,
					// [key]: e.target.value,
					// master_item_id: value,
				},
			],
		};
		appFetch(URL, data)
			.then((json) => {
				// console.log({ json, data });
				handleFetchProductData();
				handleCloseDialog();
			})
			.catch((err) => console.error(err));
	};
	const handleCloseDialog = () => {
		setOpenDialog(false);
		setSelectedMasterItemId(null);
	};

	const handleClickContinueButton = async () => {
		await handleAddProduct();
		handleNextButtonClick();
	};

	console.log({ hasDefaultSKU });
	const handleChangeSKU = (e) => {
		setHasDefaultSKU(e.target.checked);
		// handleAddProduct();
	};

	// disable the update data button if hasDefaultSKU , hasDefaultPrice, hasDefaultCostPrice are not changed from the default value

	const disableUpdateDataButton = false;
	// hasDefaultSKU && hasDefaultRetailPrice && hasDefaultCostPrice;
	// !hasDefaultSKU && !hasDefaultRetailPrice && !hasDefaultCostPrice;

	return (
		<div>
			{!hideContinueNavigation && (
				<Box
					sx={
						{
							// maxWidth: "800px", margin: "auto"
						}
					}
				>
					<NewProductOnboardingBottomNavButtons
						maxWidthPage={"800px"}
						saveButtonClick={() => handleClickContinueButton()}
					/>
				</Box>
			)}{" "}
			<Box
				sx={{
					maxWidth: "800px",
					margin: hideContinueNavigation ? "0px" : "auto",
					borderBottom: (theme) =>
						`1px solid ${theme.palette.grey[200]}`,
					my: hideContinueNavigation ? "0px" : 4,
				}}
			>
				{/* Variants Info */}
				<SectionTitleText
					sx={{ my: hideContinueNavigation ? "0px" : 2 }}
				>
					Variants
				</SectionTitleText>
				{/* Show option values */}
				{Array.isArray(selectedOptions) &&
					selectedOptions.length > 0 &&
					selectedOptions.map((item, index) => {
						const { name, options } = item;
						const optionsArray = getOptionsArray(options);
						return (
							<div key={index}>
								<div
									style={{
										display: "flex",
										flex: 1,
										marginTop: "8px",
									}}
								>
									<Typography
										sx={{
											fontSize: "14px",
											fontWeight: "500",
											flex: 1,
										}}
									>
										{item.name}
									</Typography>
									<OutlinedButton
										onClick={() =>
											handleEditButtonClick(item)
										}
									>
										Edit
									</OutlinedButton>
								</div>
								{optionsArray.map((it, id) => {
									return (
										<Chip
											key={id}
											label={it}
											sx={{ mr: 2 }}
										/>
									);
								})}
							</div>
						);
					})}
				{/* Input Fields for adding variants */}
				{Array.isArray(productOptions) &&
					productOptions.map((item, index) => {
						return (
							<div key={index}>
								<div
									style={{
										display: "flex",
										// alignItems: "center",
										flex: 1,
										alignItems: "center",
									}}
								>
									<div
										style={{
											display: "flex",
											flex: 1,
											// alignItems: "center",
										}}
									>
										<FormSelectInput
											value={{
												label: item.name,
												value: item.name,
											}}
											onChange={(e) =>
												handleNameChange(e, index)
											}
											options={filteredOptions}
											placeholder="Select Option"
											title={`Option Name`}
											containerStyles={{
												maxWidth: "150px",
												// marginTop: "8px",
											}}
										/>
										<TextInput
											value={item.options}
											onChange={(e) =>
												handleValueChange(e, index)
											}
											title={`Option Values`}
											placeholder="Enter option values separated by commas (,)"
											containerStyles={{
												marginLeft: "16px",
												marginTop: "16px",
											}}
											helperText={`Enter option values separated by commas (,)`}
											// multiline
											// minRows={2}
										/>
									</div>

									<IconButton
										onClick={(e) =>
											handleDeleteButtonClick(e, item)
										}
										sx={{ ml: 2, mt: 4 }}
									>
										<MdDelete />
									</IconButton>
								</div>
							</div>
						);
					})}
				<Stack
					direction={"row"}
					// alignItems="center"
					// maxWidth={"xs"}
					sx={{
						maxWidth: "300px",
						my: 2,
						py: 2,
					}}
				>
					{[...productOptions, ...selectedOptions].length < 4 && (
						<OutlinedButton
							onClick={() => handleAddOptions()}
							sx={{
								// marginTop: "8px",
								textTransform: "capitalize",
							}}
						>
							Add Another Option
						</OutlinedButton>
					)}
					<PrimaryButton
						sx={{
							// marginTop: "16px"
							ml: 2,
						}}
						onClick={() => handleClickDoneButton()}
						disabled={disableDoneButton}
					>
						Done
					</PrimaryButton>
				</Stack>
			</Box>
			<Box
				sx={{
					margin: hideContinueNavigation ? "0px" : "auto",
					maxWidth: "800px",
					pb: 2,
				}}
			>
				<Typography
					sx={{
						fontSize: "14px",
						lineHeight: "19px",
						fontWeight: "500",
						color: (theme) => theme.palette.grey[800],
						"& span": {
							fontWeight: "600",
							fontSize: "16px",
							// mr: 1,
						},
					}}
				>
					<span>Set Defaults: </span>
					<CheckboxInput
						label={"Use Default SKU"}
						checkboxProps={{
							sx: {
								color: "black",
							},
							onChange: handleChangeSKU,
						}}
						value={hasDefaultSKU}
						// setValue={setHasDefaultSKU}

						// onChange={(e) => setHasDefaultSKU(e.target.checked)}
					/>
					<CheckboxInput
						label={"Use Same Price as product"}
						checkboxProps={{
							sx: {
								color: "black",
							},
						}}
						value={hasDefaultRetailPrice}
						setValue={setHasDefaultRetailPrice}
						// onChange={(e) =>
						// 	setHasDefaultRetailPrice(e.target.checked)
						// }
					/>
					<CheckboxInput
						label={"Use Same cost as product"}
						checkboxProps={{
							sx: {
								color: "black",
							},
						}}
						value={hasDefaultCostPrice}
						setValue={setHasDefaultCostPrice}
						onChange={(e) =>
							setHasDefaultCostPrice(e.target.checked)
						}
					/>
					<PrimaryButton
						onClick={() => handleAddProduct()}
						disabled={disableUpdateDataButton}
					>
						Update Data
					</PrimaryButton>
				</Typography>
			</Box>
			<Box>
				{Array.isArray(tableItems) && tableItems?.length > 0 && (
					<MuiBaseDataGrid
						containerStyles={{
							height: maxHeight,
						}}
						data={tableItems}
						columnDefData={columnData}
						rowIdkey={"master_item_id"}
						checkboxSelection={false}
					/>
				)}
			</Box>
			{hideContinueNavigation && (
				<Box
					sx={{
						position: "fixed",
						bottom: "0px",
					}}
				>
					<NewProductOnboardingBottomNavButtons
						disableSaveButton={disableButton}
						saveButtonClick={() => handleAddProduct()}
						saveButtonTitle={"Update Product"}
						hideTitle
					/>
				</Box>
			)}
			<AddVariantImageDialog
				open={openDialog}
				handleClose={() => setOpenDialog(false)}
				handleSaveButton
				handleSelectImageClick={handleSelectImageClick}
				keyForReduxStateData={keyForReduxStateData}
			/>
		</div>
	);
}

const options = ["Size", "Color", "Material", "Style"];
const optionsWithLabel = options.map((option) => ({
	label: option,
	value: option,
}));
