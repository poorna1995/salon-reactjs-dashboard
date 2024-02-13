import {
  Avatar,
  Box,
  Breadcrumbs,
  Button,
  Divider,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";

import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { MERCHANT, PRODUCT, VENDOR } from "constants/API_URL";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserData } from "redux/user/userSlice";
import appFetch from "utils/appFetch";
import AddIcon from "@mui/icons-material/Add";
import MuiSelectInput from "components/Common/Inputs/SelectInput/MuiSelectInput";
import TextInput from "components/Common/Inputs/TextInput";
import BaseCard from "components/Common/Cards/BaseCard";
import AppLink from "components/Common/AppLink";
import { MdDeleteOutline, MdHomeFilled, MdTag } from "react-icons/md";
import { useRouter } from "next/router";
import OutlinedButton from "components/Common/Buttons/OutlinedButton";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import tagIcon from "public/assets/icons/tag-icon.png";
import AppImage from "components/Common/AppImage";
import BaseDialog from "components/Common/Dialog";
import MuiBaseDataGrid from "components/Common/Tables/MuiBaseDataGrid";
import { Container } from "@mui/system";
import theme from "theme";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import GrainIcon from "@mui/icons-material/Grain";
import logoImage from "public/assets/vendorLogo.png";
import VendorFormSelectLogo from "./VendorFormSelectLogo";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const VendorOnboardingSection = () => {
  const { currentUser } = useSelector(mapState);
  const dispatch = useDispatch();

  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const pageId = router.query.pageId;

  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactPhoneNumber, setContactPhoneNumber] = useState("");

  const [country, setCountry] = useState();
  const [email, setEmail] = useState("");
  const [onlineOrderPortal, setOnlineOrderPortal] = useState();
  const [paymentMethod, setPaymentMethod] = useState();
  const [paymentTerms, setPaymentTerms] = useState();
  const [countryCode, setCountryCode] = useState();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [vendorState, setVendorState] = useState("");
  const [username, setUsername] = useState("");
  const [vendorLeadtime, setVendorLeadtime] = useState();
  const [vendorRestockTime, setVendorRestockTime] = useState();
  const [websiteLink, setWebsiteLink] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [logo, setLogo] = useState("");

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [productsList, setProductsList] = useState([]);

  const [selectedProducts, setSelectedProducts] = useState([]);
  console.log({ paymentMethod, paymentTerms });

  //   const inputRef = React.useRef();

  //   const { currentUserLogo,productsData } = useSelector(mapState);
  // 	const productImages =
  // 		productsData[keyForReduxStateData].images ??
  // 		productsData.newProductImages;

  const [selectedFile, setSelectedFile] = React.useState("");
  // const createProductData = productsData[keyForReduxStateData];
  // const primaryImageFromState = createProductData?.display_image;
  const [showSelectedFile, setShowSelectedFile] = useState(true);
  const [productImage, setProductImage] = useState();
  const [loading, setLoading] = useState();
  // const [primaryImage, setPrimaryImage] = useState(
  //   primaryImageFromState ?? null,
  // );

  // const filteredProductImages =
  // 		Array.isArray(productImages) &&
  // 		productImages.filter((item) => item !== primaryImage);

  //     const containerStyles = {
  //       padding: "2px",
  //       marginTop: "0px",
  //       boxShadow: "none",
  //       border: "none",
  //       borderRadius: "0",
  //     };

  const handleAddVendor = () => {
    // if (
    //   Array.isArray(getSelectedProducts) &&
    //   getSelectedProducts.length === 0
    // ) {
    //   enqueueSnackbar("Please select products", { variant: "error" });
    //   return handleAddProductsDialogOpen();
    // }
    if (
      // address1 &&
      // address2 &&
      // websiteLink &&
      // contactName &&
      // contactPhoneNumber &&
      // onlineOrderPortal &&
      // username &&
      city &&
      companyName &&
      country &&
      email &&
      paymentMethod &&
      paymentTerms &&
      phoneNumber &&
      vendorState &&
      vendorLeadtime &&
      vendorRestockTime &&
      zipcode
    ) {
      const URL = VENDOR.ADD_VENDOR;
      const data = {
        address1: address1,
        address2: address2,
        city: city,
        company_name: companyName,
        contact_name: contactName || companyName,
        contact_phone_number: contactPhoneNumber || phoneNumber,
        country: country.value,
        email_id: email,
        online_order_portal: onlineOrderPortal,
        payment_method: paymentMethod.value,
        payment_terms: paymentTerms.value,
        phone_number: phoneNumber,
        state: vendorState,
        user_id: currentUser.merchant_id,
        username: username,
        vendor_id: pageId,
        vendor_leadtime: vendorLeadtime,
        vendor_restock_time: vendorRestockTime,
        website_link: websiteLink,
        zipcode: zipcode,
      };

      appFetch(URL, data)
        .then((json) => {
          if (json.status === "success") {
            enqueueSnackbar(json.message);
            return router.push(
              `/onboarding/vendors/${pageId}?step=products&id=1`
            );
            // resetForm();
          }
        })
        .catch((err) => console.log(err));
    }
    // enqueueSnackbar("Please fill all the fields", { variant: "error" });
  };

  const disableNextButton =
    !city ||
    !companyName ||
    !country ||
    !email ||
    !paymentMethod ||
    !paymentTerms ||
    !phoneNumber ||
    !countryCode ||
    !username ||
    !onlineOrderPortal ||
    !websiteLink ||
    !address1 ||
    !vendorState ||
    !vendorLeadtime ||
    !vendorRestockTime ||
    !zipcode;

  const resetForm = () => {
    setAddress1("");
    setAddress2("");
    setCity("");
    setCompanyName("");
    setContactName("");
    setContactPhoneNumber("");
    setCountry("");
    setEmail("");
    setOnlineOrderPortal("");
    setPaymentMethod("");
    setPaymentTerms("");
    setPhoneNumber("");
    setVendorState("");
    setUsername("");
    setVendorLeadtime("");
    setVendorRestockTime("");
    setWebsiteLink("");
    setZipcode("");
    setSelectedProducts([]);
  };
  const handleAddProductsDialogOpen = () => {
    setIsDialogOpen(true);
  };
  const handleProductsSelected = () => {};
  const handleFetchProducts = () => {
    const URL = PRODUCT.MERCHANT.FETCH_PRODUCT_MASTER;
    const data = {
      user_id: currentUser.merchant_id,
    };
    appFetch(URL, data).then((json) => {
      if (json.status === "success") {
        console.log(json);
        setProductsList(json.result);
      }
    });
  };
  useEffect(() => {
    handleFetchProducts();
  }, []);

  const productsTableData =
    Array.isArray(productsList) &&
    productsList.map((item) => {
      return {
        ...item,
        id: item.master_item_id,
      };
    });
  //   const getSelectedProducts =
  //     Array.isArray(selectedProducts) &&
  //     selectedProducts.map((item) => {
  //       const product = productsList.find(
  //         (product) => product.master_item_id === item
  //       );
  //       return product;
  //     });
  const handelFetchAddedproducts = () => {
    const URL = VENDOR.FETCH_ADDED_PRODUCTS;
    const data = {
      vendor_id: pageId,
    };
    appFetch(URL, data).then((json) => {
      if (json.status === "success") {
        console.log(json);
        setSelectedProducts(json.result);
      }
    });
  };

  //   console.log({ getSelectedProducts });
  const columnsData = [
    {
      field: "master_item_id",
      headerName: "ID",
      width: 100,
    },
    {
      field: "product_title",
      headerName: "Product Name",
      width: 200,
    },
    {
      field: "unit_retail_price",

      headerName: "Unit Retail Price",
      width: 200,
    },
  ];
  const handleAddProductsToVendor = (product) => {
    /**{
    "vendor_id": "138946255380553830",
    "master_product_id": "8071078904090",
    "master_item_id": "44320351355162",
    "unit_cost": 150,
    "moq": 12,
    "min_inventory": "25",
    "max_inventory": "1000",
    "lead_time_in_days": "15",
    "product_title": "90s Baggy High Jeans",
    "product_desc": "test desc"
} */
    const URL = VENDOR.ADD_PRODUCT;
    const data = {
      vendor_id: pageId,
      master_product_id: product.master_product_id,
      master_item_id: product.master_item_id,
      unit_cost: product.unit_retail_price,
      moq: product.moq,
      min_inventory: product.min_inventory,
      max_inventory: product.max_inventory,
      lead_time_in_days: product.lead_time_in_days,
      product_title: product.product_title,
      product_desc: product.product_desc,
    };
    appFetch(URL, data).then((json) => {
      if (json.status === "success") {
        enqueueSnackbar(json.message);
      }
    });
  };

  // const handleProductImageUpload = (file) => {
  //   const URL = PRODUCT.MERCHANT.UPLOAD_PRODUCT_IMAGE;
  //   const data = {
  //     user_id: currentUser.merchant_id,

  //     file: file,
  //   };
  //   appFetch(URL, data)
  //     .then((json) => {
  //       if (json.status === "success") {
  //         setLoading(false);
  //         setShowSelectedFile(false);
  //         setSelectedFile(null);
  //         setProductImage(json.result);
  //         enqueueSnackbar(json.message, { variant: "success" });
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // };

  //   display the uploaded image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(URL.createObjectURL(file));
    setShowSelectedFile(true);
    setLoading(true);
    // if (file) {

    // 	handleProductImageUpload(file);
    // 	// compressImageAndUpload(e, file);
    // }
  };

  console.log("**image", { selectedFile });

  //   const handleFileSelect = (e) => {
  //     const file = e.target.files[0];
  //     setSelectedFile(file);
  //     setShowSelectedFile(true);
  //     setLoading(true);
  //     if (file) {
  //       handleProductImageUpload(file);
  //       // compressImageAndUpload(e, file);
  //     }
  //   };

  //   console.log("**image", setShowSelectedFile);

  //   const handleAddProductsCount = async () => {
  //     await getSelectedProducts.map((item) => handleAddProductsToVendor(item));
  //     await setIsDialogOpen(false);
  //   };

  let windowWidth = typeof window !== "undefined" && window.innerWidth - 340;
  return (
    <>
      <Box
        sx={{
          position: "sticky",
          top: "64.5px",
          backgroundColor: "white",
          borderBottom: "1px solid #E5E5E5",
          zIndex: "100",
        }}
      >
        <Box
          sx={{
            // backgroundColor: "white",
            // width: "82%",
            // paddingBottom: "32px",
            // px: "250px",
            margin: "auto",
            paddingTop: "8px",
            maxWidth: "800px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            // width: windowWidth,
          }}
        >
          <SectionTitleText
            sx={{
              // p: "16px",
              paddingTop: "16px",
              paddingBottom: "16px",
            }}
          >
            Add New Vendor
          </SectionTitleText>
          <PrimaryButton
            sx={{
              p: "16px",
            }}
            onClick={() => handleAddVendor()}
            disabled={disableNextButton}
          >
            Save & Continue
          </PrimaryButton>
        </Box>
      </Box>
      {/* <Divider /> */}

      <Container
        maxWidth="md"
        // sx={{
        //   display: "flex",
        //   // flexDirection: "column",
        //   alignItems: "center",
        //   justifyContent: "space-between",
        //   // width: "100%",
        // }}
        // sx={{
        //   marginTop: "64px",
        // }}
      >
        {/* <Box
          sx={{
            // px: "50px",
            my: "16px",
            // alignItems: "center",
            width: windowWidth,
            height: "40px",
          }}
        > */}
        {/* <Breadcrumbs aria-label="breadcrumb">
          <AppLink
            underline="hover"
            sx={{ display: "flex", alignItems: "center" }}
            color="inherit"
            href="/"
          >
            <MdHomeFilled sx={{ mr: 0.5 }} fontSize="inherit" />
          </AppLink>
          <AppLink
            sx={{ display: "flex", alignItems: "center" }}
            href="/app/vendors"
          >
            <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" /> 
            Vendors
          </AppLink>
          <Typography
            sx={{
              display: "flex",
              alignItems: "center",
              color: "rgba(139, 141, 151, 1)",
            }}
            color="text.primary"
          >
            <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" /> 
            New Vendor
          </Typography>
          <Typography
            sx={{
              // display: "flex",
              // alignItems: "center",
              color: "rgba(139, 141, 151, 1)",
            }}
            color="text.primary"
          >
            <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" /> #{pageId}
          </Typography>
        </Breadcrumbs> */}
        {/* </Box>  */}
        {/* <Grid container sx={{ marginBottom: "24px" }}>
          <Grid
            item
            md={0}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          > */}
        {/* </Grid> */}
        {/* </Grid> */}
        {/* <Grid
          container
          spacing={4}
          sx={{
            paddingBottom: "80px",
          }}
        >
          <Grid item md={8} xs={1}> */}
        {/* <BaseCard
              sx={{
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
              }}
            > */}
        {/* General Info */}
        <Box sx={{ px: "50px", paddingBottom: "32px" }}>
          <SectionTitleText
            sx={{
              // p: "16px",
              paddingBottom: "16px",
              paddingTop: "16px",
              borderBottom: "1px solid rgba(0,0,0,0.1)",
            }}
          >
            General Details
          </SectionTitleText>
          <Box>
            <TextInput
              sx={{
                height: "50px",
              }}
              title="Company Name"
              required={true}
              value={companyName}
              containerStyles={textContainerStyle}
              onChange={(e) => setCompanyName(e.target.value)}
            />
            <TextInput
              sx={{
                height: "50px",
              }}
              title="Email"
              required={true}
              type="email"
              value={email}
              containerStyles={textContainerStyle}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextInput
              sx={{
                height: "50px",
              }}
              title="Phone number"
              type="tel"
              required={true}
              containerStyles={textContainerStyle}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <MuiSelectInput
              sx={{
                height: "50px",
              }}
              title="Country Code"
              required={true}
              containerStyles={containerStyle}
              value={countryCode}
              setValue={setCountryCode}
              // onChange={(e) =>
              // 	setPaymentTerms(e.target.value)
              // }
              options={countryCodeOPtionsWithLable}
            />
            <TextInput
              sx={{
                height: "50px",
              }}
              title="Username/Alias"
              required={true}
              value={username}
              containerStyles={textContainerStyle}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Typography marginTop="10px" marginBottom="5px">
              Select Logo
            </Typography>
            <Box
              sx={{
                display: "flex",
                // flexDirection: "column",
                // justifyContent: "space-between",
                // alignItems: "Left",
              }}
            >
              <label
                className="custom-file-upload"
                style={{
                  display: "inline-block",
                  // padding: "6px 12px",
                  cursor: "pointer",
                  // marginBottom: "16px",
                }}
              >
                <input
                  type="file"
                  accept="image/png, image/webp, image/jpeg"
                  style={{
                    display: "none",
                  }}
                  // disabled={img.length >= 5}
                  // ref={inputRef}
                  // value={selectedFile}
                  onChange={(e) => handleImageChange(e)}
                />
                {selectedFile ? (
                  <AppImage
                    src={selectedFile}
                    sx={{
                      // width: "100%",
                      // maxWidth: "100%",
                      // maxHeight: "200px",
                      // objectFit: "contain",
                      // height: "140px",
                      // minHeight: "160px",
                      border: "1px dashed #D0D5DD",
                      borderRadius: "5px",
                    }}
                    alt=""
                    height="140"
                    width="160"
                  />
                ) : (
                  <AppImage
                    src={logoImage}
                    sx={{
                      // width: "100%",
                      // maxWidth: "100%",
                      // maxHeight: "200px",
                      // objectFit: "contain",
                      // height: "140px",
                      // minHeight: "160px",
                      border: "1px dashed #D0D5DD",
                      borderRadius: "5px",
                    }}
                    alt=""
                    height="140"
                    width="160"
                  />
                )}{" "}
                {/* Browse File */}
              </label>

              {/* <AppImage src={logoImage} width="80" height="80" /> */}
              {/* <Button
								variant="primary"
								sx={{
									marginTop: "15px",
									border: "1px solid rgba(0,0,0,0.1)",
									width: "30%",
									height: "40px",
									marginLeft: "15px",
								}}
							>
								Change Picture
							</Button> */}
            </Box>
            <Divider sx={{ marginTop: "20px" }} />
            <TextInput
              sx={{
                height: "50px",
              }}
              title="Online order portal"
              value={onlineOrderPortal}
              required={true}
              containerStyles={textContainerStyle}
              onChange={(e) => setOnlineOrderPortal(e.target.value)}
            />
            <TextInput
              sx={{
                height: "50px",
              }}
              // sx={{ margin: '20px', marginBottom: '18px', width: '66.5%' }}
              id="outlined-basic"
              title="Website URL"
              value={websiteLink}
              required={true}
              containerStyles={textContainerStyle}
              onChange={(e) => setWebsiteLink(e.target.value)}
            />

            <Divider
              sx={{
                height: "20px",
                marginBottom: "-5px",
              }}
            />
            <TextInput
              sx={{
                height: "50px",
              }}
              title="Address 1"
              value={address1}
              required={true}
              containerStyles={textContainerStyle}
              onChange={(e) => setAddress1(e.target.value)}
            />
            <TextInput
              sx={{
                height: "50px",
              }}
              title="Address 2"
              value={address2}
              containerStyles={textContainerStyle}
              onChange={(e) => setAddress2(e.target.value)}
            />

            <TextInput
              sx={{
                height: "50px",
              }}
              // sx={{ margin: '20px', marginBottom: '-8px', width: '66.5%' }}
              id="outlined-basic"
              title=" Zip code"
              type="number"
              required={true}
              value={zipcode}
              containerStyles={textContainerStyle}
              onChange={(e) => setZipcode(e.target.value)}
            />
            <SectionTitleText>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <TextInput
                  sx={{
                    height: "50px",
                    width: "95%",
                    justifyContent: "space-between",
                    marginright: theme.spacing(1),
                  }}
                  id="outlined-basic"
                  title="City"
                  required={true}
                  value={city}
                  containerStyles={textContainerStyle}
                  onChange={(e) => setCity(e.target.value)}
                />
                <TextInput
                  sx={{
                    height: "50px",
                    width: "100%",
                    justifyContent: "space-between",
                    marginleft: theme.spacing(1),
                  }}
                  id="outlined-basic"
                  title="State"
                  required={true}
                  value={vendorState}
                  containerStyles={textContainerStyle}
                  onChange={(e) => setVendorState(e.target.value)}
                />
              </Box>
            </SectionTitleText>
            <MuiSelectInput
              containerStyles={containerStyle}
              // sx={{ marginTop: "24px", width: "30%" }}
              title="Country"
              required={true}
              value={country}
              options={countryOptionsWithLabel}
              setValue={setCountry}
            />

            <SectionTitleText
              sx={{
                marginTop: "16px",
                // px: "60px",
                paddingBottom: "16px",
                //   p: "16px",
                // borderTop: "1px solid rgba(0,0,0,0.1)",
                borderBottom: "1px solid rgba(0,0,0,0.1)",
              }}
            >
              Payment Details
            </SectionTitleText>
            {/* <Box sx={{ px: "60px" }}> */}
            <MuiSelectInput
              sx={{
                height: "50px",
              }}
              title="Payment terms"
              required={true}
              containerStyles={containerStyle}
              value={paymentTerms}
              setValue={setPaymentTerms}
              // onChange={(e) =>
              // 	setPaymentTerms(e.target.value)
              // }
              options={paymentTermsOptionsWithLabel}
            />
            <MuiSelectInput
              sx={{
                height: "50px",
              }}
              title="Payment method"
              required={true}
              containerStyles={containerStyle}
              value={paymentMethod}
              setValue={setPaymentMethod}
              // onChange={(e) =>
              // 	setPaymentMethod(e.target.value)
              // }
              options={paymentMethodOptionsWithLabel}
            />
            <SectionTitleText
              sx={{
                display: "flex",
                flexDirection: "column",
                marginTop: "16px",
                paddingBottom: "16px",
                //   px: "60px",
                // alignItems: "center",
                //   p: "16px",
                // borderTop:   "1px solid rgba(0,0,0,0.1)",
                borderBottom: "1px solid rgba(0,0,0,0.1)",
              }}
            >
              Shipment Constraints
            </SectionTitleText>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TextInput
                sx={{
                  width: "95%",
                  justifyContent: "space-between",
                  marginright: theme.spacing(1),
                }}
                title="Vendor Leadtime (in days) "
                type="number"
                required={true}
                containerStyles={textContainerStyle}
                value={vendorLeadtime}
                onChange={(e) => setVendorLeadtime(e.target.value)}
              />
              <TextInput
                sx={{
                  width: "100%",
                  justifyContent: "space-between",
                  marginleft: theme.spacing(1),
                }}
                title="Vendor Restock time (in days)"
                value={vendorRestockTime}
                required={true}
                containerStyles={textContainerStyle}
                onChange={(e) => setVendorRestockTime(e.target.value)}
              />
              {/* </Box> */}
            </Box>
          </Box>
        </Box>

        {/* Address info */}
        {/* <Box> */}
        {/* <SectionTitleText
								sx={{
									p: "16px",
									borderTop: "1px solid rgba(0,0,0,0.1)",
									borderBottom: "1px solid rgba(0,0,0,0.1)",
								}}
							>
								Address
							</SectionTitleText> */}
        {/* <Box sx={{ px: "60px", paddingBottom: "24px" }}> */}

        {/* </Box> */}
        {/* </Box> */}
        {/* </BaseCard>
            <BaseCard
              sx={{
                marginTop: "16px",
              }}
            > */}
        {/* <Box
                sx={{
                  marginTop: "16px",
                  paddingBottom: "32px",
                }}
              > */}

        {/* </Box> */}
        {/* </BaseCard> */}
        {/* </Grid> */}
        {/* <Grid item md={4} xs={12}>
          <BaseCard sx={{ padding: "16px" }}>
            <SectionTitleText sx={{ marginBottom: "16px" }}>
              Add Products
            </SectionTitleText>
            <Divider />
            <Box
              sx={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                paddingTop: "16px",
              }}
            >
              <Avatar
                sx={{
                  background: "#EEEFFB",
                  padding: "16px",
                  minHeight: "56px",
                  minWidth: "56px",
                }}
              >
                <AppImage src={tagIcon} width="30" height="30" />
              </Avatar>
              <Button
                sx={{
                  bgcolor: "#F7F7FD",
                  borderRadius: "5px",
                  marginTop: "16px",
                  fontWeight: 500,
                }}
                onClick={() => handleAddProductsDialogOpen()}
              >
                Add products
              </Button>
            </Box>
          </BaseCard>
          <Grid container spacing={2} sx={{ marginTop: "16px" }}>
            {getSelectedProducts.length > 0 &&
              getSelectedProducts.map((item, index) => {
                return (
                  <Grid item xs={6} key={index}>
                    <BaseCard
                      key={index}
                      sx={{
                        padding: "16px",
                        // margin: "8px",
                      }}
                    >
                      <AppImage
                        src={item.display_image}
                        width="160"
                        height="160"
                      />
                      <SectionTitleText>{item.product_title}</SectionTitleText>
                    </BaseCard>
                  </Grid>
                );
              })}
          </Grid>
        </Grid> */}
        {/* </Grid> */}
      </Container>
      <Box
        sx={{
          display: "flex",
          position: "relative",
          bottom: "0px",
          width: windowWidth,
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px",
          background: "#fff",
          marginLeft: "-12px",
        }}
      >
        {/* <OutlinedButton>Discard</OutlinedButton>{" "}
				<PrimaryButton onClick={() => handleAddVendor()}>
					Add vendor
				</PrimaryButton> */}
      </Box>
      <BaseDialog
        open={isDialogOpen}
        handleClose={() => setIsDialogOpen(false)}
      >
        <Box
          sx={{
            padding: "16px",
            minWidth: "600px",
            minHeight: "300px",
          }}
        >
          <SectionTitleText>Add Products</SectionTitleText>
          <Divider />
          <Box>
            <MuiBaseDataGrid
              data={productsList}
              rowIdkey={"master_item_id"}
              columnDefData={columnsData}
              onSelectionModelChange={(newSelectionModel) => {
                setSelectedProducts(newSelectionModel);
              }}
              selectionModel={selectedProducts}
              disableSelectionOnClick={false}
            />
            {console.log("selectedProducts", selectedProducts)}
            {/* <Grid container spacing={4} sx={{ fontWeight: 600 }}>
							<Grid item xs={8}>
								Product
							</Grid>
							<Grid item xs={2}>
								Unit Price
							</Grid>
							<Grid item xs={2}>
								Type
							</Grid>
						</Grid>

						{Array.isArray(productsList) &&
							productsList.map((item, index) => {
								return (
									<Grid container key={index} spacing={4}>
										<Grid item xs={8}>
											<AppImage
												src={item.display_image}
												width="40"
												height="40"
											/>{" "}
											{item.product_title}
										</Grid>
										<Grid item xs={2}>
											{item.unit_retail_price}
										</Grid>
										<Grid item xs={2}>
											{item.type}
										</Grid>
									</Grid>
								);
							})} */}
          </Box>
          {/* <Box>
            <PrimaryButton
              sx={{ marginTop: "16px" }}
              onClick={() => handleAddProductsCount()}
            >
              Add Products to vendor
            </PrimaryButton>
          </Box> */}
        </Box>
      </BaseDialog>
    </>
  );
};
export default VendorOnboardingSection;

