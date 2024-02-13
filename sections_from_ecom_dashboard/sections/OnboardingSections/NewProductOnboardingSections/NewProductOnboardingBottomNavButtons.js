import { Box } from "@mui/material";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import React from "react";

export default function NewProductOnboardingBottomNavButtons({
	maxWidthPage,
	resetForm,
	saveButtonClick,
	disableSaveButton,
	saveButtonTitle,
	hideTitle,
}) {
	return (
		<Box
			sx={{
				background: "#fff",
				display: "flex",
				flex: 1,
				// justifyContent: "space-around",
			}}
		>
			<Box
				sx={{
					margin: "auto",
					maxWidth: "100%",
					width: "100%",
					borderBottom: (theme) =>
						!hideTitle && `1px solid ${theme.palette.grey[300]}`,
					py: "16px",
					borderTop: (theme) =>
						hideTitle && `1px solid ${theme.palette.grey[300]}`,
					// mt: hideTitle && 2,
				}}
			>
				<Box
					sx={{
						margin: hideTitle ? 0 : "auto",
						maxWidth: "800px",
						width: "800px",
						display: "flex",
						flex: 1,
						alignItems: "center",
					}}
				>
					{!hideTitle && (
						<SectionTitleText
							sx={{
								flex: 1,
							}}
						>
							Add New Product
						</SectionTitleText>
					)}
					<div style={{ flex: 1 }} />
					{/* <OutlinedButton
						sx={{ ml: 1, flex: 0.5 }}
						onClick={() => saveButtonClick()}
						disabled={disableSaveButton}
					>
						{`Discard Changes`}
					</OutlinedButton> */}
					<PrimaryButton
						sx={{ ml: 1, flex: 0.5 }}
						onClick={() => saveButtonClick()}
						disabled={disableSaveButton}
					>
						{saveButtonTitle ? saveButtonTitle : "Save & Continue"}
					</PrimaryButton>
				</Box>
			</Box>
		</Box>
	);
}
