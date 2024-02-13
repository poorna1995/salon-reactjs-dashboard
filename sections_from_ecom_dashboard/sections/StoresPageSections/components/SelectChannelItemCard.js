import { CheckCircle } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import AppImage from "components/Common/AppImage";
import BaseCard from "components/Common/Cards/BaseCard";
import React from "react";

export default function SelectChannelItemCard({
	isSelected,
	icon,
	title,
	onClick,
}) {
	return (
		<BaseCard
			sx={{
				height: "190px",
				// width: "200px",
				boxShadow: "none",
				border: (theme) =>
					isSelected
						? `3px solid ${theme.palette.primary.main}`
						: `2px solid ${theme.palette.grey[300]}`,
				borderRadius: "10px",
				position: "relative",
				cursor: "pointer",
			}}
			onClick={onClick}
		>
			<CheckCircle
				sx={{
					color: (theme) =>
						isSelected
							? theme.palette.primary.main
							: theme.palette.grey[300],
					position: "absolute",
					right: "10px",
					top: "10px",
				}}
			/>
			<Box
				sx={{
					display: "grid",
					placeItems: "center",
					height: "inherit",
				}}
			>
				<div style={{ textAlign: "center" }}>
					{icon && icon}
					<Typography
						sx={{
							fontWeight: 600,
							fontSize: "20px",
							lineHeight: " 24px",
						}}
					>
						{title}
					</Typography>
				</div>
			</Box>
		</BaseCard>
	);
}
