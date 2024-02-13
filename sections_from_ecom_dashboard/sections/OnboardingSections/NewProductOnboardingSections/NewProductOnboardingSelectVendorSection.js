/* eslint-disable @next/next/no-img-element */
import {
	Box,
	FormControl,
	FormControlLabel,
	Grid,
	Radio,
	RadioGroup,
} from "@mui/material";
import TextInput from "components/Common/Inputs/TextInput";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { useRouter } from "next/router";
import React from "react";
import SelectVendorCard from "./components/SelectVendorCard";
import NewProductOnboardingBottomNavButtons from "./NewProductOnboardingBottomNavButtons";
import { PRODUCT, VENDOR } from "constants/API_URL";
import { useDispatch, useSelector } from "react-redux";
import appFetch from "utils/appFetch";
import { updateCreateProductData } from "redux/products/productsSlice";

const mapState = ({ user, productsData }) => ({
	currentUser: user.currentUser,
	productsData,
});
export default function NewProductOnboardingSelectVendorSection({
	keyForReduxStateData,
}) {
	const router = useRouter();
	const { step, id, pageId } = router.query;
	const { currentUser, productsData } = useSelector(mapState);
	const dispatch = useDispatch();

	const [selectedVendor, setSelectedVendor] = React.useState(null);
	const [searchValue, setSearchValue] = React.useState("");
	const [isLoading, setIsLoading] = React.useState(false);
	const [vendorsList, setVendorsList] = React.useState([]);

	const handleClick = (e, item) => {
		setSelectedVendor(item);
	};
	console.log({ selectedVendor });
	const handleClickNextButton = () => {
		router.push(`/onboarding/products/${pageId}?step=inventory&id=4`);
	};
	// const vendorsList = [
	// 	{
	// 		title: "Adidas",
	// 	},
	// 	{
	// 		title: "Nike",
	// 	},
	// ];
	const handleSearchValue = (e) => {
		setSearchValue(e.target.value);
		setIsLoading(true);
	};
	const handleSearchVendorOnBlur = (e) => {
		setIsLoading(true);
		const URL = VENDOR.SEARCH_VENDOR;
		const data = {
			user_id: currentUser.merchant_id,
			search_value: searchValue,
		};
		appFetch(URL, data).then((json) => {
			console.log({ json });
			setVendorsList(json.result);
			setIsLoading(false);
		});
	};

	React.useEffect(() => {
		handleSearchVendorOnBlur();
	}, []);

	const handleAddVendorToProduct = () => {
		const URL = PRODUCT.ADD_VENDOR;
		const data = {
			user_id: currentUser.merchant_id,
			master_product_id:
				productsData[keyForReduxStateData].master_product_id,
			vendor_id: [selectedVendor],
		};
		appFetch(URL, data)
			.then((json) => {
				console.log({ json });
				// setVendorsList(json.result);
				if (json.status === "success") {
					handleFetchProductData();
				}
				setIsLoading(false);
			})
			.catch((error) => console.error(error));
	};
	const handleFetchProductData = async () => {
		const url = PRODUCT.MERCHANT.FETCH_PRODUCT_MASTER;
		const data = {
			user_id: currentUser.merchant_id,
			master_product_id:
				productsData[keyForReduxStateData].master_product_id,
		};
		const json = await appFetch(url, data);
		if (json.status === "success") {
			dispatch(updateCreateProductData(json.result[0]));
			handleClickNextButton();
			// setTableItems(json.result[0].items);
			// dispatch(setCreateProductSelectedOptions(selectedOptions));
			// console.log({ json });
		}
	};

	return (
		<Box>
			<NewProductOnboardingBottomNavButtons
				maxWidthPage={"800px"}
				saveButtonClick={() => handleAddVendorToProduct()}
				// saveButtonTitle={"Save "}
			/>
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
					Vendor
				</SectionTitleText>
				<TextInput
					placeholder="Search Vendor"
					containerStyles={{
						maxWidth: "100%",
					}}
					value={searchValue}
					onChange={handleSearchValue}
					onKeyUp={handleSearchVendorOnBlur}
				/>
				{/* <input 
				onKey
				
				/> */}

				{/* 

Create a list of radio group items for showing the title and logo of the vendor.
*/}

				<FormControl component="fieldset">
					<RadioGroup
						aria-label="vendor"
						name="vendor"
						value={selectedVendor}
						onChange={(e) => handleClick(e, e.target.value)}
					>
						{Array.isArray(vendorsList) &&
							vendorsList.map((item, index) => {
								return (
									<FormControlLabel
										key={index}
										value={item.vendor_id}
										control={<Radio />}
										label={
											<Box
												sx={{
													display: "flex",
													alignItems: "center",
													span: {
														fontWeight: 600,
														fontSize: "18px",
														lineHeight: "22px",
													},
												}}
											>
												{item.logo && (
													<img
														src={item.logo}
														alt=""
														width="40"
														height="40"
														style={{
															borderRadius: "5px",
															maxWidth: "40px",
															maxHeight: "40px",
															objectFit:
																"contain",
														}}
													/>
												)}{" "}
												<span>
													{item?.company_name ??
														"Name will be added"}
												</span>
											</Box>
										}
									/>
								);
							})}
					</RadioGroup>
				</FormControl>
				{/* <Grid container spacing={2}>
					{" "}
					{[1, 2].map((item, index) => {
						return (
							<Grid item xs={6} md={3} key={index}>
								{" "}
								<SelectVendorCard
									title={`Vendor Name`}
									onClick={(e) => handleClick(e, item)}
									isSelected={selectedVendor === item}
								/>
							</Grid>
						);
					})}
				</Grid> */}
			</Box>
		</Box>
	);
}
