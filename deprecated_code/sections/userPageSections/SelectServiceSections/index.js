import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/styles";
import ServiceHeader from "sections/userPageSections/components/ServiceHeader";
import ServiceTabs from "./ServiceTabs";
import Summary from "./Summary";
import EmptyCart from "./Summary/components/EmptyCart";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import SecondaryButton from "components/common/Buttons/SecondaryButton";
import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";
import authFetch from "utils/authFetch";
import { ADMIN_SERVICES, GENERAL_SERVICES } from "constants/API_URLS";
import LoadingBackdrop from "components/common/Loader/Backdrop/LoadingBackdrop";
import MobileCart from "./Summary/MobileCart";
import ChangeButton from "../components/ChangeButton";

const SelectServicePageSections = () => {
  const { company_domain } = useParams();
  const theme = useTheme();
  const mobileView = theme.breakpoints.down("sm");
  const matches = useMediaQuery(mobileView);

  const [isLoading, setIsLoading] = useState(false);
  const [branches, setBranches] = useState([]);
  const enqueueSnackbar = useEnquequeSnackbar();
  const [tabsData, setTabsData] = useState([]);
  const { items } = useSelector((state) => state.cart);
  const { location } = useSelector((state) => state.serviceHeader);
  const { company_base_id } = useSelector((state) => state.companyInfo);
  const isItems = items.length > 0;

  const navigate = useNavigate();
  const navigateDateSelection = () => {
    navigate(`/${company_domain}/select-date`);
  };
  const navigateHome = () => {
    navigate(`/${company_domain}`);
  };

  const fetchCategoriesData = (company_id) => {
    setIsLoading(true);
    const requestData = {
      company_id: company_id,
      category_id: "",
    };
    authFetch(ADMIN_SERVICES.FETCH_AGGREGATED_CATEGORY, requestData)
      .then((res) => {
        setIsLoading(false);
        const { result, status, message } = res;
        if (status === "success") {
          const filteredResult = result.filter(
            (item) => item.service_list.length > 0
          );
          setTabsData(filteredResult);
        } else {
          enqueueSnackbar(message, { variant: "error" });
        }
      })
      .catch((res) => {
        setIsLoading(false);
        const { message } = res;
        enqueueSnackbar(message, { variant: "error" });
      });
  };

  const fetchCompanyDetails = () => {
    setIsLoading(true);
    const requestData = {
      company_id: "",
      company_base_id: company_base_id,
    };
    authFetch(GENERAL_SERVICES.FETCH_COMPANY, requestData)
      .then((res) => {
        setIsLoading(false);
        const { status, result, message } = res;
        if (status === "success") {
          setBranches(result.filter((item) => item.company_name !== ""));
          fetchCategoriesData(result[0].company_id);
        } else {
          enqueueSnackbar(message, { variant: "error" });
        }
      })
      .catch((res) => {
        setIsLoading(false);
        console.log(res);
      });
  };

  useEffect(() => {
    if (location) {
      fetchCompanyDetails();
      // fetchCategoriesData();
    } else {
      navigateHome();
    }
  }, []);

  return (
    <Grid container sx={{ maxWidth: "1440px" }}>
      <LoadingBackdrop open={isLoading} />
      {/* <Grid item md={12} mb={2}>
        <ServiceHeader />
        <ChangeButton />
      </Grid> */}
      <Grid item md={7} xs={12}>
        <ServiceTabs data={tabsData} />
        {matches && isItems && (
          <Summary mobile={true} navigate={navigateDateSelection} />
        )}
      </Grid>
      {!matches && (
        <Grid item md={5} xs={12} sx={{ marginTop: "220px" }}>
          <div style={{ position: "fixed", width: "450px" }}>
            {isItems && <Summary />}
            {isItems && (
              <SecondaryButton
                title="Select date and time"
                style={{
                  width: "100%",
                  marginTop: "10px",
                  color: "white",
                  background: "#3361FF",
                  height: "50px",
                }}
                onClick={navigateDateSelection}
              />
            )}

            {!isItems && <EmptyCart />}
          </div>
        </Grid>
      )}
    </Grid>
  );
};

export default SelectServicePageSections;
