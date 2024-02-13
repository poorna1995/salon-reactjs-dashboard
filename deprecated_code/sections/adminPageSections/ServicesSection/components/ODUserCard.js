import { Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/styles";

const ODUserCard = ({ count, title, styles }) => {
  const theme = useTheme();
  return (
    <Card
      sx={{
        background: "rgba(252, 236, 225, 0.6)",
        boxShadow: "none",
        borderRadius: "20px",
        ...styles,
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          [theme.breakpoints.down("sm")]: {
            paddingBottom: "0 !important",
            height: "130px",
          },
        }}
      >
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "18px",
            lineHeight: "29px",
            letterSpacing: "-0.01em",
            color: "#000000",
            [theme.breakpoints.down("sm")]: {
              fontSize: "13px",
            },
          }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            fontWeight: 700,
            fontSize: "40px",
            lineHeight: "62px",
            letterSpacing: " -0.01em",
            color: "#000000",
            [theme.breakpoints.down("sm")]: {
              fontSize: "22px",
            },
          }}
        >
          {count}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ODUserCard;
