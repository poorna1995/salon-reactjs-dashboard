import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import BaseDialog from "components/Common/Dialog";
import MuiBaseDataGrid from "components/Common/Tables/MuiBaseDataGrid";
import { PRODUCT, VENDOR } from "constants/API_URL";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedProductsForPO } from "redux/purchaseOrders/purchaseOrdersSlice";
import appFetch from "utils/appFetch";

const mapState = ({ user, purchaseOrdersData }) => ({
	currentUser: user.currentUser,
	selectedProductsFromState: purchaseOrdersData.selectedProducts,
});
export default function POAddProductsDialog({
	openDialog,
	handleDialogClose,
	addProductcolumnData,
	selectedVendorID,
}) {
	const { currentUser, selectedProductsFromState } = useSelector(mapState);

	const selectedProductsID =
		Array.isArray(selectedProductsFromState) &&
		selectedProductsFromState.map((product) => product.master_product_id);
	const [selectedProducts, setSelectedProducts] = React.useState(
		selectedProductsID ?? [],
	);
	useEffect(() => {
		setSelectedProducts(selectedProductsID);
	}, [selectedProductsFromState]);
	const dispatch = useDispatch();
	console.log({ selectedProductsFromState, selectedProducts });

	// const { data: productsList, isLoading } = useQuery({
	// 	queryKeys: ["productsList"],
	// 	queryFn: () =>
	// 		appFetch(PRODUCT.MERCHANT.FETCH_PRODUCT_MASTER, {
	// 			user_id: currentUser.merchant_id,
	// 		}).then((json) => json.result),
	// });

	const [productsList, setProductsList] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(false);
	const handleFetchProducts = () => {
		setIsLoading(true);
		// const url = PRODUCT.MERCHANT.FETCH_PRODUCT_MASTER;
		// const data = {
		// 	user_id: currentUser.merchant_id,
		// };
		// appFetch(url, data)
		// 	.then((json) => {
		// 		setIsLoading(false);
		// 		if (json.status === "success") {
		// 			setProductsList(json.result);
		// 		}
		// 		console.log({ products: json });
		// 	})
		// 	.catch((err) => console.error(err));

		// {
		// 	"user_id":"138944605333795140",
		// 	"vendor_id":"1675591749374"
		// }

		const url = VENDOR.FETCH_VENDOR_ITEM;
		const data = {
			user_id: currentUser.merchant_id,
			vendor_id: selectedVendorID,
		};
		appFetch(url, data)
			.then((json) => {
				setIsLoading(false);
				if (json.status === "success") {
					setProductsList(json.result);
				}
				console.log({ products: json });
			})
			.catch((err) => console.error(err));
	};
	useEffect(() => {
		handleFetchProducts();
	}, [openDialog]);

	const productsListWithID =
		Array.isArray(productsList) &&
		productsList.map((product, index) => ({
			...product,
			id: product.master_product_id,
		}));

	const filterProductsList =
		Array.isArray(productsList) &&
		productsList.filter(
			(product) =>
				product.master_product_id === "" ||
				product.master_product_id === null ||
				product.master_product_id === undefined,
		);
	console.log({
		productsList,
		filterProductsList,
		productsListWithID,
		selectedProducts,
	});

	//  get the filtered products from products list based on the selected proudcts id

	const getFilteredProducts = () => {
		const filteredProducts = productsListWithID.filter((product) => {
			return selectedProducts.includes(product.master_item_id);
		});

		console.log({ filteredProducts });
		return filteredProducts;
	};
	const selectedProductsWithDetails = getFilteredProducts();
	console.log({ selectedProductsWithDetails });
	const handleAddSelectedProducts = () => {
		dispatch(setSelectedProductsForPO(selectedProductsWithDetails));
		setSelectedProducts([]);
		handleDialogClose();
	};

	return (
		<BaseDialog
			open={openDialog}
			handleClose={handleDialogClose}
			title="Add Products"
		>
			<Box
				sx={{
					marginY: "8px",
					marginX: "8px",
					width: "800px",
					height: "600px",
					display: "flex",
					flexDirection: "column",

					borderRadius: "12px",
					// "& svg": {
					// 	mb: "16px",
					// },
				}}
			>
				<MuiBaseDataGrid
					columns={addProductcolumnData}
					data={productsListWithID}
					// hideFooter={true}
					rowIdkey={"master_item_id"}
					containerStyles={{
						height: "580px",
						// marginTop: "20px",
					}}
					loading={isLoading}
					onSelectionModelChange={(newSelectionModel) => {
						setSelectedProducts(newSelectionModel);
						// setSelectedProducts(newSelectionModel);
					}}
					selectionModel={selectedProducts}
					disableSelectionOnClick={false}
				/>

				<Box
					sx={{
						display: "flex",
						alignItems: "right",
						justifyContent: "right",
					}}
				>
					<PrimaryButton
						onClick={() => handleAddSelectedProducts()}
						sx={{
							mt: "12px",
							height: "44px",

							// backgroundColor: "#D92D20",
							// "&:hover": {
							// 	background: "#d91304",
							// },
						}}
					>
						Add Selected Product
					</PrimaryButton>
				</Box>
			</Box>
			{/* </Box> */}
		</BaseDialog>
	);
}
