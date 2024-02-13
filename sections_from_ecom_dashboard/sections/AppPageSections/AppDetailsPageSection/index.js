import { Box, Grid, Typography } from "@mui/material";
import AppImage from "components/Common/AppImage";
import React, { useEffect, useState } from "react";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import { useRouter } from "next/router";
import BasicTabs from "components/Common/Tabs/BasicTabs";
import MuiBaseTable from "components/Common/Tables/MuiBaseTable";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import productImage from "public/assets/t-shirt.png";
import { CHANNEL, PRODUCT } from "constants/API_URL";
import { useSelector } from "react-redux";
import appFetch from "utils/appFetch";
import { useQuery } from "@tanstack/react-query";
import SectionLoader from "components/Common/LoadingIndicators/SectionLoader";
import BaseCard from "components/Common/Cards/BaseCard";
import { TypeSpecimenOutlined } from "@mui/icons-material";
import AppLink from "components/Common/AppLink";
import RouterTabs from "components/Common/Tabs/RouterTabs";

export default function AppDetailsPageSection({
  display_image,
  title,
  tabsData,
  pageType,
  pageID,
  isLoading,
  isUsedOnReviewPage,
  basePath,
}) {
  return (
    <Box>
      {isLoading && <SectionLoader />}

      {!isLoading && (
        <>
          {!isUsedOnReviewPage && (
            <Box
              sx={{
                marginBottom: "10px",
                backgroundColor: "white",
              }}
            >
              {/* <Breadcrumbs
                sx={{ fontSize: "12px", padding: "20px" }}
                aria-label="breadcrumb"
              >
                <AppLink href="/app/products" sx={{ color: "#5860D7" }}>
                  Products
                </AppLink>

                <Typography
                  sx={{ fontSize: "12px" }}
                  // underline="hover"
                  color="#5860D7"
                  fontWeight="600"
                  // href="/material-ui/react-breadcrumbs/"
                  // aria-current="page"
                >
                  {pageID}
                </Typography>
              </Breadcrumbs> */}

              <Grid container>
                <Grid item md={1.4} sm={3}>
                  {/* <BaseCard
                    sx={{
                      height: "150px",
                      width: "120px",
                      marginLeft: "20px",
                      marginBottom: "20px",
                      borderRadius: "0px",
                    }}
                  > */}
                    <AppImage
                      src={display_image}
                      height="150"
                      width="150"
                      sx={{ ml: "16px" }}
                      // sx={{ objectFit: "contain" }}
                    />
                  {/* </BaseCard> */}
                </Grid>

                <Grid item md={8} sm={9}>
                  <SectionTitleText
                    sx={{
                      fontWeight: "700",
                      fontSize: "18px",
                      // paddingLeft: "20px",
                      paddingTop: "20px",
                    }}
                  >
                    {title}
                  </SectionTitleText>
                  <DescriptionText
                    sx={{
                      display: "flex",
                      flexDirection: "row",

                      fontWeight: "500",
                      fontSize: "14px",
                      color: "#313D4E",
                      // paddingLeft: "20px",
                      paddingTop: "10px",
                    }}
                  >
                    Master {pageType} ID : {pageID}
                    <DescriptionText
                      sx={{
                        fontWeight: "500",
                        fontSize: "14px",
                        color: "#313D4E",
                        paddingLeft: "360px",
                        paddingTop: "10px",
                      }}
                    />
                    {/* Created on : 12/12/2021 */}
                    <br />
                    {/* Updated on: 12/12/2021 */}
                    {/* / Style : Blue */}
                    {/* / Style : Blue */}
                  </DescriptionText>
                </Grid>
              </Grid>
            </Box>
          )}
          <Box sx={{ marginTop: "20px", backgroundColor: "white" }}>
            {isUsedOnReviewPage ? (
              <BasicTabs sx={{ fontSize: "14px" }} data={tabsData} />
            ) : (
              <RouterTabs
                sx={{ fontSize: "14px" }}
                data={tabsData}
                basePath={basePath}
              />
            )}
          </Box>
        </>
      )}
    </Box>
  );
}
