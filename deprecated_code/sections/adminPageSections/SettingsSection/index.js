import React from "react";
import { Typography } from "@mui/material";
import BrandingSection from "./BrandingSection";
import AddToSiteSection from "./AddToSiteSection";
import { useTheme } from "@mui/styles";

const SettingsSection = () => {
  const theme = useTheme();
  return (
    <div>
      <Typography
        sx={{
          fontSize: "26px",
          fontWeight: "bold",
          [theme.breakpoints.down("sm")]: {
            fontSize: "18px",
          },
        }}
      >
        Settings
      </Typography>
      <BrandingSection />
      {/* <AddToSiteSection /> */}
    </div>
  );
};

export default SettingsSection;
