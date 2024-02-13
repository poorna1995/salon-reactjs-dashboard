import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import LocationContainer from "./components/LocationContainer";
import { useTheme } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "left",
  },
}));

const SelectLocationPageSections = () => {
  const classes = useStyles();
  const theme = useTheme();
  const { company_base_id, branches } = useSelector(
    (state) => state.companyInfo
  );
  const branchesData = branches || [];

  return (
    <div className={classes.root}>
      {/* <LoadingBackdrop open={isLoading} /> */}
      {/* <ServiceHeader /> */}

      <LocationContainer data={branchesData} />

      {/* <Terms /> */}
    </div>
  );
};

export default SelectLocationPageSections;
