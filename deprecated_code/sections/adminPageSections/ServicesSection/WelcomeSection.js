import React from "react";
import { Box, Typography, CardContent, Grid, Card } from "@mui/material";
import { useSelector } from "react-redux";
import ODUserCard from "./components/ODUserCard";
import { useTheme } from "@mui/styles";

const ODWelcomeSection = () => {
  const theme = useTheme();
  const { data } = useSelector((state) => state.services);
  const totalServices = data.reduce(
    (prev, current) => prev + current.service_list.length,
    0
  );

  const list = [
    {
      count: data.length,
      title: "Total categories",
      styles: { background: "#29CC3938" },
    },
    {
      count: totalServices,
      title: "Total services",
    },
  ];

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
        Services
      </Typography>

      <Grid container spacing={2} paddingBottom={`16px`}>
        {list.map((item) => {
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

export default ODWelcomeSection;
