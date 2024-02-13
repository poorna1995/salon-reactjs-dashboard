import { Button } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import React from "react";

const useStyles = makeStyles((theme) => ({
  button: {
    width: "auto",
    backgroundColor: "#3361FF1A !important",
    color: "#3361FF !important",
    textTransform: "none !important",
    fontWeight: "700 !important",
    fontSize: "16px",
    paddingLeft: "24px !important",
    paddingRight: "24px !important",
    borderRadius: "10px !important",
    "&:hover": {
      background: "rgba(72, 74, 158, 0.8)",
    },
    [theme.breakpoints.down("sm")]: {
      height: "42px",
      // width: "130px",
      fontWeight: "500",
    },
  },
  disabled: {
    background: "#ECECEC !important",
    color: "white !important",
  },
}));
const PrimaryButton = ({ title, disabled, ...props }) => {
  const classes = useStyles();

  return (
    <>
      {disabled === true ? (
        <Button
          disabled
          disableRipple
          className={`${classes.button} ${classes.disabled}`}
          {...props}
        >
          {title}
        </Button>
      ) : (
        <Button disableRipple className={classes.button} {...props}>
          {title}
        </Button>
      )}
    </>
  );
};

export default PrimaryButton;
