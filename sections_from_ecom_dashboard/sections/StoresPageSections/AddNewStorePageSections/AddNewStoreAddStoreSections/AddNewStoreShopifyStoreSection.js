import { Alert, Box, Typography } from "@mui/material";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import ShopifyIcon from "components/Common/Icons/StoresIcon/ShopifyIcon";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import React from "react";

export default function AddNewStoreShopifyStoreSection() {
	const handleClickInstallApp = () => {
		window.open("https://accounts.shopify.com/store-login", "_blank");
	};
	return (
		<Box sx={{ pt: 4 }}>
			<SectionTitleText>Add your Shopify Store</SectionTitleText>
			<DescriptionText>
				Add your store which you want to integrate with our app
			</DescriptionText>
			<Box sx={{ mt: 3, mb: 4, display: "flex", alignItems: "center" }}>
				<Typography
					sx={{
						fontWeight: 600,
						fontSize: "18px",
						lineHeight: "22px",
					}}
				>
					Selected Channel :
				</Typography>
				<Typography
					sx={{
						display: "flex",
						alignItems: "center",
						py: 1,
						px: 2,
						"& svg": {
							height: "20px",
							width: "20px",
							mr: 2,
						},
						fontWeight: 500,
						fontSize: "16px",
						lineHeight: " 19px",
						border: (theme) =>
							`1px solid ${theme.palette.grey[200]}`,
						borderRadius: "5px",
						ml: 2,
					}}
				>
					<ShopifyIcon /> <span>Shopify</span>
				</Typography>
			</Box>
			<Alert severity="info">
				<Typography>
					By clicking button below you will be redirected to Shopify.
					Click Install App to install the application to your Shopify
					store and Sync the data.
				</Typography>
			</Alert>
			<Box
				sx={{ display: "flex", mt: 4, justifyContent: "space-around" }}
			>
				<PrimaryButton
					// onClick={() => handleClickProceed()}
					sx={{ width: "200px" }}
					// disabled={disableButton}
					onClick={handleClickInstallApp}
				>
					Install App on Shopify
				</PrimaryButton>
			</Box>
		</Box>
	);
}
