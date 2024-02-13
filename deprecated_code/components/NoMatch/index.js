import { Container, Typography } from "@mui/material";
import React from "react";

const NoMatchPath = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "grid",
        placeItems: "center",
      }}
    >
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: "800px",
        }}
      >
        <div
          style={{
            marginLeft: "24px",
          }}
        >
          <p
            style={{
              fontWeight: 700,
              fontSize: "36px",
              lineHeight: "44px",
              // marginTop: "-64px",
            }}
          >
            Page not found
          </p>
          <Typography
            style={{
              fontWeight: 500,
              marginBottom: "32px",
              marginTop: "32px",
            }}
          >
            <span
              style={{
                fontSize: "18px",
                lineHeight: "23px",
                color: "#141414",
              }}
            >
              We can’t seem to find the page you are looking for.
            </span>
          </Typography>
        </div>
      </Container>
    </div>
  );
};

export default NoMatchPath;
