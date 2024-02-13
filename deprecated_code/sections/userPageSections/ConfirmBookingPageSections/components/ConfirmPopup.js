import React from "react";
import HivepathBaseDialog from "components/common/Dialog/HivepathBaseDialog";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import BookingSuccess from "assets/gif/booking-success.gif";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/styles";

const ConfirmPopup = ({ open, handleClose }) => {
  const theme = useTheme();
  const mobileView = theme.breakpoints.down("sm");
  const matches = useMediaQuery(mobileView);

  const { items, selectedDate, time } = useSelector((state) => state.cart);
  const { company_address } = useSelector((state) => state.serviceHeader);
  let formattedDate = "";
  if (selectedDate) {
    formattedDate = `${format(selectedDate, "do LLLL")},  ${time}`;
  }
  const formattedItems = items
    .map((item, index) => {
      const { service_name, count } = item;
      return `${index + 1}. ${service_name} (${count}) `;
    })
    .join("");

  return (
    <HivepathBaseDialog
      open={open}
      handleClose={handleClose}
      popupStyles={{ minWidth: matches && "none", margin: matches && "10px" }}
    >
      <div
        style={{
          textAlign: "center",
        }}
      >
        <img src={BookingSuccess} style={{ width: "100px", height: "100px" }} />
        <Typography color="#26334D" fontSize="18px" fontWeight="bold">
          Thank you for booking an appointment with us
        </Typography>

        <Typography color="#26334D" fontSize="14px" mt={1} mb={2}>
          Your appoinment for <br /> <strong>{formattedItems}</strong> <br />
          has been scheduled for{" "}
          <strong style={{ color: "#3261FF" }}>{formattedDate}</strong>
        </Typography>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              // background: "#EDEFF2",
              background: "white",
              boxShadow: "0px 0px 14px rgba(0, 0, 0, 0.12)",
              padding: "20px 10px",
              borderRadius: "10px",
              width: matches ? "90%" : "60%",
            }}
          >
            <Typography color="#26334D" fontSize="14px" fontWeight="bold">
              Our Address
            </Typography>
            <Typography color="#26334D" fontSize="14px" sx={{ opacity: "0.9",  }}>
              {company_address}
            </Typography>
          </div>
        </div>
      </div>
    </HivepathBaseDialog>
  );
};

export default ConfirmPopup;
