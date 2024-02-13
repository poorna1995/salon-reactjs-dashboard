import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useSelector, useDispatch } from "react-redux";
import { updateCalendarData } from "store/calendar/calendarSlice";
import BookingItem from "./components/BookingItem";
import { useTheme } from "@mui/styles";

export default function CalendarEventDrawer() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { openDrawer, selectedEvent } = useSelector((state) => state.calendar);
  const { bookings } = selectedEvent || {};

  const toggleDrawer = (open) => (event) => {
    // if (
    //   event.type === "keydown" &&
    //   (event.key === "Tab" || event.key === "Shift")
    // ) {
    //   return;
    // }
    dispatch(updateCalendarData({ openDrawer: open }));
  };

  const list = () => (
    <Box
      sx={{
        width: 450,
        marginTop: "80px",
        [theme.breakpoints.down("sm")]: {
          width: "100%",
        },
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List sx={{ padding: "10px" }}>
        {bookings?.map((item, index) => {
          const { booking_data } = item || {};
          return (
            <>
              <BookingItem data={item} index={index + 1} key={`bi${index}`} />
            </>
          );
        })}
      </List>
    </Box>
  );

  return (
    <div>
      <React.Fragment key={"right"}>
        <Drawer
          anchor={"right"}
          open={openDrawer}
          onClose={toggleDrawer(false)}
        >
          {list()}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
