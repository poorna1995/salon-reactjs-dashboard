import { InputLabel } from "@mui/material";
import React from "react";
import Select from "react-select";

const customStyles = {
	control: (styles) => ({
		...styles,
		paddingTop: "6px",
		paddingBottom: "7px",
		borderRadius: "5px",
		// fontFamily: "Mulish, sans-serif",
		// "& :hover": {
		// 	borderColor: "black",
		// },
	}),
	menu: (provided) => ({
		...provided,
		zIndex: 99999,
		// fontFamily: "Mulish, sans-serif",
	}),
	indicatorSeparator: (styles) => ({
		...styles,
		display: "none",
	}),
};
const FormSelectInput = ({
	title,
	required,
	options,
	labelStyles,
	noPadding,
	styles,
	containerStyles,
	inputRef,
	...props
}) => {
	const ref = React.createRef();
	return (
		<div
			style={{
				paddingTop: noPadding ? "0px" : "24px",
				width: "100%",
				...containerStyles,
			}}
			ref={inputRef}
		>
			{title && (
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
			)}
			<Select
				{...props}
				ref={ref}
				styles={styles || customStyles}
				closeMenuOnSelect
				theme={(theme) => ({
					...theme,
					// colors: {
					//   ...theme.colors,
					//   primary: "#5860D7",
					// },
					// color: "#1570EF",
          

					// color: theme.palette.blue[600],
					// borderColor: theme.primary,
				})}
				options={options}
			/>
		</div>
	);
};

export default FormSelectInput;
