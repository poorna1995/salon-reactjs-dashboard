import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { NavLink, useParams } from "react-router-dom";
import { useMediaQuery } from "@mui/material";

import { ReaactComponent as DashboardIcon } from "assets/svg/dashboard/dashboard.svg";
import { ReactComponent as SettingsIcon } from "assets/svg/dashboard/settings.svg";
import { ReactComponent as ServicesIcon } from "assets/svg/dashboard/services.svg";
import { ReactComponent as CalendarIcon } from "assets/svg/dashboard/calendar.svg";

import { useDispatch, useSelector } from "react-redux";
import { Tooltip, MenuItem } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Dashboard, Settings } from "@mui/icons-material";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "visible",
  borderRight: "none",

  background: "#F7f7f7",
  // boxShadow: "0px 0px 50px rgba(72, 74, 158, 0.04)",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(6)} + 1px)`,
  borderRight: "none",
  // boxShadow: "0px 0px 50px rgba(72, 74, 158, 0.04)",
  overflow: "visible",
  paddingLeft: "8px",
  paddingRight: "8px",
  // paddingLeft: "8px",
  // marginLeft: "-24px",

  background: "#F7f7f7",

  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
    overflow: "visible",
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  borderRight: "none",
  // overflow: "visible",
  boxSizing: "border-box",
  position: "relative",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),

    // overflow: "visible",
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),

    // overflow: "visible",
  }),
}));

const StyledMenuItem = styled(MenuItem, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({}));

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      // display: "none",
      // maxWidth: "100%",
    },
  },
  drawer: {
    [theme.breakpoints.down("sm")]: {
      // display: "none",
    },
  },
  menuItem: {
    display: "flex",
    alignItems: "center",
    margin: "10px",
    marginLeft: "16px",
    marginRight: "16px",
    "&:hover": {
      borderRadius: "10px",
      background: "rgba(0,0,0,0.04)",
      "& > div:first-child": {
        // background: "rgba(229, 79, 109, 0.1)",
      },
      "&>svg": {
        opacity: 1,

        fill: "rgba(56, 91, 215, 1)",
        color: "rgba(56, 91, 215, 1)",
      },
    },
  },
  listItemIcon: {
    // background: "#F8F8F8",
    padding: "8px",
    borderRadius: "7px",
    marginRight: "8px",
    "&:hover": {
      // background: "rgba(229, 79, 109, 0.1)",
    },
  },
  activeLink: {
    color: "#484a9e !important",
    background: "rgba(0,0,0,0.04) !important",
    fontWeight: "700 !important",
    fill: "#484a9e !important",
    borderRadius: "10px",
    // background:'#484a9e'
  },
  link: {
    color: "black",
  },
  icon: {
    // marginLeft: "8px",
    width: "20px",
    height: "20px",
  },
  activeIcon: {
    fill: "#484a9e",
  },
  mainContent: {
    flexGrow: 1,
    paddingLeft: "24px",
    paddingTop: "24px",
    background: "white",
    // bgcolor: "white",
    [theme.breakpoints.down("sm")]: {
      // flexGrow: 0,
      paddingLeft: "8px",
      paddingTop: "8px",
    },
  },
}));

export default function MiniDrawer({ children, paddingLeft }) {
  const { company_domain } = useParams();
  const classes = useStyles();
  const theme = useTheme();
  const mobileView = theme.breakpoints.down("sm");
  const matches = useMediaQuery(mobileView);

  const [open, setOpen] = React.useState(true);
  const dispatch = useDispatch();
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const handleDrawerState = () => {
    setOpen(!open);
  };

  const handleDialogOpen = () => setDialogOpen(true);

  const links = [
    {
      title: "Dashboard",
      url: `/${company_domain}/dashboard`,
      icon: Dashboard,
      exact: true,
      show: true,
    },
    {
      title: "Services",
      url: `/${company_domain}/services`,
      icon: ServicesIcon,
      show: true,
    },
    {
      title: "Calendar",
      url: `/${company_domain}/calendar`,
      icon: CalendarIcon,
      show: true,
    },
    {
      title: "Settings",
      url: `/${company_domain}/settings`,
      icon: SettingsIcon,
      show: true,
    },
  ];
  const filteredLinks = links;

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box className={classes.root}>
      <CssBaseline />
      {!matches && (
        <Drawer
          variant="permanent"
          open={open}
          style={{ position: "relative" }}
          className={classes.drawer}
        >
          {/* <DrawerHeader></DrawerHeader> */}
          <Toolbar style={{ height: "80px" }} />
          <Divider />
          <Tooltip
            title={open ? "Close drawer" : "Open drawer"}
            placement="right"
            arrow
          >
            <IconButton
              style={{
                marginTop: "8px",
                padding: "0",
                border: "1px solid",
                width: "25px",
                height: "25px",
                position: "absolute",
                top: "85px",
                right: "0px",
                // overflow: "visible",
              }}
              sx={{
                zIndex: (theme) => theme.zIndex.drawer + 1,
              }}
              onClick={handleDrawerState}
            >
              {open ? <MdChevronLeft /> : <MdChevronRight />}
            </IconButton>
          </Tooltip>

          <List style={{ marginTop: "32px" }}>
            {filteredLinks?.map((item, index) => {
              const { url, title, icon: Icon, exact, hasDivider, show } = item;

              return (
                <>
                  <Tooltip
                    key={`md${index}`}
                    title={title}
                    placement="right"
                    // style={{ display: open ? "none" : "" }}
                    arrow
                  >
                    <MenuItem
                      key={`mdm${index}`}
                      component={NavLink}
                      // activeClassName={classes.activeLink}
                      className={classes.menuItem}
                      to={url && url}
                      exact={exact && exact.toString()}
                      style={
                        open
                          ? {
                              margin: "8px",
                            }
                          : { margin: "0px" }
                      }
                    >
                      <ListItemIcon
                        key={`mdlii${index}`}
                        style={open ? {} : { marginLeft: "-12px" }}
                        className={classes.listItemIcon}
                      >
                        {Icon && <Icon className={classes.icon} />}
                      </ListItemIcon>
                      {open && (
                        <ListItemText
                          key={`mdlit${index}`}
                          primary={item.title}
                          primaryTypographyProps={{
                            // color: "black",
                            fontWeight: 600,
                            // marginLeft: "8px",
                          }}
                        />
                      )}
                    </MenuItem>
                  </Tooltip>
                  {hasDivider && <Divider key={`mdd${index}`} />}
                </>
              );
            })}
          </List>
        </Drawer>
      )}
      <Box
        component="main"
        style={{ paddingLeft: paddingLeft }}
        className={classes.mainContent}
      >
        {children}
      </Box>
    </Box>
  );
}
