import { Box, Container, Divider, Grid, Typography } from "@mui/material";
import { minWidth } from "@mui/system";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import FormSelectInput from "components/Common/Inputs/SelectInput";
import MuiSelectInput from "components/Common/Inputs/SelectInput/MuiSelectInput";
import TextInput from "components/Common/Inputs/TextInput";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { WAREHOUSE } from "constants/API_URL";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import appFetch from "utils/appFetch";

const mapState = ({ user }) => ({
	currentUser: user.currentUser,
});

const textContainerStyle = {
	maxWidth: "100%",
	marginTop: "16px",
};
const containerStyle = {
	maxWidth: "100%",
	marginTop: "8px	",
};
function WarehouseOnboardingSection() {
	const { currentUser } = useSelector(mapState);
	const router = useRouter();
	const maxWidth = typeof window !== "undefined" && window.innerWidth - 850;
	const [warehouseName, setWarehouseName] = React.useState("");
	const [contactName, setContactName] = React.useState("");
	const [email, setEmail] = React.useState("");
	const [phoneNumber, setPhoneNumber] = React.useState("");
	const [address, setAddress] = React.useState("");
	const [zipCode, setZipCode] = React.useState("");
	const [country, setCountry] = React.useState("");
	const [state, setState] = React.useState("");
	const [city, setCity] = React.useState("");

	const handleRegisterWarehouse = () => {
		const URL = WAREHOUSE.ADD_WAREHOUSE;
		const data = {
			user_id: currentUser.merchant_id,
			wh_name: warehouseName,
			contact_name: contactName,
			email: email,
			phone: phoneNumber,
			address_1: address,
			zipcode: zipCode,
			city: city?.value,
			state: state?.value,
			country: country?.value,
		};

		appFetch(URL, data)
			.then((json) => {
				console.log({ json });
				router.push("/app/warehouse");
			})
			.catch((error) => {
				console.log({ error });
			});
	};

	console.log({ country, state, city });
	return (
		<>
			<Container maxWidth="md">
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						position: "fixed",
						top: "64.5px",
						// minWidth: minWidth,
						width: "50.5%",
						width: maxWidth,
						zIndex: "100",
						backgroundColor: "white",
						height: "70px",
					}}
				>
					<SectionTitleText>Add new Warehouse</SectionTitleText>
					{warehouseName.length > 0 ? (
						<PrimaryButton
							onClick={() => handleRegisterWarehouse()}
						>
							Save
						</PrimaryButton>
					) : (
						<PrimaryButton disabled={true}>Save</PrimaryButton>
					)}
				</Box>
				<Box sx={{ mt: "70px" }}>
					<Typography sx={{ fontSize: "18px", fontWeight: "600" }}>
						General Details
					</Typography>
					<Divider sx={{ mt: "8px" }} />
					<TextInput
						title="WareHouse Name"
						value={warehouseName}
						containerStyles={textContainerStyle}
						onChange={(e) => setWarehouseName(e.target.value)}
					/>
					<TextInput
						title="Contact Name"
						value={contactName}
						containerStyles={textContainerStyle}
						onChange={(e) => setContactName(e.target.value)}
					/>
					<TextInput
						title="Email"
						value={email}
						containerStyles={textContainerStyle}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<TextInput
						title="Phone Number"
						value={phoneNumber}
						containerStyles={textContainerStyle}
						onChange={(e) => setPhoneNumber(e.target.value)}
					/>
					<Divider sx={{ mt: "21px" }} />
				</Box>
				<Box sx={{ mb: "30px" }}>
					<TextInput
						title="Address"
						value={address}
						containerStyles={textContainerStyle}
						multiline
						onChange={(e) => setAddress(e.target.value)}
					/>
					<TextInput
						title="Zip Code"
						value={zipCode}
						containerStyles={textContainerStyle}
						onChange={(e) => setZipCode(e.target.value)}
					/>
					<FormSelectInput
						title="Country"
						options={[
							{ value: "India", label: "India" },
							{ value: "USA", label: "USA" },
							{ value: "UK", label: "UK" },
						]}
						value={country}
						onChange={(e) => setCountry(e)}
					/>
					<FormSelectInput
						title="State"
						options={[
							{ value: "Karnataka", label: "Karnataka" },
							{ value: "Tamil Nadu", label: "Tamil Nadu" },
							{ value: "Kerala", label: "Kerala" },
						]}
						value={state}
						onChange={(e) => setState(e)}
					/>
					<FormSelectInput
						title="City"
						options={[
							{ value: "Bangalore", label: "Bangalore" },
							{ value: "Mysore", label: "Mysore" },

							{ value: "Chennai", label: "Chennai" },
							{ value: "Coimbatore", label: "Coimbatore" },
						]}
						value={city}
						onChange={(e) => setCity(e)}
					/>
				</Box>
			</Container>
		</>
	);
}

export default WarehouseOnboardingSection;
