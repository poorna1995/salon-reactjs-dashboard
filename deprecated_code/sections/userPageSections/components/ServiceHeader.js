import React from "react";
import { Typography, Grid, Box, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { ReactComponent as EditIcon } from "assets/svg/service-header/edit-white.svg";
import { ReactComponent as LocationIcon } from "assets/svg/service-header/location-white.svg";
import { useTheme } from "@mui/styles";
import { useMediaQuery } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "140px",
    // minHeight: "120px",
    background: "#0A122E",
    padding: "20px",
    textAlign: "left",
    width: "100%",
    position: "fixed",
    // top: "80px",
    zIndex: "5",
    display: "flex",
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      height: "160px",
    },
  },
}));

const ServiceHeader = () => {
  const { company_domain } = useParams();
  const classes = useStyles();
  const theme = useTheme();
  const mobileView = theme.breakpoints.down("sm");
  const matches = useMediaQuery(mobileView);

  const { location, opening_days, opening_time } = useSelector(
    (state) => state.serviceHeader
  );
  const { company_base_name, company_logo } = useSelector(
    (state) => state.companyInfo
  );

  const navigateHome = () => {
    window.location.href = `/${company_domain}`;
  };

  return (
    <div className={classes.root}>
      <Grid container sx={{ maxWidth: "1440px" }}>
        <Grid item md={6} xs={12}>
          <Box
            sx={{
              display: "flex",
              padding: "10px 40px",
              [theme.breakpoints.down("sm")]: {
                padding: "10px 10px",
                display: "flex",
                // justifyContent: "space-between",
                "& img": {
                  height: "50px !important",
                  width: "50px !important",
                },
              },
            }}
          >
            <a href={`https://store.hivepath.io/${company_domain}`}>
              <img
                src={company_logo}
                style={{
                  height: "100px",
                  width: "100px",
                  borderRadius: "10px",
                  marginRight: "20px",
                }}
              />
            </a>

            <div>
              <Typography
                variant="h6"
                color="#fff"
                fontWeight="bold"
                fontSize="28px"
                title={company_base_name}
                sx={{
                  paddingRight: "10px",
                  [theme.breakpoints.down("sm")]: {
                    fontSize: "20px",
                  },

                  display: "-webkit-box",
                  overflow: "hidden",
                  WebkitBoxOrient: "vertical",
                  WebkitLineClamp: 2,
                }}
              >
                {company_base_name}
              </Typography>
              <div style={{ display: "flex" }}>
                {location && (
                  <>
                    <Typography
                      fontSize="16px"
                      color="#fff"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        [theme.breakpoints.down("sm")]: {
                          fontSize: "10px",
                          "& svg": {
                            height: "20px",
                            width: "20px",
                            marginRight: "0 !important",
                          },
                        },
                      }}
                    >
                      <LocationIcon style={{ marginRight: "10px" }} />{" "}
                      {location}{" "}
                    </Typography>

                    <Button
                      onClick={navigateHome}
                      sx={{
                        color: "white",
                        marginLeft: "30px",
                        fontSize: "16px",
                        textTransform: "none",
                        [theme.breakpoints.down("sm")]: {
                          marginLeft: "0",
                          fontSize: "10px",
                          "& svg": {
                            height: "20px",
                            width: "20px",
                            marginRight: "0 !important",
                          },
                        },
                      }}
                    >
                      {" "}
                      <EditIcon style={{ marginRight: "5px" }} /> Change
                    </Button>
                  </>
                )}
              </div>
            </div>
          </Box>
        </Grid>
        <Grid
          item
          md={6}
          xs={12}
          sx={{
            display: { md: "flex", xs: "block" },
            justifyContent: "center",
          }}
        >
          {opening_time && (
            <Box
              sx={{
                "& .MuiTypography-root": {
                  fontSize: "16px",
                },
                [theme.breakpoints.down("sm")]: {
                  "& .MuiTypography-root": {
                    fontSize: "12px",
                  },
                },
              }}
            >
              <Typography
                color="#fff"
                fontWeight="bold"
                sx={{
                  opacity: "0.6",
                  [theme.breakpoints.down("sm")]: {
                    // marginTop: "5px",
                  },
                }}
                mb={1}
              >
                Working Hours
              </Typography>
              <Typography
                color="#fff"
                sx={{
                  [theme.breakpoints.down("sm")]: {
                    display: "inline",
                  },
                }}
                mb={1}
              >
                {opening_time}{" "}
                {matches && <span style={{ marginLeft: "10px" }}>•</span>}
              </Typography>
              <Typography
                color="#fff"
                sx={{
                  [theme.breakpoints.down("sm")]: {
                    display: "inline",
                    marginLeft: "10px",
                  },
                }}
              >
                {opening_days}
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default ServiceHeader;
