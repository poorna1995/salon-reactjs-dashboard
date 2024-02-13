import { Button, styled } from "@mui/material";
import React from "react";

const StyledButton = styled(Button)(({ theme, ...props }) => ({
	textTransform: "initial",
	paddingRight: "24px",
	paddingLeft: "24px",
	height: "42px",
	// fontFamily: "Mulish, sans-serif",
	fontWeight: 500,
	fontSize: "14px",
	lineHeight: "30px",
	background: "white",

	borderRadius: "5px",
	color: theme.palette.grey[800],
	// borderColor: " #07617D",
	border: "1px solid",
	borderColor: theme.palette.grey["300"],

	"&:hover": {
		background: "white",
		borderColor: theme.palette.grey["500"],
	},
}));

const OutlinedButton = ({ children, ...props }) => {
	return (
		<StyledButton
			// variant="outlined"
			sx={{
				...props.sx,
			}}
			{...props}
		>
			{children}
		</StyledButton>
	);
};

export default OutlinedButton;
