import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
  button: {
    // width: "auto !important",
    // height: "50px !important",
    borderRadius: "10px !important",
    color: "black !important",
    fontSize: "16px !important",
    lineHeight: "28px !important",
    // fontWeight: "600 !important",
    // background: "#ececec !important",
    paddingLeft: "24px !important",
    paddingRight: "24px !important",
    border: "1px solid #DADEE6 !important",
    textTransform: "none !important",
    // borderColor: theme.palette.primary.main,
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      height: "42px",
      // width: "100px",
      fontWeight: "500",
    },
  },
}));
const OutlinedButton = ({ title, ...props }) => {
  const classes = useStyles();

  return (
    <Button className={classes.button} {...props}>
      {title}
    </Button>
  );
};

export default OutlinedButton;
