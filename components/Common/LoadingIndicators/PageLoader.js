import { Backdrop, Box, CircularProgress } from "@mui/material";
import React from "react";

export default function PageLoader() {
	return (
		<Box
			sx={
				{
					// width: "100%",
					// height: "400px",
					// display: "grid",
					// placeItems: "center",
				}
			}
		>
			<Backdrop
				sx={{
					color: "#fff",
					zIndex: (theme) => theme.zIndex.drawer + 100000,
				}}
				open={true}
				// onClick={handleClose}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
		</Box>
	);
}
