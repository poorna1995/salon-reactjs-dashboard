import React from "react";
import throttle from "lodash/throttle";
import { Tab, Tabs } from "@mui/material";
import { withStyles, makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";

const tabHeight = 69;
const StyledTabs = withStyles({
  indicator: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    "& > div": {
      maxWidth: 30,
      width: "100%",
      backgroundColor: "#635ee7",
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <div /> }} />);

const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: "none !important",
    padding: "10px !important",
    height: tabHeight,
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    "&:focus": {
      opacity: 1,
    },
  },
}))((props) => <Tab disableRipple {...props} />);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  indicator: {
    padding: theme.spacing(1),
  },
  demo2: {
    backgroundColor: "#fff",
    boxShadow: "0px 0px 24px rgba(0, 0, 0, 0.12)",
    borderRadius: "10px",
    position: "sticky",
    padding: "10px",
    // paddingLeft: "10px",
    // top: "220px",
    top: "160px",
    left: 0,
    right: 0,
    width: "100%",
    zIndex: "5",
    "& .MuiTabs-indicator": {
      display: "none",
    },
    "& .Mui-selected": {
      background: "#EBEFFF",
      color: "#3361FF",
      fontWeight: "600",
      padding: "5px",
      height: "30px",
      borderRadius: "30px",
    },
    "& .MuiTabs-flexContainer": {
      alignItems: "center",
    },
    "& .MuiTabScrollButton-root": {
      width: "20px",
    },
  },
  tabPanel: {
    marginTop: "180px",
    marginBottom: "350px",
    paddingLeft: "20px",
    paddingRight: "20px",
  },
}));

/******* This is the scroll spy magic */
/*
Credits: Material UI
Source: 
https://github.com/mui-org/material-ui/blob/404c2ba16816f5c7ab7d8b2caf6bbc3d2218b820/docs/src/modules/utils/textToHash.js
*/
const makeUnique = (hash, unique, i = 1) => {
  const uniqueHash = i === 1 ? hash : `${hash}-${i}`;

  if (!unique[uniqueHash]) {
    unique[uniqueHash] = true;
    return uniqueHash;
  }

  return makeUnique(hash, unique, i + 1);
};

const textToHash = (text, unique = {}) => {
  return makeUnique(
    encodeURI(
      text
        .toLowerCase()
        .replace(/=&gt;|&lt;| \/&gt;|<code>|<\/code>|&#39;/g, "")
        // eslint-disable-next-line no-useless-escape
        .replace(/[!@#\$%\^&\*\(\)=_\+\[\]{}`~;:'"\|,\.<>\/\?\s]+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "")
    ),
    unique
  );
};
const noop = () => {};

function useThrottledOnScroll(callback, delay) {
  const throttledCallback = React.useMemo(
    () => (callback ? throttle(callback, delay) : noop),
    [callback, delay]
  );

  React.useEffect(() => {
    if (throttledCallback === noop) return undefined;

    window.addEventListener("scroll", throttledCallback);
    return () => {
      window.removeEventListener("scroll", throttledCallback);
      throttledCallback.cancel();
    };
  }, [throttledCallback]);
}

function ScrollSpyTabs(props) {
  const [activeState, setActiveState] = React.useState(null);
  const { tabsInScroll } = props;

  let itemsServer = tabsInScroll.map((tab) => {
    const hash = textToHash(tab.text);
    return {
      icon: tab.icon || "",
      text: tab.text,
      component: tab.component,
      hash: hash,
      node: document.getElementById(hash),
    };
  });

  const itemsClientRef = React.useRef([]);
  React.useEffect(() => {
    itemsClientRef.current = itemsServer;
  }, [itemsServer]);

  const clickedRef = React.useRef(false);
  const unsetClickedRef = React.useRef(null);
  const findActiveIndex = React.useCallback(() => {
    // set default if activeState is null
    if (activeState === null) setActiveState(itemsServer[0].hash);

    // Don't set the active index based on scroll if a link was just clicked
    if (clickedRef.current) return;

    let active;
    for (let i = itemsClientRef.current.length - 1; i >= 0; i -= 1) {
      // No hash if we're near the top of the page
      if (document.documentElement.scrollTop < 0) {
        active = { hash: null };
        break;
      }

      const item = itemsClientRef.current[i];

      if (
        item.node &&
        item.node.offsetTop <
          document.documentElement.scrollTop +
            document.documentElement.clientHeight / 8 +
            tabHeight +
            110
      ) {
        active = item;
        break;
      }
    }

    if (active && activeState !== active.hash) {
      setActiveState(active.hash);
    }
  }, [activeState, itemsServer]);

  // Corresponds to 10 frames at 60 Hz
  useThrottledOnScroll(itemsServer.length > 0 ? findActiveIndex : null, 166);

  const handleClick = (hash) => () => {
    // Used to disable findActiveIndex if the page scrolls due to a click
    clickedRef.current = true;
    unsetClickedRef.current = setTimeout(() => {
      clickedRef.current = false;
    }, 1000);

    if (activeState !== hash) {
      setActiveState(hash);

      if (window)
        window.scrollTo({
          top:
            document.getElementById(hash).getBoundingClientRect().top +
            window.pageYOffset,
          behavior: "smooth",
        });
    }
  };

  React.useEffect(
    () => () => {
      clearTimeout(unsetClickedRef.current);
    },
    []
  );

  const classes = useStyles();

  return (
    <div style={{ width: "80%" }}>
      <div
        style={{
          width: "90%",
          margin: "0 auto",
        }}
      >
        <nav className={classes.demo2}>
          <StyledTabs
            value={activeState ? activeState : itemsServer[0].hash}
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
          >
            {itemsServer.map((item2) => (
              <StyledTab
                key={item2.hash}
                label={item2.text}
                onClick={handleClick(item2.hash)}
                value={item2.hash}
              />
            ))}
          </StyledTabs>
          {/* <div className={classes.indicator} /> */}
        </nav>

        <div className={classes.tabPanel}>
          {itemsServer.map((item1) => (
            <article id={item1.hash} key={item1.text}>
              <Typography sx={{ fontSize: "26px", fontWeight: "700" }}>
                {item1.text}
              </Typography>
              {item1.component}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ScrollSpyTabs;