const textContainerStyle = {
  maxWidth: "100%",
  marginTop: "16px",
};
const containerStyle = {
  maxWidth: "100%",
  marginTop: "8px	",
};

const paymentTermsOptions = [
  `PIA: Payment in advance`,
  `EOM: End of month`,
  `CIA: Cash in advance`,
  `COD: Cash on delivery`,
  `CND: Cash next delivery`,
  `CWO: Cash with order`,
  `CBS: Cash before shipment`,
  `Net 30: Payment is required 30 days after the invoice date`,
  `21 MFI: 21st of the month that follows the invoice date`,
  `Letter of credit: Documentary credit that is confirmed by the bank, used typically for export`,
  `Net monthly account: Payment due on the final day of the month following the month in which your invoice is dated`,
  `Documentary collection: Trade transaction in which an exporter assigns the duty of collecting payment, and the document is mailed to a bank with instructions for payment`,
];
const paymentTermsOptionsWithLabel = paymentTermsOptions.map((item, index) => {
  return { label: item, value: item };
});

const paymentMethodOptions = [
  `Credit card`,
  `Paypal`,
  `Wire transfer`,
  `Debit Card`,
];

const CountryCodeOptions = [
  `+91 India`,
  `+1 USA`,
  `+62 Indonesia`,
  `+39 Italy`,
  `+81 Japan`,
  `+60 Malaysia`,
  `+52 Mexico`,
];
const countryCodeOPtionsWithLable = CountryCodeOptions.map((item, index) => {
  return { label: item, value: item };
});

const paymentMethodOptionsWithLabel = paymentMethodOptions.map(
  (item, index) => {
    return { label: item, value: item };
  }
);

const countryOptions = ["India", "USA", "Australia"];
const countryOptionsWithLabel = countryOptions.map((item, index) => {
  return { label: item, value: item };
});
