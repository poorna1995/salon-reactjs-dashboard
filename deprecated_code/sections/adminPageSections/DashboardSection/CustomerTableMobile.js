import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PrimaryButton from "components/common/Buttons/PrimaryButton";
import ServiceDetailsPopup from "./components/ServiceDetailsPopup";
import { Button } from "@mui/material";

const CustomerTableMobile = ({ data, updateStatus }) => {
  const [expanded, setExpanded] = useState(false);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

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
    <div>
      <ServiceDetailsPopup
        open={open}
        handleClose={handleClose}
        data={serviceData}
        updateStatus={updateStatus}
      />

      {data.map((item, index) => {
        const {
          booking_id,
          customer_first_name,
          customer_email,
          customer_phone,
          booking_data,
          booking_status,
        } = item;
        const { service_date, service_time, service_record } = booking_data;
        const services = service_record
          .map((item) => item.service_name)
          .join(",");
        return (
          <Accordion
            expanded={expanded === booking_id}
            onChange={handleChange(booking_id)}
            key={`${index}accord`}
            sx={{
              border: "1px solid rgba(38, 51, 77, 0.08)",
              boxShadow: "none !important",
              marginBottom: "10px",
              borderRadius: "5px",
              "&::before": {
                backgroundColor: "transparent",
              },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`${booking_id}bh-content`}
              id={`${booking_id}bh-header`}
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  width: "70%",
                  fontSize: "14px",
                  fontWeight: "bold",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {customer_first_name}
              </Typography>
              <Typography>
                <Button
                  style={{
                    height: "40px",
                    width: "100px",
                    fontSize: "12px",
                    marginRight: "10px",
                    textTransform: "capitalize",
                    fontWeight: "600",
                    background: colors[booking_status].background,
                    color: colors[booking_status].color,
                  }}
                >
                  {booking_status}
                </Button>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <div style={{ display: "flex" }}>
                <div style={{ width: "50%" }}>
                  <Typography style={{ fontSize: "10px", opacity: "0.5" }}>
                    Date
                  </Typography>
                  <Typography sx={{ fontSize: "12px" }}>
                    {service_date}
                  </Typography>
                </div>
                <div>
                  <Typography style={{ fontSize: "10px", opacity: "0.5" }}>
                    Time
                  </Typography>
                  <Typography sx={{ fontSize: "12px" }}>
                    {service_time}
                  </Typography>
                </div>
              </div>
              <div style={{ display: "flex", marginTop: "10px" }}>
                <div style={{ width: "50%" }}>
                  <Typography style={{ fontSize: "10px", opacity: "0.5" }}>
                    Service(s)
                  </Typography>
                  <Typography sx={{ fontSize: "12px" }}>{services}</Typography>
                </div>
                <div>
                  <Typography style={{ fontSize: "10px", opacity: "0.5" }}>
                    Number
                  </Typography>
                  <Typography sx={{ fontSize: "12px" }}>
                    {customer_phone}
                  </Typography>
                </div>
              </div>
              <div style={{ textAlign: "center", marginTop: "10px" }}>
                {" "}
                <Typography
                  sx={{
                    fontSize: "12px",
                    color: "#3361FF",
                    fontWeight: "500",
                    cursor: "pointer",
                  }}
                  onClick={() => openDialog(item)}
                >
                  View More Details
                </Typography>
              </div>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
};

export default CustomerTableMobile;

const colors = {
  confirmed: { background: "#3361FF1A", color: "#3361FF" },
  completed: { background: "#00AF461A", color: "#00AF46" },
  cancelled: { background: "rgba(252, 236, 225, 0.6)", color: "#000" },
};
