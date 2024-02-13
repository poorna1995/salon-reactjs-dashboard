import { Backdrop, Box, CircularProgress } from "@mui/material";
import React from "react";

const SectionLoader = ({}) => {
	return (
		<Box
			sx={{
				width: "100%",
				height: "400px",
				display: "grid",
				placeItems: "center",
			}}
		>
			<CircularProgress color="primary" />
		</Box>
	);
};

export default SectionLoader;
