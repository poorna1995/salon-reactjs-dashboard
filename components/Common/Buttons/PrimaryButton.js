import { Button, styled } from "@mui/material";
import React from "react";
const StyledButton = styled(Button)(({ theme, ...props }) => ({
	textTransform: "initial",
	textTransform: "inherit",
	borderColor: "white",
	borderRadius: "5px",
	color: "white",
	paddingRight: "24px",
	paddingLeft: "24px",
	height: "42px",
	background: (theme) => theme.palette.primary.main,
	boxShadow: "none",

	"&:hover": {
		background: (theme) => theme.palette.primary.hover,
		boxShadow: "none",
		// opacity: 0.9,
	},
}));

const PrimaryButton = ({ children, ...props }) => {
	return (
		<StyledButton
			variant="contained"
			sx={{
				...props.sx,
			}}
			{...props}
		>
			{children}
		</StyledButton>
	);
};

export default PrimaryButton;
