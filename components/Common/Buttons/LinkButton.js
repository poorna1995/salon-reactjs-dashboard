import React from "react";
import { Button, styled } from "@mui/material";

const StyledButton = styled(Button)(({ theme, ...props }) => ({
	textTransform: "initial",
	borderColor: "white",
	borderRadius: "5px",
	marginLeft: "-10px",
	display: "inline",
	// textDecoration: "underline",
	width: "100%",
	// color: "white",
	// paddingRight: "24px",
	paddingLeft: "20px",
	// height: "42px",
	// background: " #5860D7",
	color: "#1570EF",
	"&:hover": {
		color: "#1570EF",
	},
	"&:hover": {
		background: "none",

		// textDecoration: "underline",
	},
}));

export default function LinkButton({ children, ...props }) {
	return (
		<StyledButton
			sx={{
				...props.sx,
			}}
			{...props}
		>
			{children}
		</StyledButton>
	);
}
