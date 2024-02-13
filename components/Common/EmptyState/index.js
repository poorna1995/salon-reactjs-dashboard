import React from "react";
import placeholder from "public/assets/placeholder/empty_state.png";
import { Box } from "@mui/material";
import AppImage from "../AppImage";
import DescriptionText from "../Typography/BodyText/DescriptionText";

export default function EmptyState({ text }) {
	return (
		<Box sx={{ height: "400px", display: "grid", placeItems: "center" }}>
			<AppImage src={placeholder} width="150" height="150" />
			<DescriptionText>{text || "No data found"}</DescriptionText>
		</Box>
	);
}
