import React from "react";
import { ReactComponent as LocationIcon } from "assets/svg/SelectLocation/buildingNew.svg";
import { makeStyles } from "@mui/styles";
import InfoIcon from "@mui/icons-material/Info";
import { Tooltip } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: "20px",
    marginTop: "60px",
    // position: "relative",
    "&:hover": {
      cursor: "pointer",
    },
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
  },
  el: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  circle: {
    background: "white",
    position: "absolute",
    top: "-30px",
    left: "38%",
    height: "60px",
    width: "60px",
    borderRadius: "50%",
    margin: "0 auto",
    boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.12)",
    [theme.breakpoints.down("sm")]: {
      "& svg": { width: "30px", height: "30px" },
      height: "50px",
      width: "50px",
      top: "-30px",
    },
  },
  title: {
    position: "relative",
    marginTop: "-30px",
    background: "#EDF4FF",
    padding: "50px",
    borderRadius: "10px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "14px",
      padding: "20px",
    },
  },
}));
const LocationItem = ({ data, onclick, titleStyle, conatinerStyle }) => {
  const classes = useStyles();
  const { company_name, working_time, company_address, company_location } =
    data || {};
  const { closing_time, starting_time, working_days } = working_time || {};
  let working_days_str = "";
  if (working_days) {
    working_days_str = working_days.map((item) => item.slice(0, 3)).join(", ");
  }

  const handleClick = () => {
    const updateData = {
      ...data,
      location: company_name,
      opening_days: `${starting_time} - ${closing_time}`,
      opening_time: working_days_str,
    };
    onclick(updateData);
  };

  return (
    <div
      className={classes.container}
      onClick={handleClick}
      style={{ ...conatinerStyle }}
    >

      <div
        className={`${classes.el} ${classes.title}`}
        style={{ ...titleStyle }}
      >
      <div className={`${classes.el} ${classes.circle}`}>
        <LocationIcon />
      </div>
        {company_location}
        <Tooltip title={company_address}>
          <InfoIcon
            style={{
              height: "18px",
            }}
          />
        </Tooltip>
        {/* <br />
        {company_address} */}
      </div>
    </div>
  );
};

export default LocationItem;
