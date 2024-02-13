import React from "react";
import { Typography, Divider, Box } from "@mui/material";
import SecondaryButton from "components/common/Buttons/SecondaryButton";
import { useTheme } from "@mui/styles";

const AddToSiteSection = () => {
  const theme = useTheme();
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <Typography
          mr={2}
          sx={{
            fontSize: "18px",
            fontWeight: "bold",
            [theme.breakpoints.down("sm")]: {
              fontSize: "12px",
            },
          }}
        >
          Add to your site
        </Typography>
        <Divider style={{ width: "70%" }} />
      </div>

      <Box
        sx={{
          width: "70%",
          display: "flex",
          justifyContent: "space-around",
          [theme.breakpoints.down("sm")]: {
            width: "100%",
            display: "block",
            textAlign: "center",
            "& .MuiButton-root": {
              fontSize: "12px",
            },
          },
        }}
      >
        <Box
          sx={{
            width: "60%",
            [theme.breakpoints.down("sm")]: { width: "100%" },
          }}
        >
          <SecondaryButton
            title="Book appointment"
            style={{ height: "50px", marginBottom: "10px" }}
          />
          <Typography fontSize="12px" color="#26334D">
            Add a button to your site <br /> Handover the code to developers{" "}
          </Typography>
        </Box>
        <Box
          sx={{
            background: "#26334D0A",
            fontSize: "12px",
            width: "100%",
            padding: "20px",
            borderRadius: "10px",
            [theme.breakpoints.down("sm")]: { marginTop: "10px" },
          }}
        >
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged.
          <Typography color="#3361FF" fontSize="14px">
            Copy code
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default AddToSiteSection;
