import {
	Box,
	FormControlLabel,
	Grid,
	Radio,
	RadioGroup,
	Typography,
} from "@mui/material";
import TextInput from "components/Common/Inputs/TextInput";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { PRODUCT } from "constants/API_URL";
import {
	ContentState,
	convertFromHTML,
	convertToRaw,
	EditorState,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchEditProductDataStart,
	setCreateProductData,
	updateCreateProductData,
} from "redux/products/productsSlice";
import appFetch from "utils/appFetch";
import ProductOnboardingGeneralInfoSection from "../ProductOnboardingSection/components/ProductOnboardingGeneralInfoSection";
import ProductOnboardingInventoryInfoSection from "../ProductOnboardingSection/components/ProductOnboardingInventoryInfoSection";
import ProductOnboardingPriceInfoSection from "../ProductOnboardingSection/components/ProductOnboardingPriceInfoSection";
import ProductOnboardingProductOrganizationSection from "../ProductOnboardingSection/components/ProductOnboardingProductOrganizationSection";
import NewProductOnboardingBottomNavButtons from "./NewProductOnboardingBottomNavButtons";

import validator from "validator";
const mapState = ({ user, productsData }) => ({
	currentUser: user.currentUser,
	productsData,
});
export default function NewProductOnboardingProductDetailsSection({
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

	// state from redux store
	const productIdFromState = createProductData?.master_product_id;

	useEffect(() => {
		if (pageId && productIdFromState !== pageId) {
			dispatch(setCreateProductData({}));
		}
	}, [pageId, productIdFromState, dispatch]);

	const productHasVariantsFromState =
		createProductData?.hasVariants === false ? "no" : "yes";
	const titleFromState = createProductData?.product_title;
	const descriptionFromState = createProductData?.product_desc;
	const categoryFromState = createProductData?.category;
	const categoryWithLabel = {
		label: categoryFromState,
		value: categoryFromState,
	};
	const productTypeFromState = createProductData?.type;
	const productTypeWithLabel = {
		label: productTypeFromState,
		value: productTypeFromState,
	};

	const collectionFromState = createProductData?.collection;
	const collectionsWithLabel =
		Array.isArray(collectionFromState) &&
		collectionFromState.map((item) => ({
			label: item,
			value: item,
		}));
	const tagsFromState = createProductData?.tag;
	const tagsWithLabel =
		Array.isArray(tagsFromState) &&
		tagsFromState.map((item) => ({
			label: item,
			value: item,
		}));

	const skuFromState = createProductData?.product_sku;
	const barcodeFromState = createProductData?.barcode;
	const unitRetailPriceFromState = createProductData?.unit_retail_price;
	const unitCostPriceFromState = createProductData?.unit_cost_price;

	// state objects in component
	const [productHasVariants, setProductHasVariants] = useState(
		productHasVariantsFromState ?? "no",
	);
	const [title, setTitle] = useState(titleFromState ?? "");
	const [productDescription, setProductDescription] = useState(
		descriptionFromState ?? "",
	);

	const [productCategory, setProductCategory] = useState(
		categoryWithLabel ?? "",
	);
	const [productType, setProductType] = useState(productTypeWithLabel ?? "");
	const [tags, setTags] = useState(tagsWithLabel ?? []);
	const [collection, setCollection] = useState(collectionsWithLabel ?? []);

	const [loading, setLoading] = useState(false);

	const blocksFromHTML = convertFromHTML(productDescription);
	const sessionContent = ContentState.createFromBlockArray(blocksFromHTML);
	var myEditorState =
		EditorState.createWithContent(sessionContent) ||
		EditorState.createEmpty();

	const [editorState, setEditorState] = useState(myEditorState);

	useEffect(() => {
		setEditorState(myEditorState);
	}, [productDescription]);
	const onEditorStateChange = (editorState) => {
		setEditorState(editorState);
	};
	const sessionDescription = draftToHtml(
		convertToRaw(editorState.getCurrentContent()),
	);

	const [sku, setSKU] = useState(skuFromState ?? "");
	const [productBarCode, setProductBarCode] = useState(
		barcodeFromState ?? "",
	);
	const [unitRetailPrice, setUnitRetailPrice] = useState(
		unitRetailPriceFromState ?? "",
	);
	const [unitCostPrice, setUnitCostPrice] = useState(
		unitCostPriceFromState ?? "",
	);
	useEffect(() => {
		if (pageId !== productIdFromState) {
			setTitle(titleFromState ?? "");
			setProductDescription(descriptionFromState ?? "");
			setProductCategory(categoryWithLabel ?? "");
			setProductType(productTypeWithLabel ?? "");
			setTags(tagsWithLabel ?? []);
			setCollection(collectionsWithLabel ?? []);
			setSKU(skuFromState ?? "");
			setProductBarCode(barcodeFromState ?? "");
			setUnitRetailPrice(unitRetailPriceFromState ?? "");
			setUnitCostPrice(unitCostPriceFromState ?? "");
			setProductHasVariants(productHasVariantsFromState ?? "no");
		}
	}, [pageId, productIdFromState]);

	const resetForm = () => {
		setTitle("");
		// setDescription("");
		setUnitRetailPrice("");
		setEditorState(EditorState.createEmpty());
		setLoading(false);
	};

	const getItemValues = (list) => {
		const data =
			(Array.isArray(list) && list.map((item) => item.value)) || [];
		return data;
	};
	const collectionsValues = getItemValues(collection);
	const tagsValues = getItemValues(tags);

	// useEffect(() => {
	// 	dispatch(removeAllNewProductOptions());
	// 	dispatch(removeAllProductImages());
	// }, []);

	const handleBlurDescription = () => {
		// dispatch(setDraftSessionDescription(sessionDescription));
		setProductDescription(sessionDescription);
	};

	const handleChangeProductHasVariants = (e) => {
		setProductHasVariants(e.target.value);

		// dispatch(setSelectedPublishableStore(e.target.value));
	};

	const handleAddProduct = () => {
		const url = titleFromState
			? PRODUCT.MERCHANT.UPDATE_PRODUCT
			: PRODUCT.MERCHANT.ADD_PRODUCT;

		const data = {
			user_id: currentUser.merchant_id,
			product_id: pageId,
			master_product_id: pageId,
			product_desc: sessionDescription,
			product_title: title,
			status: "draft",
			category: productCategory.value,
			type: productType.value,
			tag: tagsValues,
			collection: collectionsValues,
			hasVariants: productHasVariants === "yes" ? true : false,
			unit_retail_price: unitRetailPrice,
			unit_cost_price: unitCostPrice,
			product_sku: sku,
			barcode: productBarCode,
		};
		// await addProduct(data, enqueueSnackbar);

		appFetch(url, data).then((json) => {
			if (json.status === "success") {
				enqueueSnackbar("Product Added Successfully", {
					variant: "success",
				});
				handleNextButton();

				if (titleFromState) {
					return dispatch(updateCreateProductData(data));
				}
				dispatch(setCreateProductData(data));
			}
		});
	};

	// disable the button if title is empty or contains only spaces, or if unitRetailPrice is 0, or if unitCostPrice is 0,
	// productCategory.value is empty or contains only spaces, or if productType.value is empty or contains only spaces
	// or if tagsValues is empty or contains only spaces, or if collectionsValues is empty or contains only spaces

	const disableButton =
		loading ||
		title?.length === 0 ||
		unitRetailPrice === 0 ||
		unitRetailPrice === undefined ||
		unitRetailPrice.length === 0 ||
		unitCostPrice === 0 ||
		unitCostPrice === undefined ||
		unitCostPrice.length === 0 ||
		unitRetailPrice < unitCostPrice ||
		productCategory?.value?.length === 0 ||
		productType?.value?.length === 0 ||
		tagsValues?.length === 0 ||
		collectionsValues?.length === 0 ||
		productBarCode?.length === 0 ||
		sku?.length === 0;

	const containerStyles = {
		padding: "2px",
		marginTop: "0px",
		boxShadow: "none",
		border: "none",
		borderRadius: "0",
	};

	const handleNextButton = () => {
		router.push(`/onboarding/products/${pageId}?step=media&id=1`);
	};
	// console.log({
	// 	tags,
	// 	collection,
	// 	productCategory,
	// 	productType,
	// 	tagsValues,
	// 	collectionsValues,
	// 	productHasVariants,
	// });
	const handleProductDetailsUpdate = () => {
		const URL = PRODUCT.MERCHANT.FETCH_PRODUCT_MASTER;

		const updateURL = PRODUCT.MERCHANT.UPDATE_PRODUCT;

		const updateData = {
			user_id: currentUser.merchant_id,
			product_id: pageId,
			master_product_id: createProductData.master_product_id,
			product_desc: sessionDescription,
			product_title: title,
			status: "draft",
			category: productCategory.value,
			type: productType.value,
			tag: tagsValues,
			collection: collectionsValues,
			hasVariants: productHasVariants === "yes" ? true : false,
			unit_retail_price: unitRetailPrice,
			unit_cost_price: unitCostPrice,
			product_sku: sku,
			barcode: productBarCode,
		};
		const data = {
			user_id: currentUser.merchant_id,
			master_product_id: createProductData.master_product_id,
		};

		appFetch(updateURL, updateData).then((json) => {
			if (json.status === "success") {
				enqueueSnackbar("Product Updated Successfully", {
					variant: "success",
				});
				dispatch(fetchEditProductDataStart({ url: URL, data }));

				// dispatch(updateCreateProductData(updateData));
			}
		});
	};

	return (
		<Box>
			{!hideContinueNavigation && (
				<Box
					sx={{
						position: "sticky",
						top: "65px",
						zIndex: (theme) => theme.zIndex.appBar,
					}}
				>
					<NewProductOnboardingBottomNavButtons
						disableSaveButton={disableButton}
						saveButtonClick={() => handleAddProduct()}
						maxWidthPage={"800px"}
					/>
				</Box>
			)}
			<Box
				sx={{
					maxWidth: "800px",
					margin: hideContinueNavigation ? "0px" : "auto",
					pb: 8,
				}}
			>
				{!hideContinueNavigation && (
					<Box
						sx={{
							py: 2,
							my: 2,
							borderBottom: (theme) =>
								`1px solid ${theme.palette.grey[200]}`,
						}}
					>
						<Typography
							sx={{
								fontWeight: 600,
								fontSize: "20px",
								lineHeight: " 24px",
							}}
						>
							Does this product has variants ?
						</Typography>

						<RadioGroup
							aria-labelledby="demo-controlled-radio-buttons-group"
							name="controlled-radio-buttons-group"
							value={productHasVariants}
							onChange={handleChangeProductHasVariants}
							row
						>
							<FormControlLabel
								value={"yes"}
								control={<Radio />}
								label={"Yes"}
							/>
							<FormControlLabel
								value={"no"}
								control={<Radio />}
								label={"No"}
							/>
						</RadioGroup>
					</Box>
				)}{" "}
				<ProductOnboardingGeneralInfoSection
					containerStyles={containerStyles}
					editorState={editorState}
					onEditorStateChange={onEditorStateChange}
					setTitle={setTitle}
					title={title}
				/>
				<ProductOnboardingPriceInfoSection
					containerStyles={{ ...containerStyles, my: 2 }}
					setUnitCostPrice={setUnitCostPrice}
					unitCostPrice={unitCostPrice}
					setUnitRetailPrice={setUnitRetailPrice}
					unitRetailPrice={unitRetailPrice}
				/>
				<ProductOnboardingInventoryInfoSection
					containerStyles={{ ...containerStyles, my: 2 }}
					barcode={productBarCode}
					setBarcode={setProductBarCode}
					setSKU={setSKU}
					sku={sku}
				/>
				<ProductOnboardingProductOrganizationSection
					collection={collection}
					productCategory={productCategory}
					productType={productType}
					setCollection={setCollection}
					setProductCategory={setProductCategory}
					setProductType={setProductType}
					setTags={setTags}
					tags={tags}
					containerStyles={containerStyles}
				/>{" "}
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
						saveButtonClick={() => handleProductDetailsUpdate()}
						saveButtonTitle={"Update Product"}
						hideTitle
					/>
				</Box>
			)}
		</Box>
	);
}
