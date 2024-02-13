import { Typography } from "@mui/material";
import React from "react";

const RenderHTML = ({ content }) => {
	return (
		<Typography
			sx={{
				fontFamily: "Inter, sans-serif !important",
				"& *": {
					fontFamily: "Inter, sans-serif !important",
				},
			}}
			dangerouslySetInnerHTML={{ __html: content }}
		></Typography>
	);
};

export default RenderHTML;
