import { Box, Typography } from "@mui/material";
import React from "react";
import CircleIcon from "@mui/icons-material/Circle";
function RenderStatus({ value }) {
	const capitalizeFirstLetter = (string) => {
		return string.charAt(0).toUpperCase() + string.slice(1);
	};
	return (
		<div>
			{value === "active" ? (
				<>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
						}}
					>
						<CircleIcon
							sx={{
								mr: "3px",
								color: "#12B76A",
								width: "6px",
								height: "8px",
							}}
						/>
						<Typography
							sx={{
								fontSize: "14px",
								fontWeight: "600",
								color: "#12B76A",
							}}
						>
							{capitalizeFirstLetter(value)}
						</Typography>
					</Box>
				</>
			) : (
				<Box sx={{ display: "flex", alignItems: "center" }}>
					<CircleIcon
						sx={{
							mr: "3px",
							color: "#F79009",
							width: "6px",
							height: "8px",
						}}
					/>
					<Typography
						sx={{
							fontSize: "14px",
							fontWeight: "600",
							color: "#F79009",
						}}
					>
						{capitalizeFirstLetter(value)}
					</Typography>
				</Box>
			)}
		</div>
	);
}

export default RenderStatus;
