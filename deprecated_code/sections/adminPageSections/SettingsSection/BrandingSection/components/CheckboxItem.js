import React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const CheckboxItem = ({ title, onChange, isChecked }) => {
  const onChangeHandler = (e) => {
    const isChecked = e.target.checked;
    onChange(title, isChecked);
  };
  return (
    <FormControlLabel
      value="end"
      control={<Checkbox onChange={onChangeHandler} checked={isChecked} />}
      label={title.slice(0, 3)}
      labelPlacement="end"
    />
  );
};

export default CheckboxItem;
