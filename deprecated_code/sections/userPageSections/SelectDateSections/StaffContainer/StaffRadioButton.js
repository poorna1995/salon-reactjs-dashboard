import React from "react";
import { FormControlLabel, Radio } from "@mui/material";

const StaffRadioButton = ({ label, onclick }) => {
	const handleOnclick = () => {
		onclick(label);
	};
	return (
		<FormControlLabel
			value={label}
			control={<Radio />}
			label={label}
			onClick={handleOnclick}
			sx={{
				border: "1px solid rgba(38, 51, 77, 0.1)",
				borderRadius: "5px",
				padding: "3px 10px",
				margin:"5px"
			}}
		/>
	);
};

export default StaffRadioButton;
