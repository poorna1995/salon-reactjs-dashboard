import { Box, Paper, Table } from "@mui/material";
import React, { useState } from "react";
import ODTableHeaderRow from "./components/CustomerTable/CTTableHeaderRow";
import CTTableRow from "./components/CustomerTable/CTTableRow";
import ServiceDetailsPopup from "./components/ServiceDetailsPopup";

const CustomerTable = ({ data, updateStatus }) => {
  const [open, setOpen] = useState(false);
  const [serviceData, setServiceData] = useState(null);
  
  const handleClose = () => {
    setOpen(false);
    setServiceData(null);
  };

  const openDialog = (data) => {
    setOpen(true);
    setServiceData(data);
  };

  return (
    <Paper
      sx={{
        borderRadius: "12px",
        boxShadow: "none",
        border: "1px solid rgba(0,0,0,0.1)",
        overflow: "hidden",
        marginTop: "16px",
      }}
    >
      <ServiceDetailsPopup
        open={open}
        handleClose={handleClose}
        data={serviceData}
        updateStatus={updateStatus}
      />
      <Table sx={{}}>
        <ODTableHeaderRow />

        {data.map((item) => {
          const {
            booking_id,
            customer_first_name,
            customer_last_name,
            customer_email,
            customer_phone,
            booking_data,
            booking_status,
          } = item;

          const { service_date, service_time } = booking_data;
          return (
            <CTTableRow
              id={booking_id}
              name={`${customer_first_name} ${customer_last_name}`}
              email={customer_email}
              number={customer_phone}
              date={service_date}
              time={service_time}
              status={booking_status}
              data={item}
              showDetails={openDialog}
            />
          );
        })}
      </Table>
    </Paper>
  );
};

export default CustomerTable;
