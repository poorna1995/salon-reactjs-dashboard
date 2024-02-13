import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import SecondaryButton from "components/common/Buttons/SecondaryButton";
import AddCategory from "./components/Popups/AddCategory";
import ServiceList from "./ServiceList";
import { useTheme } from "@mui/styles";
import { useMediaQuery } from "@mui/material";

const ServicesContainer = () => {
  const theme = useTheme();
  const mobileView = theme.breakpoints.down("sm");
  const matches = useMediaQuery(mobileView);
  const addCategoryBtnStyle = matches
    ? {
        position: "fixed",
        bottom: "12px",
        right: "12px",
        zIndex: "1",
      }
    : {};
  const [addCategory, setAddCategory] = useState(false);
  const closeAddCategory = () => {
    setAddCategory(false);
  };

  return (
    <Box p={1}>
      <AddCategory open={addCategory} handleClose={closeAddCategory} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "20px",
            [theme.breakpoints.down("sm")]: {
              fontSize: "12px",
            },
          }}
        >
          Services offered
        </Typography>
        <SecondaryButton
          title="Add category"
          onClick={() => setAddCategory(true)}
          style={{ ...addCategoryBtnStyle }}
        />
      </div>
      <ServiceList />
    </Box>
  );
};

export default ServicesContainer;
