import { InputLabel, useTheme } from "@mui/material";
import React from "react";
import makeAnimated from "react-select/animated";
import Select from "react-select";
const animatedComponents = makeAnimated();

const MultipleSelect = ({ title, options, required, ...props }) => {
  // const ref = React.createRef();
  const muiTheme = useTheme();
  
const customStyles = {
  multiValueRemove: (styles) => ({
    ...styles,
    ":hover": {
      backgroundColor: muiTheme.palette.primary.main,
      color: "white",
    },
  }),
  control: (styles) => ({
    ...styles,
    paddingTop: "5px",
    paddingBottom: "5px",
    ":hover": {
      borderColor: "black",
    },
  }),
};
  return (
    <div style={{ paddingTop: "24px" }}>
      <InputLabel
        style={{ color: "black", marginBottom: "8px", fontWeight: "bold" }}
      >
        {title}
        {required && "*"}
      </InputLabel>
      <Select
        // ref={ref}
        isMulti
        styles={customStyles}
        components={animatedComponents}
        options={options}
        theme={(theme) => ({
          ...theme,
          // borderRadius: 0,
          colors: {
            ...theme.colors,
            primary: muiTheme.palette.primary.main,
          },
          borderColor: theme.primary,
        })}
        {...props}
      />
    </div>
  );
};

export default MultipleSelect;
