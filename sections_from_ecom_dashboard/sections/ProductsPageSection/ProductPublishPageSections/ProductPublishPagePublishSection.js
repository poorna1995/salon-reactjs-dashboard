import { Box, Grid, Typography } from "@mui/material";
import AppImage from "components/Common/AppImage";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import BaseCard from "components/Common/Cards/BaseCard";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import React, { useEffect, useMemo, useState } from "react";
import placeholderImage from "public/assets/t-shirt.png";
import appFetch from "utils/appFetch";
import ProductPublishPagePublishSuccessSection from "./ProductPublishPagePublishSuccessSection";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { CHANNEL, PRODUCT } from "constants/API_URL";
import PublishPageCard from "./components/PublishPageCard";
import PublishPageNavBar from "./components/PublishPageNavBar";
import { useSnackbar } from "notistack";
import { useQuery } from "@tanstack/react-query";
import PreviewProductComponent from "./components/PreviewProductComponent";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import {
	setPublishStatus,
	setPublishTaskID,
} from "redux/products/productsSlice";

const mapState = ({ views, user, productsData }) => ({
	pageView: views.productPageView,
	currentUser: user.currentUser,
	selectedProducts: productsData?.selectedProducts,
	selectedStore: productsData?.selectedStore,
});
export default function ProductPublishPagePublishSection({
	handleClickContinueButton,
	handleClickBackButton,
	pageLabel,
}) {
	const { pageView, currentUser, selectedStore } = useSelector(mapState);

	const router = useRouter();
	const publishProductID = router.query.publishProductID;
	const status = router.query.status;
	const dispatch = useDispatch();
	const [isLoading, setIsLoading] = useState(false);
	const [data, setData] = useState([]);
	const [channels, setChannels] = useState([]);
	const [checkFieldsLoading, setCheckFieldsLoading] = useState(false);
	const [publishLoading, setPublishLoading] = useState(false);
	const [errorFields, setErrorFields] = useState([]);
	const [publishFailedMessage, setPublishFailedMessage] = useState("");

	const { enqueueSnackbar } = useSnackbar();

	const requestUrl = PRODUCT.MERCHANT.FETCH_REVIEW_PRODUCT_DETAILS;

	//  use react query to fetch reviewed products details
	const {
		data: reviewedProduct,
		isLoading: isReviewedProductLoading,
		error: error1,
		refetch: refetchReviewedProduct,
	} = useQuery({
		queryKey: ["reviewProduct", publishProductID],
		queryFn: () =>
			appFetch(requestUrl, {
				user_id: currentUser.merchant_id,
				master_product_id: [publishProductID],
			}).then((json) => json.result[0]),
	});

	const { data: connectedApps } = useQuery({
		queryKey: ["connectedApps"],
		queryFn: () =>
			appFetch(CHANNEL.FETCH_CONNECTED_APPS, {
				user_id: currentUser.merchant_id,
			}).then((json) => json.result),
	});
	const getConnectedStoreInfo =
		Array.isArray(connectedApps) &&
		connectedApps.filter((app) => {
			return app.shop === selectedStore;
		});
	// console.log({ getConnectedStoreInfo });
	const connectedStoreInfo =
		getConnectedStoreInfo.length > 0 && getConnectedStoreInfo[0];

	// console.log({ reviewedProducts, reviewedProduct });

	const formattedReviewProduct = {
		...reviewedProduct,
		price: reviewedProduct?.unit_retail_price,
		store_id: reviewedProduct && connectedStoreInfo?.store_id,
	};

	const singlePublishProduct = () => {
		setIsLoading(true);
		// setCheckFieldsLoading(true);
		const url = PRODUCT.BULK_PRODUCT_PUBLISH;
		const data = {
			master_product_id: [publishProductID],
			user_id: currentUser.merchant_id,
			shop: [selectedStore],
			// product: [formattedReviewProduct],
		};

		// setPublishLoading(true);
		// setPublishFailedMessage("");
		appFetch(url, data)
			.then((res) => {
				enqueueSnackbar(res.message);
				if (res.status === "success") {
					// setIsLoading(false);
					// setPublishLoading(false);
					// handlePublishSingleProductSuccess();
					router.push(`/app/jobs/${res.task_id}`);
					dispatch(setPublishTaskID(res.task_id));
					dispatch(setPublishStatus({}));
				}
				// setPublishLoading(false);

				// setIsLoading(false);
			})
			.catch((error) => {
				console.log(error);
				// setPublishFailedMessage(
				// 	"Something went wrong. Please try again later.",
				// );
				// setPublishLoading(false);
				// enqueueSnackbar("Something went wrong!", { variant: "error" });
			})
			.finally(() => setPublishLoading(false));
		// setCheckFieldsLoading(false);
		// setIsLoading(false);
	};

	const handleFetchProducts = () => {
		setIsLoading(true);
		const url = PRODUCT.MERCHANT.FETCH_PRODUCT_MASTER;
		const data = {
			user_id: currentUser.merchant_id,
			master_product_id: publishProductID,
		};
		appFetch(url, data)
			.then((json) => {
				setIsLoading(false);
				if (json.status === "success") {
					setData(json.result);
				}
			})
			.catch((err) => console.error(err));
	};
	const handleCheckFields = () => {
		setCheckFieldsLoading(true);
		setErrorFields({});

		const data = {
			master_product_id: [publishProductID],
			user_id: currentUser.merchant_id,
			shop: [selectedStore],
		};
		appFetch(PRODUCT.CHECK_PRODUCT_FIELDS, data)
			.then((json) => {
				console.log("json", json);
				setCheckFieldsLoading(false);
				if (json.status === "success") {
					setErrorFields(json.message[0]);
					console.log("inside single publish page", json);
				}
			})
			.catch((err) => console.log(err));
	};
	const handleRefetchProduct = async () => {
		await refetchReviewedProduct();
		await handleCheckFields();
	};

	useEffect(() => {
		if (formattedReviewProduct) handleCheckFields();
	}, [reviewedProduct]);
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
	const productDetails = Array.isArray(data) && data.length > 0 && data[0];

	const handlePublishSingleProductSuccess = () => {
		router.push(
			`/app/products/publish/${publishProductID}/publish?status=success`,
		);
	};

	if (status === "success")
		return <ProductPublishPagePublishSuccessSection />;

	return (
		<div style={{ cursor: isLoading && "wait" }}>
			<PublishPageNavBar
				handleClickContinueButton={handleClickContinueButton}
				handleClickBackButton={handleClickBackButton}
				pageLabel={pageLabel}
			/>
			<PublishPageCard>
				<SectionTitleText>Publish</SectionTitleText>
				<DescriptionText
					sx={{
						maxWidth: "750px",
						color: (theme) => theme.palette.grey[600],
						fontSize: "18px",
						fontWeight: "500",
						lineHeight: "150%",
					}}
				>
					Product details have been updated successfully. You can now
					publish your product using the Publish Products button.
				</DescriptionText>

				{publishProductID && (
					<PreviewProductComponent
						display_image={productDetails.display_image}
						product_title={productDetails.product_title}
						productId={productDetails.master_product_id}
						publishLoading={publishLoading}
						hideProductControls
						isSinglePublish
						isLoading={checkFieldsLoading}
						data={errorFields}
						publishFailedMessage={publishFailedMessage}
						handleRefetch={handleRefetchProduct}
					/>
				)}
				{/* {errorFields.error === false && ( */}
				<PrimaryButton
					sx={{
						marginTop: "15px",
						marginLeft: "8px",
						height: "42px",
						width: "159px",
						fontSize: "14px",
					}}
					onClick={() => singlePublishProduct()}
					disabled={isLoading}
				>
					Publish Product
				</PrimaryButton>
				{/* )} */}
			</PublishPageCard>
		</div>
	);
}
