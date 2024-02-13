import MuiBaseDataGrid from "components/Common/Tables/MuiBaseDataGrid";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { PRODUCT, VENDOR } from "constants/API_URL";
import { useSelector } from "react-redux";
import appFetch from "utils/appFetch";
import product from "components/Common/Icons/product";
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import AppImage from "components/Common/AppImage";

const mapState = ({ user }) => ({ currentUser: user.currentUser });
export default function VendorDPProductSection() {
  const { currentUser } = useSelector(mapState);
  const USER_ID = currentUser.merchant_id;
  const [productDataWithId, setProductDataWithId] = useState([]);
  const router = useRouter();
  const vendorId = router.query.vendorId;

  const handleFetchProductsList = () => {
    const URL = VENDOR.FETCH_PRODUCT;
    const data = {
      user_id: USER_ID,
      vendor_id: vendorId,
    };
    appFetch(URL, data)
      .then((json) => {
        console.log("json", json);
        setProductDataWithId(json.result);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    if (vendorId) {
      handleFetchProductsList();
    }
  }, [vendorId]);
  console.log("**", { productDataWithId });

  const columnData = [
    {
      field: "product",
      headerName: "Product",
      //   width: 70,
      flex: 1,
      renderCell: (params) => {
        return (
          <>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AppImage
                src={params.row.display_image}
                alt={params.row.product_title}
                width={50}
                height={50}
                style={{ borderRadius: "5px" }}
              />
              <Typography>{params.row.product_title}</Typography>
            </Box>
          </>
        );
      },
    },
    {
      field: "master_product_id",
      headerName: "Master Product ID",
      width: 200,
      // flex: 1,
    },
    {
      field: "product_sku",
      headerName: "SKU",
      width: 100,
      // flex: 1,
    },
    {
      field: "variant",
      headerName: "Variant",
      width: 200,
      // flex: 1,
    },
    {
      field: "unit_cost_price",
      headerName: "Price",
      width: 100,
      // flex: 1,
    },
    {
      field: "qty_available",
      headerName: "QTY Available",
      width: 200,
      // flex: 1,
    },
    // {
    // 	field: "",
    // 	headerName: "Channel",
    // 	// width: 200,
    // 	flex: 1,
    // },
    // {
    // 	field: "",
    // 	headerName: "Status",
    // 	// width: 200,
    // 	flex: 1,
    // },
  ];

  return (
    <Grid>
      {/* {Array.isArray(productDataWithId) && productDataWithId.length > 0 && ( */}
      <MuiBaseDataGrid
        data={productDataWithId}
        columns={columnData}
        rowIdkey="master_item_id"
        checkboxSelection={false}
        // rows={productDataWithId}
        // rows={rowData}
      />
      {/* )} */}

      {/* {productDataWithId && productDataWithId.company_name} */}
    </Grid>
  );
}
