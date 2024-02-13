import PropTypes from "prop-types";
import React from "react";
import OutlinedButton from "components/common/Buttons/OutlinedButton";
import {
  Avatar,
  Box,
  Container,
  Grid,
  IconButton,
  Menu,
  Tooltip,
} from "@mui/material";
import PrimaryButton from "components/common/Buttons/PrimaryButton";
import SelectCheckbox from "sections/adminPageSections/CalendarSection/components/SelectCheckbox";
import { withStyles } from "@mui/styles";

export let navigate = {
  PREVIOUS: "PREV",
  NEXT: "NEXT",
  TODAY: "TODAY",
  DATE: "DATE",
};
const styles = (theme) => ({
  checkboxContainer: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },
});

class SPCustomToolbar extends React.Component {
  render() {
    const { classes, theme } = this.props;
    let {
      localizer: { messages },
      label,
    } = this.props;

    const currentDate = new Date();
    let date = navigate.DATE;
    let disablePrev = date < currentDate;

    return (
      <Box
        style={{
          width: "100%",
          paddingBottom: "12px",
          // paddingTop: "12px",
          // borderTop: "1px solid rgba(203, 198, 198, 1)",
        }}
      >
        <Grid container>
          <Grid
            item
            xs={12}
            md={9}
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <OutlinedButton
              style={{
                background: "#F3F3F3",
                color: "black",
                border: "1px solid rgba(0, 0, 0, 0.1)",
                fontSize: "14px",
                fontWeight: "bold",
                height: "36px",
                width: "100px",
              }}
              title={messages.today}
              type="button"
              onClick={this.navigate.bind(null, navigate.TODAY)}
            >
              {messages.today}
            </OutlinedButton>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                // marginLeft: "24px",
              }}
            >
              <IconButton
                style={{ color: "black" }}
                type="button"
                disabled={disablePrev}
                onClick={this.navigate.bind(null, navigate.PREVIOUS)}
              >
                {"<"}
                {/* <ArrowLeft height="18px" width="18px" /> */}
              </IconButton>
              <IconButton
                style={{ color: "black", transform: "rotate(180deg)" }}
                type="button"
                onClick={this.navigate.bind(null, navigate.NEXT)}
              >
                {"<"}
                {/* <ArrowLeft
									transform="rotateX(180deg)"
									height="18px"
									width="18px"
								/> */}
              </IconButton>

              <span
                style={{
                  //
                  paddingRight: "24px",
                  fontWeight: "600",
                  fontSize: "16px",
                }}
              >
                {label}
              </span>
            </div>
          </Grid>
          <div className={classes.checkboxContainer}>
            <SelectCheckbox />
          </div>
        </Grid>
      </Box>
    );
  }

  navigate = (action) => {
    this.props.onNavigate(action);
  };

  view = (view) => {
    this.props.onView(view);
  };

  viewNamesGroup(messages) {
    let viewNames = this.props.views;
    const view = this.props.view;

    if (viewNames.length > 1) {
      return viewNames.map((name) => (
        <>
          {view === name ? (
            <PrimaryButton
              type="button"
              key={name}
              title={messages[name]}
              style={{
                marginRight: "-8px",
                width: "100px",
                fontWeight: "bold",
                borderRadius: "5px",
                zIndex: "3",
                fontSize: "18px",
              }}
              //   className={clsx({ "rbc-active": view === name })}
              onClick={this.view.bind(null, name)}
            >
              {messages[name]}
            </PrimaryButton>
          ) : (
            <OutlinedButton
              type="button"
              key={name}
              title={messages[name]}
              style={{
                marginRight: "-8px",
                width: "100px",
                background: "#F3F3F3",
                fontWeight: "bold",
                color: "black",
                border: "none",
                borderRadius: "5px",
                zIndex: "2",
                fontSize: "18px",
              }}
              //   className={clsx({ "rbc-active": view === name })}
              onClick={this.view.bind(null, name)}
            >
              {messages[name]}
            </OutlinedButton>
          )}
        </>
      ));
    }
  }
}

SPCustomToolbar.propTypes = {
  view: PropTypes.string.isRequired,
  views: PropTypes.arrayOf(PropTypes.string).isRequired,
  label: PropTypes.node.isRequired,
  localizer: PropTypes.object,
  onNavigate: PropTypes.func.isRequired,
  onView: PropTypes.func.isRequired,
};

// export default SPCustomToolbar;
export default withStyles(styles, { withTheme: true })(SPCustomToolbar);

// SPCustomToolbar.propTypes = {
//   view: PropTypes.string.isRequired,
//   views: PropTypes.arrayOf(PropTypes.string).isRequired,
//   label: PropTypes.node.isRequired,
//   localizer: PropTypes.object,
//   onNavigate: PropTypes.func.isRequired,
//   onView: PropTypes.func.isRequired,
// };
