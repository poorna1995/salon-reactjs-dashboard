import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductOnboardingProductImagesSection from "../ProductOnboardingSection/components/ProductOnboardingProductImagesSection";
import NewProductOnboardingBottomNavButtons from "./NewProductOnboardingBottomNavButtons";
import imageCompression from "browser-image-compression";
import {
	addNewProductImages,
	deleteNewproductImage,
	fetchEditProductDataStart,
	updateCreateProductData,
} from "redux/products/productsSlice";
import { PRODUCT } from "constants/API_URL";
import appFetch from "utils/appFetch";
import { Box } from "@mui/material";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import AppImage from "components/Common/AppImage";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import { compressImageAndUpload } from "sections/ProductsPageSection/helpers/products.helpers";
import PageLoader from "components/Common/LoadingIndicators/PageLoader";
const mapState = ({ user, productsData }) => ({
	currentUser: user.currentUser,
	// newProductImages: productsData.newProductImages,
	// createProductData: productsData.createProductData,
	productsData,
});
export default function NewProductOnboardingProductMediaSection({
	keyForReduxStateData,
	hideContinueNavigation,
}) {
	const { currentUser, productsData } = useSelector(mapState);
	const productImages = productsData[keyForReduxStateData].images;
	// ??
	// productsData.newProductImages;
	// createProductData?.images ?? newProductImages;
	const router = useRouter();
	const pageId = router.query.pageId;
	const step = router.query.step;
	const { enqueueSnackbar } = useSnackbar();
	const dispatch = useDispatch();
	const USER_ID = currentUser.merchant_id;
	const createProductData = productsData[keyForReduxStateData];
	const primaryImageFromState = createProductData?.display_image;

	const [loading, setLoading] = useState(false);

	const inputRef = React.useRef();
	const [selectedFile, setSelectedFile] = React.useState("");
	const [showSelectedFile, setShowSelectedFile] = useState(false);
	const [primaryImage, setPrimaryImage] = useState(
		primaryImageFromState ?? null,
	);

	const handleFileSelect = async (e) => {
		// const file = e.target.files[0];
		const files = e.target.files;
		// setSelectedFile(file);
		setShowSelectedFile(true);
		setLoading(true);
		console.log({ files });
		if (files.length > 0) {
			for (let i = 0; i < files.length; i++) {
				const file = files[i];
				setLoading(true);
				compressImageAndUpload(e, file, USER_ID).then((res) => {
					console.log({ res });
					dispatch(
						addNewProductImages({
							image: res,
							keyForReduxStateData,
						}),
					);
					setLoading(false);
				});
			}
		}
	};
	// console.log({ selectedFile });
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

	// useEffect(() => {
	// 	dispatch(removeAllNewProductOptions());
	// 	dispatch(removeAllProductImages());
	// }, []);

	// const compressImageAndUpload = async (e, file) => {
	// 	e.preventDefault();
	// 	const imageFile = file;
	// 	// console.log("originalFile instanceof Blob", imageFile instanceof Blob); // true
	// 	// console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

	// 	// dispatch(setSectionLoading(true));
	// 	const options = {
	// 		maxSizeMB: 0.5,
	// 		maxWidthOrHeight: 1920,
	// 		useWebWorker: true,
	// 	};
	// 	try {
	// 		const compressedFile = await imageCompression(imageFile, options);
	// 		await handleProductImageUpload(compressedFile); // write your own logic
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// };

	// const handleProductImageUpload = (file) => {
	// 	// setLoading(true);
	// 	const formData = new FormData();

	// 	formData.append("file", file);

	// 	const url = `https://ecom.hivepath.io/api/mediaUpload?user_id=${USER_ID}&type=product_image&category=product_image`;
	// 	fetch(url, {
	// 		method: "POST",
	// 		body: formData,
	// 	})
	// 		.then((res) => res.json())
	// 		.then((json) => {
	// 			// console.log("File Upload", json);

	// 			if (json.status === "success") {
	// 				dispatch(
	// 					addNewProductImages({
	// 						image: `https://${json.file_url}`,
	// 						keyForReduxStateData,
	// 					}),
	// 				);
	// 				enqueueSnackbar(json.message);
	// 				setSelectedFile(null);

	// 				setLoading(false);
	// 			}
	// 		})
	// 		.catch((err) => {
	// 			console.error(err);
	// 			setLoading(false);
	// 			enqueueSnackbar("Cannot complete action", {
	// 				variant: "error",
	// 			});
	// 		});
	// };
	const handleDeleteThumbnail = (e, file_url) => {
		const url = "https://ecom.hivepath.io/api/mediaUpload";
		const data = { file_url: file_url, user_id: USER_ID };
		// let arr = thumbnails.filter((item) => item !== file_url);
		// dispatch(deleteNewproductImage(file_url));

		fetch(url, {
			method: "DELETE",
			body: JSON.stringify(data),
		})
			.then((res) => res.json())
			.then((json) => {
				if (json.status === "success") {
					dispatch(
						deleteNewproductImage({
							image: file_url,
							keyForReduxStateData,
						}),
					);
				}
			});
	};
	const handleAddProduct = async (status) => {
		const url = PRODUCT.MERCHANT.UPDATE_PRODUCT;

		const data = {
			user_id: currentUser.merchant_id,
			master_product_id: pageId,

			display_image: primaryImage,
			images: productImages,
		};
		appFetch(url, data)
			.then((json) => {
				if (json.status === "success") {
					enqueueSnackbar(json.message);

					dispatch(updateCreateProductData(data));
					router.push(
						`/onboarding/products/${pageId}?step=variants&id=2`,
					);
				}
			})
			.catch((err) => console.error(err));
		// await addProduct(data, enqueueSnackbar);
		// router.push("/app/products");
	};

	const handleClickSelectPrimaryButton = (e, item) => {
		setPrimaryImage(item);
	};

	// filter the productImages array to remove the primary image
	const filteredProductImages =
		Array.isArray(productImages) &&
		productImages.filter((item) => item !== primaryImage);

	const disableButton = loading;
	// || title?.length === 0;
	// productDescription.length === 0 ||
	// unitRetailPrice === 0;

	const containerStyles = {
		padding: "2px",
		marginTop: "0px",
		boxShadow: "none",
		border: "none",
		borderRadius: "0",
	};
	const handleProductDetailsUpdate = () => {
		const URL = PRODUCT.MERCHANT.FETCH_PRODUCT_MASTER;

		const updateURL = PRODUCT.MERCHANT.UPDATE_PRODUCT;

		const updateData = {
			user_id: currentUser.merchant_id,
			master_product_id: createProductData.master_product_id,

			display_image: primaryImage ?? productImages[0],
			images: productImages,
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
			{loading && <PageLoader />}{" "}
			{!hideContinueNavigation && (
				<NewProductOnboardingBottomNavButtons
					maxWidthPage={"800px"}
					saveButtonClick={() => handleAddProduct()}
					// saveButtonTitle={"Save "}
				/>
			)}
			<Box
				sx={{
					maxWidth: "800px",
					margin: hideContinueNavigation ? "0px" : "auto",
					mt: 2,
				}}
			>
				{!hideContinueNavigation && (
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
						Add media
					</SectionTitleText>
				)}
				{primaryImage && (
					<Box
						sx={{
							mb: 2,
							pb: 2,
							borderBottom: (theme) =>
								`1px solid ${theme.palette.grey[200]}`,
						}}
					>
						<DescriptionText
							sx={{ mb: 2, fontSize: "16px", fontWeight: 500 }}
						>
							Primary Image
						</DescriptionText>
						<AppImage
							src={primaryImage}
							width={180}
							height={180}
							sx={{
								borderRadius: "10px",
								border: (theme) =>
									`1px dashed ${theme.palette.grey[200]}`,
							}}
						/>
					</Box>
				)}
				<ProductOnboardingProductImagesSection
					handleDeleteThumbnail={handleDeleteThumbnail}
					handleFileSelect={handleFileSelect}
					inputRef={inputRef}
					// placeholderImage={placeholderImage}
					productImages={filteredProductImages}
					containerStyles={containerStyles}
					handleSelectPrimaryButtonClick={
						handleClickSelectPrimaryButton
					}
					// title="Add Media"
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
