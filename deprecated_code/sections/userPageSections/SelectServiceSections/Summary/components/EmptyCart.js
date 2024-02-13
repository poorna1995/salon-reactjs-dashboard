import React from "react";
import { Typography, Divider } from "@mui/material";
import { ReactComponent as CartPlaceholder } from "assets/svg/cart/placeholder.svg";

import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: "40px",
    textAlign: "center",
    border: "1px solid rgba(38, 51, 77, 0.08)",
    borderRadius: "5px",
    opacity:"0.5"
  },
}));

const EmptyCart = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography fontSize="25px" mb={4}>Cart Empty</Typography>
      <CartPlaceholder />

      <Typography color={"#26334D"} fontSize="16px" mt={2}>
        Good looks give you the confidence you need!
        <br />
        <br />
        Go ahead & select our services.
      </Typography>
    </div>
  );
};

export default EmptyCart;
