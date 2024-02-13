import { Tooltip, Typography } from "@mui/material";
import AppImage from "components/Common/AppImage";
import React from "react";

function RenderImageWithText({ display_image, title, ...props }) {
	function getStr1(str) {
		return str.length > 40 ? str.slice(0, 40) + ".." : str;

	}
	return (
		<>
			<AppImage
				sx={{ objectFit: "cover", borderRadius: "5px" }}
				width="45"
				height="45"
				src={display_image}
				{...props}
			/>

			<Typography
				sx={{
					// maxWidth:"250px",
					marginLeft: "16px",
					fontWeight: "500",
					fontSize: "14px",
					lineHeight: "20px",
					color: (theme) => theme.palette.primary.main,
					// wordBreak: "break-word",
				}}
			>
				<>
					<Tooltip title={title}>
						<span>{getStr1(title)}</span>
					</Tooltip>
				</>
			</Typography>
		</>
	);
}

export default RenderImageWithText;
