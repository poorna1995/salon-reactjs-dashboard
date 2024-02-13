import React, { useEffect, useState } from "react";

// import SPCustomToolbar from "sections/AppPages/AdminPageSections/SlotPlannerSections/SPComponents/SPCustomToolbar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./SPstyles.css";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { startOfWeek } from "date-fns";
import { enUS } from "date-fns/locale";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import format from "date-fns/format";
import parse from "date-fns/parse";
import getDay from "date-fns/getDay";
// import fetchCalendarView from "sections/AppPages/AdminPageSections/SlotPlannerSections/utils/fetchCalendarView";
// import { zonedTimeToUtc } from "date-fns-tz";
import SPWeekEvent from "components/HivepathCalendarUI/SPComponents/SPWeekEvent";
import SPCustomWeekHeader from "components/HivepathCalendarUI/SPComponents/SPCustomWeekHeader";
import SPCustomToolbar from "components/HivepathCalendarUI/SPComponents/SPCustomToolbar";
import { res } from "data/calendarData";
import fetchCalendarView from "./utils/fetchCalendarView";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { updateCalendarData } from "store/calendar/calendarSlice";
import { ADMIN_SERVICES, GENERAL_SERVICES } from "constants/API_URLS";
import authFetch from "utils/authFetch";
import mapBookedSlots from "./utils/mapBookedSlots";
import mapAvailableSlots from "./utils/mapAvailableSlots";
import CalendarEventDrawer from "../CalendarEventDrawer";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { MenuItem } from "@mui/material";
import SelectAutoWidth from "sections/adminPageSections/SettingsSection/BrandingSection/components/TimeDropDown";
import LoadingBackdrop from "components/common/Loader/Backdrop/LoadingBackdrop";
import useEnqueueSnackbar from "customHooks/useEnquequeSnackbar";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/styles";

const DragAndDropCalendar = withDragAndDrop(Calendar);

const locales = {
  "en-US": enUS,
};

let currentDate = new Date();
const companies = [{ label: "company 1", value: "company1" }];
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(currentDate, { weekStartsOn: 1 }),
  getDay,
  locales,
});

const customDayPropGetter = (date) => {
  const currentDate = new Date();
  // let dateTime = date.getTime();
  // let curr = currentDate.getTime();
  // console.log({ date, curr });
  if (date < currentDate)
    return {
      className: "disabled-day",
      style: {
        cursor: "not-allowed",
        background: "rgba(184, 184, 184, 0.1)",
      },
    };
  else return {};
};

