import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import ODUserCard from "sections/adminPageSections/ServicesSection/components/ODUserCard";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/styles";

const DSWelcomeSection = ({ data }) => {
  const theme = useTheme();
  const { firstname } = useSelector((state) => state.user.currentUser);
  return (
    <Box>
      <Typography
        sx={{
          fontWeight: 700,
          fontSize: "26px",
          lineHeight: "53px",
          color: "#000000",
          [theme.breakpoints.down("sm")]: {
            fontSize: "18px",
          },
        }}
      >
        Hello {firstname}
      </Typography>

      <Grid container spacing={2} paddingBottom={`16px`}>
        {data.map((item) => {
          return (
            <Grid
              item
              md={4}
              xs={6}
              sx={{
                [theme.breakpoints.down("sm")]: {
                  paddingRight: "5px",
                },
              }}
            >
              <ODUserCard
                count={item.count}
                title={item.title}
                styles={item?.styles}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default DSWelcomeSection;
