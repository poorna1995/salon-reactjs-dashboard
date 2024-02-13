import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Grid, Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import DatePickerCalendarComponent from "./components/Calendar";
import SlotContainer from "./SlotContainer";
// import StaffContainer from "./StaffContainer";
import ServiceHeader from "sections/userPageSections/components/ServiceHeader";
import HeadingContainer from "../components/HeadingContainer";
import useEnqueueSnackbar from "customHooks/useEnquequeSnackbar";
import authFetch from "utils/authFetch";
import { CUSTOMER_SERVICES } from "constants/API_URLS";
import { updateCart } from "store/cart/cartSlice";
import parse from "date-fns/parse";
import LoadingBackdrop from "components/common/Loader/Backdrop/LoadingBackdrop";
import ChangeButton from "../components/ChangeButton";
import { useTheme } from "@mui/styles";

const SelectDateSections = () => {
  const theme = useTheme();
  const { company_domain } = useParams();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [slotData, setSlotData] = useState([]);
  const enqueueSnackbar = useEnqueueSnackbar();
  const { location, company_id } = useSelector((state) => state.serviceHeader);
  const { company_base_id } = useSelector((state) => state.companyInfo) || {};
  const navigate = useNavigate();

  const navigateHome = () => {
    navigate(`/${company_domain}`);
  };

  const fetchSlotsHandler = () => {
    setIsLoading(true);
    const requestData = { company_id: company_id };
    authFetch(CUSTOMER_SERVICES.FETCH_SLOTS, requestData)
      .then((res) => {
        setIsLoading(false);
        const { result, status, message } = res;
        if (status === "success") {
          setSlotData(result);
          if (result.length > 0) {
            const firstDate = parse(
              result[0].service_date,
              "yyyy-MM-dd",
              new Date()
            );
            dispatch(updateCart({ selectedDate: firstDate }));
          }
        } else {
          enqueueSnackbar(message, { variant: "error" });
        }
      })
      .catch((res) => {
        setIsLoading(false);
        enqueueSnackbar(res.message, { variant: "error" });
      });
  };

  useEffect(() => {
    if (!location) {
      navigateHome();
    }
    fetchSlotsHandler();
  }, []);
  return (
    <Box>
      <ServiceHeader />

      <Container sx={{ maxWidth: "1200px" }}>
        <Grid container>
          <LoadingBackdrop open={isLoading} />
          {/* <Grid item md={12} mb={2}>
        
        <ChangeButton />
      </Grid> */}

          <Grid
            item
            xs={12}
            md={4}
            sx={{
              marginTop: "200px",
              [theme.breakpoints.down("sm")]: { marginTop: "210px" },
            }}
          >
            <HeadingContainer title="Select a Date" />
            <DatePickerCalendarComponent data={slotData} />
          </Grid>
          <Grid
            item
            xs={12}
            md={5}
            pl={2}
            pr={2}
            sx={{
              marginTop: "200px",
              [theme.breakpoints.down("sm")]: {
                marginTop: "40px",
                padding: "0",
              },
            }}
          >
            <HeadingContainer title="Select a Time" />
            <SlotContainer data={slotData} />
          </Grid>
          {/* <Grid item xs={12} md={4}> */}
          {/* <HeadingContainer title="Select Staff" /> */}
          {/* <StaffContainer /> */}
          {/* </Grid> */}
        </Grid>
      </Container>
    </Box>
  );
};

export default SelectDateSections;
