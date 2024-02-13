import React, { useEffect, useState } from "react";
import { Typography, TextField, Divider } from "@mui/material";
import SecondaryButton from "components/common/Buttons/SecondaryButton";
import TextInput from "components/common/Inputs/TextInput";
import BSUploadLogo from "./BSUploadLogo";
import LocationSection from "./BSLocationSection";
import { useDispatch, useSelector } from "react-redux";
import useEnquequeSnackbar from "customHooks/useEnquequeSnackbar";
import { updateCompanyInfo } from "store/compnay-info/companySlice";
import authFetch from "utils/authFetch";
import { ADMIN_SERVICES } from "constants/API_URLS";
import LoadingBackdrop from "components/common/Loader/Backdrop/LoadingBackdrop";
import { useTheme } from "@mui/styles";

import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.down("sm")]: {
      "& .MuiInputLabel-root": {
        fontSize: "12px",
      },
    },
  },
  contentContainer: {
    width: "60%",
    marginBottom: "20px",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  compnayContainer: {
    width: "75%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  flexContainer: {
    marginTop: "20px",
    marginBottom: "20px",
    display: "flex",
    width: "100%",
    alignItems: "end",
    [theme.breakpoints.down("sm")]: {
      display: "block",
      "& .MuiButton-root": {
        width: "100%",
        marginTop: "10px",
        marginLeft: "0 !important",
        height: "45px !important",
      },
    },
  },
}));

const BrandingSection = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const enqueueSnackbar = useEnquequeSnackbar();
  const dispatch = useDispatch();
  const { user_id, domain } = useSelector((state) => state.user.currentUser);
  const { company_base_name, company_base_id, company_logo } = useSelector(
    (state) => state.companyInfo || {}
  );
  const [companyName, setCompanyName] = useState("");

  const updateCompanyName = (event) => {
    setCompanyName(event.target.value);
  };

  const updateCompanyMasterHandler = (newLogo) => {
    setIsLoading(true);
    const logo = newLogo || company_logo;
    const company = companyName || company_base_name;
    const requestData = {
      company_base_id: company_base_id,
      company_base_name: company,
      company_logo: logo,
      admin_id: user_id,
      domain: domain,
    };

    authFetch(ADMIN_SERVICES.UPDATE_MASTER_COMPANY, requestData)
      .then((res) => {
        setIsLoading(false);
        const { status, message } = res;
        if (status === "success") {
          dispatch(
            updateCompanyInfo({
              company_logo: logo,
              company_base_name: company,
            })
          );
          enqueueSnackbar(message, {
            variant: "success",
          });
        } else {
          enqueueSnackbar(message, {
            variant: "error",
          });
        }
      })
      .catch((res) => {
        setIsLoading(false);
        enqueueSnackbar(res.message, {
          variant: "error",
        });
      });
  };

  useEffect(() => {
    if (company_base_name) {
      setCompanyName(company_base_name);
    }
  }, [company_base_name]);

  return (
    <div className={classes.root}>
      <LoadingBackdrop open={isLoading} />
      <div style={{ display: "flex", alignItems: "center", marginTop: "20px" }}>
        <Typography
          mr={2}
          sx={{
            fontSize: "18px",
            fontWeight: "bold",
            [theme.breakpoints.down("sm")]: {
              fontSize: "14px",
            },
          }}
        >
          Branding
        </Typography>
        <Divider style={{ width: "70%" }} />
      </div>

      <div className={classes.contentContainer}>
        <div className={classes.flexContainer}>
          <div className={classes.compnayContainer}>
            <TextInput
              title={`Enter company name`}
              noMargin
              value={companyName}
              onChange={updateCompanyName}
            />
          </div>
          <SecondaryButton
            title="Update name"
            style={{ height: "55px", marginLeft: "10px" }}
            onClick={() => updateCompanyMasterHandler()}
            disabled={!companyName}
          />
        </div>

        <BSUploadLogo onSubmit={updateCompanyMasterHandler} />
      </div>
      <LocationSection />
    </div>
  );
};

export default BrandingSection;
