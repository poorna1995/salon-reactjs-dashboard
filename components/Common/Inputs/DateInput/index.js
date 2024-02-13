import React from "react";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { TextField } from "@mui/material";

export default function DateInput({ label,...props }) {
	const [value, setValue] = React.useState(null);
	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<DesktopDatePicker 
				label={label}
				
				value={value}
				onChange={(newValue) => {
					setValue(newValue);
				  }}
				renderInput={(params) => (
					<TextField 
					// size="small"
						{...params} 
						sx={{
							marginTop: "50px",
							"& .MuiOutlinedInput-root": {
								borderRadius: "5px",
								
							},
						}}
					/>
				)}
				{...props}
			/>
		</LocalizationProvider>
	);
}
