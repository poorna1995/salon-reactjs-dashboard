import { Box } from "@mui/material";
import TextInput from "components/Common/Inputs/TextInput";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import React from "react";

export default function InventoryAvailableItem({ wh_name, wh_qty, onChange }) {
	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				marginTop: "8px",
			}}
		>
			<Box>
				<DescriptionText
					sx={{
						color: "#555555",
					}}
				>
					{wh_name}
				</DescriptionText>
			</Box>
			<Box>
				<TextInput
					placeholder="00"
					containerStyles={{
						marginTop: "8px",
					}}
					value={wh_qty}
					onChange={onChange}
				/>
			</Box>
		</Box>
	);
}
