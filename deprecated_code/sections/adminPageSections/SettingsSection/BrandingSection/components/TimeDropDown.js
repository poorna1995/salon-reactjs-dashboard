import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Typography } from "@mui/material";

export default function SelectAutoWidth({
  options,
  title,
  label,
  onChange,
  name,
  defaultValue,
  styles,
  containerStyles,
  ...props
}) {
  const [value, setValue] = React.useState(defaultValue || "");

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value);
    onChange(name, event.target.value);
  };

  return (
    <div
      style={{ marginRight: "5px", position: "relative", ...containerStyles }}
    >
      {title && (
        <Typography
          fontSize={"14px"}
          style={{ position: "absolute", top: "-30px", width: "100px" }}
        >
          {title}
        </Typography>
      )}
      <FormControl
        sx={{
          m: 1,
          minWidth: 60,
          height: 40,
          margin: "0",
          background: "rgba(38, 51, 77, 0.05) !important",
          //   border: "1px solid rgba(38, 51, 77, 0.15)",
          boxShadow: "none",
          "& .MuiSvgIcon-root": { display: "none" },
          "& .MuiInputLabel-root": { top: "-5px !important", fontSize: "14px" },
          ...styles,
        }}
      >
        {label && (
          <InputLabel
            id="demo-simple-select-autowidth-label"
            style={{ fontWeight: "500" }}
          >
            {label}
          </InputLabel>
        )}
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          value={value}
          onChange={handleChange}
          autoWidth
          label={label && label}
          sx={{ height: "100% !important" }}
          {...props}
        >
          {options.map((item) => {
            const { value, label } = item;
            return (
              <MenuItem value={value} sx={{ fontSize: "14px" }}>
                {label}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
}
