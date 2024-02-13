import { Box } from "@mui/material";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import BaseDialog from "components/Common/Dialog";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewProductImages } from "redux/products/productsSlice";
import { compressImageAndUpload } from "sections/ProductsPageSection/helpers/products.helpers";
import ProductOnboardingProductImagesSection from "../ProductOnboardingSection/components/ProductOnboardingProductImagesSection";

const mapState = ({ productsData, user }) => ({
	productsData,
	currentUser: user.currentUser,
});

export default function AddVariantImageDialog({
	open,
	handleClose,
	handleSaveButton,
	handleSelectImageClick,
	keyForReduxStateData,
}) {
	const { productsData, currentUser } = useSelector(mapState);
	const productImages = productsData[keyForReduxStateData].images;
	const inputRef = React.useRef();
	const [selectedFile, setSelectedFile] = React.useState("");
	const USER_ID = currentUser.merchant_id;
	const dispatch = useDispatch();
	const [selectedImage, setSelectedImage] = React.useState(null);
	const handleFileSelect = async (e) => {
		// const file = e.target.files[0];
		const files = e.target.files;
		// setSelectedFile(file);
		// setLoading(true);
		console.log({ files });
		if (files.length > 0) {
			for (let i = 0; i < files.length; i++) {
				const file = files[i];
				// setLoading(true);
				compressImageAndUpload(e, file, USER_ID).then((res) => {
					console.log({ res });
					dispatch(
						addNewProductImages({
							image: res,
							keyForReduxStateData,
						}),
					);
					// setLoading(false);
				});
			}
		}
	};
	const handleSelectImage = (e, image) => {
		setSelectedImage(image);
		console.log({ image });
	};
	const handleClickSaveButton = () => {
		handleSelectImageClick(selectedImage);
		console.log({ selectedImage });
	};

	// const showProductImages = productImages.map((item) => {
	// 	return {
	// 		...item,
	// 		isSelected: item.id === selectedImage?.id,
	// 	};
	// });
	return (
		<BaseDialog open={open} handleClose={handleClose}>
			<Box
				sx={{
					minWidth: "600px",
					maxWidth: "800px",
					margin: "auto",
					width: "100%",
				}}
			>
				<SectionTitleText>Update Variant Image</SectionTitleText>
				<Box>
					<ProductOnboardingProductImagesSection
						productImages={productImages}
						hideDeleteButton
						primaryButtonTitle={"Select Image"}
						handleSelectPrimaryButtonClick={handleSelectImage}
						inputRef={inputRef}
						handleFileSelect={handleFileSelect}
						selectedImage={selectedImage}
					/>
				</Box>
				<Box sx={{ my: 2, display: "flex", justifyContent: "center" }}>
					<OutlinedButton onClick={() => handleClose()}>
						Cancel
					</OutlinedButton>
					<PrimaryButton
						sx={{
							ml: 2,
						}}
						onClick={() => handleClickSaveButton()}
					>
						Save
					</PrimaryButton>
				</Box>
			</Box>
		</BaseDialog>
	);
}
