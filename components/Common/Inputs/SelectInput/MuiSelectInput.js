import {
	Autocomplete,
	Box,
	InputLabel,
	styled,
	TextField,
} from "@mui/material";
import React from "react";
const StyledContainer = styled("div")(({ theme }) => ({
	display: "flex",
	flexDirection: "column",
	justifyContent: "space-evenly",
	// maxWidth: "600px",
	height: "100%",
	width: "100%",
	margin: "auto",
	marginTop: "24px",
}));
const StyledLabel = styled(InputLabel)(({ theme }) => ({
	color: "#475467",
	margin: theme.spacing(1),
	marginLeft: 0,
	marginBottom: "8px",
	fontSize: "14px",
	fontWeight: 600,
	lineHeight: "20px",
	letterSpacing: "-3%",
}));
export default function MuiSelectInput({
	options = [],
	value,
	setValue,
	label,
	containerStyles,
	title,
	required,
	...props
}) {
	return (
		<StyledContainer style={containerStyles}>
			{title && <StyledLabel required={required}>{title}</StyledLabel>}
			<Autocomplete
				value={value}
				onChange={(event, newValue) => {
					setValue(newValue);
				}}
				// getOptionLabel={(option) => option.label}
				isOptionEqualToValue={(option, value) =>
					option.label === value?.label
				}
				options={options}
				selectOnFocus
				renderInput={(params) => (
					<TextField
						{...params}
						label={label}
						sx={{
							"& .MuiOutlinedInput-root": {
								borderRadius: "5px",
							},
						}}
						// margin="dense"
					/>
				)}
				{...props}
			/>
		</StyledContainer>
	);
}
