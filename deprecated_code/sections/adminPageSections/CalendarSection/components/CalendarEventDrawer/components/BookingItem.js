import React from "react";
import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    border: "1px solid #E8E9EE",
    borderRadius: "3px",
    marginTop: "10px",
  },
  header: {
    background: "#3361FF0D",
    height: "30px",
    padding: "5px 10px",
  },
  contentItem: {
    display: "flex",
    alignItems: "center",
    marginBottom: "5px",
    padding: "5px 10px",
    "& .MuiTypography-root": {
      fontSize: "16px",
    },
  },
  status: {
    background: "#FF00001A",
    padding: "5px 10px",
    paddingRight: "10px",
    borderRadius: "5px",
    height: "30px",
    display: "flex",
    alignItems: "center",
  },
}));

const BookingItem = ({ data, index }) => {
  const classes = useStyles();
  const { booking_data, booking_status, customer_first_name, customer_phone } =
    data;
  const { service_price, service_record } = booking_data || {};
  const services = service_record?.map((item) => item.service_name).join(",");

  const rows = [
    { title: "Name", value: customer_first_name || "-" },
    { title: "Mobile Number", value: customer_phone || "-" },
    { title: "Service", value: services },
    { title: "Total", value: `₹ ${service_price}` },
    { title: "Status", value: booking_status || "-" },
  ];
  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <Typography fontWeight={"600"} fontSize="12px">
          {index}.
        </Typography>
      </div>
      <div className={classes.content}>
        {rows.map((item) => {
          const { title, value } = item;
          return (
            <div className={classes.contentItem}>
              <Typography sx={{ width: "33%" }}>{title} </Typography>
              <Typography sx={{ width: "10%" }}>:</Typography>
              {title !== "Status" && (
                <Typography sx={{ width: "50%" }}>{value}</Typography>
              )}
              {title === "Status" && (
                <Typography
                  sx={{
                    background: colors[value]?.bg || "",
                    color: colors[value]?.text || "",
                    padding: "5px 10px",
                    paddingRight: "10px",
                    borderRadius: "5px",
                    height: "30px",
                    display: "flex",
                    alignItems: "center",
                    textTransform: "capitalize",
                  }}
                >
                  {value}
                </Typography>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BookingItem;

const colors = {
  completed: { bg: "#00AF461A", text: "#00AF46" },
  confirmed: { bg: "#3361FF1A", text: "#3361FF" },
  cancelled: { bg: "#FF00001A", text: "#000" },
};
