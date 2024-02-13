import { Alert, Box, Button, Divider, Typography } from "@mui/material";
import AppImage from "components/Common/AppImage";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import BaseDialog from "components/Common/Dialog";
import ShopifyIcon from "components/Common/Icons/StoresIcon/ShopifyIcon";
import WooCommerceIcon from "components/Common/Icons/StoresIcon/WooCommerceIcon";
import TextInput from "components/Common/Inputs/TextInput";
import DescriptionText from "components/Common/Typography/BodyText/DescriptionText";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { WOOCOMMERCE } from "constants/API_URL";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import appFetch from "utils/appFetch";
import WooComHelpStep1 from "public/assets/stores/WooComHelpStep1.png";
import WooComHelpStep2 from "public/assets/stores/WooComHelpStep2.png";
import WooComHelpStep3 from "public/assets/stores/WooComHelpStep3.png";
import WooComHelpStep4 from "public/assets/stores/WooComHelpStep4.png";
import WooComHelpStep5 from "public/assets/stores/WooComHelpStep5.png";
import WooComHelpStep6 from "public/assets/stores/WooComHelpStep6.png";

import NavigateNextIcon from "components/Common/Icons/NavigateNextIcon";
import WooCommerceConsumerHelp from "./WooCommerceConsumerHelp";
import ConsumerHelpBaseDialog from "./ConsumerHelpBaseDialog";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});
export default function AddNewStoreWooCommerceSection() {
  const { currentUser } = useSelector(mapState);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = React.useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      storeName: "",
      consumerKey: "",
      consumerSecret: "",
    },
  });

  const handleConsumerDialogOpen = () => {
    setOpenDialog(true);
  };
  const handleConsumerDialogClose = () => {
    setOpenDialog(false);
  };

  const handleClickAddToStoreButton = (data) => {
    // POST
    // {
    //     "user_id":"138940023846722390",
    //     "shop":"test-store.local",
    //     "consumer_key":"ck_067a701cd9ae94b70018d9677cb84600761b2687",
    //     "consumer_secret":"cs_255c79b712293bd6960dc0bc99210c3d478b8952",
    //     "scope":""
    // }
    setIsLoading(true);
    const URL = WOOCOMMERCE.ADD_CREDENTIALS;
    const reqData = {
      user_id: currentUser.merchant_id,
      shop: data.storeName,
      consumer_key: data.consumerKey,
      consumer_secret: data.consumerSecret,
      scope: "",
    };
    appFetch(URL, reqData)
      .then((json) => {
        setIsLoading(false);
        if (json.status === "success") {
          console.log("success");
          enqueueSnackbar("Store added successfully");
          router.push(
            "/app/stores/add-store?step=sync&id=2&channel=woocommerce"
          );
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };
  return (
    <>
      <Box sx={{ pt: 4 }}>
        <SectionTitleText>Add your WooCommerce Store</SectionTitleText>
        <DescriptionText>
          Add your store which you want to integrate with our app
        </DescriptionText>
        <Box sx={{ mt: 3, mb: 2, display: "flex", alignItems: "center" }}>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: "18px",
              lineHeight: "22px",
            }}
          >
            Selected Channel :
          </Typography>
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              py: 1,
              px: 2,
              "& svg": {
                height: "20px",
                width: "30px",
                mr: 2,
              },
              fontWeight: 500,
              fontSize: "16px",
              lineHeight: " 21px",
              border: (theme) => `1px solid ${theme.palette.grey[200]}`,
              borderRadius: "5px",
              ml: 2,
            }}
          >
            <WooCommerceIcon /> <span>WooCommerce</span>
          </Typography>
        </Box>

        <Box>
          <Box sx={{ display: "flex", flex: 1 }}>
            <Controller
              name="storeName"
              control={control}
              render={({ field }) => (
                <TextInput
                  title="Store Name"
                  required
                  containerStyles={{
                    // maxWidth: "100%",
                    marginTop: "16px",
                  }}
                  {...field}
                  // helperText="Enter product title"
                  // maxLength={100}
                  // error={title.length === 0}
                />
              )}
            />
            <div style={{ flex: 1 }} />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
            <Controller
              name="consumerKey"
              control={control}
              render={({ field }) => (
                <TextInput
                  title="Consumer Key"
                  required
                  containerStyles={{
                    // maxWidth: "100%",
                    marginTop: "16px",
                  }}
                  {...field}
                />
              )}
            />
            <Button
              sx={{
                textTransform: "capitalize",
                mt: 6,
                ml: 2,
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
              onClick={() => handleConsumerDialogOpen()}
            >
              Find Consumer Key
            </Button>{" "}
            <div style={{ flex: 1 }} />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
            <Controller
              name="consumerSecret"
              control={control}
              render={({ field }) => (
                <TextInput
                  title="Consumer Secret"
                  required
                  containerStyles={{
                    // maxWidth: "100%",
                    marginTop: "16px",
                  }}
                  {...field}
                />
              )}
            />{" "}
            <Button
              sx={{
                textTransform: "capitalize",
                mt: 6,
                ml: 2,
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }}
              onClick={() => handleConsumerDialogOpen()}
            >
              Find Consumer Secret
            </Button>{" "}
            <div style={{ flex: 1 }} />
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            mt: 4,
            justifyContent: "space-around",
          }}
        >
          <PrimaryButton
            // onClick={() => handleClickProceed()}
            sx={{ width: "200px" }}
            disabled={isLoading}
            onClick={handleSubmit(handleClickAddToStoreButton)}
          >
            Add Store
          </PrimaryButton>
        </Box>
      </Box>


      <ConsumerHelpBaseDialog open={openDialog} handleClose={handleConsumerDialogClose} />
    </>
  );
}
