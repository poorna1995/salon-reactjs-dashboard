import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCalendarData } from "store/calendar/calendarSlice";
import { useTheme } from "@mui/styles";

const SelectCheckbox = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { filters } = useSelector((state) => state.calendar);
  const [checkedItems, setChecked] = React.useState([]);

  const handleChange = (event, item) => {
    const { checked, value } = event.currentTarget;
    setChecked((prev) =>
      checked ? [...prev, value] : prev.filter((val) => val !== value)
    );
  };

  useEffect(() => {
    dispatch(updateCalendarData({ filters: [...checkedItems] }));
  }, [checkedItems]);

  useEffect(() => {
    dispatch(updateCalendarData({ filters: ["working_hours"] }));
    setChecked(["bookings"]);
  }, []);

  const emailDiffer = [
    {
      title: "Working hours",
      object_id: 123,
      value: "working_hours",
      color: "#89C073",
      bgColor: "#F7FFF4",
      // show: KNOWLEDGE_SESSION_ONBOARDING_DONE,
    },
    {
      title: "Bookings",
      object_id: 456,
      value: "bookings",
      color: "#F19D3A",
      bgColor: "#FFF4E8",
      // show: KNOWLEDGE_SESSION_ONBOARDING_DONE,
    },
  ];
  return (
    <Box
      sx={{
        paddingLeft: "20px",
        [theme.breakpoints.down("sm")]: { paddingLeft: "0" },
      }}
    >
      <FormGroup
        sx={{
          [theme.breakpoints.down("sm")]: {
            flexDirection: "inherit",
          },
        }}
      >
        {Array.isArray(emailDiffer) &&
          emailDiffer.length > 0 &&
          emailDiffer.map((item) => {
            const { title, object_id, value, color, bgColor, show } = item;
            // console.log({ item });
            // if (!show) return null;
            return (
              <FormControlLabel
                style={{
                  borderBottom: "1px solid rgba(0,0,0,0.1)",
                  marginTop: "8px",
                  padding: "8px",
                  display: "flex",
                  alignItems: "center",
                  margin: "0",
                }}
                label={
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                    }}
                  >
                    <div
                      style={{
                        width: "20px",
                        height: "20px",
                        minWidth: "20px",
                        minHeight: "20px",
                        background: color,
                        borderRadius: "50%",
                        marginRight: "16px",
                      }}
                    ></div>
                    <Typography
                      style={{
                        fontSize: "16px",
                        lineHeight: "22px",
                        fontWeight: "500",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {title}
                    </Typography>
                  </div>
                }
                key={object_id}
                control={
                  <Checkbox
                    value={value}
                    onChange={(e) => handleChange(e, item)}
                    checked={
                      checkedItems && checkedItems.some((val) => val === value)
                    }
                    // name={file_name}
                  />
                }
                labelPlacement="end"
              />
            );
          })}
      </FormGroup>
    </Box>
  );
};

export default SelectCheckbox;
