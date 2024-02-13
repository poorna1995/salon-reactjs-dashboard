import React from "react";
import Seo from "components/Seo";

import { makeStyles } from "@mui/styles";
// import logo from "../../assets/svg/logo.svg";
// import { Link } from "next";
import { Container, Typography } from "@mui/material";

//--------------------
import backgroundImage from "assets/svg/login/background.svg";
import hivepathLogoWhite from "assets/svg/login/hivepath-logo-white.svg";
import { useSelector } from "react-redux";
import Link from "next/link";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    background: "white",
    minHeight: "100vh",
  },
  children: {
    // maxWidth: "600px",
    margin: "auto",
    height: "100%",
    paddingBottom: theme.spacing(12),
    flex: 0.65,
    [theme.breakpoints.down("md")]: {
      width: "100%",
      flex: 1,
    },
  },

  logo: {
    width: "200px",
    height: "50px",
    objectFit: "contain",
    [theme.breakpoints.down("md")]: {
      height: "40px",
      width: "160px",
    },
  },
  header: {
    borderBottom: "1px solid rgba(0,0,0,0.1)",
    padding: theme.spacing(1),
    display: "none",
    [theme.breakpoints.down("md")]: {
      display: "flex",
    },
  },
  backgroundImage: {
    position: "relative",
    flex: 0.35,
    background: `url(${backgroundImage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    width: "100%",
    minHeight: "100vh",
    // height: "100%",
    top: "0px",

    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  logoContainer: {
    position: "sticky",
    top: "50px",
    left: "50px",
    display: "flex",
    justifyContent: "center",
  },
  textContainer: {
    top: "35vh",
    position: "sticky",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  textStyle: {
    fontWeight: " bold",
    fontSize: "36px !important",
    lineHeight: "44px",
    color: "white",
    textAlign: "center",
  },
}));

const AuthenticationLayout = ({ title, imgSrc, backgroundTitle, children }) => {
  const { company_logo } = useSelector((state) => state.companyInfo);
  const LOGO_URL = company_logo;

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Seo title={title} />
      <header className={classes.header}>
        <Container
          maxWidth="lg"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <img src={LOGO_URL} alt="" className={classes.logo} />

          {/* <OutlinedButton onClick={handleLogout} title="Logout" /> */}
        </Container>
      </header>
      <div
        style={{
          display: "flex",
          flex: 1,
          justifyContent: "start",
        }}
      >
        <div className={classes.backgroundImage}>
          {/* <img src={backgroundImage} alt="onboarding bg" /> */}

          <Link href="#" className={classes.logoContainer}>
            <img src={LOGO_URL} alt="" className={classes.logo} />
          </Link>
          <div className={classes.textContainer}>
            <Typography className={classes.textStyle}>
              {backgroundTitle}
            </Typography>
            <img src={imgSrc} alt="" style={{ maxWidth: "100%" }} />
          </div>
        </div>
        <Container style={{}} className={classes.children}>
          {children}
        </Container>
      </div>
    </div>
  );
};

export default AuthenticationLayout;
