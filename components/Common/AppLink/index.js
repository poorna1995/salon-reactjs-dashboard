import { styled } from "@mui/material";
import Link from "next/link";
import React from "react";

const StyledLink = styled(Link)(({ theme }) => ({
	cursor: "pointer",
	// marginRight: "16px",

	fontFamily: theme.typography.fontFamily,
	color: theme.palette.primary.main,
	textDecoration: "none",

}));

const AppLink = ({ children, ...props }) => {
	return (
		// <Link {...props}>
		<StyledLink sx={props.sx} {...props}>
			{children}
		</StyledLink>
		// </Link>
	);
};

export default AppLink;
