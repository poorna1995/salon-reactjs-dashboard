import "react-nice-dates/build/style.css";

import React from "react";
import { useState } from "react";
import { enGB } from "date-fns/locale";
import { useDispatch, useSelector } from "react-redux";
import { DatePickerCalendar } from "react-nice-dates";
import { updateCart } from "store/cart/cartSlice";
import format from "date-fns/format";

import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  container: {
    "& .nice-dates-day": {
      fontWeight: "600",
      color: "black",
      "&::after": {
        borderColor: theme.palette.primary.main,
      },
    },
    "& .nice-dates-navigation_current": {
      fontWeight: "bolder",
    },
    "& .nice-dates-week-header_day": {
      fontWeight: "bolder",
      color: "#373434",
    },
    "& .-disabled": {
      color: "#b4b4b4",
    },
    "& .-outside": {
      visibility: "hidden",
    },
    "& .nice-dates-navigation_next": {
      position: "absolute",
      left: "30px",
    },
    "& .nice-dates-navigation_current": {
      textAlign: "left",
      paddingLeft: "30px",
      fontSize: "21px",
      fontWeight: "bold",
    },
    "& .nice-dates-week-header": {
      boxShadow: "none",
    },
    "& .nice-dates-navigation": {
      paddingTop: "15px",
      marginBottom: "11px",
    },

    "& .-slotsAvailable": {
      "& .nice-dates-day_date": {
        background: "rgba(72, 74, 158, 0.1)",
        color: theme.palette.primary.main,
        borderRadius: "50%",
        width: "80%",
        height: "80%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      },
      "&::before": {
        left: "10.5%",
        right: "10.5%",
        top: "10.5%",
        bottom: "10.5%",
      },
      "&::after": {
        left: "10.5%",
        right: "10.5%",
        top: "10.5%",
        bottom: "10.5%",
      },
    },
    "& .-selected": {
      "& .nice-dates-day_date": {
        color: "white !important",
      },
      "&::before": {
        backgroundColor: theme.palette.primary.main,
      },
    },
  },
}));

const DatePickerCalendarComponent = ({ data }) => {
  const classes = useStyles();
  const { selectedDate } = useSelector((state) => state.cart);
  const enabledDates = data.map((item) => item.service_date);
  const dispatch = useDispatch();
  const setDateHandler = (date) => {
    dispatch(updateCart({ selectedDate: date }));
  };

  const currentDateValidate = new Date();
  const modifiers = {
    disabled: (date) => {
      if (data) {
        // will need to adjust for different timeframes (maybe)
        let isDisabled = true;
        const currentDate = currentDateValidate.setHours(0, 0, 0, 0);

        if (date >= currentDate) {
          let mdate = format(date, "yyyy-MM-dd");
		  isDisabled = !(enabledDates.indexOf(mdate) > -1);
		}

        return isDisabled;
      }
    },
    highlight: (date) => {
      if (data) {
        const currentDate = currentDateValidate.setHours(0, 0, 0, 0);

        if (date >= currentDate) {
          let mdate = format(date, "yyyy-MM-dd");
          return enabledDates.indexOf(mdate) > -1
        }
      }
    },
  };

  const modifiersClassNames = {
    highlight: "-slotsAvailable",
  };

  return (
    <div className={classes.container}>
      <DatePickerCalendar
        date={selectedDate || new Date()}
        onDateChange={setDateHandler}
        locale={enGB}
        modifiersClassNames={modifiersClassNames}
        modifiers={modifiers}
      />
    </div>
  );
};

export default DatePickerCalendarComponent;
