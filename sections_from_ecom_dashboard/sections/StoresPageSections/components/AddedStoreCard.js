import { Box, Divider, Icon, Typography } from "@mui/material";
import AppImage from "components/Common/AppImage";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import BaseCard from "components/Common/Cards/BaseCard";
import BulletIcon from "components/Common/Icons/BulletIcon";
import ViewLiveIcon from "components/Common/Icons/ViewLiveIcon";
import { useRouter } from "next/router";
import storecomplogo from "public/assets/storecomplogo.png";
import SectionLoader from "components/Common/LoadingIndicators/SectionLoader";
import React, { useState } from "react";
import StoreViewIcon from "components/Common/Icons/StoreViewIcon";

export default function AddedStoreCard({ title, data }) {
  const router = useRouter();

  const handleViewDetailsButton = () => {
    router.push(`/app/stores/${data.store_id}?tab=scope`);
  };
  return (
    <BaseCard
      sx={{
        boxShadow: "none",
        border: (theme) => `1px solid ${theme.palette.grey[200]}`,
        p: 2,
        width: "390px",
        marginRight: "20px",
        borderRadius: "12px",
      }}
    >
      <Box sx={{}}>
        <Box sx={{ display: "flex" }}>
          <AppImage src={storecomplogo} />

          <Box sx={{ ml: 2 }}>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: "19px",
                lineHeight: "23px",
                marginTop: "5px",
              }}
            >
              {title}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                mb: 1,
              }}
            >
              <BulletIcon />
              <Typography
                sx={{
                  textAlign: "right",
                  fontWeight: 600,
                  fontSize: "12px",
                  lineHeight: " 15px",
                  color: "#12B76A",
                  // mb: 1,
                  marginLeft: "5px",
                  my: 2,
                }}
              >
                Connected
              </Typography>
            </Box>
          </Box>

          {/* <Typography
            sx={{
              fontWeight: 700,
              fontSize: "19px",
              lineHeight: "23px",
              marginTop: "12px",
            }}
          >
            {title}
          </Typography> */}
        </Box>
        <div>
          {" "}
          {/* <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                mb: 1,
              }}
            >
              <BulletIcon />
              <Typography
                sx={{
                  textAlign: "right",
                  fontWeight: 600,
                  fontSize: "12px",
                  lineHeight: " 15px",
                  color: "#12B76A",
                  // mb: 1,
                  marginLeft: "5px",
                }}
              >
                Connected
              </Typography>
            </Box> */}
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "14px",
              lineHeight: "17px",
              color: "#313D4E",
              // my: 2,
            }}
          >
            Last Sync:
            <span style={{ fontWeight: 500 }}> 2023-02-24</span>
          </Typography>
        </div>
        {/* <div>
          {" "}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              mb: 1,
            }}
          >
            <BulletIcon />
            <Typography
              sx={{
                textAlign: "right",
                fontWeight: 600,
                fontSize: "12px",
                lineHeight: " 15px",
                color: "#12B76A",
                // mb: 1,
                marginLeft: "5px",
              }}
            >
              Connected
            </Typography>
          </Box>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: "14px",
              lineHeight: "17px",
              color: "#313D4E",
            }}
          >
            Last Sync:
            <span style={{ fontWeight: 500 }}> 2023-02-24</span>
          </Typography>
        </div> */}
      </Box>
      <Box
        sx={{
          display: "flex",

          mt: 2,
          flex: 1,
        }}
      >
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: " 20px",
            backgroundColor: (theme) => theme.palette.grey[100],
            width: "155px",
            // height: "90px",
            padding: "20px",
            marginRight: "20px",
            borderRadius: "10px",

            color: (theme) => theme.palette.grey[700],
            "& span": {
              fontWeight: 700,
              fontSize: "24px",
              lineHeight: "29px",
              marginBottom: "10px",
            },
            flex: 1,
          }}
        >
          Product Listings
          <br />
          <span> 120</span>
        </Typography>

        <Typography
          sx={{
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: " 20px",
            color: (theme) => theme.palette.grey[700],
            backgroundColor: (theme) => theme.palette.grey[100],
            padding: "20px",
            width: "155px",
            borderRadius: "10px",
            // right: "20px",
            // marginLeft: "20px",

            "& span": {
              fontWeight: 700,
              fontSize: "24px",
              lineHeight: "29px",
              marginBottom: "10px",
            },
          }}
        >
          Drafts
          <br />
          <span> 50</span>
        </Typography>
      </Box>
 
      <Divider sx={{ my: 2}} />
      {/* <Box
        sx={{
          mt: 3,
          mb: 3,
        }}
      >
        <Typography
          sx={{
            fontWeight: 400,
            fontSize: "14px",
            lineHeight: " 20px",
            color: (theme) => theme.palette.grey[700],
            "& span": {
              fontWeight: 700,
              fontSize: "24px",
              lineHeight: "29px",
            },
          }}
        >
          L7 Days
          <br />
          <span>$ 20,231</span>
        </Typography>
      </Box> */}

      <Box sx={{ display: "flex", justifyContent: "space-around" }}>
        <OutlinedButton sx={{ ml: 1 }} startIcon={<StoreViewIcon />}>
          View Store
        </OutlinedButton>
        <OutlinedButton
          sx={{ ml: 1 }}
          // startIcon={<StoreViewIcon />}
          onClick={() => handleViewDetailsButton()}
        >
          Store Detail
        </OutlinedButton>
      </Box>
    </BaseCard>
  );
}
// https://ecommerce-dashboard-app.vercel.app/auth/shopify-auth-callback?code=a6b682a248dc1e71d380f5948534afe8&hmac=effdb561d5f77e9acd3acddf9e99c9a2799aba06e6c74262d9e73d76a263a855&host=YWRtaW4uc2hvcGlmeS5jb20vc3RvcmUvaGl2ZXBhdGgtdGVzdC1zdG9yZQ&shop=hivepath-test-store.myshopify.com&timestamp=1677763001