const CalendarView = ({ calendarHeight, style, containerStyles }) => {
  const theme = useTheme();
  const mobileView = theme.breakpoints.down("sm");
  const matches = useMediaQuery(mobileView);

  const enqueueSnackbar = useEnqueueSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const { company_base_id } = useSelector((state) => state.companyInfo);
  const { bookings, availability, filters } = useSelector(
    (state) => state.calendar
  );
  const { user_id, domain } = useSelector((state) => state.user.currentUser);
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const calendarRef = React.createRef();
  const today = new Date();

  let scrollToTime =
    today.getHours() > 4 ? today.getHours() - 2 : today.getHours();
  const dispatch = useDispatch();

  const setEventCellStyling = (event) => {
    // console.log("event in prop styling", event);

    if (event.availability === true) {
      let style = {
        background: `#F7FFF4`,
        border: `1px solid #89C073`,
        borderLeft: `5px solid #89C073`,
      };
      return { style };
    }
  };

  const colors = [
    {
      id: "0",
      color: "#ECF5FF",
      border: "#58BCF4",
    },
    {
      id: "1",
      color: "#FFF7DB",
      border: "#EFCD56",
    },
  ];
  let timeRangeFormat = ({ start, end }, culture, local) =>
    `${local.format(start, "p", culture)} – ${local.format(end, "p", culture)}`;

  let dayRangeHeaderFormat = ({ start, end }, culture, local) =>
    `${local.format(start, "MMM d", culture)} – ${local.format(
      end,
      "MMM d, yyyy",
      culture
    )}`;

  const formats = {
    weekdayFormat: "EEE",
    // eventTimeRangeFormat:'e'
    timeGutterFormat: "hh aaa",
    dayRangeHeaderFormat: dayRangeHeaderFormat,

    eventTimeRangeFormat: timeRangeFormat,
  };

  // const handleSelect = ({ start, end }) => {
  // 	const currentDate = new Date();
  // 	const startTime = zonedTimeToUtc(start, calendarTimezone);
  // 	const endTime = zonedTimeToUtc(end, calendarTimezone);
  // 	if (start < currentDate) {
  // 		return null;
  // 	}

  // 	handleOpenPopup();
  // 	dispatch(setSlot({ start, end }));

  // };

  const handleEventSelect = (e) => {
    if ("bookings" in e) {
      dispatch(updateCalendarData({ openDrawer: true, selectedEvent: e }));
    }
  };

  const handleChangeBranch = (name, value) => {
    setSelectedBranch(value);
  };

  const onlyAvailability = filters.includes("working_hours")
    ? availability
    : [];
  const onlyBookings = filters.includes("bookings") ? bookings : [];

  const allEventsAndSessions = [...onlyAvailability, ...onlyBookings] || [];

  const fetchCalendarHandler = () => {
    setIsLoading(true);
    const requestData = {
      company_id: [selectedBranch],
      admin_id: user_id,
      domain: domain,
    };
    authFetch(ADMIN_SERVICES.FETCH_CALENDAR, requestData)
      .then((res) => {
        const { status, result, message } = res;
        if (status === "success") {
          const bookedSlots = mapBookedSlots(result);
          dispatch(updateCalendarData({ bookings: bookedSlots }));
          // fetching calendar slots
          authFetch(ADMIN_SERVICES.FETCH_CALENDAR_SLOTS, {
            company_id: selectedBranch,
            admin_id: user_id,
            domain: domain,
          })
            .then((res) => {
              setIsLoading(false);
              const { status, result, message } = res;
              if (status === "success") {
                const availableSLots = mapAvailableSlots(result);
                dispatch(updateCalendarData({ availability: availableSLots }));
              } else {
                enqueueSnackbar(message, { variant: "error" });
              }
            })
            .catch((res) => {
              enqueueSnackbar(res.message, { variant: "error" });
              setIsLoading(false);
            });
        } else {
          enqueueSnackbar(message, { variant: "error" });
          setIsLoading(false);
        }
      })
      .catch((res) => {
        enqueueSnackbar(res.message, { variant: "error" });
        setIsLoading(false);
      });
  };

  const fetchCompanyDetails = () => {
    setIsLoading(true);
    const requestData = {
      company_id: "",
      company_base_id: company_base_id,
      admin_id: user_id,
      domain: domain,
    };
    authFetch(GENERAL_SERVICES.FETCH_COMPANY, requestData)
      .then((res) => {
        // setIsLoading(false);
        const { status, result, message } = res;
        if (status === "success") {
          const companyOptions =
            result
              .filter((item) => item.company_name !== "")
              .map((item) => {
                return { label: item.company_name, value: item.company_id };
              }) || [];
          setBranches(companyOptions);
          if (companyOptions.length > 0) {
            setSelectedBranch(companyOptions[0].value);
          }
        } else {
          enqueueSnackbar(message, { variant: "error" });
        }
      })
      .catch((res) => {
        enqueueSnackbar(res.message, { variant: "error" });
        setIsLoading(false);
        console.log(res);
      });
  };

  useEffect(() => {
    fetchCompanyDetails();
  }, []);

  useEffect(() => {
    if (selectedBranch) {
      fetchCalendarHandler();
    }
  }, [selectedBranch]);
  return (
    <div
      style={{
        paddingBottom: "32px",
        position: "relative",
        ...containerStyles,
      }}
    >
      <LoadingBackdrop open={isLoading} />
      <SelectAutoWidth
        options={branches}
        value={selectedBranch}
        // label="Select branch"
        name="selectedBranch"
        onChange={handleChangeBranch}
        styles={{ width: "150px" }}
        containerStyles={
          !matches
            ? { position: "absolute", right: "0" }
            : { position: "absolute", right: "10px", top: "-40px" }
        }
      />
      {/* <Select
        labelId="demo-simple-select-autowidth-label"
        id="demo-simple-select-autowidth"
        // value={value}
        // onChange={handleChange}
        autoWidth
        label={"Select branch"}
        sx={{ width: "150px", position: "absolute", right: "0", top:"-10px" }}
      >
        {companies.map((item) => {
          const { value, label } = item;
          return <MenuItem value={value}>{label}</MenuItem>;
        })}
      </Select> */}

      <DragAndDropCalendar
        ref={calendarRef}
        localizer={localizer}
        selectable
        resizable
        longPressThreshold={1}
        formats={formats}
        popup={true}
        eventPropGetter={setEventCellStyling}
        dayPropGetter={customDayPropGetter}
        // onSelectSlot={handleSelect}
        onSelectEvent={handleEventSelect}
        events={allEventsAndSessions || []}
        views={{ week: true }}
        step={30}
        drilldownView={"week"}
        showMultiDayTimes
        scrollToTime={scrollToTime}
        components={{
          week: {
            event: (props) => {
              return <SPWeekEvent {...props} />;
            },
            header: SPCustomWeekHeader,
          },
          header: {
            dateContentRow: (props) => {
              return <span style={{ visibility: "hidden" }}></span>;
            },
          },

          timeGutterHeader: (props) => {
            return (
              <div style={{ paddingTop: "8px" }}>
                <span
                  className="rbc-label"
                  style={{
                    paddingTop: "4px",
                    marginLeft: "-6px",
                  }}
                >
                  {/* {"Date"} */}
                  GMT
                  {/* <br /> {showTimezone} */}
                </span>
              </div>
            );
          },
          toolbar: SPCustomToolbar,
        }}
        defaultView={"week"}
        style={{
          ...style,
          height:
            // "100%",
            calendarHeight ? calendarHeight : "78vh",
        }}
      />

      <CalendarEventDrawer />
    </div>
  );
};

export default CalendarView;
