import React from "react";
import { Box, Typography } from "@mui/material";
import LocationItem from "./LocationItem";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateServiceHeader } from "store/serviceHeader/serviceHeaderSlice";
import { useTheme } from "@mui/styles";

const LocationContainer = ({ data }) => {
  const { company_domain } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();
  const handleLocationClick = (data) => {
    dispatch(updateServiceHeader({ ...data }));
    navigate(`/${company_domain}/add-services`);
  };
  return (
    <Box
      style={{
        margin: "0 auto",
        // marginTop: "140px",
        marginTop: "200px",
        boxShadow: "0px 0px 24px rgba(0, 0, 0, 0.12)",
        borderRadius: "10px",
        padding: "30px 0",
        width: "70%",
        zIndex: "5",
      }}
    >
      <Typography
        fontWeight={"bold"}
        color="#26334D"
        sx={{
          textAlign: "center",
          fontSize: "26px",
          [theme.breakpoints.down("sm")]: {
            fontSize: "12px",
          },
        }}
      >
        Please select a branch
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: "40px",
          [theme.breakpoints.down("sm")]: {
            // display: "block",
            // padding: "0",
          },
        }}
      >
        {data.map((item, index) => (
          <LocationItem
            key={`li${index}`}
            data={item}
            onclick={handleLocationClick}
          />
        ))}
      </Box>
    </Box>
  );
};

export default LocationContainer;
