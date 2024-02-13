import { CheckCircle } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { useRouter } from "next/router";
import React from "react";
import { MdCheckCircle } from "react-icons/md";

export default function AddNewStorePageSyncSection() {
	const router = useRouter();
	const handleClickGoToStore = () => {
		router.push("/app/stores");
	};
	return (
		<Box
			sx={{
				pt: 4,
				maxWidth: "400px",
				margin: "auto",
				textAlign: "center",
			}}
		>
			<SectionTitleText>Store Added Successfully</SectionTitleText>
			<DescriptionText>
				Your Shopify Store has been added to the account. Please wait
				while we sync the data
			</DescriptionText>

			<Box
				sx={{
					maxWidth: "200px",
					margin: "auto",
					mt: 4,
				}}
			>
				{data.map((item, index) => {
					return (
						<Box key={index} sx={{ display: "flex", mt: 2 }}>
							<CheckCircle sx={{ color: "#0FA958", mr: 2 }} />
							<Typography sx={{ color: "#0FA958" }}>
								{item.title}
							</Typography>
						</Box>
					);
				})}
			</Box>
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-around",
					mt: 4,
					maxWidth: "500px",
				}}
			>
				<PrimaryButton
					onClick={handleClickGoToStore}
					sx={{ width: "200px" }}
				>
					Go to Stores
				</PrimaryButton>
			</Box>
		</Box>
	);
}

const data = [
	{ title: "User Details Synced" },
	{ title: "Products Synced" },
	{ title: "Inventory Synced" },
	{ title: "Warehouses Synced" },
];
