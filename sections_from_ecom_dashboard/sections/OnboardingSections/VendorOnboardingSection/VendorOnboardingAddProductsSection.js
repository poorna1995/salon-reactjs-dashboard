import { Avatar, Box, Button, Divider, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import AppImage from "components/Common/AppImage";
import IconButtonWithTooltip from "components/Common/Buttons/IconButtonWithTooltip";
import PrimaryButton from "components/Common/Buttons/PrimaryButton";
import BaseCard from "components/Common/Cards/BaseCard";
import BaseDialog from "components/Common/Dialog";
import DeleteIcon from "components/Common/Icons/DeleteIcon";
import MuiBaseDataGrid from "components/Common/Tables/MuiBaseDataGrid";
import SectionTitleText from "components/Common/Typography/HeadingText/SectionTitleText";
import { CHANNEL, PRODUCT, VENDOR } from "constants/API_URL";
import { useRouter } from "next/router";
import tagIcon from "public/assets/icons/tag-icon.png";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import appFetch from "utils/appFetch";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

export default function VendorOnboardingAddProductsSection() {
  const { currentUser } = useSelector(mapState);
  const router = useRouter();
  const pageId = router.query.pageId;

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [productsList, setProductsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [channels, setChannels] = useState([]);

  const URL = VENDOR.ADD_VENDOR;

  // write a function to get selected products for the vendor
  // const getSelectedProducts = () => {
  //   const selectedProducts = [];
  //   productsList.forEach((product) => {
  //     if (product.is_selected) {
  //       selectedProducts.push(product.master_item_id);
  //     }
  //   });
  //   setSelectedProducts(selectedProducts);
  // };

  // const handleFetchProducts = () => {

  // };
  // useEffect(() => {
  //   handleFetchProducts();
  // }, []);

  // const productsTableData =
  //   Array.isArray(productsList) &&
  //   productsList.map((item) => {
  //     return {
  //       ...item,
  //       id: item.master_item_id,
  //     };
  //   });

  const handleAddProductsToVendor = () => {
    // route this page to VenderOnboardingSteps
    // router.push(`/vendorOnboardingAddProductDialog/${pageId}`);
    setIsDialogOpen(false);

    const URL = VENDOR.ADD_PRODUCT;
    const data = {
      user_id: currentUser.merchant_id,
      master_product_id: selectedProducts,
      vendor_id: pageId,
    };
    appFetch(URL, data)
      .then((json) => {
        console.log({ json });
        handleFetchVendorProducts();
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  const handleFetchProducts = () => {
    setIsLoading(true);
    const url = PRODUCT.MERCHANT.FETCH_PRODUCTS_LIST;
    const data = {
      user_id: currentUser.merchant_id,
    };
    appFetch(url, data)
      .then((json) => {
        setIsLoading(false);
        if (json.status === "success") {
          setData(json.result);
        }
        console.log({ products: json });
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    handleFetchProducts();
  }, []);
  useEffect(() => {
    if (pageId) {
      handleFetchVendorProducts();
    }
  }, [pageId]);
  const handleFetchVendorProducts = () => {
    const URL = VENDOR.FETCH_PRODUCT;
    const data = {
      user_id: currentUser.merchant_id,
      vendor_id: pageId,
    };
    appFetch(URL, data)
      .then((json) => {
        console.log({ json });
        setProductsList(json.result);
      })
      .catch((err) => console.error(err));
  };

  const handleNextButtonClick = () => {
    router.push(`/app/vendors/${pageId}?tab=overview`);
  };

  // const handleFetchChannels = () => {
  //   const URL = CHANNEL.FETCH_CHANNEL;
  //   fetch(URL)
  //     .then((res) => res.json())
  //     .then((json) => {
  //       setChannels(json.result);
  //     });
  // };
  // useEffect(() => {
  //   handleFetchChannels();
  // }, []);

  // const getSelectedProducts =
  //   Array.isArray(selectedProducts) &&
  //   selectedProducts.map((item) => {
  //     const product
  //     = productsList.find(
  //       (product) => product.master_item_id === item
  //     );
  //     return product;
  //   });

  // display selected proucts, sku and price in the table
  const selectedProductsTableData =
    Array.isArray(selectedProducts) &&
    selectedProducts.map((item) => {
      return {
        master_product_id: item,
        id: item.master_item_id,
        SKU: item.sku,
        price: item.price,
      };
    });

  // filter selected products from the tableData
  const filterSelectedProducts = (tableData, selectedItems) => {
    const getFilteredItems = tableData.filter((item) => {
      const isItemSelected = selectedItems.find(
        (selectedItem) => selectedItem === item.master_product_id
      );
      return isItemSelected;
    });
    return getFilteredItems;
  };

  const selectedItemsForVendor = filterSelectedProducts(data, selectedProducts);
  console.log("tableListData", data, selectedItemsForVendor);

  console.log("selectedProductsTableData", selectedProductsTableData);

  const handleAddProductsDialogOpen = () => {
    setIsDialogOpen(true);
    // console.log("**", setIsDialogOpen);
  };

  const columnsData = [
    // {
    //   field: "master_item_id",
    //   headerName: "ID",
    //   width: 100,
    // },
    {
      field: "product_title",
      headerName: "Product Name",
      flex: 1,
      valueGetter: ({ value }) => value,
      renderCell: (params) => (
        <>
          <AppImage src={params.row.display_image} width="40" height="40" />
          <Typography sx={{ ml: "12px" }}>
            {params.row.product_title}
          </Typography>
        </>
      ),
    },
    {
      field: "sku",
      headerName: "SKU",
      flex: 0.5,
      // valueGetter: ({ value }) => value,
    },
    {
      field: "unit_retail_price",
      headerName: "Price",
      flex: 0.5,
      // valueGetter: ({ value }) => value,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 0.5,
      renderCell: (params) => (
        <IconButtonWithTooltip icon={<DeleteIcon />} title={"Delete"} />
      ),
      // valueGetter: ({ value }) => value,
    },
  ];
  console.log("selectedProducts", selectedProducts);

  return (
    <>
      <Box
        sx={{
          // paddingBottom: "32px",
          px: "250px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <SectionTitleText
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
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
          onClick={() => handleNextButtonClick()}
        >
          Save & Continue
        </PrimaryButton>
      </Box>
      <Divider />
      <Container maxWidth="md">
        <Grid item md={4} xs={12}>
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
                paddingBottom: "16px",
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
          {/* <Grid container spacing={2} sx={{ marginTop: "16px" }}>
						{selectedItemsForVendor.length > 0 &&
							selectedItemsForVendor.map((item, index) => {
								return (
									<Grid item xs={6} key={index}>
										{/* <BaseCard
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
					</Grid> */}
          {Array.isArray(productsList) && productsList.length > 0 && (
            <MuiBaseDataGrid
              containerStyles={{
                height: "400px",
              }}
              data={productsList}
              rowIdkey={"master_product_id"}
              columnDefData={columnsData}
              checkboxSelection={false}
              // hideFooter={true}
            />
          )}
        </Grid>
      </Container>
      <BaseDialog
        open={isDialogOpen}
        handleClose={() => setIsDialogOpen(false)}
      >
        <Box
          sx={{
            padding: "16px",
            minWidth: "600px",
            minHeight: "167px",
          }}
        >
          <SectionTitleText>Add Products</SectionTitleText>
          <Divider />
          <Box
            sx={{
              minWidth: "600px",
              maxWidth: "800px",
            }}
          >
            <MuiBaseDataGrid
              containerStyles={{ height: "600px" }}
              data={data}
              rowIdkey={"master_product_id"}
              columnDefData={columnsData}
              onSelectionModelChange={(newSelectionModel) => {
                setSelectedProducts(newSelectionModel);
              }}
              selectionModel={selectedProducts}
              disableSelectionOnClick={false}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              marginTop: "16px",
              marginBottom: "-20px",
            }}
          >
            <PrimaryButton
              sx={
                {
                  // display: "flex",
                  // float: "right",
                  // marginTop: "16px",
                }
              }
              onClick={() => handleAddProductsToVendor()}
            >
              Add Selected Products
            </PrimaryButton>
          </Box>
        </Box>
      </BaseDialog>
    </>
  );
}
