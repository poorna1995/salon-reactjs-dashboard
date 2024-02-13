import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  IconButton,
  Toolbar,
  Tooltip,
  useMediaQuery,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import hivepathLogo from "../../assets/svg/logo.svg";
import { useTheme } from "@mui/styles";
import RoundCornersButton from "../common/Buttons/RoundCornersButton";
import { useSelector, useDispatch } from "react-redux";
import { signOutUserSuccess } from "store/user/userSlice";
import MenuIcon from "@mui/icons-material/Menu";
import SuggestionDrawer from "components/common/Drawers/SuggestionDrawer";
import SuggestionDrawerLinks from "./SuggestionDrawerLinks";
import DropwDownMenuMain from "./DropDownMenu/DropDownMenuMain";

const useStyles = makeStyles((theme) => ({
  appbar: {
    boxShadow: " 0px 0px 3px rgba(0, 0, 0, 0.25) !important",
    background: "#fff !important",
    height: "80px",

    paddingTop: "8px",
    // paddingBottom: "8px",
    [theme.breakpoints.down("sm")]: {
      height: "72px",
    },
  },
  navigation: {
    display: "flex !important",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    // flexDirection: "row",
  },
  icon: {
    // background: "rgba(243, 243, 243, 1)",
    marginLeft: theme.spacing(1),
  },
  explore: {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  grow: {
    flex: 1,
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  hideOnMobileNavigation: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",

    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  logo: {
    width: "160px",
    height: "60px",
    marginLeft: "-24px",
    objectFit: "contain",
    [theme.breakpoints.down("md")]: {
      width: "160px",
      height: "36px",
    },
  },
  viewMore: {
    color: theme.palette.primary.main,
  },
  navLink: {
    marginRight: "20px",
    textDecoration: "none",
    color: "#4A4A4A",
  },
}));

const AppHeader = ({ isAdmin, height, position }) => {
  const { company_domain } = useParams();
  const dispatch = useDispatch();
  const { company_logo } = useSelector((state) => state.companyInfo);
  const theme = useTheme();
  const mobileView = theme.breakpoints.down("md");
  const matches = useMediaQuery(mobileView);
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);
  const handleOpenDrawer = () => {
    setOpenDrawer(true);
  };
  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  const handleToggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const handleLogout = () => {
    dispatch(signOutUserSuccess());
  };

  return (
    <div className={classes.root}>
      <AppBar
        className={classes.appbar}
        position="static"
        style={{ height: height, position: position }}
        elevation={0}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Box className={classes.navigation}>
            <>
              {" "}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {matches && (
                  <IconButton onClick={handleToggleDrawer}>
                    <MenuIcon />
                  </IconButton>
                )}

                <Link to={`/${company_domain}/dashboard`}>
                  <img
                    src={`${company_logo}` || hivepathLogo}
                    alt="Logo"
                    className={classes.logo}
                    style={{}}
                  />
                </Link>
              </div>
            </>
            <div className={classes.grow} />
            {/* <Button onClick={handleLogout}>Logout</Button> */}
            <DropwDownMenuMain handleLogout={handleLogout} />
            {!isAdmin && (
              <>
                <Link to="/" className={classes.navLink}>
                  About
                </Link>
                <Link to="/" className={classes.navLink}>
                  Contact
                </Link>
                <RoundCornersButton title="Book Appointment" />
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {matches && (
        <SuggestionDrawer
          anchor={"left"}
          open={openDrawer}
          closeDrawer={handleCloseDrawer}
          component={<SuggestionDrawerLinks />}
        />
      )}
    </div>
  );
};

export default AppHeader;
