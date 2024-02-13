import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Container, Box, Button, Grid } from "@mui/material";
import ScheduleForm from "./components/ScheduleForm";
import Summary from "../SelectServiceSections/Summary";
import ConfirmPopup from "./components/ConfirmPopup";
import { useNavigate, useParams } from "react-router-dom";
import useEnqueueSnackbar from "customHooks/useEnquequeSnackbar";
import PrimaryButton from "components/common/Buttons/PrimaryButton";
import { FaAngleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import ServiceHeader from "sections/userPageSections/components/ServiceHeader";
import { CUSTOMER_SERVICES } from "constants/API_URLS";
import authFetch from "utils/authFetch";
import format from "date-fns/format";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/styles";
import ChangeButton from "../components/ChangeButton";

const ConfirmBookingPageSections = () => {
  const { company_domain } = useParams();
  const theme = useTheme();
  const mobileView = theme.breakpoints.down("sm");
  const matches = useMediaQuery(mobileView);

  const { items, time, selectedDate } = useSelector((state) => state.cart);
  const { company_base_name, company_base_id } = useSelector(
    (state) => state.companyInfo
  );
  const { location, company_id, company_name } = useSelector(
    (state) => state.serviceHeader
  );
  const enqueueSnackbar = useEnqueueSnackbar();
  const navigate = useNavigate();
  const formattedDate = format(selectedDate || new Date(), "yyyy-MM-dd");
  let grandTotal = 0;
  grandTotal = items.reduce(function (sum, item) {
    const { service_price } = item.service_meta;
    return sum + item.count * service_price;
  }, grandTotal);

  const [open, setOpen] = useState(false);
  const confirmHandler = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    window.location.replace(`/${company_domain}`);
  };

  const submitForm = (data) => {
    const serviceRecord = items.map((item) => {
      const { count, service_id, service_name, service_meta } = item;
      const { service_price } = service_meta;
      return {
        quantity: count,
        service_id: service_id,
        service_name: service_name,
        service_price: service_price,
        service_status: "",
      };
    });
    const requestData = {
      ...data,
      company_id: company_id,
      company_name: company_name,
      company_location: location,
      booking_status: "confirmed",
      booking_data: {
        price_denomination: "Rupees",
        service_date: formattedDate,
        service_price: grandTotal,
        service_record: [...serviceRecord],
        service_time: time,
      },
    };
    authFetch(CUSTOMER_SERVICES.CREATE_BOOKING, requestData).then((res) => {
      const { status, message } = res;
      if (status === "success") {
        enqueueSnackbar(message, { variant: "success" });
        confirmHandler();
      } else {
        enqueueSnackbar(message, { variant: "error" });
      }
    });
  };

  const navigateHome = () => {
    navigate(`/${company_domain}`);
  };

  useEffect(() => {
    if (!location) {
      navigateHome();
    }
  }, []);

  return (
    <Box
      sx={{
        marginTop: "200px",
        [theme.breakpoints.down("sm")]: { marginTop: "210px" },
      }}
    >
      {/* <ServiceHeader /> */}
      <Container sx={{ maxWidth: "1200px" }}>
        <Grid container>
          <ConfirmPopup open={open} handleClose={handleClose} />
          {/* <Grid item md={12} mb={2}>
          <ServiceHeader />
          <ChangeButton />
        </Grid> */}

          {/* <Grid item xs={12} md={12} align="left">
        <Link to="/select-date">
          <Button
            sx={{
              color: "black",
              "&:hover": {
                background: "transparent",
              },
            }}
          >
            <FaAngleLeft />
            Back
          </Button>
        </Link>
      </Grid> */}
          <Grid item xs={12} md={8} pl={{ md: 5 }}>
            <ScheduleForm onSubmit={submitForm} />
          </Grid>
          {!matches && (
            <Grid item xs={12} md={4}>
              <Summary isBookingPage={true} />
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
};

export default ConfirmBookingPageSections;
