import { Box, Grid } from "@mui/material";
import BaseCard from "components/Common/Cards/BaseCard";
import TextInput from "components/Common/Inputs/TextInput";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import React, { useState } from "react";
import ProductOnboardingSectionContainer from "./ProductOnboardingSectionContainer";

export default function ProductOnboardingPriceInfoSection({
	unitRetailPrice,
	setUnitRetailPrice,
	unitCostPrice,
	setUnitCostPrice,
	containerStyles,
}) {
	// const [isError, setIsError] = useState(false);
	return (
		<ProductOnboardingSectionContainer
			containerStyles={containerStyles}
			// sx={{
			// 	padding: "16px",
			// 	paddingBottom: "32px",
			// 	// maxWidth: "600px",
			// 	marginTop: "16px",
			// 	border: "1px solid rgba(0,0,0,0.1)",
			// 	boxShadow: "none",
			// }}
		>
			<SectionTitleText
				sx={
					{
						// paddingBottom: "16px",
						// borderBottom: "1px solid rgba(0,0,0,0.1)",
					}
				}
			>
				Price
			</SectionTitleText>
			<Grid container spacing={2} alignItems='flex-start'>
				<Grid item md={6}>
					{" "}
					<TextInput
						title="Selling price"
						required
						value={unitRetailPrice}
						onChange={(e) => setUnitRetailPrice(e.target.value)}
						containerStyles={{
							maxWidth: "100%",
							marginTop: "8px",
						}}
						min={0}
						type="number"
						// onBlur={() => setIsError(true)}
						// error={unitRetailPrice <= unitCostPrice}
						helperText={
							unitRetailPrice <= unitCostPrice &&
							"Retail price should be greater than cost price"
						}
					/>
				</Grid>
				<Grid item md={6}>
					<TextInput
						title="Cost price"
						value={unitCostPrice}
						onChange={(e) => setUnitCostPrice(e.target.value)}
						containerStyles={{
							maxWidth: "100%",
							marginTop: "8px",
						}}
						min={0}
						type="number"
					/>
				</Grid>
			</Grid>

			{/* {unitRetailPrice !== 0 && unitCostPrice !== 0 && (
				<Grid container sx={{ marginTop: "16px" }}>
					<Grid item xs={6}>
						<DescriptionText
							sx={{
								color: (theme) => theme.palette.grey[600],
								fontSize: "16px",
								lineHeight: "20px",
								fontWeight: 500,
							}}
						>
							Margin
						</DescriptionText>
						{unitRetailPrice && unitRetailPrice && (
							<DescriptionText
								sx={{
									fontSize: "16px",
									lineHeight: "20px",
									fontWeight: "600",
									color: (theme) => theme.palette.grey[800],
								}}
							>
								{((unitRetailPrice - unitCostPrice) /
									unitCostPrice) *
									100}{" "}
								%
							</DescriptionText>
						)}{" "}
					</Grid>
					<Grid item xs={6}>
						<DescriptionText
							sx={{
								color: (theme) => theme.palette.grey[600],
								fontSize: "16px",
								lineHeight: "20px",
								fontWeight: 500,
							}}
						>
							Profit
						</DescriptionText>
						{unitRetailPrice && unitCostPrice && (
							<DescriptionText
								sx={{
									fontSize: "16px",
									lineHeight: "20px",
									fontWeight: "600",
									color: (theme) => theme.palette.grey[800],
								}}
							>
								Rs. {unitRetailPrice - unitCostPrice}
							</DescriptionText>
						)}
					</Grid>
				</Grid>
			)} */}
		</ProductOnboardingSectionContainer>
	);
}
