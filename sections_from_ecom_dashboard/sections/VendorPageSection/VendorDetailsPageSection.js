import { Phone } from "@mui/icons-material";
import { Box } from "@mui/system";
import MuiBaseDataGrid from "components/Common/Tables/MuiBaseDataGrid";
import MuiBaseTable from "components/Common/Tables/MuiBaseTable";
import { CHANNEL, PRODUCT, VENDOR } from "constants/API_URL";
import { de } from "date-fns/locale";
import { result } from "lodash";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AppDetailsPageSection from "sections/AppPageSections/AppDetailsPageSection";
import appFetch from "utils/appFetch";
import VendorDPOverviewSection from "./VendorDPOverviewSection";
import VendorDPProuductSection from "./VendorDPProductSection";
import VendorDPPurchaseOrder from "./VendorDPPurchaseOrder";

const mapState = ({ user }) => ({ currentUser: user.currentUser });
export default function VendorDetailsPageSection() {
  const router = useRouter();
  const tab = router.query.tab;
  const [productDataWithId, setProductDataWithId] = useState([]);
  const { currentUser } = useSelector(mapState);
  const vendorId = router.query.vendorId;

  const [data, setData] = useState({});

  const USER_ID = currentUser.merchant_id;
  const [vendorData, setVendorData] = useState({});

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

  const productsData = [
    {
      "Vendor Id": "321",
      "Master Item ID": "A0B1C024",
      "Master Product ID": "4339",
      "Item Title": "Day Glove ReKnit",

      "Unit Cost": "$95.00",
      "Minimum Order Quantity": "12",
      "Lead Time in days": "5",
    },
    {
      "Vendor Id": "321",
      "Master Item ID": "A0B1C024",
      "Master Product ID": "4339",
      "Item Title": "Day Glove ReKnit",

      "Unit Cost": "$95.00",
      "Minimum Order Quantity": "12",
      "Lead Time in days": "5",
    },
    {
      "Vendor Id": "321",
      "Master Item ID": "A0B1C024",
      "Master Product ID": "4339",
      "Item Title": "Day Glove ReKnit",

      "Unit Cost": "$95.00",
      "Minimum Order Quantity": "12",
      "Lead Time in days": "5",
    },
  ];

  //   display product data in table
  // const productDataWithId = productsData.map((product, index) => {
  //   return {
  //     ...product,
  //     id: index,
  //   };
  // });

  // const handleFetchProductsList = () => {
  //   const URL = PRODUCT.FETCH_PRODUCT;
  //   const data = {
  //     user_id: USER_ID,
  //     vendor_id: vendorId,
  //   };
  //   appFetch(URL, data)
  //     .then((json) => {
  //       const productDataWithId = json.result.map((product, index) => {
  //         return {
  //           ...product,
  //           id: index,
  //         };
  //       });
  //       setProductDataWithId(productDataWithId);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
  // useEffect(() => {
  //   if (vendorId) {
  //     handleFetchProductsList();
  //   }
  // }, [vendorId]);

  const product_overview = [
    {
      "Vendor Id": "321",
      "Vendor Name": "Adidas",
      "Vendor Type": "Manufacturer",
      "Vendor Status": "Active",
      "Vendor Rating": "4.5",
    },
    {
      "Vendor Id": "321",
      "Vendor Name": "Adidas",
      "Vendor Type": "Manufacturer",
      "Vendor Status": "Active",
      "Vendor Rating": "4.5",
    },
    {
      "Vendor Id": "321",
      "Vendor Name": "Adidas",
      "Vendor Type": "Manufacturer",
      "Vendor Status": "Active",
      "Vendor Rating": "4.5",
    },
    {
      "Vendor Id": "321",
      "Vendor Name": "Adidas",
      "Vendor Type": "Manufacturer",
      "Vendor Status": "Active",
      "Vendor Rating": "4.5",
    },
  ];

  //   display product_overview data in table
  const productOverviewWithId = product_overview.map((product, index) => {
    return {
      // title: [vendorData.company_name],
      // address1: [vendorData.address1],
      // email: [vendorData.email_id],
      // phone: [vendorData.phone_number],
      // website: [vendorData.website_link],
      // ...product,
      id: index,
    };
  });

  const purchaseOrderData = [
    // Data Will be displayed here from purchase order table
  ];

  //   display purchase order data in table
  const productPurchaseOrderWithId = purchaseOrderData.map((product, index) => {
    return {
      ...product,
      id: index,
    };
  });

  const staticData = [
    {
      label: "Overview",
      component: (
        <>
          {vendorData && (
            <VendorDPOverviewSection
            // company_name={vendorData?.company_name}
            // address1={vendorData?.address1}
            // email_id={vendorData?.email_id}
            // phone_number={vendorData?.phone_number}
            // website_link={vendorData?.website_link}
            />
          )}
        </>
        // <div>
        // Vendor Name: {vendorData?.company_name}
        //  </div>
      ),
      route: "overview",
    },
    {
      label: "Products",
      component: (
        <VendorDPProuductSection
        //  data={productDataWithId}
        //  rowIdkey="id"
        />

        // <MuiBaseDataGrid
        //   sx={{
        //     display: "flex",
        //     justifyContent: "center",
        //     width: "auto",
        //     height: "400px",
        //   }}
        //   data={productDataWithId}
        //   rowIdkey="id"
        // />
      ),
      route: "products",
    },
    {
      label: "Purchase Order",
      component: (
        <VendorDPPurchaseOrder
        // sx={{
        //   display: "flex",
        //   justifyContent: "center",
        //   width: "auto",
        //   height: "400px",
        // }}
        // data={productPurchaseOrderWithId}
        // rowIdkey="id"
        />
      ),
      route: "purchae_order",
    },
  ];
  const [tabsData, setTabsData] = useState([]);

  useEffect(() => {
    if (data) {
      setTabsData(staticData);
    }
  }, [data]);
  return (
    <div>
      <AppDetailsPageSection
        basePath={`/app/vendors/${vendorId}`}
        title={vendorData && vendorData?.company_name}
        tabsData={tabsData}
        pageType={"Vendor"}
        pageID={vendorId}
      />
    </div>
  );
}
