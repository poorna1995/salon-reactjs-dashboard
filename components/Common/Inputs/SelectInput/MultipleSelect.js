import { InputLabel,useTheme } from "@mui/material";
import React from "react";
import makeAnimated from "react-select/animated";
import Select from "react-select";
// import { useTheme } from "@emotion/react";
const animatedComponents = makeAnimated();

const MultipleSelect = ({
	title,
	options,
	required,
	isDisabled,
	inputRef,
	labelStyles,
	containerStyles,
	...props
}) => {
	const ref = React.createRef();
	const theme = useTheme();

	const customStyles = {
		multiValueRemove: (styles) => ({
			...styles,
			":hover": {
				backgroundColor: theme.palette.primary.main,
				color: "white",
			},
		}),
		control: (styles) => ({
			...styles,
			paddingTop: "5px",
			paddingBottom: "5px",
			":hover": {
				borderColor: theme.palette.grey[800],
			},
			":focus-within": {
				borderColor: theme.palette.primary.main,
			},
		}),
	};

	return (
		<div style={{ paddingTop: "24px", ...containerStyles }} ref={inputRef}>
			<InputLabel
				style={
					labelStyles
						? labelStyles
						: {
								color: "#555555",
								// margin: theme.spacing(1),
								marginLeft: 0,
								marginBottom: "8px",
								fontSize: "14px",
								fontWeight: 500,
								lineHeight: "20px",
								letterSpacing: "-3%",
						  }
				}
			>
				{title}
				{required && "*"}
			</InputLabel>
			<Select
				ref={ref}
				isMulti
				styles={customStyles}
				components={animatedComponents}
				options={options}
				isDisabled={isDisabled}
				theme={(th) => ({
					...th,
					// borderRadius: 0,
					colors: {
						...th.colors,
						primary: theme.palette.primary.main,
					},
					borderColor: th.primary,
				})}
				{...props}
			/>
		</div>
	);
};

export default MultipleSelect;
