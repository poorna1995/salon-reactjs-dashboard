import { Container, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import BuildingVendorIcon from "components/Common/Icons/VendorIcon/BuildingVendorIcon";
import CallVendorIcon from "components/Common/Icons/VendorIcon/CallVendorIcon";
import DataVendorIcon from "components/Common/Icons/VendorIcon/DataVendorIcon";
import SmsVendorIcon from "components/Common/Icons/VendorIcon/SmsVendorIcon";
import { VENDOR } from "constants/API_URL";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import appFetch from "utils/appFetch";

const mapState = ({ user }) => ({ currentUser: user.currentUser });
export default function VendorDPOverviewSection(
  {
    // company_name,
    // address1,
    // email_id,
    // phone_number,
    // website_link,
  }
) {
  const [vendorData, setVendorData] = useState({});
  const router = useRouter();
  const { currentUser } = useSelector(mapState);
  const vendorId = router.query.vendorId;
  const USER_ID = currentUser.merchant_id;

  const handleFetchVendorsList = () => {
    const URL = VENDOR.FETCH_VENDOR;
    const data = {
      user_id: USER_ID,
      vendor_id: vendorId,
    };
    appFetch(URL, data).then((json) => {
      console.log(json);
      setVendorData(json.result[0]);
    });
  };
  useEffect(() => {
    if (vendorId) {
      handleFetchVendorsList();
    }
  }, [vendorId]);
  // console.log({ vendorData });

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* <Typography
          sx={{
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          {vendorData && vendorData.company_name}
        </Typography> */}

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <BuildingVendorIcon />
            <Typography
              sx={{
                fontWeight: "500",
                fontSize: "18px",
                lineHeight: "22px",
                mx: "8px",
                /* identical to box height */
                // color: "#313D4E",
                color: (theme) => theme.palette.text.primary,
              }}
            >
              {vendorData && vendorData.address1}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <SmsVendorIcon />
            <Typography
              sx={{
                fontWeight: "500",
                fontSize: "18px",
                lineHeight: "22px",
                mx: "8px",
                /* identical to box height */
                color: (theme) => theme.palette.text.primary,
              }}
            >
              {vendorData && vendorData.email_id}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <CallVendorIcon />
            <Typography
              sx={{
                fontWeight: "500",
                fontSize: "18px",
                lineHeight: "22px",
                mx: "8px",
                /* identical to box height */
                color: (theme) => theme.palette.text.primary,
              }}
            >
              {vendorData && vendorData.phone_number}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <DataVendorIcon />
            <a
              style={{
                fontWeight: "500",
                fontSize: "18px",
                lineHeight: "22px",
                marginLeft: "8px",
                textDecoration: "underline",
              }}
              href={vendorData && vendorData.website_link}
              target="_blank"
              rel="noreferrer"
            >
              {vendorData && vendorData.website_link}
            </a>
          </Box>
        </Box>

        <Box>
          <iframe
            title="My Location Map"
            style={{ width: "400px", height: "400px" }}
            src="https://www.google.com/maps/embed/v1/place?
	&q=D+Car+Serve,Subhash+Road,Rohtak+Haryana"
            allowFullScreen
          ></iframe>
        </Box>
      </Box>
    </>
  );
}
